/**
 * Razas que NO están en el SRD API, cargadas a mano en español.
 * Misma forma que produce el importer de razas. El importer les hace upsert y les pone
 * la imagen desde RACE_IMAGES si existe.
 */
export interface CustomRace {
  index: string;
  name: string;
  description: string;
  size: string;
  speed: number;
  abilityBonuses: { ability: string; bonus: number }[];
  flexibleAbilityBonuses?: boolean;
  traits: { name: string; description: string; active: boolean }[];
  languages: string;
}

export const CUSTOM_RACES: CustomRace[] = [
  {
    index: "aarakocra",
    name: "Aarakocra",
    description:
      "Humanoides alados del Plano Elemental del Aire. Parecen grandes aves cuando vuelan y son ideales para personajes móviles, exploradores o lanzadores que quieran controlar el campo desde arriba.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Vuelo",
        description:
          "Tenés una velocidad de vuelo igual a tu velocidad caminando. No podés usarla si llevás armadura mediana o pesada.",
        active: false,
      },
      {
        name: "Garras",
        description:
          "Tus garras sirven para ataques sin armas. Al impactar hacen 1d6 + tu modificador de Fuerza de daño cortante.",
        active: false,
      },
      {
        name: "Llamador del Viento",
        description:
          "Desde nivel 3 podés lanzar Ráfaga de Viento sin componente material una vez por descanso largo. También podés lanzarlo usando espacios de conjuro de nivel 2 o más si tenés.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "goblin",
    name: "Goblin",
    description:
      "Humanoides pequeños, ágiles y escurridizos, con un antiguo toque feérico. Son buenos para personajes veloces, pícaros, exploradores o cualquiera que quiera pelear sucio y escapar rápido.",
    size: "Small",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Tipo Goblinoide",
        description:
          "Sos humanoide y también contás como goblinoide para requisitos o efectos que mencionen goblinoides.",
        active: false,
      },
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Linaje Feérico",
        description: "Tirás con ventaja para evitar o terminar la condición de encantado sobre vos.",
        active: false,
      },
      {
        name: "Furia del Pequeño",
        description:
          "Cuando dañás con un ataque o hechizo a una criatura más grande que vos, podés sumar daño extra igual a tu bono de competencia. Podés usarlo una cantidad de veces igual a tu bono de competencia por descanso largo, como máximo una vez por turno.",
        active: true,
      },
      {
        name: "Escape Ágil",
        description: "Podés usar Destrabarse o Esconderse como acción adicional en cada uno de tus turnos.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "orc",
    name: "Orco",
    description:
      "Humanoides fuertes y resistentes, marcados por la tenacidad de Gruumsh. Funcionan muy bien como guerreros, bárbaros, paladines o cualquier personaje que quiera aguantar y avanzar.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Subida de Adrenalina",
        description:
          "Podés usar Correr como acción adicional. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo. Cada vez que lo usás ganás puntos de golpe temporales iguales a tu bono de competencia.",
        active: true,
      },
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Complexión Poderosa",
        description:
          "Contás como una talla más grande para calcular cuánto podés cargar, empujar, arrastrar o levantar.",
        active: false,
      },
      {
        name: "Resistencia Implacable",
        description:
          "Cuando caés a 0 puntos de golpe pero no morís de inmediato, podés quedar en 1 punto de golpe. Una vez usado, se recupera con un descanso largo.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "owlin",
    name: "Owlin",
    description:
      "Humanoides con forma de búho, sigilosos y observadores, ¡que pueden volar! Perfectos para exploradores, pícaros o magos que quieran una ventaja aérea.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Vuelo",
        description:
          "Gracias a tus alas tenés una velocidad de vuelo de 30 pies. No podés volar si llevás armadura mediana o pesada.",
        active: false,
      },
      {
        name: "Visión en la Oscuridad (30 m)",
        description:
          "Ves en la penumbra hasta 30 m como si fuera luz, y en la oscuridad total como penumbra (en blanco y negro). Ves mucho mejor de noche que la mayoría.",
        active: false,
      },
      {
        name: "Plumas Silenciosas",
        description: "Tu vuelo es silencioso: sos competente en la habilidad de Sigilo.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "eladrin",
    name: "Eladrin",
    description:
      "Elfos feéricos ligados a las estaciones (primavera, verano, otoño, invierno). Cambian de ánimo con la estación y pueden teletransportarse en un parpadeo. Elegantes y mágicos.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Linaje Feérico",
        description: "Tirás con ventaja para resistir que te encanten, y la magia no puede dormirte.",
        active: false,
      },
      {
        name: "Paso Feérico",
        description:
          "Como acción adicional te teletransportás hasta 9 m a un lugar que veas. Lo usás un número de veces igual a tu bono de competencia por descanso largo. Según tu estación agrega un efecto extra (miedo, encanto, daño de fuego o teletransportar a un aliado).",
        active: true,
      },
      {
        name: "Trance",
        description:
          "No dormís: meditás 4 horas y descansás igual que otros en 8. Al terminar podés cambiar tu estación.",
        active: false,
      },
      {
        name: "Sentidos Agudos",
        description: "Sos competente en la habilidad de Percepción.",
        active: false,
      },
    ],
    languages: "Común y Élfico",
  },
  {
    index: "kenku",
    name: "Kenku",
    description:
      "Humanoides con aspecto de cuervo, memoria sobrenatural y talento para imitar sonidos. Son excelentes para personajes observadores, sigilosos o creativos.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Duplicación Experta",
        description:
          "Tenés ventaja en pruebas para copiar exactamente escritura o trabajos artesanales hechos por vos u otra criatura.",
        active: false,
      },
      {
        name: "Memoria Kenku",
        description:
          "Sos competente en dos habilidades a elección. Además, cuando hacés una prueba con una habilidad en la que sos competente, podés darte ventaja antes de tirar. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo.",
        active: true,
      },
      {
        name: "Mimetismo",
        description:
          "Podés imitar sonidos y voces que escuchaste. Quien te oye puede detectar la imitación con una prueba de Sabiduría (Perspicacia) contra 8 + tu competencia + tu modificador de Carisma.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "kobold",
    name: "Kobold",
    description:
      "Humanoides pequeños con herencia dracónica. Son astutos, trabajan bien en grupo y pueden abrir oportunidades para que el grupo golpee con ventaja.",
    size: "Small",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Grito Dracónico",
        description:
          "Como acción adicional gritás a enemigos a 3 m. Hasta el inicio de tu próximo turno, vos y tus aliados tienen ventaja en ataques contra esos enemigos si podían oírte. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo.",
        active: true,
      },
      {
        name: "Legado Kobold",
        description:
          "Elegís una manifestación dracónica: una competencia de habilidad, ventaja contra miedo, o un truco de hechicero usando Inteligencia, Sabiduría o Carisma.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "shifter",
    name: "Shifter",
    description:
      "Humanoides con rasgos bestiales y sangre tocada por la licantropía. Pueden transformarse brevemente para ganar resistencia o movilidad.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Instintos Bestiales",
        description:
          "Sos competente en una habilidad a elección entre Acrobacias, Atletismo, Intimidación o Supervivencia.",
        active: false,
      },
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Cambio",
        description:
          "Como acción adicional asumís un aspecto bestial durante 1 minuto. Ganás puntos de golpe temporales iguales a 2 veces tu bono de competencia. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo.",
        active: true,
      },
      {
        name: "Opción de Cambio",
        description:
          "Al elegir la raza elegís una opción: Beasthide suma más vida temporal y +1 CA, Longtooth da mordida 1d6 + Fuerza, Swiftstride suma velocidad y movimiento reactivo, Wildhunt mejora pruebas de Sabiduría y evita ventaja contra vos.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
];
