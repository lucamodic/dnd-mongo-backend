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

export const SUBCLASSES: CustomSubclass[] = [
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
];

export const SUBCLASS_LEVEL_BY_CLASS: Record<string, number> = SUBCLASSES.reduce<Record<string, number>>((acc, subclass) => {
  acc[subclass.classIndex] = subclass.subclassLevel;
  return acc;
}, {});
