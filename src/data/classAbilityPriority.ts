/**
 * Orden de prioridad de características por clase, para repartir las tiradas al crear un personaje
 * (la mejor tirada va a la primera, etc.). Las DOS primeras son las "principales" de la clase
 * (las que se garantizan ≥14 si todo salió bajo).
 */
export const CLASS_ABILITY_PRIORITY: Record<string, string[]> = {
  barbarian: ["str", "con", "dex", "wis", "cha", "int"],
  bard: ["cha", "dex", "con", "wis", "int", "str"],
  cleric: ["wis", "con", "str", "cha", "dex", "int"],
  druid: ["wis", "con", "dex", "int", "cha", "str"],
  fighter: ["str", "con", "dex", "wis", "cha", "int"],
  monk: ["dex", "wis", "con", "str", "int", "cha"],
  paladin: ["str", "cha", "con", "wis", "dex", "int"],
  ranger: ["dex", "wis", "con", "str", "int", "cha"],
  rogue: ["dex", "con", "int", "cha", "wis", "str"],
  sorcerer: ["cha", "con", "dex", "wis", "int", "str"],
  warlock: ["cha", "con", "dex", "wis", "int", "str"],
  wizard: ["int", "con", "dex", "wis", "cha", "str"],
};

export const DEFAULT_ABILITY_PRIORITY = ["con", "dex", "str", "wis", "int", "cha"];
