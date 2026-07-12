import { Types } from "mongoose";
import { Character, IAbilityScores } from "../../db/models/Character";
import { Race } from "../../db/models/Race";
import { Class, IClass } from "../../db/models/Class";
import { ClassSpell } from "../../db/models/ClassSpell";
import { ISpell } from "../../db/models/Spell";
import { Tracker } from "../../db/models/Tracker";
import { HttpError } from "../../utils/response";
import { abilityMod, proficiencyBonus, rollDie, rollAbilityScores, computeAc } from "../../utils/dndRules";
import { CLASS_ABILITY_PRIORITY, DEFAULT_ABILITY_PRIORITY } from "../../data/classAbilityPriority";
import { TokenPayload } from "../../utils/jwt";

const isDM = (user: Pick<TokenPayload, "role">) => user.role === "dm" || user.role === "admin";

const priorityFor = (cls: IClass): string[] =>
  (cls.abilityPriority && cls.abilityPriority.length ? cls.abilityPriority : CLASS_ABILITY_PRIORITY[cls.index]) ||
  DEFAULT_ABILITY_PRIORITY;

const progressionAt = (cls: IClass, level: number) => cls.progression?.find((p) => p.level === level);

const cantripLimit = (cls: IClass, level: number) => progressionAt(cls, level)?.cantripsKnown || 0;

const spellsKnownLimit = (cls: IClass, scores: IAbilityScores, level: number): number => {
  const known = progressionAt(cls, level)?.spellsKnown || 0;
  if (known > 0) return known;
  if (!cls.spellcastingAbility) return 0;
  const ability = cls.spellcastingAbility as keyof IAbilityScores;
  const effectiveLevel = cls.index === "paladin" ? Math.floor(level / 2) : level;
  return Math.max(1, abilityMod(scores[ability]) + effectiveLevel);
};

/** IDs recomendados respetando los límites iniciales de la clase. */
const recommendedSpellIds = async (cls: IClass, scores: IAbilityScores, level: number): Promise<Types.ObjectId[]> => {
  const links = await ClassSpell.find({ classId: cls._id, recommended: true })
    .populate<{ spellId: ISpell }>("spellId")
    .select("spellId");

  const cantrips = links.filter((l) => l.spellId?.level === 0).slice(0, cantripLimit(cls, level));
  const spells = links
    .filter((l) => l.spellId?.level > 0)
    .sort((a, b) => a.spellId.level - b.spellId.level || a.spellId.name.localeCompare(b.spellId.name))
    .slice(0, spellsKnownLimit(cls, scores, level));

  return [...cantrips, ...spells].map((l) => l.spellId._id as Types.ObjectId);
};

const syncTrackerParticipant = async (character: any) => {
  await Tracker.updateOne(
    { "participants.characterId": character._id },
    {
      $set: {
        "participants.$.hp": character.currentHp,
        "participants.$.tempHp": character.tempHp || 0,
        "participants.$.maxHp": character.maxHp,
        "participants.$.ac": character.ac,
        updatedAt: new Date(),
      },
    }
  );
};

const removeTrackerParticipant = async (characterId: Types.ObjectId) => {
  const tracker = await Tracker.findOne({ "participants.characterId": characterId });
  if (!tracker) return;
  tracker.participants = tracker.participants.filter((p) => String(p.characterId) !== String(characterId));
  if (tracker.activeIndex >= tracker.participants.length) tracker.activeIndex = 0;
  tracker.updatedAt = new Date();
  await tracker.save();
};

export interface CreateCharacterInput {
  name: string;
  raceId: string;
  classId: string;
  abilityScores?: Partial<IAbilityScores>;
}

export class CharacterService {
  /** Personajes del usuario, con raza y clase populadas. */
  static list(user: TokenPayload) {
    return Character.find(isDM(user) ? {} : { userId: user.id })
      .populate("userId", "username displayName role")
      .populate("raceId", "name index image imageBase64 color")
      .populate("classId", "name index color hitDie spellcasting")
      .sort({ createdAt: -1 });
  }

  static async show(user: TokenPayload, id: string) {
    const character = await Character.findOne(isDM(user) ? { _id: id } : { _id: id, userId: user.id })
      .populate("userId", "username displayName role")
      .populate("raceId")
      .populate("classId")
      .populate("knownSpells");
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    return character;
  }

  /**
   * Tira características para una clase (6× 4d6 drop lowest, repartidas por prioridad de clase,
   * las 2 principales mínimo 14). Sin bonos de raza (se aplican al crear). Para el botón "volver a tirar".
   */
  static async rollStats(classId: string): Promise<IAbilityScores> {
    const cls = await Class.findById(classId);
    if (!cls) throw new HttpError(400, "Clase inválida");
    return rollAbilityScores(priorityFor(cls));
  }

  /** Crea un personaje de nivel 1: HP = dado de vida (máximo) + mod de CON. */
  static async create(userId: string, input: CreateCharacterInput) {
    if (!input.name?.trim()) throw new HttpError(400, "El nombre es obligatorio");

    const race = await Race.findById(input.raceId);
    if (!race) throw new HttpError(400, "Raza inválida");
    const cls = await Class.findById(input.classId);
    if (!cls) throw new HttpError(400, "Clase inválida");

    // Si no vienen características, las generamos según la clase (4d6 drop lowest + reparto).
    const base = input.abilityScores
      ? ({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10, ...input.abilityScores } as IAbilityScores)
      : rollAbilityScores(priorityFor(cls));

    // Aplicamos los bonos de raza encima.
    const scores: IAbilityScores = { ...base };
    for (const bonus of race.abilityBonuses || []) {
      const key = bonus.ability as keyof IAbilityScores;
      if (key in scores) scores[key] += bonus.bonus;
    }

    const conMod = abilityMod(scores.con);
    const maxHp = cls.hitDie + conMod; // nivel 1: dado de vida al máximo
    const ac = computeAc({ armor: "none", shield: false, acBonus: 0, abilityScores: scores });
    const knownSpells = cls.spellcasting ? await recommendedSpellIds(cls, scores, 1) : [];

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
      armor: "none",
      shield: false,
      acBonus: 0,
      initiativeBonus: 0,
      weapon: "unarmed",
      proficiencyBonus: proficiencyBonus(1),
      speed: race.speed || 30,
      abilityScores: scores,
      knownSpells,
    });

    return this.show({ id: userId, username: "", role: "player" }, String(character._id));
  }

  /**
   * Sube de nivel. El jugador tira el dado de vida en la vida real y manda `rolled`.
   * Si no lo manda, lo tiramos en el server. maxHp += rolled + mod(CON) (mínimo 1).
   */
  static async levelUp(user: TokenPayload, id: string, rolled?: number) {
    if (!isDM(user)) {
      const tracker = await Tracker.findOne();
      if (!tracker?.levelUpEnabled) throw new HttpError(403, "El DM todavía no habilitó la subida de nivel");
    }

    const character = await Character.findOne(isDM(user) ? { _id: id } : { _id: id, userId: user.id });
    if (!character) throw new HttpError(404, "Personaje no encontrado");

    const roll = rolled && rolled > 0 ? rolled : rollDie(character.hitDie);
    const conMod = abilityMod(character.abilityScores.con);
    const gained = Math.max(1, roll + conMod);

    character.level += 1;
    character.maxHp += gained;
    character.currentHp += gained;
    character.proficiencyBonus = proficiencyBonus(character.level);
    await character.save();

    return { character: await this.show(user, id), roll, conMod, gained };
  }

  /** Ajusta la vida actual (curar/recibir daño) sin pasar de 0..maxHp. */
  static async setHp(userId: string, id: string, currentHp: number) {
    const character = await Character.findOne({ _id: id, userId });
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    character.currentHp = Math.max(0, Math.min(character.maxHp, currentHp));
    await character.save();
    await syncTrackerParticipant(character);
    return character;
  }

  /** Actualiza campos editables del personaje (whitelist: nunca toca nivel, dueño, etc.). */
  static async update(user: TokenPayload, id: string, patch: Record<string, unknown>) {
    const ALLOWED = [
      "name", "imageBase64", "notes", "noteSections", "inventoryItems", "ac", "currentHp", "tempHp", "maxHp", "abilityScores", "currency", "skillProficiencies",
      "spellSlotsUsed", "resourcesUsed", "knownSpells", "armor", "shield", "acBonus", "initiativeBonus", "weapon", "weapons",
    ];
    const character = await Character.findOne(isDM(user) ? { _id: id } : { _id: id, userId: user.id });
    if (!character) throw new HttpError(404, "Personaje no encontrado");

    let touched = false;
    for (const key of ALLOWED) {
      if (patch[key] !== undefined) {
        (character as any)[key] = patch[key];
        touched = true;
      }
    }
    if (!touched) throw new HttpError(400, "Nada para actualizar");

    // La vida actual queda siempre dentro de 0..maxHp, y la temporal nunca baja de 0.
    character.currentHp = Math.max(0, Math.min(character.maxHp, character.currentHp));
    character.tempHp = Math.max(0, character.tempHp || 0);

    // Si cambió algo que afecta la CA, la recalculamos (salvo que hayan mandado un `ac` explícito).
    const acAffecting = ["armor", "shield", "acBonus", "abilityScores"].some((k) => patch[k] !== undefined);
    if (acAffecting && patch.ac === undefined) {
      character.ac = computeAc({
        armor: character.armor,
        shield: character.shield,
        acBonus: character.acBonus,
        abilityScores: character.abilityScores,
      });
    }

    await character.save();
    if (["currentHp", "tempHp", "maxHp", "armor", "shield", "acBonus", "abilityScores", "ac"].some((k) => patch[k] !== undefined)) {
      await syncTrackerParticipant(character);
    }
    return this.show(user, id);
  }

  static async remove(user: TokenPayload, id: string) {
    const character = await Character.findOneAndDelete(isDM(user) ? { _id: id } : { _id: id, userId: user.id });
    if (!character) throw new HttpError(404, "Personaje no encontrado");
    await removeTrackerParticipant(character._id as Types.ObjectId);
    return { deleted: true };
  }
}
