import { Types } from "mongoose";
import { Weapon, WeaponCategory } from "../../db/models/Weapon";
import { Character } from "../../db/models/Character";
import { WEAPONS } from "../../data/weapons";
import { HttpError } from "../../utils/response";
import { TokenPayload } from "../../utils/jwt";

const CATEGORIES: WeaponCategory[] = ["simple-melee", "simple-ranged", "martial-melee", "martial-ranged"];

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export class WeaponService {
  static async importBase() {
    let imported = 0;
    for (const weapon of WEAPONS) {
      await Weapon.updateOne(
        { index: weapon.index },
        { $set: { ...weapon, custom: false } },
        { upsert: true }
      );
      imported++;
    }
    return { imported };
  }

  static async list() {
    if ((await Weapon.estimatedDocumentCount()) === 0) await this.importBase();
    return Weapon.find().sort({ custom: 1, category: 1, name: 1 });
  }

  static async create(user: TokenPayload, body: Record<string, unknown>) {
    const name = String(body.name || "").trim();
    const category = String(body.category || "") as WeaponCategory;
    const damageDice = String(body.damageDice || "").trim();
    const damageType = String(body.damageType || "").trim();
    const description = String(body.description || "").trim();
    const properties = Array.isArray(body.properties)
      ? body.properties.map((p) => String(p).trim()).filter(Boolean)
      : String(body.properties || "")
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);

    if (!name) throw new HttpError(400, "El arma necesita nombre");
    if (!CATEGORIES.includes(category)) throw new HttpError(400, "Categoría inválida");

    const base = slugify(name) || "arma";
    let index = `custom-${base}`;
    let i = 2;
    while (await Weapon.exists({ index })) index = `custom-${base}-${i++}`;

    return Weapon.create({
      index,
      name,
      category,
      damageDice,
      damageType,
      properties,
      description,
      custom: true,
      createdBy: new Types.ObjectId(user.id),
    });
  }

  static async assign(user: TokenPayload, characterId: string, weaponIndex: string) {
    const weapon = await Weapon.findOne({ index: weaponIndex });
    if (!weapon) throw new HttpError(404, "Arma no encontrada");

    const character = await Character.findById(characterId);
    if (!character) throw new HttpError(404, "Personaje no encontrado");

    const weapons = Array.from(new Set([...(character.weapons || []), weapon.index]));
    character.weapons = weapons;
    character.weapon = weapon.index;
    await character.save();
    return character;
  }
}
