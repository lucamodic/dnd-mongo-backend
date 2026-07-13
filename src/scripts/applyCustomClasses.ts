import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Class } from "../db/models/Class";
import { Spell } from "../db/models/Spell";
import { ClassSpell } from "../db/models/ClassSpell";
import { CUSTOM_CLASSES, ARTIFICER_CORE_SPELL_INDEXES } from "../data/customClasses";

/**
 * Da de alta clases que NO están en el SRD (ej. Artificiero), a diferencia de `import:classes`
 * que solo trae clases de dnd5eapi.co. Además linkea los hechizos de esas clases que YA existen
 * en Mongo (SRD u otras clases custom), sin tocar el documento `Spell` (solo crea el link en
 * `ClassSpell`, como hace `importCustomSpellsFromJson.ts` con hechizos nuevos).
 */
async function run() {
  await connectDB();

  let upserted = 0;
  for (const cls of CUSTOM_CLASSES) {
    await Class.updateOne({ index: cls.index }, { $set: cls }, { upsert: true });
    upserted++;
  }
  console.log(`Clases custom aplicadas: ${upserted}.`);

  const artificerClass = await Class.findOne({ index: "artificer" });
  if (!artificerClass) throw new Error("No se pudo crear/encontrar la clase 'artificer'.");

  const spells = await Spell.find({ index: { $in: ARTIFICER_CORE_SPELL_INDEXES } }).select("index");
  const foundIndexes = new Set(spells.map((s) => s.index));
  const missing = ARTIFICER_CORE_SPELL_INDEXES.filter((i) => !foundIndexes.has(i));
  if (missing.length) {
    console.error("Faltan hechizos ya existentes para linkear (revisar índice):", missing);
    console.error("No se linqueó ningún hechizo. Corregí los índices y volvé a correr.");
    await mongoose.disconnect();
    process.exit(1);
  }

  let links = 0;
  for (const spell of spells) {
    const result = await ClassSpell.updateOne(
      { classId: artificerClass._id, spellId: spell._id },
      { $setOnInsert: { classId: artificerClass._id, spellId: spell._id } },
      { upsert: true }
    );
    if (result.upsertedCount) links++;
  }
  console.log(`Hechizos existentes linqueados a artificer: ${links} nuevos (de ${spells.length} evaluados).`);

  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
