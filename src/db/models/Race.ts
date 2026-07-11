import { Schema, model, models, Model, Document } from "mongoose";

export interface IAbilityBonus {
  ability: string; // "dex"
  bonus: number;
}

export interface IRaceTrait {
  name: string;
  description: string; // simple, en español
}

export interface IRace extends Document {
  index: string;
  name: string;
  description: string;
  image: string;
  size: string;
  speed: number;
  abilityBonuses: IAbilityBonus[];
  traits: IRaceTrait[];
  languages: string;
}

const raceSchema = new Schema<IRace>({
  index: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  size: { type: String, default: "Medium" },
  speed: { type: Number, default: 30 },
  abilityBonuses: [{ ability: String, bonus: Number }],
  traits: [{ name: String, description: String }],
  languages: { type: String, default: "" },
});

export const Race: Model<IRace> = (models.Race as Model<IRace>) || model<IRace>("Race", raceSchema);
