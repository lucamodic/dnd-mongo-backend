/**
 * Descripciones simples (español, para principiantes) de los rasgos raciales del SRD,
 * indexadas por el `index` del trait que devuelve la API. El importer de razas las usa
 * para reemplazar el texto original en inglés.
 *
 * `languages`: idiomas por raza (la API los da como índices).
 */
export interface TraitDef {
  name: string;
  description: string;
}

export const RACE_TRAIT_ES: Record<string, TraitDef> = {
  darkvision: {
    name: "Visión en la Oscuridad",
    description: "Ves en la penumbra hasta 18 m como si fuera luz tenue, y en la oscuridad total como si fuera penumbra (en blanco y negro).",
  },
  // Dragonborn
  "draconic-ancestry": {
    name: "Ascendencia Dracónica",
    description: "Descendés de un tipo de dragón, y eso define el tipo de daño de tu aliento (fuego, frío, veneno, etc.).",
  },
  "breath-weapon": {
    name: "Arma de Aliento",
    description: "Podés exhalar energía elemental (según tu dragón) que daña a los enemigos en línea o cono. Se recupera al descansar.",
  },
  "damage-resistance": {
    name: "Resistencia al Daño",
    description: "Recibís la mitad de daño del tipo elemental de tu ascendencia dracónica.",
  },
  // Dwarf
  "dwarven-resilience": {
    name: "Resistencia Enana",
    description: "Tirás con ventaja para resistir venenos y recibís la mitad de daño por veneno. Los enanos aguantan de todo.",
  },
  stonecunning: {
    name: "Conocimiento de la Piedra",
    description: "Sos un experto en trabajos de piedra: te va mucho mejor cuando investigás o recordás algo relacionado con roca y construcciones.",
  },
  "dwarven-combat-training": {
    name: "Entrenamiento de Combate Enano",
    description: "Sabés pelear con hachas y martillos (de guerra y de mano) aunque tu clase no te lo enseñe.",
  },
  "tool-proficiency": {
    name: "Competencia con Herramientas",
    description: "Sabés usar bien un tipo de herramienta de artesano (herrero, cervecero o albañil).",
  },
  // Elf
  "fey-ancestry": {
    name: "Linaje Feérico",
    description: "Tirás con ventaja para resistir que te encanten, y la magia no puede dormirte.",
  },
  trance: {
    name: "Trance",
    description: "No dormís de verdad: meditás 4 horas y descansás igual que otros en 8. Difícil de agarrar desprevenido.",
  },
  "keen-senses": {
    name: "Sentidos Agudos",
    description: "Sos competente en Percepción: notás cosas que a otros se les escapan.",
  },
  // Gnome
  "gnome-cunning": {
    name: "Astucia Gnoma",
    description: "Tirás con ventaja para resistir casi toda la magia que ataque tu mente (Inteligencia, Sabiduría y Carisma).",
  },
  // Half-elf
  "skill-versatility": {
    name: "Versatilidad en Habilidades",
    description: "Elegís dos competencias más en habilidades a tu gusto. Los semielfos aprenden un poco de todo.",
  },
  // Half-orc
  "savage-attacks": {
    name: "Ataques Salvajes",
    description: "Cuando hacés un golpe crítico cuerpo a cuerpo, tirás un dado de daño extra. Pegás brutal.",
  },
  "relentless-endurance": {
    name: "Resistencia Implacable",
    description: "Cuando un golpe te dejaría en 0 de vida, en cambio quedás con 1. Una vez por descanso. ¡No te caés fácil!",
  },
  menacing: {
    name: "Amenazante",
    description: "Sos competente en Intimidación: das miedo cuando querés.",
  },
  // Halfling
  brave: {
    name: "Valiente",
    description: "Tirás con ventaja para resistir el miedo. Los medianos son chiquitos pero valientes.",
  },
  "halfling-nimbleness": {
    name: "Agilidad Mediana",
    description: "Podés pasar a través del espacio de criaturas más grandes que vos. Sos escurridizo.",
  },
  lucky: {
    name: "Suerte",
    description: "Cuando sacás un 1 en un d20 (ataque, prueba o salvación), podés repetir el dado y usar el nuevo resultado.",
  },
  // Tiefling
  "hellish-resistance": {
    name: "Resistencia Infernal",
    description: "Recibís la mitad de daño por fuego. La sangre infernal te protege de las llamas.",
  },
  "infernal-legacy": {
    name: "Legado Infernal",
    description: "Conocés el truco Taumaturgia, y a niveles altos podés lanzar Reproche Infernal y Oscuridad con tu magia innata.",
  },
};

export const RACE_LANGUAGES_ES: Record<string, string> = {
  common: "Común",
  dwarvish: "Enano",
  elvish: "Élfico",
  gnomish: "Gnomo",
  orc: "Orco",
  halfling: "Mediano",
  infernal: "Infernal",
  draconic: "Dracónico",
};
