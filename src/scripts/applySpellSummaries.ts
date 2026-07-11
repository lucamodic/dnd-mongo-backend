import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";
import { SPELL_SUMMARIES } from "../data/spellSummaries";

/**
 * Aplica los resúmenes simples curados a mano (src/data/spellSummaries.ts) sobre la
 * colección Spell, haciendo match por `index`. Valida que la cobertura sea 1:1 antes
 * de escribir nada: si falta o sobra algún índice, aborta y lo informa.
 */
async function run() {
  await connectDB();

  const spells = await Spell.find().select("index name");
  const dbIndexes = new Set(spells.map((s) => s.index));
  const summaryIndexes = new Set(Object.keys(SPELL_SUMMARIES));

  const missing = [...dbIndexes].filter((i) => !summaryIndexes.has(i));
  const extra = [...summaryIndexes].filter((i) => !dbIndexes.has(i));

  if (missing.length) {
    console.error(`❌ Faltan resúmenes para ${missing.length} hechizos de la base:`, missing);
  }
  if (extra.length) {
    console.error(`❌ Hay ${extra.length} índices en spellSummaries.ts que no existen en la base:`, extra);
  }
  if (missing.length || extra.length) {
    console.error("\nNo se aplicó ningún cambio. Corregí el desfasaje y volvé a correr.");
    await mongoose.disconnect();
    process.exit(1);
  }

  let updated = 0;
  for (const spell of spells) {
    const summary = SPELL_SUMMARIES[spell.index];
    await Spell.updateOne(
      { _id: spell._id },
      { $set: { simpleDescription: summary.simpleDescription, dice: summary.dice || "" } }
    );
    updated++;
  }

  console.log(`✅ ${updated} hechizos actualizados con resumen simple + dado.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
