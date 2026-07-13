import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";

const DEFAULT_FILE = path.resolve(__dirname, "../data/generated/wikidot-higher-level.es.json");

interface HigherLevelPatch {
  index: string;
  higherLevel?: string[];
  suggestedHigherLevel?: string[];
  needsManualTranslation?: boolean;
}

async function run() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const fileArg = args.find((arg) => !arg.startsWith("--"));
  const file = path.resolve(fileArg || DEFAULT_FILE);
  const items = JSON.parse(await fs.readFile(file, "utf8")) as HigherLevelPatch[];
  if (!Array.isArray(items)) throw new Error("El JSON debe ser un array");

  if (!dryRun) await connectDB();
  let updated = 0;
  let skipped = 0;

  for (const item of items) {
    if (!item.index) throw new Error("Fila sin index");
    if (item.needsManualTranslation) throw new Error(`${item.index} sigue marcado needsManualTranslation`);
    const higherLevel = item.higherLevel || item.suggestedHigherLevel || [];
    if (!Array.isArray(higherLevel)) throw new Error(`${item.index}: higherLevel debe ser array`);
    if (higherLevel.some((line) => /\b(At Higher Levels|When you|spell slot|damage|target)\b/i.test(line))) {
      throw new Error(`${item.index}: higherLevel parece contener inglés`);
    }
    if (dryRun) {
      updated++;
      continue;
    }
    const result = await Spell.updateOne({ index: item.index }, { $set: { higherLevel } });
    if (result.matchedCount) updated++;
    else skipped++;
  }

  if (!dryRun) await mongoose.disconnect();
  console.log({ updated, skipped, file, dryRun });
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
