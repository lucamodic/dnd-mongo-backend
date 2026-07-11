import { Types } from "mongoose";
import { Character, IAbilityScores } from "../../db/models/Character";
import { Race } from "../../db/models/Race";
import { Class } from "../../db/models/Class";
import { HttpError } from "../../utils/response";
import { abilityMod, proficiencyBonus, rollDie } from "../../utils/dndRules";

const DEFAULT_SCORES: IAbilityScores = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

export interface CreateCharacterInput {
  name: string;
  raceId: string;
  classId: string;
  abilityScores?: Partial<IAbilityScores>;
}

export class CharacterService {
  /** Personajes del usuario, con raza y clase populadas. */
  static list(userId: string) {
    return Character.find({ userId })
      .populate("raceId", "name index image color")
      .populate("classId", "name index color hitDie spellcasting")
      .sort({ createdAt: -1 });
  }

  static async show(userId: string, id: string) {
    const character = await Character.findOne({ _id: id, userId })
      .populate("raceId")
      .populate("classId");
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    return character;
  }

  /** Crea un personaje de nivel 1: HP = dado de vida (máximo) + mod de CON. */
  static async create(userId: string, input: CreateCharacterInput) {
    if (!input.name?.trim()) throw new HttpError(400, "El nombre es obligatorio");

    const race = await Race.findById(input.raceId);
    if (!race) throw new HttpError(400, "Raza inválida");
    const cls = await Class.findById(input.classId);
    if (!cls) throw new HttpError(400, "Clase inválida");

    // Aplicamos los bonos de raza sobre las características base.
    const scores: IAbilityScores = { ...DEFAULT_SCORES, ...(input.abilityScores || {}) };
    for (const bonus of race.abilityBonuses || []) {
      const key = bonus.ability as keyof IAbilityScores;
      if (key in scores) scores[key] += bonus.bonus;
    }

    const conMod = abilityMod(scores.con);
    const dexMod = abilityMod(scores.dex);
    const maxHp = cls.hitDie + conMod; // nivel 1: dado de vida al máximo
    const ac = 10 + dexMod; // sin armadura por defecto

    const character = await Character.create({
      userId: new Types.ObjectId(userId),
      name: input.name.trim(),
      raceId: race._id,
      classId: cls._id,
      level: 1,
      hitDie: cls.hitDie,
      maxHp,
      currentHp: maxHp,
      ac,
      proficiencyBonus: proficiencyBonus(1),
      speed: race.speed || 30,
      abilityScores: scores,
    });

    return this.show(userId, String(character._id));
  }

  /**
   * Sube de nivel. El jugador tira el dado de vida en la vida real y manda `rolled`.
   * Si no lo manda, lo tiramos en el server. maxHp += rolled + mod(CON) (mínimo 1).
   */
  static async levelUp(userId: string, id: string, rolled?: number) {
    const character = await Character.findOne({ _id: id, userId });
    if (!character) throw new HttpError(404, "Personaje no encontrado");

    const roll = rolled && rolled > 0 ? rolled : rollDie(character.hitDie);
    const conMod = abilityMod(character.abilityScores.con);
    const gained = Math.max(1, roll + conMod);

    character.level += 1;
    character.maxHp += gained;
    character.currentHp += gained;
    character.proficiencyBonus = proficiencyBonus(character.level);
    await character.save();

    return { character: await this.show(userId, id), roll, conMod, gained };
  }

  /** Ajusta la vida actual (curar/recibir daño) sin pasar de 0..maxHp. */
  static async setHp(userId: string, id: string, currentHp: number) {
    const character = await Character.findOne({ _id: id, userId });
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    character.currentHp = Math.max(0, Math.min(character.maxHp, currentHp));
    await character.save();
    return character;
  }

  /** Actualiza campos editables del personaje (whitelist: nunca toca HP máximo, nivel, dueño, etc.). */
  static async update(userId: string, id: string, patch: Record<string, unknown>) {
    const ALLOWED = ["name", "notes", "ac", "tempHp", "currency", "skillProficiencies", "spellSlotsUsed", "resourcesUsed"];
    const set: Record<string, unknown> = {};
    for (const key of ALLOWED) {
      if (patch[key] !== undefined) set[key] = patch[key];
    }
    if (Object.keys(set).length === 0) throw new HttpError(400, "Nada para actualizar");

    const character = await Character.findOneAndUpdate({ _id: id, userId }, { $set: set }, { new: true });
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    return this.show(userId, id);
  }

  static async remove(userId: string, id: string) {
    const r = await Character.deleteOne({ _id: id, userId });
    if (!r.deletedCount) throw new HttpError(404, "Personaje no encontrado");
    return { deleted: true };
  }
}
