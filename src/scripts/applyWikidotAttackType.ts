import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Spell } from "../db/models/Spell";
import { dndGet } from "../utils/dndApi";
import { CUSTOM_SPELLS } from "../data/customSpells";
import { scrapeWikidotSpellIndex, scrapeWikidotSpell, spellIndexFromName, WikidotIndexSpell } from "./wikidotSpellTools";

/**
 * Completa `attackType` para los hechizos que NO vienen del SRD (dnd5eapi.co) ni de
 * `customSpells.ts` -- es decir, los importados a mano desde Wikidot (Xanathar's, Tasha's,
 * Fizban's, etc.). `npm run import:all` ya cubre los del SRD; este script cubre el resto,
 * scrapeando la página de Wikidot de cada uno e infiriendo el tipo de ataque de la prosa en
 * inglés (mismo patrón heurístico que `curateWikidotCustomSpellsDraft.ts` usa para `savingThrow`).
 * SOLO toca el campo `attackType`; no pisa nada más del documento.
 */

/**
 * Algunos hechizos (Crown of Madness, Antagonize...) fuerzan a OTRA criatura (el objetivo
 * hechizado/dominado) a atacar a un tercero -- eso no es una tirada que hace quien lanza el
 * hechizo, así que no cuenta como `attackType`. Se distinguen porque el sujeto de "must/can make
 * a [melee|ranged] attack" es "target"/"creature"/"it" (el efecto), no "you" (quien lanza).
 */
function isForcedAttackOnOther(text: string): boolean {
  return /\b(target|creature|it)\b[^.]{0,120}\b(?:must|can)\b[^.]{0,120}\bmake an?\s+(?:melee|ranged)(?:\s+weapon)?\s+attack\b/i.test(
    text
  );
}

function detectAttackType(text: string): "" | "melee" | "ranged" {
  if (/\branged spell attack\b/i.test(text)) return "ranged";
  if (/\bmelee spell attack\b/i.test(text)) return "melee";
  if (isForcedAttackOnOther(text)) return "";
  if (/\bmake a ranged attack\b/i.test(text)) return "ranged";
  if (/\bmake a melee attack\b/i.test(text)) return "melee";
  return "";
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const dryRun = process.argv.includes("--dry-run");
  const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
  const limit = limitArg ? Number(limitArg.split("=")[1]) : 0;

  await connectDB();

  const srdList = await dndGet<{ results: { index: string }[] }>("/spells");
  const srdIndexes = new Set(srdList.results.map((s) => s.index));
  const customIndexes = new Set(CUSTOM_SPELLS.map((s) => s.index));

  const allSpells = await Spell.find().select("_id index name").lean();
  let extras = allSpells.filter((s) => !srdIndexes.has(s.index) && !customIndexes.has(s.index));
  if (limit > 0) extras = extras.slice(0, limit);
  console.log(`Hechizos a revisar en Wikidot: ${extras.length}${dryRun ? " (DRY RUN, no escribe en Mongo)" : ""}`);

  console.log("Scrapeando índice de dnd5e.wikidot.com/spells...");
  const wikidotIndex = await scrapeWikidotSpellIndex();
  const byIndex = new Map<string, WikidotIndexSpell>();
  for (const w of wikidotIndex) {
    byIndex.set(w.index, w);
    byIndex.set(spellIndexFromName(w.name), w);
  }

  let melee = 0;
  let ranged = 0;
  let none = 0;
  let notFound = 0;
  const notFoundList: string[] = [];

  for (const [i, spell] of extras.entries()) {
    const wikidotEntry = byIndex.get(spell.index);
    if (!wikidotEntry) {
      notFound++;
      notFoundList.push(`${spell.index} (${spell.name})`);
      console.log(`${i + 1}/${extras.length}: ${spell.name} -> NO ENCONTRADO en Wikidot`);
      continue;
    }

    try {
      const details = await scrapeWikidotSpell(wikidotEntry);
      const fullText = [...details.descriptionEn, ...details.higherLevelEn].join(" ");
      const attackType = detectAttackType(fullText);
      if (attackType === "melee") melee++;
      else if (attackType === "ranged") ranged++;
      else none++;

      if (!dryRun) await Spell.updateOne({ _id: spell._id }, { $set: { attackType } });
      console.log(`${i + 1}/${extras.length}: ${spell.name} -> attackType="${attackType}"`);
    } catch (e) {
      console.log(`${i + 1}/${extras.length}: ${spell.name} -> ERROR: ${(e as Error).message}`);
    }

    await sleep(150);
  }

  console.log("---");
  console.log(`Melee: ${melee} · Ranged: ${ranged} · Ninguno (impacta solo / salvación): ${none} · No encontrados: ${notFound}`);
  if (notFoundList.length) {
    console.log("No encontrados en Wikidot (revisar índice a mano):");
    notFoundList.forEach((l) => console.log(`  - ${l}`));
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
