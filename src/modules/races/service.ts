import { Race } from "../../db/models/Race";
import axios from "axios";
import { dndGet } from "../../utils/dndApi";
import { RACE_META } from "../../utils/raceMeta";
import { RACE_TRAIT_ES, RACE_LANGUAGES_ES } from "../../data/raceTraits";
import { CUSTOM_RACES } from "../../data/customRaces";
import { RACE_IMAGES } from "../../data/images";
import { RACE_NAME_ES } from "../../data/raceNamesES";
import { HttpError } from "../../utils/response";

const BROWSER_IMAGE_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  Referer: "https://en.wikipedia.org/",
};

const imageBase64Cache = new Map<string, Promise<string>>();

async function imageUrlToBase64DataUri(url: string) {
  if (!url) return "";
  if (imageBase64Cache.has(url)) return imageBase64Cache.get(url)!;

  const promise = fetchImageUrlAsBase64DataUri(url);
  imageBase64Cache.set(url, promise);
  return promise;
}

async function fetchImageUrlAsBase64DataUri(url: string) {
  try {
    const response = await axios.get<ArrayBuffer>(url, {
      responseType: "arraybuffer",
      timeout: 20000,
      headers: BROWSER_IMAGE_HEADERS,
    });
    const contentType = response.headers["content-type"] || "image/jpeg";
    return `data:${contentType};base64,${Buffer.from(response.data).toString("base64")}`;
  } catch (e: any) {
    console.log("Error convirtiendo imagen de raza a base64:", {
      url,
      status: e.response?.status,
      message: e.message,
    });
    return "";
  }
}

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
          return { name: es?.name || t.name, description: es?.description || "", active: es?.active || false };
        });

        const languages = (full.languages || [])
          .map((l: any) => RACE_LANGUAGES_ES[l.index] || l.name)
          .join(", ");

        const image = RACE_IMAGES[full.index] ?? meta.image ?? "";
        const current = await Race.findOne({ index: full.index }).select("image imageBase64").lean();
        const imageBase64 =
          current?.image === image && current.imageBase64 ? current.imageBase64 : await imageUrlToBase64DataUri(image);
        const data = {
          index: full.index,
          name: RACE_NAME_ES[full.index] || full.name,
          description: meta.description || full.size_description || "",
          image,
          imageBase64: imageBase64 || current?.imageBase64 || "",
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

    // Razas fuera del SRD (Owlin, Eladrin), cargadas a mano.
    for (const custom of CUSTOM_RACES) {
      try {
        const image = RACE_IMAGES[custom.index] ?? "";
        const current = await Race.findOne({ index: custom.index }).select("image imageBase64").lean();
        const imageBase64 =
          current?.image === image && current.imageBase64 ? current.imageBase64 : await imageUrlToBase64DataUri(image);
        await Race.updateOne(
          { index: custom.index },
          { $set: { ...custom, image, imageBase64: imageBase64 || current?.imageBase64 || "" } },
          { upsert: true }
        );
        imported++;
      } catch (e) {
        console.log("Error importando raza custom:", custom.index);
      }
    }

    return { imported };
  }
}
