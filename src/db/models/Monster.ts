import { Schema, model, models, Model, Document } from "mongoose";

/** Bestiario SRD reducido, para que el admin agregue bichos al turn tracker. */
export interface IMonster extends Document {
  index: string;
  name: string;
  size: string;
  type: string;
  hp: number;
  hitDice: string;
  ac: number;
  challengeRating: number;
  xp: number;
  image: string;
}

const monsterSchema = new Schema<IMonster>({
  index: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  size: { type: String, default: "" },
  type: { type: String, default: "" },
  hp: { type: Number, default: 1 },
  hitDice: { type: String, default: "" },
  ac: { type: Number, default: 10 },
  challengeRating: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  image: { type: String, default: "" },
});

export const Monster: Model<IMonster> =
  (models.Monster as Model<IMonster>) || model<IMonster>("Monster", monsterSchema);
