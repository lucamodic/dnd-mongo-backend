import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface IParticipant {
  _id?: Types.ObjectId;
  name: string;
  type: "player" | "monster";
  initiative: number;
  hp: number;
  tempHp: number;
  maxHp: number;
  ac: number;
  characterId?: Types.ObjectId; // si es un PJ
  ownerUserId?: Types.ObjectId; // dueño (para permisos)
  color?: string;
}

/**
 * Turn tracker universal: un único documento global compartido por el grupo.
 * `activeIndex` apunta al participante en turno dentro de `participants`.
 */
export interface ITracker extends Document {
  round: number;
  activeIndex: number;
  levelUpEnabled: boolean;
  participants: IParticipant[];
  updatedAt: Date;
}

const participantSchema = new Schema<IParticipant>({
  name: { type: String, required: true },
  type: { type: String, enum: ["player", "monster"], required: true },
  initiative: { type: Number, default: 0 },
  hp: { type: Number, default: 1 },
  tempHp: { type: Number, default: 0 },
  maxHp: { type: Number, default: 1 },
  ac: { type: Number, default: 10 },
  characterId: { type: Schema.Types.ObjectId, ref: "Character" },
  ownerUserId: { type: Schema.Types.ObjectId, ref: "User" },
  color: { type: String, default: "" },
});

const trackerSchema = new Schema<ITracker>({
  round: { type: Number, default: 1 },
  activeIndex: { type: Number, default: 0 },
  levelUpEnabled: { type: Boolean, default: false },
  participants: [participantSchema],
  updatedAt: { type: Date, default: Date.now },
});

export const Tracker: Model<ITracker> =
  (models.Tracker as Model<ITracker>) || model<ITracker>("Tracker", trackerSchema);
