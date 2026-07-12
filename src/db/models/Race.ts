import { Schema, model, models, Model, Document } from "mongoose";

export interface IAbilityBonus {
  ability: string; // "dex"
  bonus: number;
}

export interface IRaceTrait {
  name: string;
  description: string; // simple, en español
  active: boolean; // true = poder que usás (limitado o con acción); false = pasivo/fondo
}

export interface IRace extends Document {
  index: string;
  name: string;
  description: string;
  image: string;
  imageBase64: string;
  size: string;
  speed: number;
  abilityBonuses: IAbilityBonus[];
  flexibleAbilityBonuses: boolean;
  traits: IRaceTrait[];
  languages: string;
}

const raceSchema = new Schema<IRace>({
  index: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  imageBase64: { type: String, default: "" },
  size: { type: String, default: "Medium" },
  speed: { type: Number, default: 30 },
  abilityBonuses: [{ ability: String, bonus: Number }],
  flexibleAbilityBonuses: { type: Boolean, default: false },
  traits: [{ name: String, description: String, active: { type: Boolean, default: false } }],
  languages: { type: String, default: "" },
});

export const Race: Model<IRace> = (models.Race as Model<IRace>) || model<IRace>("Race", raceSchema);
