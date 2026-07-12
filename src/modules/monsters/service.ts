import { Monster } from "../../db/models/Monster";
import { dndGet, DND_API_BASE } from "../../utils/dndApi";
import { HttpError } from "../../utils/response";
import { monsterNameES } from "../../data/monsterNamesES";

export class MonsterService {
  static list(search?: string) {
    const filter = search
      ? { $or: [{ name: { $regex: search, $options: "i" } }, { index: { $regex: search, $options: "i" } }] }
      : {};
    return Monster.find(filter).sort({ challengeRating: 1, name: 1 }).limit(300);
  }

  static async show(id: string) {
    const monster = await Monster.findById(id);
    if (!monster) throw new HttpError(404, "Monstruo no encontrado");
    return monster;
  }

  /** Importa el bestiario SRD (solo los campos que necesita el tracker). */
  static async importAll() {
    const list = await dndGet<{ results: { index: string; url: string }[] }>("/monsters");
    let imported = 0;

    for (const m of list.results) {
      try {
        const mon = await dndGet<any>(m.url);
        const data = {
          index: mon.index,
          name: monsterNameES(mon.index, mon.name),
          size: mon.size || "",
          type: mon.type || "",
          hp: mon.hit_points || 1,
          hitDice: mon.hit_dice || "",
          ac: Array.isArray(mon.armor_class) ? mon.armor_class[0]?.value ?? 10 : mon.armor_class ?? 10,
          challengeRating: mon.challenge_rating ?? 0,
          xp: mon.xp || 0,
          image: mon.image ? `${DND_API_BASE}${mon.image}` : "",
        };
        await Monster.updateOne({ index: data.index }, { $set: data }, { upsert: true });
        imported++;
      } catch (e) {
        console.log("Error importando monstruo:", m.index);
      }
    }

    return { imported };
  }
}
