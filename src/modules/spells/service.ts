import { Spell } from "../../db/models/Spell";
import { Class } from "../../db/models/Class";
import { ClassSpell } from "../../db/models/ClassSpell";
import { dndGet } from "../../utils/dndApi";
import { HttpError } from "../../utils/response";
import { ABILITY_ES, DAMAGE_TYPE_ES, SCHOOL_ES } from "../../utils/dndTranslate";
import { RECOMMENDED_SPELLS } from "../../data/recommendedSpells";
import { SPELL_NAME_ES } from "../../data/spellNamesES";
import { CUSTOM_SPELLS } from "../../data/customSpells";

export class SpellService {
  static list() {
    return Spell.find().sort({ level: 1, name: 1 });
  }

  static async show(id: string) {
    const spell = await Spell.findById(id);
    if (!spell) throw new HttpError(404, "Hechizo no encontrado");
    return spell;
  }

  /** Hechizos de una clase (via la tabla de unión spells_classes), con el flag `recommended`. */
  static async byClass(classId: string) {
    const links = await ClassSpell.find({ classId }).select("spellId recommended");
    const recommendedIds = new Set(links.filter((l) => l.recommended).map((l) => String(l.spellId)));
    const spellIds = links.map((l) => l.spellId);
    const spells = await Spell.find({ _id: { $in: spellIds } }).sort({ level: 1, name: 1 }).lean();
    return spells.map((s) => ({ ...s, recommended: recommendedIds.has(String(s._id)) }));
  }

  /**
   * Importa todos los hechizos del SRD y crea los links spells_classes.
   * Mismo enfoque que el dnd-backend original pero con Mongoose.
   */
  static async importAll() {
    const list = await dndGet<{ results: { index: string; url: string }[] }>("/spells");
    let imported = 0;
    let links = 0;

    for (const s of list.results) {
      try {
        const sp = await dndGet<any>(s.url);

        const damageTypeKey = sp.damage?.damage_type?.index;
        const savingThrowKey = sp.dc?.dc_type?.index;
        const schoolKey = sp.school?.index;

        const data = {
          index: sp.index,
          name: SPELL_NAME_ES[sp.index] || sp.name,
          level: sp.level ?? 0,
          school: (schoolKey && SCHOOL_ES[schoolKey]) || sp.school?.name || "",
          castingTime: sp.casting_time || "",
          range: sp.range || "",
          duration: sp.duration || "",
          components: sp.components || [],
          concentration: !!sp.concentration,
          ritual: !!sp.ritual,
          description: sp.desc || [],
          higherLevel: sp.higher_level || [],
          damageType: (damageTypeKey && DAMAGE_TYPE_ES[damageTypeKey]) || "",
          savingThrow: (savingThrowKey && ABILITY_ES[savingThrowKey]) || "",
        };

        const spell = await Spell.findOneAndUpdate(
          { index: data.index },
          { $set: data },
          { upsert: true, new: true }
        );
        imported++;

        for (const cl of sp.classes || []) {
          const classRecord = await Class.findOne({ index: cl.index });
          if (!classRecord) continue;
          const link = await ClassSpell.updateOne(
            { classId: classRecord._id, spellId: spell!._id },
            { $setOnInsert: { classId: classRecord._id, spellId: spell!._id } },
            { upsert: true }
          );
          if (link.upsertedCount) links++;
        }
      } catch (e) {
        console.log("Error importando hechizo:", s.index);
      }
    }

    // Hechizos fuera del SRD (Xanathar's), cargados a mano.
    for (const custom of CUSTOM_SPELLS) {
      try {
        const { classes, ...data } = custom;
        const spell = await Spell.findOneAndUpdate(
          { index: data.index },
          { $set: data },
          { upsert: true, new: true }
        );
        imported++;

        for (const classIndex of classes) {
          const classRecord = await Class.findOne({ index: classIndex });
          if (!classRecord) continue;
          const link = await ClassSpell.updateOne(
            { classId: classRecord._id, spellId: spell!._id },
            { $setOnInsert: { classId: classRecord._id, spellId: spell!._id } },
            { upsert: true }
          );
          if (link.upsertedCount) links++;
        }
      } catch (e) {
        console.log("Error importando hechizo custom:", custom.index);
      }
    }

    return { imported, links };
  }

  /**
   * Devuelve el JSON `[{ id, index, name, level, text }]` para pasarle a ChatGPT
   * y que genere los resúmenes simples + dados. (Ver SUMMARIZE_PROMPT.md)
   */
  static async exportForSummary() {
    const spells = await Spell.find().sort({ level: 1, name: 1 });
    return spells.map((s) => ({
      id: String(s._id),
      index: s.index,
      name: s.name,
      level: s.level,
      text: (s.description || []).join("\n"),
    }));
  }

  /**
   * Marca en spells_classes los hechizos "recomendados" (los mejores para principiantes) de cada clase,
   * según src/data/recommendedSpells.ts. Primero limpia los flags y después setea los nuevos.
   * Solo afecta links que ya existan (si un índice no es hechizo de esa clase, se ignora).
   */
  static async applyRecommended() {
    await ClassSpell.updateMany({}, { $set: { recommended: false } });
    let marked = 0;

    for (const [classIndex, spellIndexes] of Object.entries(RECOMMENDED_SPELLS)) {
      const cls = await Class.findOne({ index: classIndex });
      if (!cls) continue;
      const spells = await Spell.find({ index: { $in: spellIndexes } }).select("_id");
      const spellIds = spells.map((s) => s._id);
      const r = await ClassSpell.updateMany(
        { classId: cls._id, spellId: { $in: spellIds } },
        { $set: { recommended: true } }
      );
      marked += r.modifiedCount;
    }

    return { marked };
  }

  /**
   * Recibe el JSON resumido `[{ id, simpleDescription, dice }]` (subido por vos)
   * y actualiza cada hechizo. Acepta `_id` o `index` como identificador.
   */
  static async importSummaries(items: any[]) {
    if (!Array.isArray(items)) throw new HttpError(400, "Se espera un array de hechizos");
    let updated = 0;

    for (const item of items) {
      const id = item.id || item._id;
      const set = {
        simpleDescription: item.simpleDescription ?? item.simple_description ?? "",
        dice: item.dice ?? "",
      };
      const filter = id ? { _id: id } : item.index ? { index: item.index } : null;
      if (!filter) continue;
      const r = await Spell.updateOne(filter, { $set: set });
      if (r.matchedCount) updated++;
    }

    return { updated, received: items.length };
  }
}
