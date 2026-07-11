import { Race } from "../../db/models/Race";
import { dndGet } from "../../utils/dndApi";
import { RACE_META } from "../../utils/raceMeta";
import { RACE_TRAIT_ES, RACE_LANGUAGES_ES } from "../../data/raceTraits";
import { HttpError } from "../../utils/response";

export class RaceService {
  static list() {
    return Race.find().sort({ name: 1 });
  }

  static async show(id: string) {
    const race = await Race.findById(id);
    if (!race) throw new HttpError(404, "Raza no encontrada");
    return race;
  }

  /** Trae las razas del SRD y las combina con nuestra metadata en español. */
  static async importAll() {
    const list = await dndGet<{ results: { index: string; url: string }[] }>("/races");
    let imported = 0;

    for (const r of list.results) {
      try {
        const full = await dndGet<any>(r.url);
        const meta = RACE_META[full.index] || { description: "", image: "" };

        const traits = (full.traits || []).map((t: any) => {
          const es = RACE_TRAIT_ES[t.index];
          return { name: es?.name || t.name, description: es?.description || "" };
        });

        const languages = (full.languages || [])
          .map((l: any) => RACE_LANGUAGES_ES[l.index] || l.name)
          .join(", ");

        const data = {
          index: full.index,
          name: full.name,
          description: meta.description || full.size_description || "",
          image: meta.image || "",
          size: full.size || "Medium",
          speed: full.speed || 30,
          abilityBonuses: (full.ability_bonuses || []).map((b: any) => ({
            ability: b.ability_score?.index,
            bonus: b.bonus,
          })),
          traits,
          languages,
        };

        await Race.updateOne({ index: data.index }, { $set: data }, { upsert: true });
        imported++;
      } catch (e) {
        console.log("Error importando raza:", r.index);
      }
    }

    return { imported };
  }
}
