import { Schema, model, models, Model, Document, Types } from "mongoose";

export type WeaponCategory = "simple-melee" | "simple-ranged" | "martial-melee" | "martial-ranged";

export interface IWeapon extends Document {
  index: string;
  name: string;
  category: WeaponCategory;
  damageDice: string;
  damageType: string;
  properties: string[];
  description: string;
  custom: boolean;
  createdBy?: Types.ObjectId;
}

const weaponSchema = new Schema<IWeapon>(
  {
    index: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, enum: ["simple-melee", "simple-ranged", "martial-melee", "martial-ranged"], required: true },
    damageDice: { type: String, default: "" },
    damageType: { type: String, default: "" },
    properties: { type: [String], default: [] },
    description: { type: String, default: "" },
    custom: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Weapon: Model<IWeapon> =
  (models.Weapon as Model<IWeapon>) || model<IWeapon>("Weapon", weaponSchema);
