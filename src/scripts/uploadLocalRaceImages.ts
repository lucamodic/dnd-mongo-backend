import "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Race } from "../db/models/Race";

/**
 * Sube a Mongo las fotos locales (base64) de razas que no tienen URL pública:
 * las 10 razas nuevas (satyr, tabaxi, firbolg, fairy, changeling, aasimar, githyanki,
 * harengon, sea-elf, tortle) más kenku/kobold/shifter, que ya existían sin foto.
 * Lee el JSON generado por un script Python que compone los PNG con transparencia
 * sobre un fondo y convierte todo a JPEG base64. Es un script de una sola corrida,
 * no forma parte del import regular.
 */
const JSON_PATH = process.argv[2];

async function run() {
  if (!JSON_PATH) throw new Error("Uso: ts-node uploadLocalRaceImages.ts <path-al-json>");
  const images: Record<string, string> = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

  await connectDB();
  let updated = 0;

  for (const [index, dataUri] of Object.entries(images)) {
    const res = await Race.updateOne({ index }, { $set: { image: "", imageBase64: dataUri } });
    if (res.matchedCount === 0) {
      console.log(`⚠️  No existe raza con index "${index}"`);
      continue;
    }
    updated++;
    console.log(`✓ ${index}`);
  }

  console.log(`✅ ${updated}/${Object.keys(images).length} razas actualizadas con foto local.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
