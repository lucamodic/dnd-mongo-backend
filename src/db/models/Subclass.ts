import { Schema, model, models, Model, Document } from "mongoose";

export interface ISubclassFeature {
  name: string;
  description: string;
  active: boolean;
}

export interface ISubclassResource {
  key: string;
  label: string;
  value: number;
  trackable: boolean;
  description: string;
}

export interface ISubclassLevel {
  level: number;
  features: ISubclassFeature[];
  spellSlots?: number[];
  cantripsKnown?: number;
  spellsKnown?: number;
  resources?: ISubclassResource[];
}

export interface IBonusSpellGroup {
  level: number;
  spellIndexes: string[];
}

export interface ISubclass extends Document {
  index: string;
  classIndex: string;
  name: string;
  description: string;
  subclassLevel: number;
  source?: string;
  spellcasting?: boolean;
  spellcastingAbility?: string;
  spellListClassIndex?: string;
  progression: ISubclassLevel[];
  bonusSpells?: IBonusSpellGroup[];
}

const featureSchema = new Schema<ISubclassFeature>(
  { name: String, description: String, active: { type: Boolean, default: false } },
  { _id: false }
);

const resourceSchema = new Schema<ISubclassResource>(
  { key: String, label: String, value: Number, trackable: Boolean, description: String },
  { _id: false }
);

const levelSchema = new Schema<ISubclassLevel>(
  {
    level: { type: Number, required: true },
    features: { type: [featureSchema], default: () => [] },
    spellSlots: { type: [Number], default: undefined },
    cantripsKnown: { type: Number, default: undefined },
    spellsKnown: { type: Number, default: undefined },
    resources: { type: [resourceSchema], default: undefined },
  },
  { _id: false }
);

const bonusSpellGroupSchema = new Schema<IBonusSpellGroup>(
  {
    level: { type: Number, required: true },
    spellIndexes: { type: [String], default: () => [] },
  },
  { _id: false }
);

const subclassSchema = new Schema<ISubclass>({
  index: { type: String, required: true, unique: true },
  classIndex: { type: String, required: true, index: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  subclassLevel: { type: Number, default: 3 },
  source: { type: String, default: "" },
  spellcasting: { type: Boolean, default: false },
  spellcastingAbility: { type: String, default: "" },
  spellListClassIndex: { type: String, default: "" },
  progression: { type: [levelSchema], default: () => [] },
  bonusSpells: { type: [bonusSpellGroupSchema], default: () => [] },
});

export const Subclass: Model<ISubclass> =
  (models.Subclass as Model<ISubclass>) || model<ISubclass>("Subclass", subclassSchema);
