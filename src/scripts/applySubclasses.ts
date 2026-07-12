import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../db/connect";
import { Class } from "../db/models/Class";
import { Spell } from "../db/models/Spell";
import { Subclass } from "../db/models/Subclass";
import { SUBCLASSES, SUBCLASS_LEVEL_BY_CLASS } from "../data/subclasses";

async function run() {
  await connectDB();

  const classes = await Class.find().select("index");
  const classIndexes = new Set(classes.map((cls) => cls.index));
  const missingClasses = [...new Set(SUBCLASSES.map((subclass) => subclass.classIndex))].filter((index) => !classIndexes.has(index));

  const spellIndexes = [...new Set(SUBCLASSES.flatMap((subclass) => subclass.bonusSpells || []).flatMap((group) => group.spellIndexes))];
  const spells = spellIndexes.length ? await Spell.find({ index: { $in: spellIndexes } }).select("index") : [];
  const foundSpellIndexes = new Set(spells.map((spell) => spell.index));
  const missingSpells = spellIndexes.filter((index) => !foundSpellIndexes.has(index));

  if (missingClasses.length || missingSpells.length) {
    if (missingClasses.length) console.error("Faltan clases para subclases:", missingClasses);
    if (missingSpells.length) console.error("Faltan hechizos para bonusSpells:", missingSpells);
    console.error("No se aplicó ningún cambio. Corregí los índices y volvé a correr.");
    await mongoose.disconnect();
    process.exit(1);
  }

  let upserted = 0;
  for (const subclass of SUBCLASSES) {
    await Subclass.updateOne({ index: subclass.index }, { $set: subclass }, { upsert: true });
    upserted++;
  }

  for (const [classIndex, subclassLevel] of Object.entries(SUBCLASS_LEVEL_BY_CLASS)) {
    await Class.updateOne({ index: classIndex }, { $set: { subclassLevel } });
  }

  console.log(`Subclases aplicadas: ${upserted}. Clases actualizadas: ${Object.keys(SUBCLASS_LEVEL_BY_CLASS).length}.`);
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
