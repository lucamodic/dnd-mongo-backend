import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface IAbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface ICurrency {
  gp: number; // oro
  sp: number; // plata
  cp: number; // cobre
}

export interface IResourceState {
  key: string; // "rage", "ki"...
  used: number;
}

export interface ICharacter extends Document {
  userId: Types.ObjectId;
  name: string;
  raceId: Types.ObjectId;
  classId: Types.ObjectId;
  level: number;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  hitDie: number;
  ac: number;
  proficiencyBonus: number;
  speed: number;
  abilityScores: IAbilityScores;
  skillProficiencies: string[]; // índices de skills en las que es competente
  currency: ICurrency;
  spellSlotsUsed: number[]; // usados por nivel de conjuro [nivel1..nivel9]
  resourcesUsed: IResourceState[]; // gastados por recurso (furias, ki...)
  notes: string;
  createdAt: Date;
}

const abilitySchema = new Schema<IAbilityScores>(
  {
    str: { type: Number, default: 10 },
    dex: { type: Number, default: 10 },
    con: { type: Number, default: 10 },
    int: { type: Number, default: 10 },
    wis: { type: Number, default: 10 },
    cha: { type: Number, default: 10 },
  },
  { _id: false }
);

const currencySchema = new Schema<ICurrency>(
  { gp: { type: Number, default: 0 }, sp: { type: Number, default: 0 }, cp: { type: Number, default: 0 } },
  { _id: false }
);

const characterSchema = new Schema<ICharacter>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  raceId: { type: Schema.Types.ObjectId, ref: "Race", required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  level: { type: Number, default: 1 },
  maxHp: { type: Number, required: true },
  currentHp: { type: Number, required: true },
  tempHp: { type: Number, default: 0 },
  hitDie: { type: Number, required: true },
  ac: { type: Number, default: 10 },
  proficiencyBonus: { type: Number, default: 2 },
  speed: { type: Number, default: 30 },
  abilityScores: { type: abilitySchema, default: () => ({}) },
  skillProficiencies: [{ type: String }],
  currency: { type: currencySchema, default: () => ({}) },
  spellSlotsUsed: { type: [Number], default: () => [] },
  resourcesUsed: { type: [{ key: String, used: Number }], default: () => [] },
  notes: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const Character: Model<ICharacter> =
  (models.Character as Model<ICharacter>) || model<ICharacter>("Character", characterSchema);
