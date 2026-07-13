import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";
import { Class } from "../db/models/Class";
import { ClassSpell } from "../db/models/ClassSpell";
import {
  scrapeWikidotSpell,
  scrapeWikidotSpellIndex,
  spellIndexFromName,
  toCustomSpellDraft,
  translateHigherLevel,
  WikidotSpell,
} from "./wikidotSpellTools";

const GENERATED_DIR = path.resolve(__dirname, "../data/generated");

async function run() {
  const includeUa = process.argv.includes("--include-ua");
  const skipHigherLevelAudit = process.argv.includes("--skip-higher-level-audit");
  const onlyHigherLevelAudit = process.argv.includes("--only-higher-level-audit");
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : 0;
  const higherLevelLimitArg = process.argv.find((arg) => arg.startsWith("--higher-level-limit="));
  const higherLevelLimit = higherLevelLimitArg ? Number(higherLevelLimitArg.split("=")[1]) : 0;
  await fs.mkdir(GENERATED_DIR, { recursive: true });

  await connectDB();
  const existing = await existingSpellSnapshot();
  await writeJson("current-spells.json", existing);

  const index = (await scrapeWikidotSpellIndex()).filter((spell) => includeUa || !spell.ua);
  let missingIndex: typeof index = [];

  if (!onlyHigherLevelAudit) {
    const existingIndexes = new Set(existing.map((spell) => spell.index));
    missingIndex = index.filter((spell) => !existingIndexes.has(spell.index) && !existingIndexes.has(spellIndexFromName(spell.name)));
    const toScrape = limit > 0 ? missingIndex.slice(0, limit) : missingIndex;

    const wikidotMissing: WikidotSpell[] = [];
    for (const [i, spell] of toScrape.entries()) {
      console.log(`Wikidot ${i + 1}/${toScrape.length}: ${spell.name}`);
      wikidotMissing.push(await scrapeWikidotSpell(spell));
      await sleep(150);
    }

    await writeJson("wikidot-missing-spells.raw.json", wikidotMissing);
    await writeJson("wikidot-custom-spells.draft.json", wikidotMissing.map(toCustomSpellDraft));
  }

  if (!skipHigherLevelAudit) {
    const higherLevelAudit = await higherLevelAuditForExisting(index, higherLevelLimit);
    await writeJson("wikidot-higher-level-audit.json", higherLevelAudit);
  }

  await mongoose.disconnect();
  console.log(`Listo. Existentes: ${existing.length}. Faltantes Wikidot: ${missingIndex.length}.`);
  console.log(`Archivos en ${GENERATED_DIR}`);
}

async function existingSpellSnapshot() {
  const spells = await Spell.find().sort({ level: 1, index: 1 }).lean();
  const classes = await Class.find().select("index").lean();
  const classById = new Map(classes.map((cls) => [String(cls._id), cls.index]));
  const links = await ClassSpell.find().select("classId spellId recommended").lean();
  const bySpell = new Map<string, { classIndex: string; recommended: boolean }[]>();
  for (const link of links) {
    const classIndex = classById.get(String(link.classId));
    if (!classIndex) continue;
    const spellId = String(link.spellId);
    bySpell.set(spellId, [...(bySpell.get(spellId) || []), { classIndex, recommended: !!link.recommended }]);
  }
  return spells.map((spell) => ({
    id: String(spell._id),
    index: spell.index,
    name: spell.name,
    level: spell.level,
    school: spell.school,
    castingTime: spell.castingTime,
    range: spell.range,
    duration: spell.duration,
    components: spell.components,
    concentration: spell.concentration,
    ritual: spell.ritual,
    higherLevel: spell.higherLevel || [],
    classes: (bySpell.get(String(spell._id)) || []).map((link) => link.classIndex).sort(),
  }));
}

async function higherLevelAuditForExisting(index: Awaited<ReturnType<typeof scrapeWikidotSpellIndex>>, limit = 0) {
  const existingQuery = Spell.find().sort({ level: 1, index: 1 });
  if (limit > 0) existingQuery.limit(limit);
  const existing = await existingQuery.lean();
  const byIndex = new Map(index.map((spell) => [spell.index, spell]));
  const rows = [];
  for (const spell of existing) {
    const wikidotIndex = byIndex.get(spell.index) || byIndex.get(spellIndexFromName(spell.name));
    if (!wikidotIndex) continue;
    const details = await scrapeWikidotSpell(wikidotIndex);
    await sleep(100);
    const suggestedHigherLevel = details.higherLevelEn.map(translateHigherLevel).filter((line) =>
      !/\b(When you|At Higher Levels|level|damage|target|spell slot|creature|beast|you can)\b/i.test(line)
    );
    const currentHigherLevel = spell.higherLevel || [];
    const needsManualTranslation = details.higherLevelEn.length > 0 && suggestedHigherLevel.length !== details.higherLevelEn.length;
    if (needsManualTranslation || suggestedHigherLevel.join("\n") !== currentHigherLevel.join("\n")) {
      rows.push({
        index: spell.index,
        name: spell.name,
        currentHigherLevel,
        suggestedHigherLevel,
        needsManualTranslation,
        sourceHigherLevelEn: details.higherLevelEn,
        sourceUrl: details.url,
      });
    }
  }
  return rows;
}

async function writeJson(filename: string, value: unknown) {
  await fs.writeFile(path.join(GENERATED_DIR, filename), `${JSON.stringify(value, null, 2)}\n`);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
