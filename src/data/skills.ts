import { ABILITY_ES } from "../utils/dndTranslate";

/** Las 18 competencias (skills) de D&D 5e con su característica asociada y nombre en español. */
export interface SkillDef {
  index: string;
  label: string;
  ability: keyof typeof ABILITY_ES; // "str" | "dex" | ...
}

export const SKILLS: SkillDef[] = [
  { index: "acrobatics", label: "Acrobacias", ability: "dex" },
  { index: "animal-handling", label: "Trato con Animales", ability: "wis" },
  { index: "arcana", label: "Arcanos", ability: "int" },
  { index: "athletics", label: "Atletismo", ability: "str" },
  { index: "deception", label: "Engaño", ability: "cha" },
  { index: "history", label: "Historia", ability: "int" },
  { index: "insight", label: "Perspicacia", ability: "wis" },
  { index: "intimidation", label: "Intimidación", ability: "cha" },
  { index: "investigation", label: "Investigación", ability: "int" },
  { index: "medicine", label: "Medicina", ability: "wis" },
  { index: "nature", label: "Naturaleza", ability: "int" },
  { index: "perception", label: "Percepción", ability: "wis" },
  { index: "performance", label: "Interpretación", ability: "cha" },
  { index: "persuasion", label: "Persuasión", ability: "cha" },
  { index: "religion", label: "Religión", ability: "int" },
  { index: "sleight-of-hand", label: "Juego de Manos", ability: "dex" },
  { index: "stealth", label: "Sigilo", ability: "dex" },
  { index: "survival", label: "Supervivencia", ability: "wis" },
];

export const SKILL_BY_INDEX: Record<string, SkillDef> = Object.fromEntries(SKILLS.map((s) => [s.index, s]));
