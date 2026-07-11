import { Schema, model, models, Model, Document, Types } from "mongoose";

/** Tabla de unión N:M entre clases y hechizos (spells_classes). */
export interface IClassSpell extends Document {
  classId: Types.ObjectId;
  spellId: Types.ObjectId;
}

const classSpellSchema = new Schema<IClassSpell>({
  classId: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  spellId: { type: Schema.Types.ObjectId, ref: "Spell", required: true },
});

classSpellSchema.index({ classId: 1, spellId: 1 }, { unique: true });

export const ClassSpell: Model<IClassSpell> =
  (models.ClassSpell as Model<IClassSpell>) || model<IClassSpell>("ClassSpell", classSpellSchema);
