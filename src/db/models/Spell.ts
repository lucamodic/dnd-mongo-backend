import { Schema, model, models, Model, Document } from "mongoose";

export interface ISpell extends Document {
  index: string;
  name: string;
  level: number; // 0 = truco (cantrip)
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  components: string[];
  concentration: boolean;
  ritual: boolean;
  description: string[]; // texto SRD original (en inglés)
  higherLevel: string[];
  /** Tipo de daño (ej "Fuego", "Frío"); "" si el hechizo no hace daño. */
  damageType: string;
  /** Característica de la salvación (ej "Destreza"); "" si no pide salvación. */
  savingThrow: string;
  /** "melee" | "ranged" si el hechizo pide tirada de ataque de conjuro; "" si no (impacta solo o pide salvación). */
  attackType: string;
  /** Resumen simple en español, cargado por /spells/import-summaries. */
  simpleDescription: string;
  /** Tirada asociada (ej "2d8") si el hechizo tira dados; "" si no. */
  dice: string;
}

const spellSchema = new Schema<ISpell>({
  index: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, default: 0 },
  school: { type: String, default: "" },
  castingTime: { type: String, default: "" },
  range: { type: String, default: "" },
  duration: { type: String, default: "" },
  components: [{ type: String }],
  concentration: { type: Boolean, default: false },
  ritual: { type: Boolean, default: false },
  description: [{ type: String }],
  higherLevel: [{ type: String }],
  damageType: { type: String, default: "" },
  savingThrow: { type: String, default: "" },
  attackType: { type: String, default: "" },
  simpleDescription: { type: String, default: "" },
  dice: { type: String, default: "" },
});

export const Spell: Model<ISpell> = (models.Spell as Model<ISpell>) || model<ISpell>("Spell", spellSchema);
