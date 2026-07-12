/** Utilidades de reglas de D&D 5e usadas al crear/subir de nivel personajes. */
import { IAbilityScores } from "../db/models/Character";
import { ARMOR_BY_INDEX } from "../data/armors";

/** Modificador de característica: (valor - 10) / 2 redondeado hacia abajo. */
export const abilityMod = (score: number): number => Math.floor((score - 10) / 2);

/** Bono de competencia por nivel (1-20). */
export const proficiencyBonus = (level: number): number => 2 + Math.floor((Math.max(1, level) - 1) / 4);

/** Tira un dado de N caras. */
export const rollDie = (sides: number): number => Math.floor(Math.random() * sides) + 1;

/** Tira 4d6 y descarta el más bajo (3-18). */
export const roll4d6DropLowest = (): number => {
  const dice = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)].sort((a, b) => b - a);
  return dice[0] + dice[1] + dice[2];
};

/**
 * Genera 6 tiradas (4d6 drop lowest), las reparte según el orden de prioridad de la clase
 * (la mejor a la primera característica, etc.) y garantiza que las 2 principales queden ≥14.
 * NO incluye bonos de raza (esos se aplican después, en el create).
 */
export const rollAbilityScores = (priority: string[]): IAbilityScores => {
  const rolls = Array.from({ length: 6 }, roll4d6DropLowest).sort((a, b) => b - a);
  const scores: any = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
  priority.forEach((ability, i) => {
    scores[ability] = rolls[i] ?? 10;
  });
  // Las dos principales de la clase, mínimo 14.
  for (const key of priority.slice(0, 2)) {
    if (scores[key] < 14) scores[key] = 14;
  }
  return scores as IAbilityScores;
};

/**
 * Elige en qué características poner el bono racial flexible (+2/+1) de las razas MPMM,
 * evitando desperdiciar puntos por el tope de 20: preferimos la primera característica de la
 * prioridad de la clase que todavía tenga margen para aprovechar el bono entero (+2 solo si
 * queda en 20 o menos sin recortarse, +1 igual). Comparte la misma lógica con la app
 * (src/lib/format.ts) para poder mostrarla antes de crear el personaje.
 */
export const pickFlexibleRaceBonusTargets = (
  priority: string[],
  scores: IAbilityScores
): { plusTwo: string; plusOne: string } => {
  const list = priority.filter((a, i, arr) => arr.indexOf(a) === i);
  const value = (a: string) => (scores as any)[a] ?? 10;

  const plusTwo = list.find((a) => value(a) <= 18) || list[0] || "str";
  const plusOne =
    list.find((a) => a !== plusTwo && value(a) <= 19) || list.find((a) => a !== plusTwo) || "con";

  return { plusTwo, plusOne };
};

/**
 * Calcula la Clase de Armadura según la armadura equipada, el escudo, el bonus manual y las
 * características. Comparte la misma lógica con la app (src/lib/sheet.ts).
 */
export const computeAc = (opts: {
  armor: string;
  shield: boolean;
  acBonus: number;
  abilityScores: IAbilityScores;
}): number => {
  const armor = ARMOR_BY_INDEX[opts.armor] || ARMOR_BY_INDEX["none"];
  const dexMod = abilityMod(opts.abilityScores.dex);
  const cappedDex = armor.dexCap === null ? dexMod : Math.min(dexMod, armor.dexCap);

  let ac = armor.baseAc + cappedDex;
  if (armor.addAbility) ac += abilityMod(opts.abilityScores[armor.addAbility]);
  if (opts.shield) ac += 2;
  ac += opts.acBonus || 0;
  return ac;
};
