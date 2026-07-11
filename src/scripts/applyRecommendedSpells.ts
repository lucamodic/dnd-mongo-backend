import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { SpellService } from "../modules/spells/service";

/**
 * Marca en spells_classes los hechizos recomendados (mejores para principiantes) de cada clase,
 * según src/data/recommendedSpells.ts. Al crear un personaje esos hechizos se cargan como conocidos.
 */
async function run() {
  await connectDB();
  const result = await SpellService.applyRecommended();
  console.log("✅ Recomendados marcados:", result);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
