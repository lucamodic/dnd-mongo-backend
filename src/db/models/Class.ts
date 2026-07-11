import { Schema, model, models, Model, Document } from "mongoose";

export interface IClassFeature {
  name: string;
  description: string; // simple, en español (fallback: "" si no está curada)
}

/** Recurso rastreable o informativo de una clase en un nivel (ej. Furias, Puntos de Ki). */
export interface IClassResource {
  key: string; // "rage", "ki", "sorcery-points"...
  label: string; // "Furias", "Puntos de Ki"...
  value: number; // cantidad a ese nivel
  trackable: boolean; // true = pips que se gastan/recuperan; false = solo dato informativo
  description: string; // qué es, en español
}

export interface IClassLevel {
  level: number;
  features: IClassFeature[];
  /** Espacios de conjuro por nivel de conjuro [nivel1..nivel9]; [] si no lanza conjuros. */
  spellSlots: number[];
  cantripsKnown: number;
  spellsKnown: number;
  resources: IClassResource[];
}

export interface IClass extends Document {
  index: string;
  name: string;
  color: string;
  image: string;
  hitDie: number; // 6, 8, 10, 12
  primaryAbility: string;
  savingThrows: string[]; // ["str","con"] (índices en inglés)
  spellcasting: boolean;
  spellcastingAbility: string; // "int" | "wis" | "cha" | ""
  description: string;
  skillChoiceCount: number;
  skillOptions: string[]; // índices de skills elegibles
  abilityPriority: string[]; // orden de características para repartir stats al crear
  progression: IClassLevel[];
}

const featureSchema = new Schema<IClassFeature>({ name: String, description: String }, { _id: false });
const resourceSchema = new Schema<IClassResource>(
  { key: String, label: String, value: Number, trackable: Boolean, description: String },
  { _id: false }
);
const levelSchema = new Schema<IClassLevel>(
  {
    level: Number,
    features: [featureSchema],
    spellSlots: [Number],
    cantripsKnown: { type: Number, default: 0 },
    spellsKnown: { type: Number, default: 0 },
    resources: [resourceSchema],
  },
  { _id: false }
);

const classSchema = new Schema<IClass>({
  index: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  color: { type: String, default: "#775E88" },
  image: { type: String, default: "" },
  hitDie: { type: Number, default: 8 },
  primaryAbility: { type: String, default: "" },
  savingThrows: [{ type: String }],
  spellcasting: { type: Boolean, default: false },
  spellcastingAbility: { type: String, default: "" },
  description: { type: String, default: "" },
  skillChoiceCount: { type: Number, default: 2 },
  skillOptions: [{ type: String }],
  abilityPriority: [{ type: String }],
  progression: [levelSchema],
});

export const Class: Model<IClass> = (models.Class as Model<IClass>) || model<IClass>("Class", classSchema);
