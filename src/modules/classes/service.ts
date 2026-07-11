import { Class, IClassLevel, IClassResource } from "../../db/models/Class";
import { dndGet } from "../../utils/dndApi";
import { CLASS_META } from "../../utils/classMeta";
import { resolveFeatureES } from "../../data/classFeatures";
import { CLASS_RESOURCE_META } from "../../data/classResources";
import { CLASS_ABILITY_PRIORITY, DEFAULT_ABILITY_PRIORITY } from "../../data/classAbilityPriority";
import { HttpError } from "../../utils/response";

/** Extrae de proficiency_choices la elección de competencias (skills) de la clase. */
function parseSkillChoice(cls: any): { count: number; options: string[] } {
  for (const choice of cls.proficiency_choices || []) {
    // Una elección es de skills si sus opciones tienen índices "skill-*".
    const options = (choice.from?.options || [])
      .map((o: any) => o.item?.index)
      .filter((i: string) => i && i.startsWith("skill-"))
      .map((i: string) => i.replace(/^skill-/, ""));
    if (options.length) return { count: choice.choose || 2, options };
  }
  return { count: 2, options: [] };
}

/** Normaliza el objeto class_specific del SRD a una lista de recursos mostrables. */
function parseResources(classSpecific: any): IClassResource[] {
  const resources: IClassResource[] = [];
  if (!classSpecific) return resources;

  for (const [key, raw] of Object.entries(classSpecific)) {
    const meta = CLASS_RESOURCE_META[key];
    if (!meta) continue; // solo mostramos los que tenemos traducidos
    if (typeof raw !== "number") continue; // ignoramos objetos (ej. martial_arts, lo cubre su feature)
    if (!meta.trackable && raw <= 0) continue; // datos informativos en 0 no aportan

    resources.push({
      key,
      label: meta.label,
      value: raw,
      trackable: meta.trackable,
      description: meta.description,
    });
  }
  return resources;
}

/** Arma los espacios de conjuro [nivel1..nivel9] a partir del bloque spellcasting del nivel. */
function parseSpellSlots(sc: any): number[] {
  if (!sc) return [];
  const slots: number[] = [];
  for (let i = 1; i <= 9; i++) slots.push(sc[`spell_slots_level_${i}`] || 0);
  return slots.some((n) => n > 0) ? slots : [];
}

export class ClassService {
  static list() {
    return Class.find().sort({ name: 1 });
  }

  static async show(id: string) {
    const cls = await Class.findById(id);
    if (!cls) throw new HttpError(404, "Clase no encontrada");
    return cls;
  }

  /** Trae las clases del SRD, su progresión por nivel y las combina con metadata en español. */
  static async importAll() {
    const list = await dndGet<{ results: { index: string; url: string }[] }>("/classes");
    let imported = 0;

    for (const c of list.results) {
      try {
        const cls = await dndGet<any>(c.url);
        const meta = CLASS_META[cls.index] || { color: "#775E88", description: "", primaryAbility: "" };
        const skills = parseSkillChoice(cls);

        // Progresión por nivel.
        const levels = await dndGet<any[]>(`/classes/${cls.index}/levels`);
        const progression: IClassLevel[] = levels
          .filter((l) => l.level >= 1 && l.level <= 20 && !l.subclass) // solo niveles de la clase base
          .map((l) => ({
            level: l.level,
            features: (l.features || []).map((f: any) => resolveFeatureES(f.index, f.name)),
            spellSlots: parseSpellSlots(l.spellcasting),
            cantripsKnown: l.spellcasting?.cantrips_known || 0,
            spellsKnown: l.spellcasting?.spells_known || 0,
            resources: parseResources(l.class_specific),
          }));

        const data = {
          index: cls.index,
          name: cls.name,
          color: meta.color,
          image: "",
          hitDie: cls.hit_die || 8,
          primaryAbility: meta.primaryAbility,
          savingThrows: (cls.saving_throws || []).map((s: any) => s.index),
          spellcasting: !!cls.spellcasting,
          spellcastingAbility: cls.spellcasting?.spellcasting_ability?.index || "",
          description: meta.description,
          skillChoiceCount: skills.count,
          skillOptions: skills.options,
          abilityPriority: CLASS_ABILITY_PRIORITY[cls.index] || DEFAULT_ABILITY_PRIORITY,
          progression,
        };

        await Class.updateOne({ index: data.index }, { $set: data }, { upsert: true });
        imported++;
      } catch (e) {
        console.log("Error importando clase:", c.index, (e as Error).message);
      }
    }

    return { imported };
  }
}
