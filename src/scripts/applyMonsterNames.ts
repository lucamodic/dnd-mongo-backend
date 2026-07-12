import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Monster } from "../db/models/Monster";
import { monsterNameES } from "../data/monsterNamesES";

async function run() {
  await connectDB();

  const monsters = await Monster.find().select("index name");
  let updated = 0;

  for (const monster of monsters) {
    const nextName = monsterNameES(monster.index, monster.name);
    if (nextName && nextName !== monster.name) {
      await Monster.updateOne({ _id: monster._id }, { $set: { name: nextName } });
      updated++;
    }
  }

  console.log(`✅ ${updated}/${monsters.length} monstruos actualizados con nombre en español.`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
