/**
 * Descripciones simples (español, para principiantes) de los rasgos raciales del SRD,
 * indexadas por el `index` del trait que devuelve la API. El importer de razas las usa
 * para reemplazar el texto original en inglés.
 *
 * `active`: true = es un poder que usás activamente (tiene acción o usos limitados por
 * descanso, como el Aliento del dragonborn); false = es un rasgo de fondo/pasivo (resistencias,
 * competencias, sentidos) que no requiere que hagas nada. La app muestra los `active` en la
 * sección principal y el resto en "Información avanzada".
 *
 * `languages`: idiomas por raza (la API los da como índices).
 */
export interface TraitDef {
  name: string;
  description: string;
  active: boolean;
}

export const RACE_TRAIT_ES: Record<string, TraitDef> = {
  darkvision: {
    name: "Visión en la Oscuridad",
    description: "Ves en la penumbra hasta 18 m como si fuera luz tenue, y en la oscuridad total como si fuera penumbra (en blanco y negro).",
    active: false,
  },
  // Dragonborn
  "draconic-ancestry": {
    name: "Ascendencia Dracónica",
    description: "Descendés de un tipo de dragón, y eso define el tipo de daño de tu aliento (fuego, frío, veneno, etc.).",
    active: false,
  },
  "breath-weapon": {
    name: "Arma de Aliento",
    description: "Podés exhalar energía elemental (según tu dragón) que daña a los enemigos en línea o cono. Se recupera al descansar.",
    active: true,
  },
  "damage-resistance": {
    name: "Resistencia al Daño",
    description: "Recibís la mitad de daño del tipo elemental de tu ascendencia dracónica.",
    active: false,
  },
  // Dwarf
  "dwarven-resilience": {
    name: "Resistencia Enana",
    description: "Tirás con ventaja para resistir venenos y recibís la mitad de daño por veneno. Los enanos aguantan de todo.",
    active: false,
  },
  stonecunning: {
    name: "Conocimiento de la Piedra",
    description: "Sos un experto en trabajos de piedra: te va mucho mejor cuando investigás o recordás algo relacionado con roca y construcciones.",
    active: false,
  },
  "dwarven-combat-training": {
    name: "Entrenamiento de Combate Enano",
    description: "Sabés pelear con hachas y martillos (de guerra y de mano) aunque tu clase no te lo enseñe.",
    active: false,
  },
  "tool-proficiency": {
    name: "Competencia con Herramientas",
    description: "Sabés usar bien un tipo de herramienta de artesano (herrero, cervecero o albañil).",
    active: false,
  },
  // Elf
  "fey-ancestry": {
    name: "Linaje Feérico",
    description: "Tirás con ventaja para resistir que te encanten, y la magia no puede dormirte.",
    active: false,
  },
  trance: {
    name: "Trance",
    description: "No dormís de verdad: meditás 4 horas y descansás igual que otros en 8. Difícil de agarrar desprevenido.",
    active: false,
  },
  "keen-senses": {
    name: "Sentidos Agudos",
    description: "Sos competente en Percepción: notás cosas que a otros se les escapan.",
    active: false,
  },
  // Gnome
  "gnome-cunning": {
    name: "Astucia Gnoma",
    description: "Tirás con ventaja para resistir casi toda la magia que ataque tu mente (Inteligencia, Sabiduría y Carisma).",
    active: false,
  },
  // Half-elf
  "skill-versatility": {
    name: "Versatilidad en Habilidades",
    description: "Elegís dos competencias más en habilidades a tu gusto. Los semielfos aprenden un poco de todo.",
    active: false,
  },
  // Half-orc
  "savage-attacks": {
    name: "Ataques Salvajes",
    description: "Cuando hacés un golpe crítico cuerpo a cuerpo, tirás un dado de daño extra. Pegás brutal.",
    active: false,
  },
  "relentless-endurance": {
    name: "Resistencia Implacable",
    description: "Cuando un golpe te dejaría en 0 de vida, en cambio quedás con 1. Una vez por descanso. ¡No te caés fácil!",
    active: true,
  },
  menacing: {
    name: "Amenazante",
    description: "Sos competente en Intimidación: das miedo cuando querés.",
    active: false,
  },
  // Halfling
  brave: {
    name: "Valiente",
    description: "Tirás con ventaja para resistir el miedo. Los medianos son chiquitos pero valientes.",
    active: false,
  },
  "halfling-nimbleness": {
    name: "Agilidad Mediana",
    description: "Podés pasar a través del espacio de criaturas más grandes que vos. Sos escurridizo.",
    active: false,
  },
  lucky: {
    name: "Suerte",
    description: "Cuando sacás un 1 en un d20 (ataque, prueba o salvación), podés repetir el dado y usar el nuevo resultado.",
    active: true,
  },
  // Tiefling
  "hellish-resistance": {
    name: "Resistencia Infernal",
    description: "Recibís la mitad de daño por fuego. La sangre infernal te protege de las llamas.",
    active: false,
  },
  "infernal-legacy": {
    name: "Legado Infernal",
    description: "Conocés el truco Taumaturgia, y a niveles altos podés lanzar Reproche Infernal y Oscuridad con tu magia innata.",
    active: true,
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
