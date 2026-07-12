/**
 * Hechizos que NO están en el SRD 2014 (vienen de Xanathar's Guide to Everything), cargados a
 * mano en español. Mismo enfoque que `customRaces.ts`: el importer de hechizos les hace upsert
 * y linkea `spells_classes` según `classes`.
 */
export interface CustomSpell {
  index: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  components: string[];
  concentration: boolean;
  ritual: boolean;
  description: string[];
  higherLevel: string[];
  damageType: string;
  savingThrow: string;
  simpleDescription: string;
  dice: string;
  /** Índices de clase (Class.index) para linkear en spells_classes. */
  classes: string[];
}

export const CUSTOM_SPELLS: CustomSpell[] = [
  {
    index: "gust",
    name: "Ráfaga de Aire",
    level: 0,
    school: "Transmutación",
    castingTime: "1 acción",
    range: "30 pies",
    duration: "Instantáneo",
    components: ["V", "S"],
    concentration: false,
    ritual: false,
    description: [
      "Elegís uno de estos tres efectos al lanzarlo:",
      "Empujón: una criatura Mediana o más chica a tu alcance tira salvación de Fuerza o es empujada hasta 1,5 m lejos tuyo.",
      "Volar objeto: movés hasta 3 m un objeto liviano (máx. 2,5 kg) que nadie sostenga ni cargue. No pega fuerte, no hace daño.",
      "Efecto de ambiente: creás un efecto de aire inofensivo (mover hojas, cerrar una puerta de golpe, levantar polvo) para dar impresión.",
    ],
    higherLevel: [],
    damageType: "",
    savingThrow: "Fuerza",
    simpleDescription: "Generás un golpe de viento: empujás a alguien chico, movés un objeto liviano o creás un efecto de aire para impresionar. No hace daño.",
    dice: "",
    classes: ["druid", "sorcerer", "warlock", "wizard"],
  },
  {
    index: "ice-knife",
    name: "Cuchillo de Hielo",
    level: 1,
    school: "Conjuración",
    castingTime: "1 acción",
    range: "18 m",
    duration: "Instantáneo",
    components: ["S", "M"],
    concentration: false,
    ritual: false,
    description: [
      "Creás una esquirla de hielo y la tirás contra una criatura a tu alcance: hacés un ataque de conjuro a distancia.",
      "Si impacta, la criatura recibe 1d10 de daño perforante.",
      "Impacte o no, la esquirla explota: esa criatura y todas las que estén a 1,5 m tiran salvación de Destreza o reciben 2d6 de daño de frío (la mitad si la superan).",
    ],
    higherLevel: ["El daño de frío de la explosión sube 1d6 por cada nivel de espacio de conjuro arriba del 1º."],
    damageType: "Frío",
    savingThrow: "Destreza",
    simpleDescription: "Tirás una esquirla de hielo: si pega, hace daño perforante, y después explota en frío contra esa criatura y las que estén cerca.",
    dice: "1d10+2d6",
    classes: ["druid", "sorcerer", "wizard"],
  },
];
