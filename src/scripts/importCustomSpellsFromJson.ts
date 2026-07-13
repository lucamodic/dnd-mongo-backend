import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";
import { Class } from "../db/models/Class";
import { ClassSpell } from "../db/models/ClassSpell";
import { CustomSpell } from "../data/customSpells";

const DEFAULT_FILE = path.resolve(__dirname, "../data/generated/wikidot-custom-spells.es.json");

async function run() {
  const file = path.resolve(process.argv[2] || DEFAULT_FILE);
  const dryRun = process.argv.includes("--dry-run");
  const raw = await fs.readFile(file, "utf8");
  const spells = JSON.parse(raw) as CustomSpell[];
  if (!Array.isArray(spells)) throw new Error("El JSON debe ser un array de CustomSpell");

  if (!dryRun) await connectDB();
  let imported = 0;
  let links = 0;

  for (const spellData of spells) {
    validateSpanishSpell(spellData);
    if (dryRun) {
      imported++;
      continue;
    }
    const { classes, ...data } = spellData;
    const spell = await Spell.findOneAndUpdate(
      { index: data.index },
      { $set: data },
      { upsert: true, new: true }
    );
    imported++;

    for (const classIndex of classes || []) {
      const classRecord = await Class.findOne({ index: classIndex });
      if (!classRecord) {
        console.warn(`Clase inexistente para ${spellData.index}: ${classIndex}`);
        continue;
      }
      const link = await ClassSpell.updateOne(
        { classId: classRecord._id, spellId: spell!._id },
        { $setOnInsert: { classId: classRecord._id, spellId: spell!._id } },
        { upsert: true }
      );
      if (link.upsertedCount) links++;
    }
  }

  if (!dryRun) await mongoose.disconnect();
  console.log({ imported, links, file, dryRun });
}

function validateSpanishSpell(spell: CustomSpell) {
  const missing = ["index", "name", "school", "castingTime", "range", "duration"].filter((key) => !(spell as any)[key]);
  if (missing.length) throw new Error(`${spell.index || "sin-index"} incompleto: faltan ${missing.join(", ")}`);
  if (!Array.isArray(spell.description) || spell.description.length === 0) {
    throw new Error(`${spell.index} no tiene description en español. Curá wikidot-custom-spells.draft.json y guardalo como .es.json.`);
  }
  if ((spell as any).needsSpanishReview || (spell as any).sourceDescriptionEn || (spell as any).sourceHigherLevelEn) {
    throw new Error(`${spell.index} todavía parece un draft. Eliminá campos source*/needsSpanishReview después de curarlo en español.`);
  }
  if ((spell.higherLevel || []).some((line) => /\b(At Higher Levels|When you|spell slot|damage|target)\b/i.test(line))) {
    throw new Error(`${spell.index} tiene higherLevel con texto que parece inglés`);
  }
  if (!Array.isArray(spell.classes) || spell.classes.length === 0) {
    throw new Error(`${spell.index} no tiene classes`);
  }
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
