/** Utilidades de reglas de D&D 5e usadas al crear/subir de nivel personajes. */

/** Modificador de característica: (valor - 10) / 2 redondeado hacia abajo. */
export const abilityMod = (score: number): number => Math.floor((score - 10) / 2);

/** Bono de competencia por nivel (1-20). */
export const proficiencyBonus = (level: number): number => 2 + Math.floor((Math.max(1, level) - 1) / 4);

/** Tira un dado de N caras. */
export const rollDie = (sides: number): number => Math.floor(Math.random() * sides) + 1;
