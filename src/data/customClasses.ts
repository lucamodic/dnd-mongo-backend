import { IClassLevel } from "../db/models/Class";

/**
 * Clases que NO están en el SRD 2014 (Artificiero viene de Tasha's Cauldron of Everything /
 * Eberron), cargadas a mano en español. Mismo enfoque que `customRaces.ts`/`customSpells.ts`:
 * el script `apply:custom-classes` les hace upsert por `index` y linkea sus hechizos ya
 * existentes en Mongo vía `ClassSpell` (sin re-importar esos hechizos).
 */
export interface CustomClass {
  index: string;
  name: string;
  color: string;
  image: string;
  hitDie: number;
  primaryAbility: string;
  savingThrows: string[];
  spellcasting: boolean;
  spellcastingAbility: string;
  description: string;
  subclassLevel: number;
  skillChoiceCount: number;
  skillOptions: string[];
  abilityPriority: string[];
  progression: IClassLevel[];
}

const INFUSE_ITEM_DESCRIPTION =
  "Al terminar un descanso largo, podés imbuir objetos no mágicos con una de las infusiones que " +
  "conocés, convirtiéndolos en objetos mágicos permanentes (hasta que decidas retirar la infusión, " +
  "lo que también hacés al terminar un descanso largo). Conocés más infusiones a medida que subís de " +
  "nivel, y podés tener imbuidos a la vez como máximo la cantidad de \"Objetos Imbuidos\" de tu nivel. " +
  "Ningún objeto puede tener más de una infusión, y si intentás pasarte del máximo, la infusión más " +
  "vieja termina. Catálogo de infusiones:\n\n" +
  "• Armadura de Fuerza Mágica: 6 cargas para sumar Fuerza en una prueba o evitar caer derribado, una carga por uso.\n" +
  "• Armadura de Herramientas: integra un juego de herramientas de artesano dentro de tu armadura.\n" +
  "• Enfoque Arcano Mejorado: +1 a tus ataques con hechizo (+2 desde nivel 10).\n" +
  "• Defensa Mejorada: +1 a la CA del objeto imbuido (+2 desde nivel 10).\n" +
  "• Arma Mejorada: +1 a ataque y daño con el arma imbuida (+2 desde nivel 10).\n" +
  "• Sirviente Homúnculo: creás una criatura Diminuta leal, con sus propias estadísticas, que te obedece.\n" +
  "• Afilamente Mental: un objeto con 4 cargas que te ayuda a mantener la concentración en un hechizo.\n" +
  "• Arma que Regresa: un arma arrojadiza que vuelve sola a tu mano después de lanzarla.\n" +
  "• Munición Repetida: un arma a distancia que genera su propia munición mágica.\n" +
  "• Réplica de Objeto Mágico: recreás objetos mágicos concretos (comunes desde nivel 2, poco comunes desde nivel 6, raros desde nivel 10 o 14 según el objeto).\n" +
  "• Botas del Sendero Serpenteante (nivel 6): te teletransportás hasta 4,5 m como acción adicional.\n" +
  "• Arma Radiante (nivel 6): arma con bono, luz propia y reacción para cegar a quien te ataque.\n" +
  "• Escudo de Repulsión (nivel 6): empuja a las criaturas que te ataquen cuerpo a cuerpo.\n" +
  "• Armadura Resistente (nivel 6): te da resistencia a un tipo de daño que elijas.\n" +
  "• Yelmo de Alerta (nivel 10): ventaja en iniciativa y no podés ser sorprendido.\n" +
  "• Anillo Reabastecedor (nivel 6): recupera un espacio de conjuro (hasta nivel 3) una vez por día.\n" +
  "• Armadura de Propulsión Arcana (nivel 14): velocidad extra y guanteletes que hacen daño de fuerza.";

const level = (
  lvl: number,
  features: { name: string; description: string; active: boolean }[],
  cantripsKnown: number,
  spellSlots: number[],
  resources: { key: string; label: string; value: number; trackable: boolean; description: string }[] = []
): IClassLevel => ({
  level: lvl,
  features,
  spellSlots,
  cantripsKnown,
  spellsKnown: 0, // el Artificiero es lanzador "de preparados" (Inteligencia + mitad de nivel)
  resources,
});

const infusionResources = (known: number, items: number) => [
  {
    key: "infusions-known",
    label: "Infusiones Conocidas",
    value: known,
    trackable: false,
    description: "Cuántas infusiones distintas conocés. No se gastan: son recetas que sabés hacer.",
  },
  {
    key: "infused-items",
    label: "Objetos Imbuidos",
    value: items,
    trackable: false,
    description: "Máximo de objetos con una infusión activa al mismo tiempo.",
  },
];

const SLOTS_2 = [2, 0, 0, 0, 0, 0, 0, 0, 0];
const SLOTS_3 = [3, 0, 0, 0, 0, 0, 0, 0, 0];
const SLOTS_4_2 = [4, 2, 0, 0, 0, 0, 0, 0, 0];
const SLOTS_4_3 = [4, 3, 0, 0, 0, 0, 0, 0, 0];
const SLOTS_4_3_2 = [4, 3, 2, 0, 0, 0, 0, 0, 0];
const SLOTS_4_3_3 = [4, 3, 3, 0, 0, 0, 0, 0, 0];
const SLOTS_4_3_3_1 = [4, 3, 3, 1, 0, 0, 0, 0, 0];
const SLOTS_4_3_3_2 = [4, 3, 3, 2, 0, 0, 0, 0, 0];
const SLOTS_4_3_3_3_1 = [4, 3, 3, 3, 1, 0, 0, 0, 0];
const SLOTS_4_3_3_3_2 = [4, 3, 3, 3, 2, 0, 0, 0, 0];

const ARTIFICER_PROGRESSION: IClassLevel[] = [
  level(
    1,
    [
      {
        name: "Reparación Mágica",
        description:
          "Con herramientas de ladrón o de artesano en mano, tocás un objeto Diminuto no mágico y le das una " +
          "propiedad mágica a elección: luz tenue, un mensaje grabado audible, un sonido u olor repetido, o " +
          "una imagen o texto estático breve. Podés tener afectados a la vez tantos objetos como tu modificador " +
          "de Inteligencia (mínimo 1); si te pasás, la propiedad más vieja termina.",
        active: true,
      },
      {
        name: "Lanzamiento de Conjuros",
        description:
          "Preparás Inteligencia + mitad de tu nivel de artificiero (redondeado abajo, mínimo 1) hechizos de la " +
          "lista de artificiero, y necesitás herramientas de ladrón o de artesano en mano como foco para lanzarlos.",
        active: false,
      },
    ],
    2,
    SLOTS_2
  ),
  level(
    2,
    [{ name: "Imbuir Objeto", description: INFUSE_ITEM_DESCRIPTION, active: true }],
    2,
    SLOTS_2,
    infusionResources(4, 2)
  ),
  level(
    3,
    [
      {
        name: "Especialista Artificiero",
        description: "Elegís tu especialidad: Alquimista, Armador, Artillero o Herrero de Batalla.",
        active: false,
      },
      {
        name: "La Herramienta Justa para el Trabajo",
        description:
          "Con herramientas de ladrón o de artesano en mano, creás mágicamente un juego de herramientas de " +
          "artesano en un espacio libre cercano. Tarda 1 hora de trabajo (podés aprovechar un descanso). Las " +
          "herramientas no son mágicas y desaparecen si repetís esta habilidad.",
        active: true,
      },
    ],
    2,
    SLOTS_3,
    infusionResources(4, 2)
  ),
  level(4, [{ name: "Mejora de Característica", description: "Sumás +2 a una característica, o +1 a dos distintas. Máximo 20.", active: false }], 2, SLOTS_3, infusionResources(4, 2)),
  level(5, [], 2, SLOTS_4_2, infusionResources(4, 2)),
  level(
    6,
    [
      {
        name: "Pericia con Herramientas",
        description: "Tu bono de competencia se duplica en cualquier prueba de habilidad para la que uses herramientas competentes.",
        active: false,
      },
    ],
    2,
    SLOTS_4_2,
    infusionResources(6, 3)
  ),
  level(
    7,
    [
      {
        name: "Destello de Genio",
        description:
          "Como reacción, cuando vos u otra criatura a 9 m hacen una prueba de habilidad o salvación, sumás tu " +
          "modificador de Inteligencia a la tirada. Usos = tu modificador de Inteligencia (mínimo 1) por descanso largo.",
        active: true,
      },
    ],
    2,
    SLOTS_4_3,
    infusionResources(6, 3)
  ),
  level(8, [{ name: "Mejora de Característica", description: "Sumás +2 a una característica, o +1 a dos distintas. Máximo 20.", active: false }], 2, SLOTS_4_3, infusionResources(6, 3)),
  level(9, [], 2, SLOTS_4_3_2, infusionResources(6, 3)),
  level(
    10,
    [
      {
        name: "Adepto de Objetos Mágicos",
        description:
          "Podés sintonizarte con hasta 4 objetos mágicos a la vez. Además, fabricar o comprar objetos mágicos " +
          "comunes o poco comunes te cuesta la mitad y tarda un cuarto del tiempo normal.",
        active: false,
      },
    ],
    3,
    SLOTS_4_3_2,
    infusionResources(8, 4)
  ),
  level(
    11,
    [
      {
        name: "Objeto Almacenahechizos",
        description:
          "Al terminar un descanso largo, tocás un arma simple o marcial, o un objeto que uses como foco, y " +
          "guardás ahí un hechizo de nivel 1 o 2 de la lista de artificiero que necesite 1 acción para lanzarse " +
          "(no hace falta tenerlo preparado). Cualquiera que sostenga el objeto puede usar una acción para " +
          "activarlo con tu modificador de lanzamiento. Usos = 2 × tu modificador de Inteligencia (mínimo 2).",
        active: true,
      },
    ],
    3,
    SLOTS_4_3_3,
    infusionResources(8, 4)
  ),
  level(12, [{ name: "Mejora de Característica", description: "Sumás +2 a una característica, o +1 a dos distintas. Máximo 20.", active: false }], 3, SLOTS_4_3_3, infusionResources(8, 4)),
  level(13, [], 3, SLOTS_4_3_3_1, infusionResources(8, 4)),
  level(
    14,
    [
      {
        name: "Sabio de Objetos Mágicos",
        description: "Podés sintonizarte con hasta 5 objetos mágicos a la vez, e ignorás todos los requisitos de clase, raza, nivel o hechizo para sintonizarte o usar un objeto mágico.",
        active: false,
      },
    ],
    4,
    SLOTS_4_3_3_1,
    infusionResources(10, 5)
  ),
  level(15, [], 4, SLOTS_4_3_3_2, infusionResources(10, 5)),
  level(16, [{ name: "Mejora de Característica", description: "Sumás +2 a una característica, o +1 a dos distintas. Máximo 20.", active: false }], 4, SLOTS_4_3_3_2, infusionResources(10, 5)),
  level(17, [], 4, SLOTS_4_3_3_3_1, infusionResources(10, 5)),
  level(
    18,
    [{ name: "Maestro de Objetos Mágicos", description: "Podés sintonizarte con hasta 6 objetos mágicos a la vez.", active: false }],
    4,
    SLOTS_4_3_3_3_1,
    infusionResources(12, 6)
  ),
  level(19, [{ name: "Mejora de Característica", description: "Sumás +2 a una característica, o +1 a dos distintas. Máximo 20.", active: false }], 4, SLOTS_4_3_3_3_2, infusionResources(12, 6)),
  level(
    20,
    [
      {
        name: "Alma del Artificio",
        description:
          "Ganás +1 a todas tus salvaciones por cada objeto mágico al que estés sintonizado. Además, una vez " +
          "por día, si un golpe te dejaría a 0 puntos de golpe sin matarte de inmediato, podés usar tu reacción " +
          "para apagar una de tus infusiones y quedarte en 1 punto de golpe en vez de caer a 0.",
        active: true,
      },
    ],
    4,
    SLOTS_4_3_3_3_2,
    infusionResources(12, 6)
  ),
];

export const CUSTOM_CLASSES: CustomClass[] = [
  {
    index: "artificer",
    name: "Artificiero",
    color: "#B87333",
    image: "",
    hitDie: 8,
    primaryAbility: "Inteligencia",
    savingThrows: ["con", "int"],
    spellcasting: true,
    spellcastingAbility: "int",
    description:
      "El inventor mágico: combina hechizos con objetos, crea infusiones permanentes, y según su especialidad " +
      "arma un compañero de acero, un cañón místico o una armadura viva. La clase más 'de manitas' del juego.",
    subclassLevel: 3,
    skillChoiceCount: 2,
    skillOptions: ["arcana", "history", "investigation", "medicine", "nature", "perception", "sleight-of-hand"],
    abilityPriority: ["int", "con", "dex", "wis", "cha", "str"],
    progression: ARTIFICER_PROGRESSION,
  },
];

/**
 * Índices de hechizos que ya existían en Mongo (SRD estándar u otras clases custom) y que
 * también pertenecen a la lista de Artificiero: solo hay que linkearlos (ClassSpell), sin
 * tocar el documento `Spell`.
 */
export const ARTIFICER_CORE_SPELL_INDEXES = [
  // trucos
  "acid-splash", "dancing-lights", "fire-bolt", "guidance", "light", "mage-hand", "mending", "message",
  "poison-spray", "prestidigitation", "ray-of-frost", "resistance", "shocking-grasp", "spare-the-dying",
  // nivel 1
  "alarm", "cure-wounds", "detect-magic", "disguise-self", "expeditious-retreat", "faerie-fire",
  "false-life", "feather-fall", "grease", "identify", "jump", "longstrider", "purify-food-and-drink", "sanctuary",
  // nivel 2
  "aid", "alter-self", "arcane-lock", "blur", "continual-flame", "darkvision", "enhance-ability",
  "enlarge-reduce", "heat-metal", "invisibility", "lesser-restoration", "levitate", "magic-mouth",
  "magic-weapon", "protection-from-poison", "rope-trick", "see-invisibility", "spider-climb", "web",
  // nivel 3
  "blink", "create-food-and-water", "dispel-magic", "fly", "glyph-of-warding", "haste",
  "protection-from-energy", "revivify", "water-breathing", "water-walk",
  // nivel 4
  "arcane-eye", "fabricate", "freedom-of-movement", "stone-shape", "stoneskin",
  // nivel 5
  "animate-objects", "creation", "greater-restoration", "wall-of-stone",
];
