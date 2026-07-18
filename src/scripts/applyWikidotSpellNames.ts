import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";
import { WIKIDOT_SPELL_NAMES_ES } from "../data/wikidotSpellNamesES";

/**
 * Traduce al español los nombres de los hechizos de Wikidot que habían quedado en inglés.
 * Solo actualiza `name` de los índices en WIKIDOT_SPELL_NAMES_ES; no toca nada más.
 */
async function run() {
  await connectDB();
  let updated = 0;
  let missing = 0;
  const notFound: string[] = [];

  for (const [index, name] of Object.entries(WIKIDOT_SPELL_NAMES_ES)) {
    const res = await Spell.updateOne({ index }, { $set: { name } });
    if (res.matchedCount === 0) {
      missing++;
      notFound.push(index);
    } else if (res.modifiedCount > 0) {
      updated++;
    }
  }

  console.log(`Nombres actualizados: ${updated} · Ya estaban / sin cambios: ${Object.keys(WIKIDOT_SPELL_NAMES_ES).length - updated - missing} · No encontrados: ${missing}`);
  if (notFound.length) console.log("No encontrados en Mongo:", notFound.join(", "));
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
