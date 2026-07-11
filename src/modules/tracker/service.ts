import { Types } from "mongoose";
import { Tracker, ITracker, IParticipant } from "../../db/models/Tracker";
import { Character } from "../../db/models/Character";
import { Monster } from "../../db/models/Monster";
import { HttpError } from "../../utils/response";
import { TokenPayload } from "../../utils/jwt";

/** Devuelve el único tracker global, creándolo si no existe. */
async function getOrCreate(): Promise<ITracker> {
  let tracker = await Tracker.findOne();
  if (!tracker) tracker = await Tracker.create({ round: 1, activeIndex: 0, participants: [] });
  return tracker;
}

const touch = async (tracker: ITracker) => {
  tracker.updatedAt = new Date();
  await tracker.save();
  return tracker;
};

export class TrackerService {
  static get() {
    return getOrCreate();
  }

  /** Un jugador suma su personaje al tracker (idempotente por characterId). */
  static async join(user: TokenPayload, characterId: string, initiative = 0) {
    const character = await Character.findOne({ _id: characterId, userId: user.id }).populate<{
      classId: { color?: string };
    }>("classId", "color");
    if (!character) throw new HttpError(404, "Personaje no encontrado");

    const tracker = await getOrCreate();
    const already = tracker.participants.find((p) => String(p.characterId) === String(character._id));
    if (already) {
      already.initiative = initiative;
      already.hp = character.currentHp;
      already.tempHp = character.tempHp || 0;
      already.maxHp = character.maxHp;
      already.ac = character.ac;
      return touch(tracker);
    }

    tracker.participants.push({
      name: character.name,
      type: "player",
      initiative,
      hp: character.currentHp,
      tempHp: character.tempHp || 0,
      maxHp: character.maxHp,
      ac: character.ac,
      characterId: character._id as Types.ObjectId,
      ownerUserId: new Types.ObjectId(user.id),
      color: (character.classId as any)?.color || "",
    });
    return touch(tracker);
  }

  /** El admin agrega un bicho: desde el bestiario (monsterId) o custom. */
  static async addParticipant(body: {
    monsterId?: string;
    name?: string;
    hp?: number;
    ac?: number;
    initiative?: number;
  }) {
    const tracker = await getOrCreate();
    let participant: IParticipant;

    if (body.monsterId) {
      const monster = await Monster.findById(body.monsterId);
      if (!monster) throw new HttpError(404, "Monstruo no encontrado");
      participant = {
        name: monster.name,
        type: "monster",
        initiative: body.initiative ?? 0,
        hp: monster.hp,
        tempHp: 0,
        maxHp: monster.hp,
        ac: monster.ac,
        color: "#722548",
      };
    } else {
      if (!body.name?.trim()) throw new HttpError(400, "El bicho necesita un nombre");
      const hp = Math.max(1, Number(body.hp) || 1);
      participant = {
        name: body.name.trim(),
        type: "monster",
        initiative: body.initiative ?? 0,
        hp,
        tempHp: 0,
        maxHp: hp,
        ac: Number(body.ac) || 10,
        color: "#722548",
      };
    }

    tracker.participants.push(participant);
    return touch(tracker);
  }

  private static findParticipant(tracker: ITracker, pid: string) {
    const participant = tracker.participants.find((p) => String(p._id) === String(pid));
    if (!participant) throw new HttpError(404, "Participante no encontrado");
    return participant;
  }

  private static assertCanEdit(user: TokenPayload, participant: IParticipant) {
    const isOwner = participant.ownerUserId && String(participant.ownerUserId) === user.id;
    if (user.role !== "admin" && !isOwner) {
      throw new HttpError(403, "No podés modificar este participante");
    }
  }

  /** Editar hp/initiative. Admin cualquiera; jugador solo el suyo. */
  static async patchParticipant(
    user: TokenPayload,
    pid: string,
    patch: { hp?: number; tempHp?: number; initiative?: number }
  ) {
    const tracker = await getOrCreate();
    const participant = this.findParticipant(tracker, pid);
    this.assertCanEdit(user, participant);

    if (patch.hp !== undefined) participant.hp = Math.max(0, Math.min(participant.maxHp, patch.hp));
    if (patch.tempHp !== undefined) participant.tempHp = Math.max(0, patch.tempHp);
    if (patch.initiative !== undefined) participant.initiative = patch.initiative;

    if (participant.characterId && (patch.hp !== undefined || patch.tempHp !== undefined)) {
      await Character.updateOne(
        { _id: participant.characterId, userId: participant.ownerUserId },
        {
          $set: {
            currentHp: participant.hp,
            tempHp: participant.tempHp || 0,
          },
        }
      );
    }
    return touch(tracker);
  }

  /** Borrar participante. Admin cualquiera; jugador solo el suyo. */
  static async removeParticipant(user: TokenPayload, pid: string) {
    const tracker = await getOrCreate();
    const participant = this.findParticipant(tracker, pid);
    this.assertCanEdit(user, participant);

    tracker.participants = tracker.participants.filter((p) => String(p._id) !== String(pid));
    if (tracker.activeIndex >= tracker.participants.length) tracker.activeIndex = 0;
    return touch(tracker);
  }

  /** Avanza al siguiente turno; al dar la vuelta suma una ronda. (admin) */
  static async next() {
    const tracker = await getOrCreate();
    if (tracker.participants.length === 0) return tracker;
    const nextIndex = tracker.activeIndex + 1;
    if (nextIndex >= tracker.participants.length) {
      tracker.activeIndex = 0;
      tracker.round += 1;
    } else {
      tracker.activeIndex = nextIndex;
    }
    return touch(tracker);
  }

  /** Ordena por iniciativa descendente y vuelve al primer turno. (admin) */
  static async sort() {
    const tracker = await getOrCreate();
    tracker.participants.sort((a, b) => b.initiative - a.initiative);
    tracker.activeIndex = 0;
    return touch(tracker);
  }

  /** Reinicia el combate. Por defecto conserva a los jugadores y borra los bichos. (admin) */
  static async reset(keepPlayers = true) {
    const tracker = await getOrCreate();
    tracker.participants = keepPlayers
      ? tracker.participants.filter((p) => p.type === "player")
      : [];
    tracker.round = 1;
    tracker.activeIndex = 0;
    return touch(tracker);
  }
}
