import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { RaceService } from "../modules/races/service";
import { ClassService } from "../modules/classes/service";
import { SpellService } from "../modules/spells/service";
import { MonsterService } from "../modules/monsters/service";

/**
 * "Migraciones" de datos: pobla la base con razas, clases, hechizos (+ spells_classes)
 * y monstruos desde el SRD de dnd5eapi.co.
 *
 *   npm run import:all       -> todo (orden correcto)
 *   npm run import:races
 *   npm run import:classes
 *   npm run import:spells    -> requiere clases importadas antes (para linkear)
 *   npm run import:monsters
 */
async function run() {
  const target = (process.argv[2] || "all").toLowerCase();
  await connectDB();

  const steps: Record<string, () => Promise<unknown>> = {
    races: () => RaceService.importAll(),
    classes: () => ClassService.importAll(),
    spells: () => SpellService.importAll(),
    monsters: () => MonsterService.importAll(),
  };

  // El orden importa: clases antes que hechizos (para poder linkear spells_classes).
  const order = target === "all" ? ["races", "classes", "spells", "monsters"] : [target];

  for (const step of order) {
    if (!steps[step]) {
      console.error(`Paso desconocido: ${step}. Usá races|classes|spells|monsters|all`);
      continue;
    }
    console.log(`\n⏳ Importando ${step}...`);
    const result = await steps[step]();
    console.log(`✓ ${step}:`, result);
  }

  await mongoose.disconnect();
  console.log("\n✅ Listo.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
