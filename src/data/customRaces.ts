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
  {
    index: "satyr",
    name: "Sátiro",
    description:
      "Feéricos con cuernos y patas de cabra, ligados al Feywild. Rápidos, saltarines y resistentes a la magia; buenos para bardos, pícaros o cualquiera que quiera moverse rápido por el mapa.",
    size: "Medium",
    speed: 35,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Tipo Feérico",
        description: "Sos un feérico (no humanoide) para requisitos o efectos que mencionen feéricos.",
        active: false,
      },
      {
        name: "Embestida",
        description:
          "Podés atacar sin armas con la cabeza. Al impactar hacés 1d6 + tu modificador de Fuerza de daño contundente.",
        active: true,
      },
      {
        name: "Resistencia Mágica",
        description: "Tirás con ventaja las salvaciones contra hechizos y otros efectos mágicos.",
        active: false,
      },
      {
        name: "Saltos Alegres",
        description: "Cuando saltás (largo o alto), sumás 1d8 extra a la distancia que cubrís.",
        active: true,
      },
      {
        name: "Juerguista",
        description: "Sos competente en Actuación, Persuasión y en un instrumento musical a elección.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "tabaxi",
    name: "Tabaxi",
    description:
      "Humanoides felinos curiosos y ágiles, viajeros natos. Perfectos para pícaros, exploradores o cualquiera que quiera trepar y moverse con ventaja.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Garras Felinas",
        description:
          "Tus garras sirven para golpes desarmados. Al impactar hacen 1d6 + tu modificador de Fuerza de daño cortante.",
        active: true,
      },
      {
        name: "Talento Felino",
        description: "Sos competente en Percepción y Sigilo.",
        active: false,
      },
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
        active: false,
      },
      {
        name: "Agilidad Felina",
        description:
          "Como acción adicional, duplicás tu velocidad hasta el final del turno. No podés volver a usarla hasta moverte 0 pies en un turno.",
        active: true,
      },
      {
        name: "Trepador",
        description: "Tenés velocidad de escalada igual a tu velocidad caminando.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "firbolg",
    name: "Firbolg",
    description:
      "Gigantes amables del bosque, protectores de la naturaleza. Sigilosos a pesar de su tamaño, ideales para druidas, exploradores o personajes pacíficos con un toque mágico.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Magia Firbolg",
        description:
          "Podés lanzar Detectar Magia y Disfrazarse (podés parecer hasta un metro más alto o más bajo) sin gastar espacio de conjuro, usando Inteligencia, Sabiduría o Carisma. Una vez usados, no podés repetirlos hasta un descanso largo.",
        active: true,
      },
      {
        name: "Paso Oculto",
        description:
          "Como acción adicional, te volvés invisible hasta el inicio de tu próximo turno o hasta que ataques, dañes a alguien o fuerces una salvación. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo.",
        active: true,
      },
      {
        name: "Complexión Poderosa",
        description:
          "Contás como una talla más grande para calcular cuánto podés cargar, empujar, arrastrar o levantar.",
        active: false,
      },
      {
        name: "Habla de Bestias y Hojas",
        description:
          "Podés comunicarte de forma simple con bestias y plantas, y ellas te entienden. Tenés ventaja en pruebas de Carisma para influenciarlas.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "fairy",
    name: "Hada",
    description:
      "Feéricos diminutos con alas, nacidos del Feywild. Vuelan desde el nivel 1 y tienen trucos de ilusión y encantamiento; geniales para hechiceros, brujos o cualquiera que quiera volar por el campo de batalla.",
    size: "Small",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Tipo Feérico",
        description: "Sos un feérico (no humanoide) para requisitos o efectos que mencionen feéricos.",
        active: false,
      },
      {
        name: "Magia de Hada",
        description:
          "Conocés el truco Artesanía Druídica. Desde nivel 3 podés lanzar Fuego Feérico, y desde nivel 5 también Agrandar/Reducir, sin gastar espacio de conjuro (una vez por descanso largo cada uno). Usás Inteligencia, Sabiduría o Carisma.",
        active: true,
      },
      {
        name: "Vuelo",
        description:
          "Tenés una velocidad de vuelo igual a tu velocidad caminando. No podés usarla si llevás armadura mediana o pesada.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "changeling",
    name: "Changeling",
    description:
      "Cambiaformas natos capaces de alterar su apariencia a voluntad. Excelentes espías, actores o cualquier personaje que quiera jugar con identidades e influir en la gente.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Instintos Cambiante",
        description:
          "Sos competente en dos de estas habilidades a elección: Engaño, Perspicacia, Intimidación, Actuación o Persuasión.",
        active: false,
      },
      {
        name: "Cambiaformas",
        description:
          "Como acción, cambiás tu apariencia y voz: color, largo de pelo, sexo, altura y peso, incluso tu talla entre Mediano y Pequeño. Mantenés la nueva forma hasta que la cambiés de nuevo o mueras.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "aasimar",
    name: "Aasimar",
    description:
      "Mortales con un alma tocada por lo celestial. Sanan a otros con un toque y, desde nivel 3, pueden transformarse temporalmente en un ser de luz; buenos para cualquier clase que quiera un extra de utilidad divina.",
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
        name: "Resistencia Celestial",
        description: "Recibís la mitad de daño necrótico y radiante.",
        active: false,
      },
      {
        name: "Manos Sanadoras",
        description:
          "Como acción, tocás a una criatura y la curás una cantidad de puntos de golpe igual a tu nivel de personaje. Lo usás una vez por descanso largo.",
        active: true,
      },
      {
        name: "Portador de Luz",
        description: "Conocés el truco Luz. Carisma es tu característica para lanzarlo.",
        active: false,
      },
      {
        name: "Revelación Celestial",
        description:
          "Desde nivel 3, como acción adicional te transformás durante 1 minuto (una vez por descanso largo): te salen alas y ganás un efecto extra de luz u oscuridad radiante/necrótica, según la variante que elijas.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "githyanki",
    name: "Githyanki",
    description:
      "Guerreros psiónicos de otro plano, criados para la batalla. Entrenados desde chicos con espadas y magia mental; potentes para guerreros, magos o cualquier híbrido marcial-psiónico.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Conocimiento Astral",
        description:
          "Al terminar un descanso largo, elegís una competencia de habilidad y una de arma o herramienta. Las tenés hasta tu próximo descanso largo.",
        active: true,
      },
      {
        name: "Psiónica Githyanki",
        description:
          "Conocés el truco Mano de Mago (la mano es invisible). Desde nivel 3 podés lanzar Salto, y desde nivel 5 Paso Brumoso, una vez cada uno por descanso largo, sin gastar espacio de conjuro. Usás Inteligencia, Sabiduría o Carisma.",
        active: true,
      },
      {
        name: "Resiliencia Psíquica",
        description: "Recibís la mitad de daño psíquico.",
        active: false,
      },
      {
        name: "Prodigio Marcial",
        description:
          "Sos competente con armadura ligera y mediana, y con espadas cortas, largas y a dos manos.",
        active: false,
      },
    ],
    languages: "Común y Gith",
  },
  {
    index: "harengon",
    name: "Harengon",
    description:
      "Humanoides con orejas y patas de conejo, veloces y con suerte. Geniales para personajes rápidos que quieran ganar iniciativa y esquivar peligros.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Gatillo de Liebre",
        description: "Sumás tu bono de competencia a las tiradas de iniciativa.",
        active: false,
      },
      {
        name: "Sentidos de Liebre",
        description: "Sos competente en Percepción.",
        active: false,
      },
      {
        name: "Pisada de Suerte",
        description:
          "Cuando fallás una salvación de Destreza, podés usar tu reacción para tirar 1d4 y sumarlo al resultado, posiblemente convirtiéndolo en éxito. No podés usarla si estás derribado o tu velocidad es 0.",
        active: true,
      },
      {
        name: "Salto de Conejo",
        description:
          "Como acción adicional, saltás una distancia igual a 5 veces tu bono de competencia sin provocar ataques de oportunidad. Lo usás una cantidad de veces igual a tu bono de competencia por descanso largo.",
        active: true,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "sea-elf",
    name: "Elfo del Mar",
    description:
      "Elfos adaptados a la vida bajo el agua, con branquias y piel resistente al frío. Ideales para campañas acuáticas o cualquier personaje que quiera moverse igual de bien nadando que caminando.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [],
    flexibleAbilityBonuses: true,
    traits: [
      {
        name: "Hijo del Mar",
        description:
          "Podés respirar aire y agua, y tenés velocidad de nado igual a tu velocidad caminando. Además, recibís la mitad de daño de frío.",
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
        description: "Tirás con ventaja para resistir que te encanten.",
        active: false,
      },
      {
        name: "Amigo del Mar",
        description: "Podés comunicar ideas simples a cualquier bestia que tenga velocidad de nado.",
        active: false,
      },
      {
        name: "Sentidos Agudos",
        description: "Sos competente en Percepción.",
        active: false,
      },
      {
        name: "Trance",
        description:
          "No dormís: meditás 4 horas y descansás igual que otros en 8. Al terminar, ganás competencia en un arma o herramienta hasta tu próximo trance.",
        active: false,
      },
    ],
    languages: "Común y un idioma extra a elección",
  },
  {
    index: "tortle",
    name: "Tortle",
    description:
      "Humanoides con caparazón de tortuga, tranquilos y resistentes. Su armadura natural los hace muy difíciles de derribar; buenos para tanques o cualquiera que quiera aguantar golpes sin depender de armadura.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [
      { ability: "str", bonus: 2 },
      { ability: "wis", bonus: 1 },
    ],
    traits: [
      {
        name: "Garras",
        description:
          "Tus garras sirven para golpes desarmados. Al impactar hacen 1d4 + tu modificador de Fuerza de daño cortante.",
        active: true,
      },
      {
        name: "Aguantar la Respiración",
        description: "Podés contener la respiración hasta una hora.",
        active: false,
      },
      {
        name: "Armadura Natural",
        description:
          "Tu caparazón te da una CA base de 17 (tu modificador de Destreza no se suma). No podés usar armadura, pero sí escudo.",
        active: false,
      },
      {
        name: "Defensa de Caparazón",
        description:
          "Como acción, te retraés en el caparazón: ganás +4 a la CA y ventaja en salvaciones de Fuerza y Constitución, pero quedás derribado, con velocidad 0, desventaja en salvaciones de Destreza y sin poder usar reacciones.",
        active: true,
      },
      {
        name: "Instinto de Supervivencia",
        description: "Sos competente en Supervivencia.",
        active: false,
      },
    ],
    languages: "Común y Acuano",
  },
];
