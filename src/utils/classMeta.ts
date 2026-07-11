/**
 * Metadata de clases en español, orientada a principiantes.
 * El importador combina esto con los datos del SRD (hit_die, saving_throws, spellcasting).
 * `color` se usa en la app para pintar el card de la clase.
 */
export interface ClassMeta {
  color: string;
  description: string;
  primaryAbility: string;
}

export const CLASS_META: Record<string, ClassMeta> = {
  barbarian: {
    color: "#D04444",
    primaryAbility: "Fuerza",
    description:
      "Un guerrero furioso que entra en 'furia' para pegar más fuerte y aguantar más golpes. Simple y letal cuerpo a cuerpo.",
  },
  bard: {
    color: "#C54BCF",
    primaryAbility: "Carisma",
    description:
      "Un artista mágico que inspira a sus aliados, lanza hechizos variados y siempre tiene labia. Muy versátil.",
  },
  cleric: {
    color: "#E0A92C",
    primaryAbility: "Sabiduría",
    description:
      "Sacerdote con poder divino: cura a los aliados y también reparte daño. Un gran apoyo para el grupo.",
  },
  druid: {
    color: "#4CA65A",
    primaryAbility: "Sabiduría",
    description:
      "Guardián de la naturaleza que lanza hechizos y puede transformarse en animales. Flexible y divertido.",
  },
  fighter: {
    color: "#8892A6",
    primaryAbility: "Fuerza o Destreza",
    description:
      "El combatiente por excelencia: maneja todas las armas y armaduras. La clase más fácil para arrancar.",
  },
  monk: {
    color: "#2EB398",
    primaryAbility: "Destreza y Sabiduría",
    description:
      "Artista marcial veloz que pega varias veces por turno con puños y patadas. Ágil y evasivo.",
  },
  paladin: {
    color: "#E8C25A",
    primaryAbility: "Fuerza y Carisma",
    description:
      "Guerrero sagrado que jura un juramento, cura, protege y castiga al mal con daño extra. Tanque con estilo.",
  },
  ranger: {
    color: "#3E8E4E",
    primaryAbility: "Destreza y Sabiduría",
    description:
      "Cazador experto con arco y algo de magia natural. Bueno rastreando y peleando a distancia.",
  },
  rogue: {
    color: "#6B7280",
    primaryAbility: "Destreza",
    description:
      "Pícaro sigiloso que hace daño masivo con 'ataque furtivo', desactiva trampas y roba. Astuto y escurridizo.",
  },
  sorcerer: {
    color: "#D12E6A",
    primaryAbility: "Carisma",
    description:
      "Mago innato: la magia le corre por la sangre. Lanza hechizos potentes y puede modificarlos con Metamagia.",
  },
  warlock: {
    color: "#7A3FB0",
    primaryAbility: "Carisma",
    description:
      "Hizo un pacto con un ente poderoso. Pocos hechizos pero muy fuertes, que recupera al descansar poco.",
  },
  wizard: {
    color: "#3B6FD1",
    primaryAbility: "Inteligencia",
    description:
      "El erudito de la magia: aprende hechizos de un libro y tiene el arsenal mágico más grande de todos.",
  },
};
