import "dotenv/config";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { SpellService } from "../modules/spells/service";

/**
 * Genera `spells-to-summarize.json` en la raíz del proyecto.
 * Ese archivo se lo pasás a ChatGPT junto con SUMMARIZE_PROMPT.md.
 */
async function run() {
  await connectDB();
  const data = await SpellService.exportForSummary();
  const outPath = path.resolve(process.cwd(), "spells-to-summarize.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✓ Escritos ${data.length} hechizos en ${outPath}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
