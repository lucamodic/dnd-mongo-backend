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

export interface IInventoryItem {
  text: string;
  description: string;
  createdAt: Date;
}

export interface ICharacterNotes {
  characterInfo: string;
  general: string;
  campaign: string;
  npcs: string;
  places: string;
  other: string;
}

export interface IDeathSaves {
  successes: number;
  failures: number;
}

export interface ICharacter extends Document {
  userId: Types.ObjectId;
  name: string;
  imageBase64: string;
  raceId: Types.ObjectId;
  classId: Types.ObjectId;
  subclassIndex: string;
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
  knownSpells: Types.ObjectId[]; // hechizos que el personaje "tiene"
  armor: string; // clave de armadura equipada ("none", "leather", "mage-armor"...)
  shield: boolean; // lleva escudo (+2 CA)
  acBonus: number; // bonus extra de CA (hechizos, objetos, manual)
  initiativeBonus: number; // bonus de iniciativa además del mod de Destreza
  weapon: string; // clave del arma equipada (índice de WEAPONS)
  weapons: string[]; // armas que tiene disponibles; `weapon` es la equipada
  hitDiceUsed: number; // dados de golpe gastados desde el último descanso largo (el total = level)
  inventoryItems: IInventoryItem[];
  notes: string;
  noteSections: ICharacterNotes;
  deathSaves: IDeathSaves; // éxitos/fallos de salvación de muerte mientras currentHp === 0
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

const inventoryItemSchema = new Schema<IInventoryItem>(
  {
    text: { type: String, required: true },
    description: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const notesSchema = new Schema<ICharacterNotes>(
  {
    characterInfo: { type: String, default: "" },
    general: { type: String, default: "" },
    campaign: { type: String, default: "" },
    npcs: { type: String, default: "" },
    places: { type: String, default: "" },
    other: { type: String, default: "" },
  },
  { _id: false }
);

const deathSavesSchema = new Schema<IDeathSaves>(
  { successes: { type: Number, default: 0 }, failures: { type: Number, default: 0 } },
  { _id: false }
);

const characterSchema = new Schema<ICharacter>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  imageBase64: { type: String, default: "" },
  raceId: { type: Schema.Types.ObjectId, ref: "Race", required: true },
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  subclassIndex: { type: String, default: "" },
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
  knownSpells: [{ type: Schema.Types.ObjectId, ref: "Spell" }],
  armor: { type: String, default: "none" },
  shield: { type: Boolean, default: false },
  acBonus: { type: Number, default: 0 },
  initiativeBonus: { type: Number, default: 0 },
  weapon: { type: String, default: "unarmed" },
  weapons: { type: [String], default: () => [] },
  hitDiceUsed: { type: Number, default: 0 },
  inventoryItems: { type: [inventoryItemSchema], default: () => [] },
  notes: { type: String, default: "" },
  noteSections: { type: notesSchema, default: () => ({}) },
  deathSaves: { type: deathSavesSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
});

export const Character: Model<ICharacter> =
  (models.Character as Model<ICharacter>) || model<ICharacter>("Character", characterSchema);
