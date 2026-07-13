import { ISubclassLevel, IBonusSpellGroup } from "../db/models/Subclass";

export interface CustomSubclass {
  index: string;
  classIndex: string;
  name: string;
  description: string;
  subclassLevel: number;
  source?: string;
  spellcasting?: boolean;
  spellcastingAbility?: string;
  spellListClassIndex?: string;
  progression: ISubclassLevel[];
  bonusSpells?: IBonusSpellGroup[];
}

const slots = (n1 = 0, n2 = 0, n3 = 0, n4 = 0, n5 = 0, n6 = 0, n7 = 0, n8 = 0, n9 = 0) => [
  n1,
  n2,
  n3,
  n4,
  n5,
  n6,
  n7,
  n8,
  n9,
];

const BASE_SUBCLASSES: CustomSubclass[] = [
  {
    index: "champion",
    classIndex: "fighter",
    name: "Campeón",
    description:
      "El guerrero directo y letal: pega más fuerte, resiste más y no lleva cuentas. Ideal para quien quiere pelear sin complicarse.",
    subclassLevel: 3,
    source: "PHB",
    progression: [
      {
        level: 3,
        features: [
          {
            name: "Crítico Mejorado",
            description: "Hacés daño crítico con 19 o 20 en el dado, no solo con 20.",
            active: false,
          },
        ],
      },
      {
        level: 7,
        features: [
          {
            name: "Atleta Excepcional",
            description: "Sumás la mitad de tu bono de competencia a varias pruebas físicas y saltás más lejos.",
            active: false,
          },
        ],
      },
      {
        level: 10,
        features: [
          {
            name: "Estilo de Combate Adicional",
            description: "Elegís un segundo estilo de combate.",
            active: false,
          },
        ],
      },
      {
        level: 15,
        features: [
          {
            name: "Crítico Superior",
            description: "Ahora hacés crítico con 18, 19 o 20.",
            active: false,
          },
        ],
      },
      {
        level: 18,
        features: [
          {
            name: "Superviviente",
            description: "Al empezar tu turno recuperás vida si estás por debajo de la mitad.",
            active: true,
          },
        ],
      },
    ],
  },
  {
    index: "life",
    classIndex: "cleric",
    name: "Dominio de la Vida",
    description:
      "El sanador por excelencia: tus curaciones rinden más y protegés al grupo. Simple, fuerte y muy agradecido para empezar.",
    subclassLevel: 1,
    source: "PHB",
    progression: [
      {
        level: 1,
        features: [
          { name: "Competencia con Armadura Pesada", description: "Podés usar armadura pesada sin problemas.", active: false },
          {
            name: "Discípulo de la Vida",
            description: "Cuando curás con un hechizo de nivel 1 o más, sumás vida extra.",
            active: false,
          },
        ],
      },
      {
        level: 2,
        features: [
          {
            name: "Canalizar Divinidad: Preservar la Vida",
            description: "Gastás un uso de Canalizar Divinidad para repartir curación entre aliados cercanos.",
            active: true,
          },
        ],
      },
      {
        level: 6,
        features: [
          { name: "Sanador Bendito", description: "Cuando curás a otro con un hechizo, también te curás un poco.", active: false },
        ],
      },
      {
        level: 8,
        features: [
          { name: "Golpe Divino", description: "Una vez por turno, tus ataques con arma hacen daño radiante extra.", active: true },
        ],
      },
      {
        level: 17,
        features: [
          { name: "Curación Suprema", description: "Cuando curás, usás el máximo de los dados en vez de tirarlos.", active: false },
        ],
      },
    ],
    bonusSpells: [
      { level: 1, spellIndexes: ["bless", "cure-wounds"] },
      { level: 3, spellIndexes: ["lesser-restoration", "spiritual-weapon"] },
      { level: 5, spellIndexes: ["beacon-of-hope", "revivify"] },
      { level: 7, spellIndexes: ["death-ward", "guardian-of-faith"] },
      { level: 9, spellIndexes: ["mass-cure-wounds", "raise-dead"] },
    ],
  },
  {
    index: "eldritch-knight",
    classIndex: "fighter",
    name: "Caballero Arcano",
    description: "El guerrero que mezcla espada y magia de mago. Más versátil, pero con más cosas para elegir.",
    subclassLevel: 3,
    source: "PHB",
    spellcasting: true,
    spellcastingAbility: "int",
    spellListClassIndex: "wizard",
    progression: [
      {
        level: 3,
        features: [{ name: "Vínculo con Arma", description: "Ligás un arma a vos: podés invocarla a tu mano.", active: true }],
        cantripsKnown: 2,
        spellsKnown: 3,
        spellSlots: slots(2),
      },
      { level: 4, features: [], cantripsKnown: 2, spellsKnown: 4, spellSlots: slots(3) },
      { level: 7, features: [{ name: "Golpe de Guerra", description: "Al lanzar un truco, podés atacar con arma como bonus.", active: true }], cantripsKnown: 2, spellsKnown: 5, spellSlots: slots(4, 2) },
      { level: 8, features: [], cantripsKnown: 2, spellsKnown: 6, spellSlots: slots(4, 2) },
      { level: 10, features: [{ name: "Golpe Sobrenatural", description: "Tus ataques hacen más difícil resistir tu próximo conjuro.", active: false }], cantripsKnown: 3, spellsKnown: 7, spellSlots: slots(4, 3) },
      { level: 11, features: [], cantripsKnown: 3, spellsKnown: 8, spellSlots: slots(4, 3) },
      { level: 13, features: [], cantripsKnown: 3, spellsKnown: 9, spellSlots: slots(4, 3, 2) },
      { level: 14, features: [], cantripsKnown: 3, spellsKnown: 10, spellSlots: slots(4, 3, 2) },
      { level: 15, features: [{ name: "Carga Arcana", description: "Cuando usás Acción Súbita, podés teletransportarte un tramo corto.", active: true }], cantripsKnown: 3, spellsKnown: 10, spellSlots: slots(4, 3, 2) },
      { level: 16, features: [], cantripsKnown: 3, spellsKnown: 11, spellSlots: slots(4, 3, 3) },
      { level: 18, features: [{ name: "Golpe de Guerra Mejorado", description: "Al lanzar un conjuro, podés atacar con arma como bonus.", active: true }], cantripsKnown: 3, spellsKnown: 11, spellSlots: slots(4, 3, 3) },
      { level: 19, features: [], cantripsKnown: 3, spellsKnown: 12, spellSlots: slots(4, 3, 3, 1) },
      { level: 20, features: [], cantripsKnown: 3, spellsKnown: 13, spellSlots: slots(4, 3, 3, 1) },
    ],
  },
  {
    index: "evocation",
    classIndex: "wizard",
    name: "Evocación",
    description: "La escuela de los conjuros explosivos y directos. Buena para quien quiere tirar magia ofensiva sin dañar aliados.",
    subclassLevel: 2,
    source: "PHB",
    progression: [
      { level: 2, features: [{ name: "Esculpir Conjuros", description: "Tus conjuros de área pueden evitar a algunos aliados.", active: false }] },
      { level: 6, features: [{ name: "Truco Potente", description: "Tus trucos ofensivos siguen haciendo algo aunque el objetivo resista.", active: false }] },
      { level: 10, features: [{ name: "Evocación Potenciada", description: "Sumás tu Inteligencia al daño de conjuros de evocación.", active: false }] },
      { level: 14, features: [{ name: "Sobrecargar", description: "Podés maximizar el daño de un conjuro de nivel bajo, con riesgo si repetís.", active: true }] },
    ],
  },
  {
    index: "fiend",
    classIndex: "warlock",
    name: "El Demonio",
    description: "Un pacto agresivo y resistente: ganás vida temporal al bajar enemigos y magia de fuego.",
    subclassLevel: 1,
    source: "PHB",
    progression: [
      { level: 1, features: [{ name: "Bendición del Oscuro", description: "Cuando bajás a un enemigo, ganás vida temporal.", active: false }] },
      { level: 6, features: [{ name: "Suerte del Oscuro", description: "Podés sumar 1d10 a una prueba o tirada de salvación.", active: true }] },
      { level: 10, features: [{ name: "Resistencia Demoníaca", description: "Elegís un tipo de daño y ganás resistencia contra él.", active: false }] },
      { level: 14, features: [{ name: "Arrojar al Infierno", description: "Mandás brevemente a una criatura a un plano infernal y vuelve lastimada.", active: true }] },
    ],
    bonusSpells: [
      { level: 1, spellIndexes: ["burning-hands", "command"] },
      { level: 3, spellIndexes: ["blindness-deafness", "scorching-ray"] },
      { level: 5, spellIndexes: ["fireball", "stinking-cloud"] },
      { level: 7, spellIndexes: ["fire-shield", "wall-of-fire"] },
      { level: 9, spellIndexes: ["flame-strike", "hallow"] },
    ],
  },
  {
    index: "alchemist",
    classIndex: "artificer",
    name: "Alquimista",
    description:
      "El artificiero sanador y venenoso: prepara elixires con efectos variados y potencia la curación y el daño de ácido, fuego, necrótico o veneno. Ideal para quien quiere apoyar al grupo sin dejar de sorprender.",
    subclassLevel: 3,
    source: "TCoE",
    progression: [
      {
        level: 3,
        features: [
          {
            name: "Herramientas de Alquimista",
            description: "Ganás competencia con herramientas de alquimista (o, si ya la tenías, con otra herramienta de artesano).",
            active: false,
          },
          {
            name: "Elixir Experimental",
            description:
              "Al terminar un descanso largo, creás gratis un elixir mágico en una botella vacía. Podés crear elixires extra gastando espacios de conjuro (uno por espacio). Al beberlo, tira 1d6 para saber el efecto: 1) Curación (2d4 + tu modificador de Inteligencia de puntos de golpe), 2) Rapidez (+3 m de velocidad por 1 hora), 3) Resiliencia (+1 a la CA por 10 minutos), 4) Audacia (sumás 1d4 a ataques y salvaciones por 1 minuto), 5) Vuelo (velocidad de vuelo de 3 m por 10 minutos), 6) Transformación (como el hechizo Alterarse a Uno Mismo, por 10 minutos). Los elixires no usados pierden su magia 24 horas después de creados.",
            active: true,
          },
        ],
      },
      {
        level: 5,
        features: [
          {
            name: "Sabio Alquímico",
            description:
              "Con herramientas de alquimista como foco, cuando lanzás un hechizo de artificiero que cura puntos de golpe o hace daño ácido, de fuego, necrótico o de veneno, sumás tu modificador de Inteligencia (mínimo +1) a una tirada de esa curación o daño.",
            active: false,
          },
        ],
      },
      {
        level: 9,
        features: [
          {
            name: "Reactivos Restaurativos",
            description:
              "Quien beba uno de tus elixires también gana puntos de golpe temporales iguales a 2d6 + tu modificador de Inteligencia (mínimo 1). Además, podés lanzar Restauración Menor sin gastar un espacio de conjuro, una cantidad de veces igual a tu modificador de Inteligencia (mínimo 1) por descanso largo.",
            active: true,
          },
        ],
      },
      {
        level: 15,
        features: [
          {
            name: "Maestría Química",
            description:
              "Ganás resistencia a daño ácido y de veneno, y sos inmune a la condición envenenado. Además, una vez cada uno (hasta tu próximo descanso largo), podés lanzar Restauración Mayor y Curar sin gastar espacio de conjuro, preparación ni componentes materiales.",
            active: false,
          },
        ],
      },
    ],
    bonusSpells: [
      { level: 3, spellIndexes: ["healing-word", "ray-of-sickness"] },
      { level: 5, spellIndexes: ["flaming-sphere", "melfs-acid-arrow"] },
      { level: 9, spellIndexes: ["gaseous-form", "mass-healing-word"] },
      { level: 13, spellIndexes: ["blight", "death-ward"] },
      { level: 17, spellIndexes: ["cloudkill", "raise-dead"] },
    ],
  },
  {
    index: "armorer",
    classIndex: "artificer",
    name: "Armador",
    description:
      "El artificiero que convierte su propia armadura en un arma mágica viva. Elegís un modelo defensivo (Guardián) o sigiloso y a distancia (Infiltrador). Ideal para quien quiere ser tanque o francotirador sin soltar sus hechizos.",
    subclassLevel: 3,
    source: "TCoE",
    progression: [
      {
        level: 3,
        features: [
          {
            name: "Competencia con Armadura Pesada y Herramientas de Herrero",
            description: "Ganás competencia con armadura pesada y con herramientas de herrero (o, si ya la tenías, con otra herramienta de artesano).",
            active: false,
          },
          {
            name: "Armadura Arcana",
            description:
              "Con herramientas de herrero en mano, convertís una armadura que llevás puesta en tu Armadura Arcana: no tiene requisito de Fuerza, funciona como foco de lanzamiento, se ajusta a tu cuerpo (podés reemplazar un miembro perdido) y podés ponértela o quitártela como una acción.",
            active: true,
          },
          {
            name: "Modelo de Armadura",
            description:
              "Elegís un modelo, intercambiable en cada descanso corto o largo. Guardián: Guanteletes de Trueno (arma simple cuerpo a cuerpo, 1d8 de daño trueno; quien reciba el golpe tiene desventaja en ataques contra otro que no seas vos) y Campo Defensivo (acción adicional para ganar puntos de golpe temporales iguales a tu nivel de artificiero, usos = tu bono de competencia por descanso largo). Infiltrador: Lanzarrayos (arma a distancia, 27/90 m, 1d6 de daño relámpago, con 1d6 extra una vez por turno) y Pasos Motorizados (+1,5 m de velocidad) más Campo Amortiguador (ventaja en pruebas de Sigilo).",
            active: false,
          },
        ],
      },
      {
        level: 5,
        features: [
          {
            name: "Ataque Adicional",
            description: "Atacás dos veces, en vez de una, cuando tomás la acción de Atacar en tu turno.",
            active: false,
          },
        ],
      },
      {
        level: 9,
        features: [
          {
            name: "Modificaciones de Armadura",
            description:
              "Tu Armadura Arcana ahora cuenta como cuatro objetos separados para tus infusiones (pechera, botas, casco y arma especial), cada uno con su propia infusión. Además, el máximo de objetos que podés tener imbuidos a la vez aumenta en 2.",
            active: false,
          },
        ],
      },
      {
        level: 15,
        features: [
          {
            name: "Armadura Perfeccionada",
            description:
              "Guardián: como reacción, podés forzar a criaturas Enormes o menores a 9 m a tirar salvación de Fuerza o ser arrastradas hasta 7,5 m hacia vos; si quedan a 1,5 m, podés atacarlas como parte de la misma reacción. Infiltrador: quien reciba daño de tu Lanzarrayos queda marcado hasta tu próximo turno (emite luz tenue, tiene desventaja para atacarte, y el próximo ataque contra esa criatura tiene ventaja y suma 1d6 de daño extra si acierta).",
            active: false,
          },
        ],
      },
    ],
    bonusSpells: [
      { level: 3, spellIndexes: ["magic-missile", "thunderwave"] },
      { level: 5, spellIndexes: ["mirror-image", "shatter"] },
      { level: 9, spellIndexes: ["hypnotic-pattern", "lightning-bolt"] },
      { level: 13, spellIndexes: ["fire-shield", "greater-invisibility"] },
      { level: 17, spellIndexes: ["passwall", "wall-of-force"] },
    ],
  },
  {
    index: "artillerist",
    classIndex: "artificer",
    name: "Artillero",
    description:
      "El artificiero que arma y dispara un cañón místico propio: lanzallamas, ballesta de fuerza o protector de aliados. Ideal para quien quiere pelear a distancia con su propia torreta portátil.",
    subclassLevel: 3,
    source: "TCoE",
    progression: [
      {
        level: 3,
        features: [
          {
            name: "Herramientas de Tallador",
            description: "Ganás competencia con herramientas de tallador de madera (o, si ya la tenías, con otra herramienta de artesano).",
            active: false,
          },
          {
            name: "Cañón Místico",
            description:
              "Con herramientas de tallador o de herrero en mano, creás mágicamente un cañón Diminuto o Pequeño en un espacio libre cercano: CA 18, puntos de golpe = 5 × tu nivel de artificiero, inmune a daño de veneno y psíquico. Dura 1 hora o hasta 0 puntos de golpe, y solo podés tener uno activo a la vez. Elegís su tipo al crearlo: Lanzallamas (cono de 4,5 m, salvación de Destreza, 2d8 de daño fuego), Ballesta Mística (ataque de hechizo a 36 m, 2d8 de daño de fuerza y empuja 1,5 m) o Protector (da puntos de golpe temporales 1d8 + tu modificador de Inteligencia a un aliado cercano).",
            active: true,
          },
        ],
      },
      {
        level: 5,
        features: [
          {
            name: "Arma de Fuego Arcana",
            description:
              "Con herramientas de tallador, grabás símbolos arcanos en una vara, bastón o vara mágica: funciona como foco de lanzamiento, y una vez por descanso corto o largo podés tirar un d8 y sumarlo a una tirada de daño de un hechizo de artificiero que lances con ella.",
            active: true,
          },
        ],
      },
      {
        level: 9,
        features: [
          {
            name: "Cañón Explosivo",
            description:
              "El daño de tu Cañón Místico aumenta 1d8. Además, como acción, podés hacer detonar un cañón a 18 m: cada criatura a 6 m tira salvación de Destreza o sufre 3d8 de daño de fuerza (mitad si acierta), y el cañón se destruye.",
            active: true,
          },
        ],
      },
      {
        level: 15,
        features: [
          {
            name: "Posición Fortificada",
            description:
              "Vos y tus aliados tenéis medio cobertura mientras estén a 3 m de tu Cañón Místico. Además, ya podés mantener dos cañones activos a la vez, y activás ambos con la misma acción adicional.",
            active: false,
          },
        ],
      },
    ],
    bonusSpells: [
      { level: 3, spellIndexes: ["shield", "thunderwave"] },
      { level: 5, spellIndexes: ["scorching-ray", "shatter"] },
      { level: 9, spellIndexes: ["fireball", "wind-wall"] },
      { level: 13, spellIndexes: ["ice-storm", "wall-of-fire"] },
      { level: 17, spellIndexes: ["cone-of-cold", "wall-of-force"] },
    ],
  },
  {
    index: "battle-smith",
    classIndex: "artificer",
    name: "Herrero de Batalla",
    description:
      "El artificiero acompañado por un defensor de acero fiel, que pelea a su lado y absorbe golpes. Bueno con el arma y con la magia de apoyo. Ideal para quien quiere tanque, sanador y compañero animal, todo junto.",
    subclassLevel: 3,
    source: "TCoE",
    progression: [
      {
        level: 3,
        features: [
          {
            name: "Herramientas de Herrero",
            description: "Ganás competencia con herramientas de herrero (o, si ya la tenías, con otra herramienta de artesano).",
            active: false,
          },
          {
            name: "Preparado para la Batalla",
            description:
              "Ganás competencia con armas marciales. Además, cuando atacás con un arma mágica, podés usar tu modificador de Inteligencia en vez de Fuerza o Destreza para las tiradas de ataque y de daño.",
            active: false,
          },
          {
            name: "Defensor de Acero",
            description:
              "Con herramientas de herrero, creás un compañero constructo mediano: CA 15, puntos de golpe = 5 × tu nivel de artificiero + 2 + tu modificador de Inteligencia, velocidad 12 m, inmune a veneno (daño y condición), visión en la oscuridad 18 m. Golpe Potenciado (1d8 + tu bono de competencia de daño de fuerza cuerpo a cuerpo), Reparar (3 veces por día, 2d8 + tu bono de competencia de puntos de golpe a sí mismo o a otra construcción/objeto cercano) y, como reacción, Desviar Ataque (impone desventaja al ataque de una criatura contra alguien que no sea el Defensor).",
            active: true,
          },
        ],
      },
      {
        level: 5,
        features: [
          {
            name: "Ataque Adicional",
            description: "Atacás dos veces, en vez de una, cuando tomás la acción de Atacar en tu turno.",
            active: false,
          },
        ],
      },
      {
        level: 9,
        features: [
          {
            name: "Golpe Arcano",
            description:
              "Cuando vos o tu Defensor de Acero golpean con un ataque de arma mágica, podés canalizar energía arcana para infligir 2d6 de daño de fuerza extra, o para restaurar 2d6 puntos de golpe a una criatura u objeto a 9 m. Usos = tu modificador de Inteligencia (mínimo 1) por descanso largo, máximo una vez por turno.",
            active: true,
          },
        ],
      },
      {
        level: 15,
        features: [
          {
            name: "Defensor Mejorado",
            description:
              "El daño o curación de tu Golpe Arcano aumenta a 4d6, y tu Defensor de Acero gana +2 a la CA. Además, cuando el Defensor usa Desviar Ataque, el atacante recibe 1d4 + tu modificador de Inteligencia de daño de fuerza.",
            active: false,
          },
        ],
      },
    ],
    bonusSpells: [
      { level: 3, spellIndexes: ["heroism", "shield"] },
      { level: 5, spellIndexes: ["branding-smite", "warding-bond"] },
      { level: 9, spellIndexes: ["aura-of-vitality", "conjure-barrage"] },
      { level: 13, spellIndexes: ["aura-of-purity", "fire-shield"] },
      { level: 17, spellIndexes: ["banishing-smite", "mass-cure-wounds"] },
    ],
  },
];

const levelsByClass: Record<string, number[]> = {
  barbarian: [3, 6, 10, 14],
  bard: [3, 6, 14],
  warlock: [1, 6, 10, 14],
  cleric: [1, 2, 6, 8, 17],
  druid: [2, 6, 10, 14],
  ranger: [3, 7, 11, 15],
  fighter: [3, 7, 10, 15, 18],
  sorcerer: [1, 6, 14, 18],
  wizard: [2, 6, 10, 14],
  monk: [3, 6, 11, 17],
  paladin: [3, 7, 15, 20],
  rogue: [3, 9, 13, 17],
};

const subclassLevelByClass: Record<string, number> = {
  barbarian: 3,
  bard: 3,
  warlock: 1,
  cleric: 1,
  druid: 2,
  ranger: 3,
  fighter: 3,
  sorcerer: 1,
  wizard: 2,
  monk: 3,
  paladin: 3,
  rogue: 3,
};

interface BasicSubclassSpec {
  index: string;
  classIndex: string;
  name: string;
  description: string;
  source: string;
}

const classPathLabel: Record<string, string> = {
  barbarian: "Senda",
  bard: "Colegio",
  warlock: "Patrón",
  cleric: "Dominio",
  druid: "Círculo",
  ranger: "Arquetipo",
  fighter: "Arquetipo Marcial",
  sorcerer: "Origen",
  wizard: "Tradición Arcana",
  monk: "Tradición",
  paladin: "Juramento",
  rogue: "Arquetipo",
};

type FeatureSpec = [number, string, string, boolean?];

const SPECIFIC_FEATURES: Record<string, FeatureSpec[]> = {
  berserker: [
    [3, "Frenesí", "Cuando entrás en furia podés atacar más, pagando cansancio después del combate.", true],
    [6, "Furia Inconsciente", "Mientras estás en furia, no te pueden asustar ni encantar fácilmente.", false],
    [10, "Presencia Intimidante", "Podés usar tu presencia para asustar a una criatura cercana.", true],
    [14, "Represalia", "Si alguien te golpea de cerca, podés devolverle un ataque como reacción.", true],
  ],
  "totem-warrior": [
    [3, "Buscador Espiritual", "Aprendés rituales simples para hablar con la naturaleza y los espíritus.", false],
    [3, "Espíritu Totémico", "Elegís un animal guía que cambia cómo funciona tu furia.", false],
    [6, "Aspecto de la Bestia", "Tu tótem mejora exploración, fuerza, sentidos o movilidad.", false],
    [10, "Caminante Espiritual", "Podés consultar a tu guía espiritual mediante magia ritual.", true],
    [14, "Sintonía Totémica", "Tu tótem desbloquea una mejora fuerte para el combate.", false],
  ],
  "ancestral-guardian": [
    [3, "Protectores Ancestrales", "Tus ancestros molestan al primer enemigo que golpeás en furia y protegen a tus aliados.", false],
    [6, "Escudo Espiritual", "Reducís daño que recibe un aliado cercano con ayuda de tus espíritus.", true],
    [10, "Consultar a los Espíritus", "Pedís guía a tus ancestros para exploración o información.", true],
    [14, "Ancestros Vengativos", "Cuando tu escudo reduce daño, los espíritus lastiman al atacante.", false],
  ],
  "storm-herald": [
    [3, "Aura de Tormenta", "Tu furia crea un aura de desierto, mar o tundra con efectos cada turno.", true],
    [6, "Alma de Tormenta", "Ganás resistencia y utilidad según el ambiente de tormenta elegido.", false],
    [10, "Tormenta Protectora", "Compartís tu resistencia elemental con aliados cercanos.", false],
    [14, "Tormenta Furiosa", "Tu aura castiga, empuja o dificulta a enemigos cercanos.", true],
  ],
  zealot: [
    [3, "Furia Divina", "El primer golpe de tu turno durante la furia hace daño extra sagrado o necrótico.", false],
    [3, "Guerrero de los Dioses", "Volverte a la vida cuesta menos recursos materiales.", false],
    [6, "Foco Fanático", "Podés repetir una salvación fallida mientras estás en furia.", true],
    [10, "Presencia Celosa", "Animás a aliados cercanos para que peleen con ventaja por un momento.", true],
    [14, "Furia Más Allá de la Muerte", "Seguís peleando aunque deberías caer, mientras tu furia se mantenga.", false],
  ],
  beast: [
    [3, "Forma de la Bestia", "Al entrar en furia manifestás mordida, garras o cola natural.", false],
    [6, "Alma Bestial", "Tus ataques naturales cuentan como mágicos y ganás adaptación física.", false],
    [10, "Furia Infecciosa", "Tus golpes bestiales pueden forzar daño extra o reacción peligrosa.", true],
    [14, "Llamado de la Cacería", "Reforzás a tus aliados con instinto de manada y daño adicional.", true],
  ],
  "wild-magic": [
    [3, "Conciencia Mágica", "Detectás magia cercana por instinto mientras te concentrás un momento.", true],
    [3, "Oleada Salvaje", "Cada furia dispara un efecto mágico aleatorio.", false],
    [6, "Magia Reforzante", "Ayudás a aliados con energía mágica para pruebas o recuperación de conjuros.", true],
    [10, "Reacción Inestable", "Cuando recibís daño o fallás una salvación, podés cambiar tu oleada salvaje.", true],
    [14, "Oleada Controlada", "Tenés más control sobre qué efecto salvaje aparece al entrar en furia.", false],
  ],
  battlerager: [
    [3, "Armadura de Furia", "Usás armadura con pinchos para atacar, agarrar y lastimar con el cuerpo.", true],
    [6, "Abandono Imprudente", "Al atacar de forma temeraria ganás vida temporal.", false],
    [10, "Carga de Furia", "Podés correr hacia el enemigo como acción adicional mientras estás en furia.", true],
    [14, "Retribución con Pinchos", "Quien te golpea de cerca se lastima con tus pinchos.", false],
  ],
  giant: [
    [3, "Poder Gigante", "Aprendés idioma gigante y ganás trucos físicos de tamaño y fuerza.", false],
    [3, "Estrago Gigante", "Tu furia te vuelve más grande y tus golpes llegan más lejos.", false],
    [6, "Cuchilla Elemental", "Imbuís un arma con energía elemental y la podés arrojar mejor.", true],
    [10, "Impulso Poderoso", "Movés criaturas por el campo usando fuerza de gigante.", true],
    [14, "Coloso Demiúrgico", "Tu furia gigante crece todavía más y aumenta tu daño elemental.", false],
  ],
  lore: [
    [3, "Competencias Adicionales", "Ganás más habilidades para ser útil fuera de combate.", false],
    [3, "Palabras Cortantes", "Gastás inspiración para reducir una tirada enemiga.", true],
    [6, "Secretos Mágicos Adicionales", "Aprendés conjuros de cualquier lista antes que otros bardos.", false],
    [14, "Habilidad Incomparable", "Usás inspiración para mejorar tus propias pruebas.", true],
  ],
  valor: [
    [3, "Competencias de Combate", "Ganás armaduras, escudos y armas marciales.", false],
    [3, "Inspiración de Combate", "Tu inspiración también mejora daño o defensa de aliados.", true],
    [6, "Ataque Extra", "Atacás dos veces cuando usás la acción de ataque.", false],
    [14, "Magia de Batalla", "Después de lanzar un conjuro, podés atacar como acción adicional.", true],
  ],
  glamour: [
    [3, "Manto de Inspiración", "Das vida temporal y movimiento seguro a aliados inspirados.", true],
    [3, "Actuación Cautivadora", "Encantás a una audiencia después de actuar.", true],
    [6, "Manto de Majestad", "Tomás una presencia feérica que te permite dar órdenes mágicas.", true],
    [14, "Majestad Inquebrantable", "Tu presencia vuelve difícil atacarte o resistir tus palabras.", false],
  ],
  swords: [
    [3, "Competencias Adicionales", "Ganás armadura media y armas para pelear de cerca.", false],
    [3, "Estilo de Combate", "Elegís un estilo marcial para complementar tus ataques.", false],
    [3, "Floritura de Espadas", "Gastás inspiración para daño, defensa o movimiento especial.", true],
    [6, "Ataque Extra", "Atacás dos veces cuando usás la acción de ataque.", false],
    [14, "Floritura Maestra", "Podés hacer una floritura básica sin gastar inspiración.", false],
  ],
  whispers: [
    [3, "Hojas Psíquicas", "Gastás inspiración para sumar daño psíquico a un golpe.", true],
    [3, "Palabras de Terror", "Conversando a solas podés sembrar miedo en una criatura.", true],
    [6, "Manto de Susurros", "Robás la sombra de alguien muerto para disfrazarte socialmente.", true],
    [14, "Saber Sombrío", "Plantás una amenaza mágica que domina el miedo de una criatura.", true],
  ],
  creation: [
    [3, "Mota de Potencial", "Tu inspiración deja un efecto extra según cómo se use.", false],
    [3, "Interpretación de la Creación", "Creás un objeto no mágico útil por un tiempo.", true],
    [6, "Interpretación Animadora", "Animás un objeto para que ayude y pelee.", true],
    [14, "Crescendo Creativo", "Creás más objetos y con menos limitaciones.", false],
  ],
  eloquence: [
    [3, "Lengua de Plata", "Tus tiradas bajas de Persuasión o Engaño cuentan como mejores.", false],
    [3, "Palabras Inquietantes", "Gastás inspiración para bajar la próxima salvación de un enemigo.", true],
    [6, "Inspiración Infalible", "Si un aliado falla usando tu inspiración, no la pierde.", false],
    [6, "Discurso Universal", "Te hacés entender por criaturas que no hablan tu idioma.", true],
    [14, "Inspiración Infecciosa", "Cuando alguien aprovecha tu inspiración, podés pasar otra gratis.", true],
  ],
  spirits: [
    [3, "Susurros Guía", "Ganás guía espiritual para mejorar pruebas.", false],
    [3, "Foco Espiritual", "Usás un foco temático y potenciás curación o daño al subir.", false],
    [3, "Relatos del Más Allá", "Canalizás una historia espiritual con un efecto aleatorio.", true],
    [6, "Sesión Espiritual", "El grupo participa en una sesión para aprender un conjuro temporal.", true],
    [14, "Conexión Mística", "Tenés más control cuando el relato espiritual sale bajo.", false],
  ],
  archfey: [
    [1, "Presencia Feérica", "Proyectás encanto o miedo feérico en criaturas cercanas.", true],
    [6, "Escape Brumoso", "Cuando recibís daño, podés desaparecer y reposicionarte.", true],
    [10, "Defensas Seductoras", "Resistís encantamientos y podés devolverlos.", false],
    [14, "Delirio Oscuro", "Encerrás la mente de una criatura en una ilusión feérica.", true],
  ],
  "great-old-one": [
    [1, "Mente Despierta", "Podés hablar telepáticamente con criaturas cercanas.", false],
    [6, "Guardia Entrópica", "Dificultás un ataque y luego aprovechás una apertura.", true],
    [10, "Escudo Mental", "Tu mente resiste intrusión y devuelve daño psíquico.", false],
    [14, "Crear Siervo", "Podés convertir a una criatura incapacitada en servidor encantado.", true],
  ],
  undying: [
    [1, "Entre los Muertos", "Aprendés trucos necróticos y los muertos vivientes dudan antes de atacarte.", false],
    [6, "Desafiar la Muerte", "Te aferrás a la vida cuando salvás contra muerte o estabilizás a alguien.", true],
    [10, "Naturaleza Imperecedera", "Tu cuerpo envejece lento y necesita menos sustento.", false],
    [14, "Vida Indestructible", "Te reparás con energía sobrenatural y podés recuperar partes perdidas.", true],
  ],
  celestial: [
    [1, "Luz Sanadora", "Tenés una reserva de dados para curar a distancia.", true],
    [6, "Alma Radiante", "Resistís daño radiante y potenciás fuego o radiancia.", false],
    [10, "Resiliencia Celestial", "Tras descansar, vos y tus aliados ganan vida temporal.", false],
    [14, "Venganza Abrasadora", "Cuando caés, podés levantarte con luz que cura y quema enemigos.", true],
  ],
  hexblade: [
    [1, "Maldición de la Espada Maldita", "Marcás a un enemigo para dañarlo más y curarte si cae.", true],
    [1, "Guerrero Maldito", "Usás Carisma con tu arma pactada y ganás entrenamiento marcial.", false],
    [6, "Espectro Maldito", "Levantás el alma de un humanoide caído como aliado temporal.", true],
    [10, "Armadura de Maleficios", "Tu maldición puede hacer fallar ataques contra vos.", false],
    [14, "Maestro de Maleficios", "Podés mover tu maldición a otro objetivo cuando cae el primero.", false],
  ],
  fathomless: [
    [1, "Tentáculo de las Profundidades", "Invocás un tentáculo que golpea y frena enemigos.", true],
    [1, "Regalo del Mar", "Nadás mejor y respirás bajo el agua.", false],
    [6, "Alma Oceánica", "Resistís frío y te comunicás bajo el agua.", false],
    [6, "Espiral Guardiana", "Tu tentáculo reduce daño recibido por vos o aliados.", true],
    [10, "Tentáculos Aferrantes", "Aprendés magia de tentáculos y ganás vida temporal al usarla.", true],
    [14, "Zambullida Insondable", "Teleportás al grupo por agua o poder abisal.", true],
  ],
  genie: [
    [1, "Vasija del Genio", "Tu patrón te da un recipiente mágico y daño elemental extra.", false],
    [6, "Regalo Elemental", "Ganás resistencia elemental y vuelo breve.", true],
    [10, "Vasija Santuario", "Aliados pueden descansar dentro de tu recipiente.", true],
    [14, "Deseo Limitado", "Pedís a tu patrón replicar un conjuro útil de forma flexible.", true],
  ],
  undead: [
    [1, "Forma de Pavor", "Tomás un aspecto aterrador que asusta y te protege.", true],
    [6, "Tocado por la Tumba", "No necesitás respirar y tus golpes pueden volverse necróticos.", false],
    [10, "Cáscara Necrótica", "Resistís necrosis y explotás con energía oscura al caer.", true],
    [14, "Proyección Espiritual", "Separás tu espíritu del cuerpo para moverte y luchar mejor.", true],
  ],
  knowledge: [
    [1, "Bendiciones del Conocimiento", "Aprendés idiomas y ganás experiencia en saberes.", false],
    [2, "Canalizar Divinidad: Saber de las Eras", "Ganás competencia temporal en una habilidad o herramienta.", true],
    [6, "Canalizar Divinidad: Leer Pensamientos", "Leés una mente cercana y podés influirla.", true],
    [8, "Lanzamiento Potente", "Sumás Sabiduría al daño de tus trucos clericales.", false],
    [17, "Visiones del Pasado", "Leés ecos de objetos o lugares para descubrir historia reciente.", true],
  ],
  light: [
    [1, "Truco Adicional", "Aprendés un truco de luz útil para explorar y combatir.", false],
    [1, "Destello Protector", "Imponés desventaja a un ataque con un fogonazo.", true],
    [2, "Canalizar Divinidad: Resplandor del Alba", "Disipás oscuridad y dañás enemigos con luz divina.", true],
    [6, "Destello Mejorado", "Podés proteger también a aliados cercanos.", true],
    [8, "Lanzamiento Potente", "Sumás Sabiduría al daño de tus trucos clericales.", false],
    [17, "Corona de Luz", "Brillás con un aura que dificulta resistir tus conjuros de fuego o radiancia.", true],
  ],
  nature: [
    [1, "Acólito de la Naturaleza", "Aprendés un truco druídico y una habilidad natural.", false],
    [1, "Competencia con Armadura Pesada", "Podés usar armadura pesada.", false],
    [2, "Canalizar Divinidad: Encantar Animales y Plantas", "Calmás o influís criaturas naturales cercanas.", true],
    [6, "Mitigar Elementos", "Reducís daño elemental contra vos o un aliado.", true],
    [8, "Golpe Divino", "Tus ataques con arma suman daño elemental.", true],
    [17, "Maestro de la Naturaleza", "Tus criaturas encantadas obedecen órdenes simples.", false],
  ],
  tempest: [
    [1, "Competencias de Tormenta", "Ganás armas marciales y armadura pesada.", false],
    [1, "Ira de la Tormenta", "Castigás con trueno o relámpago a quien te golpea de cerca.", true],
    [2, "Canalizar Divinidad: Ira Destructiva", "Maximizás daño de trueno o relámpago.", true],
    [6, "Golpe de Trueno", "Empujás criaturas cuando les hacés daño de relámpago.", false],
    [8, "Golpe Divino", "Tus ataques con arma suman daño de trueno.", true],
    [17, "Nacido de la Tormenta", "Ganás vuelo cuando no estás bajo tierra o en interiores bajos.", false],
  ],
  trickery: [
    [1, "Bendición del Embaucador", "Das ventaja en sigilo a un aliado.", true],
    [2, "Canalizar Divinidad: Invocar Duplicado", "Creás una copia ilusoria para distraer y canalizar conjuros.", true],
    [6, "Canalizar Divinidad: Capa de Sombras", "Te volvés invisible por un momento.", true],
    [8, "Golpe Divino", "Tus ataques con arma suman daño venenoso.", true],
    [17, "Duplicado Mejorado", "Podés mantener varias copias ilusorias a la vez.", false],
  ],
  war: [
    [1, "Competencias de Guerra", "Ganás armas marciales y armadura pesada.", false],
    [1, "Sacerdote de Guerra", "Podés atacar como acción adicional algunas veces.", true],
    [2, "Canalizar Divinidad: Golpe Guiado", "Sumás un gran bono a un ataque importante.", true],
    [6, "Bendición del Dios de la Guerra", "Usás tu Canalizar Divinidad para mejorar el ataque de un aliado.", true],
    [8, "Golpe Divino", "Tus ataques con arma hacen daño extra.", true],
    [17, "Avatar de Batalla", "Resistís daño de armas no mágicas.", false],
  ],
  death: [
    [1, "Segador", "Aprendés necromancia ofensiva y podés afectar más objetivos con trucos.", false],
    [2, "Canalizar Divinidad: Toque de Muerte", "Sumás daño necrótico a un golpe cuerpo a cuerpo.", true],
    [6, "Destrucción Ineludible", "Tu daño necrótico ignora resistencia.", false],
    [8, "Golpe Divino", "Tus ataques con arma suman daño necrótico.", true],
    [17, "Segador Mejorado", "Tus conjuros necróticos de un objetivo pueden afectar a dos criaturas cercanas.", false],
  ],
  arcana: [
    [1, "Iniciado Arcano", "Aprendés saber arcano y trucos de mago.", false],
    [2, "Canalizar Divinidad: Abjuración Arcana", "Expulsás o neutralizás criaturas extraplanares.", true],
    [6, "Rompeconjuros", "Cuando curás a alguien, también podés terminar un efecto mágico.", false],
    [8, "Lanzamiento Potente", "Sumás Sabiduría al daño de tus trucos clericales.", false],
    [17, "Maestría Arcana", "Agregás conjuros altos de mago como secretos divinos.", false],
  ],
  forge: [
    [1, "Bendición de la Forja", "Mejorás un arma o armadura al terminar un descanso.", true],
    [2, "Canalizar Divinidad: Bendición del Artesano", "Creás un objeto metálico simple mediante ritual divino.", true],
    [6, "Alma de la Forja", "Resistís fuego y ganás defensa con armadura pesada.", false],
    [8, "Golpe Divino", "Tus ataques con arma suman daño de fuego.", true],
    [17, "Santo de Forja y Fuego", "Ganás inmunidad al fuego y gran resistencia con armadura pesada.", false],
  ],
  grave: [
    [1, "Círculo de Mortalidad", "Tus curaciones levantan mejor a criaturas en cero vida.", false],
    [1, "Ojos de la Tumba", "Detectás muertos vivientes cercanos.", true],
    [2, "Canalizar Divinidad: Camino a la Tumba", "Marcás a un enemigo para que reciba mucho más daño del próximo golpe.", true],
    [6, "Centinela ante la Puerta de la Muerte", "Cancelás críticos contra vos o aliados cercanos.", true],
    [8, "Lanzamiento Potente", "Sumás Sabiduría al daño de tus trucos clericales.", false],
    [17, "Guardián de Almas", "Cuando un enemigo cae cerca, podés curar a un aliado.", true],
  ],
  order: [
    [1, "Voz de Autoridad", "Cuando lanzás un conjuro a un aliado, puede atacar como reacción.", false],
    [2, "Canalizar Divinidad: Exigencia de Orden", "Forzás a enemigos cercanos a soltar lo que llevan y obedecer brevemente.", true],
    [6, "Encarnación de la Ley", "Lanzás encantamientos como acción adicional algunas veces.", true],
    [8, "Golpe Divino", "Tus ataques con arma suman daño psíquico.", true],
    [17, "Ira del Orden", "Marcás enemigos para que tus aliados les hagan daño extra.", false],
  ],
  peace: [
    [1, "Implemento de Paz", "Ganás competencia social o de apoyo.", false],
    [1, "Vínculo Envalentonador", "Unís aliados para sumar dados a ataques, pruebas o salvaciones.", true],
    [2, "Canalizar Divinidad: Bálsamo de Paz", "Te movés sin provocar y curás a quienes pasás cerca.", true],
    [6, "Vínculo Protector", "Los aliados vinculados pueden protegerse recibiendo daño por otro.", true],
    [8, "Lanzamiento Potente", "Sumás Sabiduría al daño de tus trucos clericales.", false],
    [17, "Vínculo Expansivo", "Tu vínculo llega más lejos y protege mejor.", false],
  ],
  twilight: [
    [1, "Ojos de la Noche", "Ganás visión en la oscuridad excepcional y podés compartirla.", true],
    [1, "Bendición Vigilante", "Das ventaja a iniciativa a una criatura.", true],
    [2, "Canalizar Divinidad: Santuario Crepuscular", "Creás un aura que da vida temporal o quita miedo/encanto.", true],
    [6, "Pasos de la Noche", "Volás brevemente en penumbra u oscuridad.", true],
    [8, "Golpe Divino", "Tus ataques con arma suman daño radiante.", true],
    [17, "Manto Crepuscular", "Tu santuario también da cobertura defensiva.", false],
  ],
  land: [
    [2, "Truco Adicional", "Aprendés un truco druídico extra.", false],
    [2, "Recuperación Natural", "Recuperás espacios de conjuro durante un descanso corto.", true],
    [3, "Conjuros del Círculo", "Tu terreno elegido agrega conjuros siempre preparados.", false],
    [6, "Paso de la Tierra", "Te movés mejor por terreno difícil natural y resistís plantas molestas.", false],
    [10, "Resguardo de la Naturaleza", "Resistís veneno, enfermedad y encantos/asustos de criaturas naturales.", false],
    [14, "Santuario de la Naturaleza", "Bestias y plantas dudan antes de atacarte.", false],
  ],
  moon: [
    [2, "Forma Salvaje de Combate", "Usás Forma Salvaje como acción adicional y podés curarte gastando conjuros.", true],
    [2, "Formas del Círculo", "Podés transformarte en bestias más fuertes que otros druidas.", false],
    [6, "Golpe Primigenio", "Tus ataques en forma de bestia cuentan como mágicos.", false],
    [10, "Forma Salvaje Elemental", "Gastás usos de Forma Salvaje para convertirte en elemental.", true],
    [14, "Mil Formas", "Podés alterar tu aspecto físico con magia menor.", true],
  ],
  dreams: [
    [2, "Bálsamo de la Corte Estival", "Tenés dados de curación feérica a distancia.", true],
    [6, "Hogar de Luz Lunar y Sombra", "Protegés los descansos del grupo con magia suave.", false],
    [10, "Caminos Ocultos", "Teleportás a vos o a un aliado en distancias cortas.", true],
    [14, "Caminante en Sueños", "Usás magia de sueño y viaje después de descansar.", true],
  ],
  shepherd: [
    [2, "Habla de los Bosques", "Entendés bestias y seres del bosque con facilidad.", false],
    [2, "Tótem Espiritual", "Invocás un espíritu de oso, halcón o unicornio para apoyar al grupo.", true],
    [6, "Invocador Poderoso", "Tus criaturas invocadas pegan como mágicas y aguantan más.", false],
    [10, "Espíritu Guardián", "Tu tótem cura a criaturas invocadas y aliados cercanos.", false],
    [14, "Invocaciones Fieles", "Si caés, los espíritus llaman criaturas que te defienden.", true],
  ],
  spores: [
    [2, "Halo de Esporas", "Tus esporas dañan a una criatura cercana.", true],
    [2, "Entidad Simbiótica", "Gastás Forma Salvaje para ganar vida temporal y potenciar esporas.", true],
    [6, "Infestación Fúngica", "Levantás criaturas pequeñas como sirvientes fúngicos temporales.", true],
    [10, "Esporas Extendidas", "Movés tu nube de esporas para controlar una zona.", true],
    [14, "Cuerpo Fúngico", "Tu simbiosis te protege de críticos, ceguera, sordera y veneno.", false],
  ],
  stars: [
    [2, "Mapa Estelar", "Tu foco estelar te da guía y proyectil mágico.", false],
    [2, "Forma Estrellada", "Gastás Forma Salvaje para adoptar constelaciones útiles.", true],
    [6, "Presagio Cósmico", "Al descansar obtenés augurios para sumar o restar dados.", true],
    [10, "Constelaciones Centelleantes", "Tus formas estrelladas mejoran y podés cambiarlas cada turno.", false],
    [14, "Lleno de Estrellas", "Mientras estás en forma estrellada resistís daño físico.", false],
  ],
  wildfire: [
    [2, "Invocar Espíritu de Fuego Salvaje", "Gastás Forma Salvaje para llamar un espíritu que quema y teleporta.", true],
    [6, "Vínculo Mejorado", "Tu espíritu potencia tus conjuros de fuego y curación.", false],
    [10, "Llamas Cauterizantes", "Cuando alguien cae, dejás llamas que curan o dañan.", true],
    [14, "Renacimiento Ardiente", "Tu espíritu puede sacrificarse para evitar que caigas.", true],
  ],
  hunter: [
    [3, "Presa del Cazador", "Elegís una táctica para hacer más daño a enemigos heridos, grandes o agrupados.", false],
    [7, "Tácticas Defensivas", "Elegís una defensa contra ataques, multigolpes o amenazas grandes.", false],
    [11, "Ataque Múltiple", "Ganás una opción para atacar a varios enemigos.", true],
    [15, "Defensa Superior del Cazador", "Elegís una defensa avanzada para sobrevivir mejor.", false],
  ],
  "beast-master": [
    [3, "Compañero del Explorador", "Una bestia te acompaña y actúa coordinada con vos.", true],
    [7, "Entrenamiento Excepcional", "Tu bestia actúa mejor y sus ataques cuentan como mágicos.", false],
    [11, "Furia Bestial", "Tu compañera puede atacar más de una vez.", false],
    [15, "Compartir Conjuros", "Algunos conjuros que te lanzás también afectan a tu bestia.", false],
  ],
  "gloom-stalker": [
    [3, "Emboscador Temible", "En el primer turno te movés más, atacás más y pegás más fuerte.", false],
    [3, "Vista Umbría", "Ves mejor en oscuridad y sos difícil de detectar por visión oscura.", false],
    [7, "Mente de Hierro", "Ganás competencia en salvaciones de Sabiduría o mejoras la que ya tenés.", false],
    [11, "Ráfaga del Acechador", "Si fallás un ataque, podés intentar otro una vez por turno.", true],
    [15, "Esquiva Sombría", "Imponés desventaja a un ataque que te amenaza.", true],
  ],
  "horizon-walker": [
    [3, "Detectar Portal", "Sentís portales planares cercanos.", true],
    [3, "Guerrero Planar", "Convertís un golpe en daño de fuerza y lo potenciás.", true],
    [7, "Paso Etéreo", "Entrás brevemente al Plano Etéreo.", true],
    [11, "Golpe Distante", "Teleportás entre ataques y podés golpear a más criaturas.", false],
    [15, "Defensa Espectral", "Reducís daño moviéndote parcialmente fuera del plano.", true],
  ],
  "monster-slayer": [
    [3, "Sentido del Cazador", "Leés resistencias, inmunidades y vulnerabilidades de una criatura.", true],
    [3, "Presa del Exterminador", "Marcás a un enemigo para hacerle daño extra.", true],
    [7, "Defensa Sobrenatural", "Sumás un dado contra efectos de tu presa marcada.", false],
    [11, "Némesis de Usuarios de Magia", "Intentás cortar conjuros o teleportaciones de tu presa.", true],
    [15, "Contraataque del Exterminador", "Si tu presa te fuerza una salvación, podés responder con un ataque.", true],
  ],
  "fey-wanderer": [
    [3, "Golpes Temibles", "Tus armas cargan daño psíquico una vez por turno.", false],
    [3, "Glamur de Otro Mundo", "Sumás Sabiduría a pruebas sociales y ganás una habilidad.", false],
    [7, "Giro Seductor", "Redirigís miedo o encanto cuando alguien lo resiste.", true],
    [11, "Refuerzos Feéricos", "Invocás ayuda feérica con más flexibilidad.", true],
    [15, "Errante Brumoso", "Usás Paso Brumoso gratis y podés llevar a alguien.", true],
  ],
  swarmkeeper: [
    [3, "Enjambre Reunido", "Tu enjambre empuja, mueve o suma daño cuando golpeás.", true],
    [7, "Marea Retorcida", "El enjambre te da vuelo breve y movimiento flotante.", true],
    [11, "Enjambre Poderoso", "Los efectos del enjambre mejoran.", false],
    [15, "Dispersión del Enjambre", "Te deshacés en enjambre para reducir daño y reposicionarte.", true],
  ],
  drakewarden: [
    [3, "Don Dracónico", "Aprendés idioma dracónico y un truco temático.", false],
    [3, "Compañero Draco", "Invocás un draco aliado que pelea junto a vos.", true],
    [7, "Vínculo de Colmillo y Escama", "Tu draco crece, vuela mejor y potencia daño elemental.", false],
    [11, "Aliento del Draco", "Vos o tu draco exhalan energía elemental en área.", true],
    [15, "Vínculo Perfeccionado", "Tu draco mejora y puede protegerte con resistencia.", false],
  ],
  "battle-master": [
    [3, "Superioridad en Combate", "Ganás dados de superioridad para maniobras tácticas.", true],
    [3, "Estudiante de Guerra", "Ganás competencia con herramientas de artesano.", false],
    [7, "Conoce a tu Enemigo", "Observás a una criatura para estimar sus capacidades.", true],
    [10, "Superioridad Mejorada", "Tus dados de superioridad aumentan.", false],
    [15, "Implacable", "Recuperás un dado si empezás combate sin ninguno.", false],
    [18, "Superioridad Mejorada Mayor", "Tus dados de superioridad vuelven a aumentar.", false],
  ],
  "arcane-archer": [
    [3, "Saber del Arquero Arcano", "Aprendés magia menor y conocimiento arcano o natural.", false],
    [3, "Disparo Arcano", "Imbuís flechas con efectos mágicos especiales.", true],
    [7, "Flecha Mágica", "Tus flechas cuentan como mágicas.", false],
    [7, "Disparo Curvo", "Redirigís una flecha fallida hacia otro objetivo.", true],
    [15, "Disparo Siempre Listo", "Recuperás un disparo arcano si empezás combate sin usos.", false],
    [18, "Disparo Arcano Mejorado", "Tus disparos arcanos hacen más daño.", false],
  ],
  cavalier: [
    [3, "Competencia Adicional", "Ganás una habilidad o idioma útil para caballería y nobleza.", false],
    [3, "Nacido para la Montura", "Montás mejor y caés menos de tu montura.", false],
    [3, "Marca Inquebrantable", "Marcás enemigos para castigarlos si atacan a otros.", true],
    [7, "Maniobra Protectora", "Protegés a vos o aliados con tu reacción.", true],
    [10, "Mantener la Línea", "Tus ataques de oportunidad frenan el movimiento enemigo.", false],
    [15, "Cargador Feroz", "Podés derribar al enemigo al cargar.", true],
    [18, "Defensor Vigilante", "Amenazás muchas oportunidades de ataque por ronda.", false],
  ],
  samurai: [
    [3, "Competencia Adicional", "Ganás una habilidad social o artística.", false],
    [3, "Espíritu de Lucha", "Ganás vida temporal y ventaja en ataques por un turno.", true],
    [7, "Cortesano Elegante", "Sumás Sabiduría a Persuasión y ganás salvación mental.", false],
    [10, "Espíritu Incansable", "Recuperás un uso de Espíritu de Lucha si empezás sin usos.", false],
    [15, "Golpe Rápido", "Convertís ventaja en un ataque adicional.", true],
    [18, "Fuerza Antes de la Muerte", "Cuando caés, podés tomar un turno extra antes de quedar fuera.", true],
  ],
  "echo-knight": [
    [3, "Manifestar Eco", "Creás un eco de vos que ocupa espacio y ataca desde otra posición.", true],
    [3, "Desatar Encarnación", "Atacás una vez extra desde la posición de tu eco.", true],
    [7, "Avatar del Eco", "Usás tu eco para explorar a distancia.", true],
    [10, "Mártir Sombrío", "Tu eco intercepta un ataque dirigido a un aliado.", true],
    [15, "Recuperar Potencial", "Ganás vida temporal cuando tu eco es destruido.", false],
    [18, "Legión de Uno", "Podés mantener dos ecos a la vez.", false],
  ],
  "psi-warrior": [
    [3, "Poder Psiónico", "Ganás dados psiónicos para proteger, golpear o mover objetos.", true],
    [7, "Adepto Telequinético", "Saltás con impulso mental y empujás con ataques psiónicos.", true],
    [10, "Mente Protegida", "Resistís daño psíquico y podés terminar encanto o miedo.", true],
    [15, "Baluarte de Fuerza", "Das cobertura protectora a criaturas cercanas.", true],
    [18, "Maestro Telequinético", "Usás telequinesis poderosa y atacás durante su uso.", true],
  ],
  "rune-knight": [
    [3, "Tallador de Runas", "Aprendés runas que dan poderes activos y pasivos.", true],
    [3, "Poder Gigante", "Crecés por un momento y hacés daño extra.", true],
    [7, "Escudo Rúnico", "Forzás repetir un ataque que golpeó a alguien cercano.", true],
    [10, "Gran Estatura", "Tu cuerpo se vuelve más imponente y fuerte.", false],
    [15, "Maestro de Runas", "Podés usar tus runas con más frecuencia.", false],
    [18, "Juggernaut Rúnico", "Tu forma gigante crece más y pega más fuerte.", false],
  ],
  "purple-dragon-knight": [
    [3, "Grito de Reagrupamiento", "Cuando usás Segundo Aliento, aliados cercanos también recuperan vida.", true],
    [7, "Enviado Real", "Ganás habilidad social y mejor competencia para negociar.", false],
    [10, "Impulso Inspirador", "Cuando usás Acción Súbita, un aliado también puede atacar.", true],
    [15, "Baluarte", "Compartís una repetición de salvación mental con un aliado.", true],
  ],
  "draconic-bloodline": [
    [1, "Ancestro Dracónico", "Elegís un tipo de dragón que define tu elemento y parte de tu estilo.", false],
    [1, "Resiliencia Dracónica", "Tu piel se endurece y ganás más vida.", false],
    [6, "Afinidad Elemental", "Tus conjuros del elemento dracónico hacen más daño y te protegen.", true],
    [14, "Alas de Dragón", "Manifestás alas para volar.", true],
    [18, "Presencia Dracónica", "Irradiás majestad dracónica para encantar o asustar.", true],
  ],
  "sorcerer-wild-magic": [
    [1, "Oleada de Magia Salvaje", "Tus conjuros pueden disparar efectos mágicos impredecibles.", false],
    [1, "Mareas del Caos", "Manipulás la suerte para ganar ventaja, arriesgando más magia salvaje.", true],
    [6, "Doblar la Suerte", "Gastás puntos de hechicería para sumar o restar a una tirada cercana.", true],
    [14, "Caos Controlado", "Tenés más control sobre las oleadas salvajes.", false],
    [18, "Bombardeo de Conjuros", "Tus conjuros de daño pueden tirar más dados cuando salen muy bien.", false],
  ],
  "divine-soul": [
    [1, "Magia Divina", "Podés aprender conjuros de clérigo además de hechicero.", false],
    [1, "Favor de los Dioses", "Sumás un bono a una salvación o ataque fallido.", true],
    [6, "Curación Potenciada", "Mejorás una curación repitiendo dados bajos.", true],
    [14, "Alas de Otro Mundo", "Manifestás alas divinas para volar.", true],
    [18, "Recuperación Sobrenatural", "Te curás mucho cuando estás muy herido.", true],
  ],
  "shadow-magic": [
    [1, "Ojos de la Oscuridad", "Ves mejor en la oscuridad y aprendés magia sombría.", false],
    [1, "Fuerza de la Tumba", "Podés resistir caer a cero vida con una salvación.", true],
    [6, "Sabueso de Mal Agüero", "Invocás una sombra que persigue a un objetivo y debilita sus salvaciones.", true],
    [14, "Caminar por Sombras", "Te teleportás entre zonas de penumbra u oscuridad.", true],
    [18, "Forma Umbría", "Te volvés una sombra resistente al daño.", true],
  ],
  "storm-sorcery": [
    [1, "Orador del Viento", "Entendés y hablás Primordial.", false],
    [1, "Magia Tempestuosa", "Al lanzar conjuros, te movés con ráfagas sin provocar ataques.", true],
    [6, "Corazón de la Tormenta", "Resistís trueno y relámpago, y dañás alrededor al usar esos conjuros.", false],
    [6, "Guía de Tormenta", "Controlás lluvia y viento a tu alrededor.", true],
    [14, "Furia de la Tormenta", "Castigás y empujás a quien te golpea de cerca.", true],
    [18, "Alma del Viento", "Ganás inmunidad a trueno y relámpago y podés dar vuelo al grupo.", true],
  ],
  "aberrant-mind": [
    [1, "Conjuros Psiónicos", "Ganás conjuros mentales extra que podés cambiar por otros del tema.", false],
    [1, "Habla Telepática", "Abrís un canal mental con una criatura.", true],
    [6, "Hechicería Psiónica", "Lanzás tus conjuros psiónicos de forma sutil con puntos de hechicería.", true],
    [6, "Defensas Psíquicas", "Resistís daño psíquico y ventajas contra encanto o miedo.", false],
    [14, "Revelación de la Carne", "Transformás tu cuerpo con rasgos aberrantes temporales.", true],
    [18, "Implosión Deformante", "Teleportás y dañás alrededor doblando el espacio.", true],
  ],
  "clockwork-soul": [
    [1, "Magia Mecánica", "Ganás conjuros de orden y protección que podés ajustar por tema.", false],
    [1, "Restaurar Equilibrio", "Cancelás ventaja o desventaja en una tirada cercana.", true],
    [6, "Bastión de la Ley", "Creás una reserva de dados que reduce daño.", true],
    [14, "Trance de Orden", "Entrás en un estado donde tus tiradas bajas cuentan como mejores.", true],
    [18, "Cabalgata Mecánica", "Restaurás al grupo, reparás efectos y ordenás el campo.", true],
  ],
  abjuration: [
    [2, "Sabio de Abjuración", "Copiás conjuros de abjuración más fácil.", false],
    [2, "Resguardo Arcano", "Tus abjuraciones crean un escudo que absorbe daño.", false],
    [6, "Resguardo Proyectado", "Usás tu escudo arcano para proteger a un aliado.", true],
    [10, "Abjuración Mejorada", "Sumás competencia a pruebas para contrarrestar o disipar magia.", false],
    [14, "Resistencia a Conjuros", "Tenés ventaja contra conjuros y resistís su daño.", false],
  ],
  conjuration: [
    [2, "Sabio de Conjuración", "Copiás conjuros de conjuración más fácil.", false],
    [2, "Conjuración Menor", "Creás un objeto pequeño temporal.", true],
    [6, "Transposición Benigna", "Te teleportás o intercambiás lugar con un aliado.", true],
    [10, "Conjuración Concentrada", "Es más difícil romper tu concentración en conjuros de conjuración.", false],
    [14, "Invocaciones Duraderas", "Tus criaturas invocadas tienen más vida.", false],
  ],
  divination: [
    [2, "Sabio de Adivinación", "Copiás conjuros de adivinación más fácil.", false],
    [2, "Portento", "Tirás dados al inicio del día y los usás para reemplazar tiradas clave.", true],
    [6, "Adivinación Experta", "Recuperás parte de la magia al lanzar adivinaciones.", false],
    [10, "El Tercer Ojo", "Ganás una percepción especial temporal.", true],
    [14, "Portento Mayor", "Tenés más dados de portento por día.", false],
  ],
  enchantment: [
    [2, "Sabio de Encantamiento", "Copiás conjuros de encantamiento más fácil.", false],
    [2, "Mirada Hipnótica", "Incapacitás brevemente a una criatura que te mira.", true],
    [6, "Encanto Instintivo", "Desviás un ataque hacia otra criatura.", true],
    [10, "Encantamiento Dividido", "Algunos encantamientos de un objetivo afectan a dos.", false],
    [14, "Alterar Recuerdos", "Una criatura encantada puede olvidar que la manipulaste.", false],
  ],
  illusion: [
    [2, "Sabio de Ilusión", "Copiás conjuros de ilusión más fácil.", false],
    [2, "Ilusión Menor Mejorada", "Tu ilusión menor combina sonido e imagen.", false],
    [6, "Ilusiones Maleables", "Modificás ilusiones activas sin relanzarlas.", true],
    [10, "Yo Ilusorio", "Creás una copia instantánea que hace fallar un ataque.", true],
    [14, "Realidad Ilusoria", "Volvés real una parte de una ilusión por un momento.", true],
  ],
  necromancy: [
    [2, "Sabio de Nigromancia", "Copiás conjuros de nigromancia más fácil.", false],
    [2, "Cosecha Sombría", "Recuperás vida cuando tus conjuros matan criaturas.", false],
    [6, "Siervos Muertos Vivientes", "Animás muertos con más potencia y resistencia.", false],
    [10, "Acostumbrado a la Muerte", "Resistís necrosis y efectos que reducen tu vida máxima.", false],
    [14, "Comandar Muerto Viviente", "Intentás tomar control de un muerto viviente.", true],
  ],
  transmutation: [
    [2, "Sabio de Transmutación", "Copiás conjuros de transmutación más fácil.", false],
    [2, "Alquimia Menor", "Transformás temporalmente un material simple en otro.", true],
    [6, "Piedra del Transmutador", "Creás una piedra que da beneficios defensivos o de movimiento.", false],
    [10, "Cambiaformas", "Usás magia para adoptar formas simples de criatura.", true],
    [14, "Maestro Transmutador", "Consumís tu piedra para una transformación o restauración grande.", true],
  ],
  "war-magic": [
    [2, "Desvío Arcano", "Reaccionás para mejorar CA o una salvación, limitando tu magia siguiente.", true],
    [2, "Ingenio Táctico", "Sumás Inteligencia a iniciativa.", false],
    [6, "Oleada de Poder", "Almacenas energía al disipar magia y la liberás como daño.", true],
    [10, "Magia Duradera", "Mientras concentrás un conjuro, ganás defensa extra.", false],
    [14, "Manto Deflector", "Tu desvío arcano daña a enemigos cercanos.", false],
  ],
  bladesinging: [
    [2, "Entrenamiento en Guerra y Canto", "Ganás armas, armadura ligera y una habilidad artística.", false],
    [2, "Canto de Espada", "Activás una danza defensiva que mejora CA, velocidad y concentración.", true],
    [6, "Ataque Extra", "Atacás dos veces y podés mezclar un truco en tus ataques.", false],
    [10, "Canción de Defensa", "Gastás espacios de conjuro para reducir daño recibido.", true],
    [14, "Canción de Victoria", "Sumás Inteligencia al daño de tus ataques cuerpo a cuerpo.", false],
  ],
  chronurgy: [
    [2, "Cambio Cronal", "Forzás repetir una tirada cercana.", true],
    [2, "Conciencia Temporal", "Sumás Inteligencia a iniciativa.", false],
    [6, "Estasis Momentánea", "Encerrás a una criatura en una pausa temporal breve.", true],
    [10, "Abeyancia Arcana", "Guardás un conjuro en una mota para que otro lo libere.", true],
    [14, "Futuro Convergente", "Forzás que una tirada falle o tenga éxito, pagando agotamiento.", true],
  ],
  graviturgy: [
    [2, "Ajustar Densidad", "Duplicás o reducís el peso de una criatura u objeto.", true],
    [6, "Pozo Gravitatorio", "Tus conjuros mueven criaturas afectadas por tu magia.", false],
    [10, "Atracción Violenta", "Aumentás el daño de una caída o ataque cercano.", true],
    [14, "Horizonte de Sucesos", "Creás un aura gravitatoria que frena y daña enemigos.", true],
  ],
  scribes: [
    [2, "Pluma Mágica", "Creás una pluma arcana para copiar y escribir mejor.", false],
    [2, "Libro Despierto", "Tu grimorio se vuelve consciente y flexible con daño y rituales.", false],
    [6, "Manifestar Mente", "Proyectás la mente de tu libro para ver y lanzar magia desde lejos.", true],
    [10, "Escriba Maestro", "Creás pergaminos temporales y copiás magia más rápido.", true],
    [14, "Uno con la Palabra", "Tu libro puede absorber daño a costa de perder magia temporalmente.", true],
  ],
  "open-hand": [
    [3, "Técnica de la Mano Abierta", "Tus golpes de ráfaga empujan, derriban o bloquean reacciones.", true],
    [6, "Integridad del Cuerpo", "Te curás a vos mismo con disciplina interior.", true],
    [11, "Tranquilidad", "Entrás al día bajo un efecto de paz protectora.", false],
    [17, "Palma Temblorosa", "Plantás vibraciones mortales que podés detonar después.", true],
  ],
  shadow: [
    [3, "Artes Sombrías", "Gastás ki para usar oscuridad, silencio, ilusión y paso sin rastro.", true],
    [6, "Paso Sombrío", "Te teleportás entre sombras y ganás ventaja en tu próximo ataque.", true],
    [11, "Capa de Sombras", "Te volvés invisible mientras estás en penumbra u oscuridad.", true],
    [17, "Oportunista", "Golpeás como reacción cuando un enemigo cercano recibe daño.", true],
  ],
  "four-elements": [
    [3, "Discípulo de los Elementos", "Aprendés disciplinas elementales que gastan ki para imitar magia.", true],
    [6, "Disciplina Elemental Adicional", "Aprendés más técnicas elementales.", false],
    [11, "Disciplina Elemental Avanzada", "Tus opciones elementales crecen en potencia.", false],
    [17, "Maestro Elemental", "Alcanzás las disciplinas elementales más fuertes.", false],
  ],
  "drunken-master": [
    [3, "Competencias Adicionales", "Ganás actuación y herramientas de cervecero.", false],
    [3, "Técnica del Borracho", "Después de Ráfaga de Golpes te movés más y evitás reacciones.", false],
    [6, "Balanceo Ebrio", "Te levantás fácil y redirigís ataques fallidos.", true],
    [11, "Suerte del Borracho", "Gastás ki para cancelar desventaja en una tirada.", true],
    [17, "Frenesí Intoxicado", "Tu Ráfaga de Golpes puede golpear a más enemigos.", false],
  ],
  kensei: [
    [3, "Camino del Kensei", "Elegís armas kensei y ganás técnicas defensivas y ofensivas con ellas.", false],
    [6, "Uno con la Hoja", "Tus armas kensei cuentan como mágicas y podés sumar daño.", true],
    [11, "Afilar la Hoja", "Gastás ki para mejorar ataque y daño de un arma kensei.", true],
    [17, "Precisión Infalible", "Repetís un ataque fallido con arma de monje una vez por turno.", true],
  ],
  "sun-soul": [
    [3, "Rayo Solar Radiante", "Lanzás ataques radiantes a distancia usando tu acción de ataque.", false],
    [6, "Golpe Arcano Abrasador", "Gastás ki para lanzar un estallido ardiente después de atacar.", true],
    [11, "Explosión Solar Abrasadora", "Creás una esfera de luz que daña en área.", true],
    [17, "Escudo Solar", "Brillás con luz y dañás a quien te golpea de cerca.", true],
  ],
  mercy: [
    [3, "Implementos de Misericordia", "Ganás habilidades y herramientas de sanador.", false],
    [3, "Mano Sanadora", "Gastás ki para curar con tus manos.", true],
    [3, "Mano Dañina", "Gastás ki para sumar daño necrótico a un golpe.", true],
    [6, "Toque Médico", "Tus manos sanan estados o envenenan al dañar.", false],
    [11, "Ráfaga de Sanación y Daño", "Combinás curación y daño con Ráfaga de Golpes con menos coste.", false],
    [17, "Mano de Misericordia Suprema", "Podés devolver a la vida a alguien recién muerto.", true],
  ],
  "astral-self": [
    [3, "Brazos del Yo Astral", "Invocás brazos espirituales para golpear con alcance y Sabiduría.", true],
    [6, "Rostro del Yo Astral", "Manifestás sentidos y presencia espiritual mejorada.", true],
    [11, "Cuerpo del Yo Astral", "Tu forma astral protege y potencia daño.", false],
    [17, "Yo Astral Despierto", "Manifestás tu forma completa para defenderte y atacar más.", true],
  ],
  "long-death": [
    [3, "Toque de la Muerte", "Cuando reducís a alguien a cero vida, ganás vida temporal.", false],
    [6, "Hora de la Cosecha", "Asustás criaturas cercanas con tu presencia.", true],
    [11, "Maestría de la Muerte", "Gastás ki para quedarte en 1 vida cuando caerías.", true],
    [17, "Toque de la Larga Muerte", "Gastás ki para hacer daño necrótico fuerte con un toque.", true],
  ],
  devotion: [
    [3, "Canalizar Divinidad: Arma Sagrada", "Imbuís tu arma con luz y precisión.", true],
    [3, "Canalizar Divinidad: Expulsar lo Profano", "Ahuyentás infernales y muertos vivientes.", true],
    [7, "Aura de Devoción", "Aliados cercanos no pueden ser encantados fácilmente.", false],
    [15, "Pureza de Espíritu", "Quedás protegido contra bien y mal de forma constante.", false],
    [20, "Nimbo Sagrado", "Brillás con luz que daña enemigos y te protege.", true],
  ],
  ancients: [
    [3, "Canalizar Divinidad: Ira de la Naturaleza", "Enredás a un enemigo con fuerzas naturales.", true],
    [3, "Canalizar Divinidad: Expulsar Infieles", "Ahuyentás feéricos e infernales.", true],
    [7, "Aura de Protección", "Vos y aliados cercanos resistís daño de conjuros.", false],
    [15, "Centinela Inmortal", "Podés quedarte en pie cuando caerías a cero vida.", true],
    [20, "Campeón Ancestral", "Tomás una forma antigua que cura y potencia tus conjuros.", true],
  ],
  vengeance: [
    [3, "Canalizar Divinidad: Abjurar Enemigo", "Asustás y frenás a una criatura.", true],
    [3, "Canalizar Divinidad: Voto de Enemistad", "Ganás ventaja contra un enemigo elegido.", true],
    [7, "Vengador Implacable", "Te movés después de golpear con ataque de oportunidad.", false],
    [15, "Alma de Venganza", "Atacás como reacción a tu objetivo jurado cuando actúa.", true],
    [20, "Ángel Vengador", "Tomás forma alada y aterradora para perseguir enemigos.", true],
  ],
  oathbreaker: [
    [3, "Canalizar Divinidad: Controlar Muerto Viviente", "Dominás temporalmente un muerto viviente.", true],
    [3, "Canalizar Divinidad: Aspecto Pavoroso", "Asustás criaturas cercanas.", true],
    [7, "Aura de Odio", "Vos y ciertos aliados cercanos suman daño cuerpo a cuerpo.", false],
    [15, "Resistencia Sobrenatural", "Resistís daño físico no mágico.", false],
    [20, "Señor del Terror", "Te rodeás de sombras que asustan y dañan.", true],
  ],
  conquest: [
    [3, "Canalizar Divinidad: Presencia Conquistadora", "Asustás a criaturas cercanas.", true],
    [3, "Canalizar Divinidad: Golpe Guiado", "Sumás un gran bono a un ataque.", true],
    [7, "Aura de Conquista", "Los enemigos asustados cerca tuyo quedan frenados y sufren daño.", false],
    [15, "Reprensión Desdeñosa", "Quien te golpea recibe daño psíquico.", false],
    [20, "Conquistador Invencible", "Te volvés resistente y atacás con más ferocidad.", true],
  ],
  redemption: [
    [3, "Canalizar Divinidad: Emisario de Paz", "Mejorás mucho Persuasión por un rato.", true],
    [3, "Canalizar Divinidad: Reprender al Violento", "Devolvés daño radiante a quien lastima a otro.", true],
    [7, "Aura del Guardián", "Recibís daño en lugar de un aliado cercano.", true],
    [15, "Espíritu Protector", "Recuperás vida al final de tu turno si estás herido.", false],
    [20, "Emisario de Redención", "Resistís daño y castigás a quien te daña, mientras no ataques primero.", false],
  ],
  glory: [
    [3, "Canalizar Divinidad: Atleta Sin Igual", "Mejorás pruebas físicas, salto y carga.", true],
    [3, "Canalizar Divinidad: Castigo Inspirador", "Al usar Castigo Divino, das vida temporal a aliados.", true],
    [7, "Aura de Presteza", "Vos y aliados cercanos se mueven más rápido.", false],
    [15, "Defensa Gloriosa", "Convertís un golpe contra vos o un aliado en posible contraataque.", true],
    [20, "Leyenda Viviente", "Ganás presencia heroica para acertar, salvarte y repetir fallos.", true],
  ],
  watchers: [
    [3, "Canalizar Divinidad: Voluntad del Vigilante", "Das ventaja en salvaciones mentales al grupo.", true],
    [3, "Canalizar Divinidad: Abjurar Extraplanar", "Ahuyentás aberraciones, celestiales, elementales, feéricos o infernales.", true],
    [7, "Aura del Centinela", "Vos y aliados cercanos mejoran iniciativa.", false],
    [15, "Reprensión Vigilante", "Dañás a quien fuerza una salvación mental fallida cerca tuyo.", true],
    [20, "Baluarte Mortal", "Tomás forma de guardián contra amenazas extraplanares.", true],
  ],
  crown: [
    [3, "Canalizar Divinidad: Desafío del Campeón", "Obligás a enemigos cercanos a no alejarse de vos.", true],
    [3, "Canalizar Divinidad: Cambiar la Marea", "Curás un poco a aliados heridos cercanos.", true],
    [7, "Lealtad Divina", "Recibís daño en lugar de un aliado cercano.", true],
    [15, "Santo Inquebrantable", "Ganás ventaja contra parálisis y aturdimiento.", false],
    [20, "Campeón Exaltado", "Te volvés resistente y das ventaja defensiva al grupo.", true],
  ],
  thief: [
    [3, "Manos Rápidas", "Usás objetos, herramientas o acciones de ladrón como acción adicional.", true],
    [3, "Trabajo de Segundo Piso", "Trepás mejor y saltás más lejos.", false],
    [9, "Sigilo Supremo", "Si te movés lento, tenés ventaja para esconderte.", false],
    [13, "Usar Objeto Mágico", "Ignorás varios requisitos para usar objetos mágicos.", false],
    [17, "Reflejos de Ladrón", "Tomás un turno extra al inicio de combate.", false],
  ],
  assassin: [
    [3, "Competencias Adicionales", "Ganás herramientas para disfrazarte y venenos.", false],
    [3, "Asesinar", "Tenés ventaja contra quienes no actuaron y tus golpes sorpresa son críticos.", false],
    [9, "Experto en Infiltración", "Creás identidades falsas convincentes.", true],
    [13, "Impostor", "Imitás habla, escritura y conducta de otra persona.", true],
    [17, "Golpe Mortal", "Tus ataques sorpresa pueden duplicar el daño contra objetivos desprevenidos.", false],
  ],
  "arcane-trickster": [
    [3, "Lanzamiento de Conjuros", "Aprendés trucos y conjuros de mago para engañar y controlar.", false],
    [3, "Mano de Mago Tramposa", "Tu Mano de Mago es invisible y puede robar o manipular mejor.", true],
    [9, "Emboscada Mágica", "Si estás escondido, tus conjuros son más difíciles de resistir.", false],
    [13, "Embaucador Versátil", "Usás Mano de Mago para distraer y ganar ventaja.", true],
    [17, "Ladrón de Conjuros", "Podés robar temporalmente un conjuro que te afectó.", true],
  ],
  inquisitive: [
    [3, "Oído para el Engaño", "Tus tiradas bajas para detectar mentiras cuentan como mejores.", false],
    [3, "Ojo para el Detalle", "Buscás pistas o revelás criaturas ocultas como acción adicional.", true],
    [3, "Lucha Perspicaz", "Leés a un enemigo para aplicarle Ataque Furtivo sin ayuda.", true],
    [9, "Ojo Firme", "Tenés ventaja en Percepción o Investigación si no te movés mucho.", false],
    [13, "Ojo Infalible", "Detectás ilusiones, cambiaformas o engaños mágicos cercanos.", true],
    [17, "Ojo para la Debilidad", "Tu Ataque Furtivo hace más daño contra tu objetivo analizado.", false],
  ],
  mastermind: [
    [3, "Maestro de Intriga", "Ganás herramientas, idiomas e imitación útil.", false],
    [3, "Maestro de Tácticas", "Ayudás como acción adicional y a mayor distancia.", true],
    [9, "Manipulador Perspicaz", "Estudiás a alguien para comparar capacidades.", true],
    [13, "Redirección", "Hacés que un ataque falle contra vos y pueda golpear a otra criatura.", true],
    [17, "Alma de Engaño", "Tu mente es difícil de leer y tu sinceridad mágica engaña.", false],
  ],
  scout: [
    [3, "Hostigador", "Te movés como reacción cuando un enemigo termina cerca.", true],
    [3, "Superviviente", "Ganás competencia y pericia en Naturaleza y Supervivencia.", false],
    [9, "Movilidad Superior", "Tu velocidad aumenta.", false],
    [13, "Maestro de Emboscadas", "Mejorás iniciativa y abrís enemigos para tus aliados.", false],
    [17, "Golpe Repentino", "Podés atacar otra vez como acción adicional y aplicar furtivo a otro objetivo.", true],
  ],
  swashbuckler: [
    [3, "Juego de Pies Elegante", "Quien atacás no puede hacerte ataque de oportunidad ese turno.", false],
    [3, "Audacia Galante", "Sumás Carisma a iniciativa y podés hacer furtivo en duelos.", false],
    [9, "Don de Gentes", "Provocás o encantás con presencia y palabras.", true],
    [13, "Maniobra Elegante", "Ganás ventaja en Acrobacias o Atletismo por un turno.", true],
    [17, "Maestro Duelista", "Repetís un ataque fallido con ventaja.", true],
  ],
  phantom: [
    [3, "Susurros de los Muertos", "Ganás una competencia temporal tras descansar.", false],
    [3, "Lamentos de la Tumba", "Cuando hacés furtivo, dañás también a otra criatura.", true],
    [9, "Prendas de los Difuntos", "Capturás ecos de almas para usarlos en tus poderes.", true],
    [13, "Caminata Fantasmal", "Te volvés parcialmente espectral para volar y atravesar obstáculos.", true],
    [17, "Amigo de la Muerte", "Tus lamentos mejoran y recuperás prendas al descansar.", false],
  ],
  soulknife: [
    [3, "Poder Psiónico", "Ganás dados psiónicos para habilidades y comunicación mental.", true],
    [3, "Hojas Psíquicas", "Manifestás cuchillas mentales para atacar.", false],
    [9, "Hojas del Alma", "Tus cuchillas se guían mejor y te teleportan.", true],
    [13, "Velo Psíquico", "Te volvés invisible por un tiempo breve.", true],
    [17, "Desgarrar la Mente", "Tus cuchillas pueden aturdir mentalmente a una criatura.", true],
  ],
};

const featureText = (spec: BasicSubclassSpec, level: number) => {
  const label = classPathLabel[spec.classIndex] || "Especialidad";
  if (level === subclassLevelByClass[spec.classIndex]) {
    return `Elegís ${spec.name}. Esta ${label.toLowerCase()} marca tu estilo principal y agrega sus primeras reglas.`;
  }
  return `${spec.name} mejora en este nivel: ganás una regla nueva o una mejora directa de tu especialidad.`;
};

const toProgression = (features: FeatureSpec[]): ISubclassLevel[] => {
  const byLevel = new Map<number, FeatureSpec[]>();
  for (const feature of features) byLevel.set(feature[0], [...(byLevel.get(feature[0]) || []), feature]);
  return [...byLevel.entries()].map(([level, list]) => ({
    level,
    features: list.map(([, name, description, active]) => ({ name, description, active: !!active })),
  }));
};

const makeProgression = (spec: BasicSubclassSpec): ISubclassLevel[] =>
  SPECIFIC_FEATURES[spec.index] ? toProgression(SPECIFIC_FEATURES[spec.index]) :
  (levelsByClass[spec.classIndex] || [subclassLevelByClass[spec.classIndex] || 3]).map((level) => ({
    level,
    features: [{ name: `${spec.name}: nivel ${level}`, description: featureText(spec, level), active: level === subclassLevelByClass[spec.classIndex] || level >= 14 }],
  }));

const makeSubclass = (spec: BasicSubclassSpec): CustomSubclass => ({
  ...spec,
  subclassLevel: subclassLevelByClass[spec.classIndex] || 3,
  progression: makeProgression(spec),
});

const withArcaneTricksterCasting = (subclass: CustomSubclass): CustomSubclass => {
  if (subclass.index !== "arcane-trickster") return subclass;
  const castingByLevel: Record<number, Pick<ISubclassLevel, "cantripsKnown" | "spellsKnown" | "spellSlots">> = {
    3: { cantripsKnown: 3, spellsKnown: 3, spellSlots: slots(2) },
    4: { cantripsKnown: 3, spellsKnown: 4, spellSlots: slots(3) },
    7: { cantripsKnown: 3, spellsKnown: 5, spellSlots: slots(4, 2) },
    8: { cantripsKnown: 3, spellsKnown: 6, spellSlots: slots(4, 2) },
    10: { cantripsKnown: 4, spellsKnown: 7, spellSlots: slots(4, 3) },
    11: { cantripsKnown: 4, spellsKnown: 8, spellSlots: slots(4, 3) },
    13: { cantripsKnown: 4, spellsKnown: 9, spellSlots: slots(4, 3, 2) },
    14: { cantripsKnown: 4, spellsKnown: 10, spellSlots: slots(4, 3, 2) },
    16: { cantripsKnown: 4, spellsKnown: 11, spellSlots: slots(4, 3, 3) },
    19: { cantripsKnown: 4, spellsKnown: 12, spellSlots: slots(4, 3, 3, 1) },
    20: { cantripsKnown: 4, spellsKnown: 13, spellSlots: slots(4, 3, 3, 1) },
  };
  const featureLevels = new Map(subclass.progression.map((level) => [level.level, level]));
  for (const [rawLevel, casting] of Object.entries(castingByLevel)) {
    const level = Number(rawLevel);
    const current = featureLevels.get(level) || { level, features: [] };
    featureLevels.set(level, { ...current, ...casting });
  }
  return {
    ...subclass,
    spellcasting: true,
    spellcastingAbility: "int",
    spellListClassIndex: "wizard",
    progression: [...featureLevels.values()].sort((a, b) => a.level - b.level),
  };
};

const ADDITIONAL_SUBCLASSES: CustomSubclass[] = [
  ...[
    ["berserker", "Senda del Berserker", "Entrás en una furia brutal y simple: más ataques, más presión y cero sutileza.", "PHB"],
    ["totem-warrior", "Guerrero Totémico", "Tomás guía espiritual de animales totémicos para resistir, moverte o proteger mejor.", "PHB"],
    ["ancestral-guardian", "Guardián Ancestral", "Tus ancestros aparecen en combate para proteger aliados y castigar a quien los golpea.", "XGtE"],
    ["storm-herald", "Heraldo de la Tormenta", "Tu furia crea un aura elemental de desierto, mar o tundra.", "XGtE"],
    ["zealot", "Fanático", "Peleás con una fuerza sagrada o impía que te vuelve difícil de detener.", "XGtE"],
    ["beast", "Bestia", "Tu rabia despierta garras, mordidas y rasgos salvajes dentro de tu cuerpo.", "TCoE"],
    ["wild-magic", "Magia Salvaje", "Cada furia libera efectos mágicos impredecibles y coloridos.", "TCoE"],
    ["battlerager", "Furia Acorazada", "Usás armadura con pinchos para chocar, agarrar y lastimar en cuerpo a cuerpo.", "SCAG"],
    ["giant", "Gigante", "Tu furia toma poder de gigantes: crecés, pegás más fuerte y arrojás energía elemental.", "BGG"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "barbarian", name, description, source })),
  ...[
    ["lore", "Colegio del Saber", "Sabés de todo un poco: más habilidades, secretos mágicos y buenas interrupciones.", "PHB"],
    ["valor", "Colegio del Valor", "Inspirás desde el frente, con armas, escudos y apoyo directo en combate.", "PHB"],
    ["glamour", "Colegio del Glamur", "Tu magia feérica mueve aliados, encanta multitudes y domina escenas sociales.", "XGtE"],
    ["swords", "Colegio de las Espadas", "Convertís tus actuaciones en duelos ágiles, florituras y defensa personal.", "XGtE"],
    ["whispers", "Colegio de los Susurros", "Usás miedo, secretos y daño psíquico para manipular desde las sombras.", "XGtE"],
    ["creation", "Colegio de la Creación", "Tu música anima objetos y crea cosas útiles de la nada.", "TCoE"],
    ["eloquence", "Colegio de la Elocuencia", "Hablás con precisión perfecta: convencés mejor y hacés que tus conjuros entren.", "TCoE"],
    ["spirits", "Colegio de los Espíritus", "Contás historias de espíritus que se vuelven efectos mágicos en la mesa.", "VRGtR"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "bard", name, description, source })),
  ...[
    ["archfey", "El Archifey", "Tu pacto viene de una entidad feérica: encanto, miedo, escapes y trucos sociales.", "PHB"],
    ["great-old-one", "El Gran Antiguo", "Una mente antigua te da telepatía, presión mental y poderes extraños.", "PHB"],
    ["undying", "El Imperecedero", "Tu patrón desafía la muerte y te enseña a resistir enfermedad y desgaste.", "SCAG"],
    ["celestial", "El Celestial", "Tu pacto trae luz, curación y daño radiante sin dejar de ser brujo.", "XGtE"],
    ["hexblade", "La Espada Maldita", "Tu poder se canaliza por armas, maldiciones y defensa oscura.", "XGtE"],
    ["fathomless", "El Insondable", "Un poder de las profundidades te da tentáculos, agua y control del campo.", "TCoE"],
    ["genie", "El Genio", "Tu patrón elemental te ofrece refugio, vuelo y favores temáticos.", "TCoE"],
    ["undead", "El No-Muerto", "Tomás poder de una entidad de muerte: miedo, resistencia y forma aterradora.", "VRGtR"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "warlock", name, description, source })),
  ...[
    ["knowledge", "Dominio del Conocimiento", "Un clérigo de saber, idiomas, habilidades y lectura de pensamientos.", "PHB"],
    ["light", "Dominio de la Luz", "Brillás con fuego y radiancia para cegar enemigos y limpiar grupos.", "PHB"],
    ["nature", "Dominio de la Naturaleza", "Mezclás fe y mundo natural: plantas, animales y armadura pesada.", "PHB"],
    ["tempest", "Dominio de la Tempestad", "Truenos, relámpagos y fuerza de tormenta para castigar de cerca.", "PHB"],
    ["trickery", "Dominio del Engaño", "Bendecís sigilo, duplicás tu imagen y confundís enemigos.", "PHB"],
    ["war", "Dominio de la Guerra", "Un clérigo marcial con ataques extra, armas y bendiciones de combate.", "PHB"],
    ["death", "Dominio de la Muerte", "Poder oscuro centrado en necromancia, daño y contacto con la muerte.", "DMG"],
    ["arcana", "Dominio de la Arcana", "Fe y magia arcana juntas: trucos de mago, disipación y dominio de conjuros.", "SCAG"],
    ["forge", "Dominio de la Forja", "Bendecís armas y armaduras, resistís fuego y defendés como herrero sagrado.", "XGtE"],
    ["grave", "Dominio de la Tumba", "Protegés el límite entre vida y muerte, evitando caídas y amplificando golpes.", "XGtE"],
    ["order", "Dominio del Orden", "Tu magia organiza el campo: aliados reaccionan, enemigos obedecen.", "TCoE"],
    ["peace", "Dominio de la Paz", "Unís al grupo con vínculos protectores, movilidad y apoyo constante.", "TCoE"],
    ["twilight", "Dominio del Crepúsculo", "Defendés con oscuridad amable, visión, vuelo y refugio para el grupo.", "TCoE"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "cleric", name, description, source })),
  ...[
    ["land", "Círculo de la Tierra", "Druida conectado a un terreno: más magia preparada y recuperación arcana.", "PHB"],
    ["moon", "Círculo de la Luna", "La forma salvaje es tu centro: mejores bestias, más aguante y combate animal.", "PHB"],
    ["dreams", "Círculo de los Sueños", "Magia feérica para curar, proteger descansos y viajar con suavidad.", "XGtE"],
    ["shepherd", "Círculo del Pastor", "Invocás y fortalecés criaturas aliadas con tótems espirituales.", "XGtE"],
    ["spores", "Círculo de las Esporas", "Hongos, necrosis y simbiosis: daño cercano y vida temporal.", "TCoE"],
    ["stars", "Círculo de las Estrellas", "Usás constelaciones para curar, atacar y mejorar concentración.", "TCoE"],
    ["wildfire", "Círculo del Fuego Salvaje", "Tu espíritu de fuego destruye y cura, moviendo al grupo por el campo.", "TCoE"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "druid", name, description, source })),
  ...[
    ["hunter", "Cazador", "El explorador clásico contra monstruos: elegís tácticas simples de daño y defensa.", "PHB"],
    ["beast-master", "Amo de las Bestias", "Viajás con una bestia compañera que pelea y crece con vos.", "PHB"],
    ["gloom-stalker", "Acechador de las Tinieblas", "Especialista en oscuridad, emboscadas y primer turno explosivo.", "XGtE"],
    ["horizon-walker", "Caminante del Horizonte", "Detectás portales y convertís tus ataques en energía planar.", "XGtE"],
    ["monster-slayer", "Cazador de Monstruos", "Leés debilidades y frenás magia de enemigos grandes.", "XGtE"],
    ["fey-wanderer", "Errante Feérico", "Encanto feérico, daño psíquico y presencia social inusual.", "TCoE"],
    ["swarmkeeper", "Guardián del Enjambre", "Un enjambre te ayuda a mover criaturas, empujar y protegerte.", "TCoE"],
    ["drakewarden", "Guardián de Dracónidos", "Un draco compañero crece con vos y aporta daño elemental.", "FToD"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "ranger", name, description, source })),
  ...[
    ["battle-master", "Maestro de Batalla", "Usás maniobras para empujar, desarmar, proteger y controlar el combate.", "PHB"],
    ["arcane-archer", "Arquero Arcano", "Imbuís flechas con efectos mágicos para controlar o dañar a distancia.", "XGtE"],
    ["cavalier", "Jinete", "Defensor firme, ideal montado o protegiendo aliados en primera línea.", "XGtE"],
    ["samurai", "Samurái", "Disciplina, ventaja controlada y resistencia para duelos importantes.", "XGtE"],
    ["echo-knight", "Caballero del Eco", "Peleás junto a un eco temporal que amenaza desde otro lugar.", "EGtW"],
    ["psi-warrior", "Guerrero Psiónico", "Usás dados psiónicos para proteger, empujar y potenciar golpes.", "TCoE"],
    ["rune-knight", "Caballero Rúnico", "Inscribís runas gigantes para crecer, controlar y ganar trucos defensivos.", "TCoE"],
    ["purple-dragon-knight", "Caballero del Dragón Púrpura", "Liderás desde el frente, curando y animando al grupo con presencia marcial.", "SCAG"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "fighter", name, description, source })),
  ...[
    ["draconic-bloodline", "Linaje Dracónico", "Tu sangre dracónica te da defensa natural, afinidad elemental y alas.", "PHB"],
    ["sorcerer-wild-magic", "Magia Salvaje", "Tu magia explota en efectos impredecibles y suerte manipulada.", "PHB"],
    ["divine-soul", "Alma Divina", "Mezclás magia de hechicero con poder divino y curación.", "XGtE"],
    ["shadow-magic", "Magia de las Sombras", "Oscuridad, supervivencia y una presencia sombría que persigue enemigos.", "XGtE"],
    ["storm-sorcery", "Hechicería de la Tormenta", "Te movés con viento y descargás trueno o relámpago alrededor.", "XGtE"],
    ["aberrant-mind", "Mente Aberrante", "Telepatía y magia psíquica rara, flexible y muy temática.", "TCoE"],
    ["clockwork-soul", "Alma Mecánica", "Orden cósmico: cancelás ventajas, protegés y estabilizás el caos.", "TCoE"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "sorcerer", name, description, source })),
  ...[
    ["abjuration", "Abjuración", "Magia protectora: barreras, disipación y defensa contra conjuros.", "PHB"],
    ["conjuration", "Conjuración", "Creás objetos, invocás criaturas y te movés con teletransporte.", "PHB"],
    ["divination", "Adivinación", "Ves posibilidades y reemplazás tiradas clave con presagios.", "PHB"],
    ["enchantment", "Encantamiento", "Controlás mentes, desviás ataques y manipulás conversaciones.", "PHB"],
    ["illusion", "Ilusión", "Tus engaños visuales se vuelven más flexibles y convincentes.", "PHB"],
    ["necromancy", "Nigromancia", "Drenás vida y comandás muertos con más eficacia.", "PHB"],
    ["transmutation", "Transmutación", "Cambiás materia, cuerpos y propiedades con magia práctica.", "PHB"],
    ["war-magic", "Magia de Guerra", "Defensa rápida, iniciativa y potencia arcana para combate táctico.", "XGtE"],
    ["bladesinging", "Canto de Espada", "Mago ágil con defensa, velocidad y combate cuerpo a cuerpo elegante.", "TCoE"],
    ["chronurgy", "Cronurgia", "Manipulás tiempo: rerolls, pausas, iniciativa y control temporal.", "EGtW"],
    ["graviturgy", "Graviturgia", "Alterás peso, movimiento y gravedad para controlar el campo.", "EGtW"],
    ["scribes", "Orden de los Escribas", "Tu libro cobra protagonismo: cambia daño, copia magia y proyecta conciencia.", "TCoE"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "wizard", name, description, source })),
  ...[
    ["open-hand", "Camino de la Mano Abierta", "El monje directo: empuja, derriba y controla con golpes limpios.", "PHB"],
    ["shadow", "Camino de la Sombra", "Sigilo, oscuridad y movilidad ninja para entrar y salir del peligro.", "PHB"],
    ["four-elements", "Camino de los Cuatro Elementos", "Gastás ki para desatar efectos de aire, tierra, fuego y agua.", "PHB"],
    ["drunken-master", "Camino del Maestro Borracho", "Movimiento errático, escapes y golpes que confunden al enemigo.", "XGtE"],
    ["kensei", "Camino del Kensei", "Convertís armas elegidas en extensión de tu disciplina marcial.", "XGtE"],
    ["sun-soul", "Camino del Alma del Sol", "Lanzás energía radiante a distancia y explotás luz interior.", "XGtE"],
    ["mercy", "Camino de la Misericordia", "Curás y dañás con manos medicinales y venenos espirituales.", "TCoE"],
    ["astral-self", "Camino del Yo Astral", "Invocás brazos y forma astral para pelear con sabiduría.", "TCoE"],
    ["long-death", "Camino de la Muerte Prolongada", "Estudiás la muerte para ganar aguante, miedo y supervivencia extrema.", "SCAG"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "monk", name, description, source })),
  ...[
    ["devotion", "Juramento de Devoción", "El paladín clásico: luz, honestidad, protección y arma sagrada.", "PHB"],
    ["ancients", "Juramento de los Ancianos", "Juramento de vida y naturaleza, con resistencia mágica para el grupo.", "PHB"],
    ["vengeance", "Juramento de Venganza", "Perseguís a un enemigo clave con movilidad, ventaja y presión constante.", "PHB"],
    ["oathbreaker", "Rompejuramentos", "Un paladín caído con miedo, control de muertos y aura oscura.", "DMG"],
    ["conquest", "Juramento de Conquista", "Dominás con miedo, control y presencia implacable.", "XGtE"],
    ["redemption", "Juramento de Redención", "Defensa, diplomacia y sacrificio para evitar violencia innecesaria.", "XGtE"],
    ["glory", "Juramento de Gloria", "Heroísmo físico, velocidad grupal y presencia de campeón.", "TCoE"],
    ["watchers", "Juramento de los Vigilantes", "Protegés contra amenazas extraplanares y mejorás iniciativa aliada.", "TCoE"],
    ["crown", "Juramento de la Corona", "Defendés ley y aliados, obligando enemigos a quedarse con vos.", "SCAG"],
  ].map(([index, name, description, source]) => makeSubclass({ index, classIndex: "paladin", name, description, source })),
  ...[
    ["thief", "Ladrón", "El pícaro clásico: más movilidad, objetos rápidos y habilidad para infiltrarse.", "PHB"],
    ["assassin", "Asesino", "Emboscadas, identidades falsas y golpes muy fuertes al empezar combate.", "PHB"],
    ["arcane-trickster", "Embaucador Arcano", "Pícaro con magia de mago para engañar, esconderse y controlar.", "PHB"],
    ["inquisitive", "Inquisidor", "Leés mentiras, detalles y debilidades con mirada entrenada.", "XGtE"],
    ["mastermind", "Cerebro", "Manipulás desde atrás: ayudas a distancia, imitás y engañás socialmente.", "XGtE"],
    ["scout", "Batidor", "Explorador móvil, difícil de atrapar y experto en naturaleza.", "XGtE"],
    ["swashbuckler", "Espadachín", "Duelista carismático: entra, pega y sale sin depender tanto de aliados.", "XGtE"],
    ["phantom", "Fantasma", "Tomás ecos de los muertos para daño, habilidades y movimiento espectral.", "TCoE"],
    ["soulknife", "Cuchilla Espiritual", "Creás hojas psíquicas y usás dados mentales para acertar o comunicarte.", "TCoE"],
  ].map(([index, name, description, source]) => withArcaneTricksterCasting(makeSubclass({ index, classIndex: "rogue", name, description, source }))),
];

export const SUBCLASSES: CustomSubclass[] = [...BASE_SUBCLASSES, ...ADDITIONAL_SUBCLASSES];

export const SUBCLASS_LEVEL_BY_CLASS: Record<string, number> = SUBCLASSES.reduce<Record<string, number>>((acc, subclass) => {
  acc[subclass.classIndex] = subclass.subclassLevel;
  return acc;
}, {});
