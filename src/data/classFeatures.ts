/**
 * Descripciones simples (español, para principiantes) de las habilidades de clase del SRD.
 * El importer llama a `resolveFeatureES(index, name)`: primero normaliza el índice del SRD a una
 * clave canónica (colapsando variantes por dado/uso/nivel) y después busca la descripción.
 * Si no hay match, devuelve el nombre en inglés como fallback (raro en niveles bajos).
 *
 * `active`: true = es un poder que activás (gasta una acción/reacción o un recurso limitado por
 * descanso); false = es un rasgo de fondo/pasivo (proficiencias, bonos automáticos, marcadores de
 * elección de subclase). La app muestra los `active` en la sección principal y el resto en
 * "Información avanzada".
 */
export interface FeatureDef {
  name: string;
  description: string;
  active: boolean;
}

/** Reglas para colapsar índices con variantes (bardic-inspiration-d8, channel-divinity-2-rest, etc.). */
const CANONICAL_RULES: [RegExp, string][] = [
  [/ability-score-improvement/, "ability-score-improvement"],
  [/^spellcasting/, "spellcasting"],
  [/bardic-inspiration/, "bardic-inspiration"],
  [/song-of-rest/, "song-of-rest"],
  [/channel-divinity-turn-undead/, "turn-undead"],
  [/destroy-undead/, "destroy-undead"],
  [/channel-divinity/, "channel-divinity"],
  [/brutal-critical/, "brutal-critical"],
  [/(domain-spells|oath-spells)/, "bonus-spells"],
  [/wild-shape/, "wild-shape"],
  [/extra-attack/, "extra-attack"],
  [/expertise/, "expertise"],
  [/unarmored-movement/, "unarmored-movement"],
  [/metamagic/, "metamagic"],
  [/favored-enemy/, "favored-enemy"],
  [/natural-explorer/, "natural-explorer"],
  [/indomitable/, "indomitable"],
  [/action-surge/, "action-surge"],
  [/fighting-style/, "fighting-style"],
  [/second-wind/, "second-wind"],
  [
    /(primal-path|bard-college|divine-domain|druid-circle|martial-archetype|monastic-tradition|sacred-oath|ranger-archetype|roguish-archetype|sorcerous-origin|otherworldly-patron|arcane-tradition)$/,
    "subclass",
  ],
  [/-improvement-\d+$/, "subclass-improvement"],
];

const FEATURE_ES: Record<string, FeatureDef> = {
  // Genéricas
  "ability-score-improvement": {
    name: "Mejora de Característica",
    description: "Subís tus características: podés sumar +2 a una, o +1 a dos distintas. Así te volvés mejor en lo tuyo.",
    active: false,
  },
  spellcasting: {
    name: "Lanzamiento de Conjuros",
    description: "Podés lanzar conjuros de tu clase usando tus espacios de conjuro. Cada espacio se gasta al lanzar y se recupera al descansar.",
    active: false,
  },
  subclass: {
    name: "Elegís tu Especialidad",
    description: "Elegís tu subclase: el camino que define tu estilo y te va dando poderes propios a medida que subís de nivel.",
    active: false,
  },
  "subclass-improvement": {
    name: "Poder de tu Especialidad",
    description: "Ganás una nueva habilidad de la subclase que elegiste antes.",
    active: false,
  },
  "bonus-spells": {
    name: "Conjuros Adicionales",
    description: "Tu especialidad te regala conjuros extra que siempre tenés preparados, sin ocupar tus espacios de aprendizaje.",
    active: false,
  },
  "extra-attack": {
    name: "Ataque Adicional",
    description: "Cuando usás la acción de Atacar, hacés dos ataques en vez de uno. ¡El doble de golpes!",
    active: true,
  },
  expertise: {
    name: "Pericia",
    description: "Elegís algunas competencias y duplicás tu bono en ellas: te volvés un verdadero experto.",
    active: false,
  },
  "fighting-style": {
    name: "Estilo de Combate",
    description: "Elegís una forma de pelear en la que te especializás (arco, dos armas, defensa, etc.) y ganás un bonus permanente por eso.",
    active: false,
  },

  // Barbarian
  rage: {
    name: "Furia",
    description: "Como acción adicional entrás en furia: pegás más fuerte cuerpo a cuerpo y recibís la mitad de daño físico. Dura hasta que dejes de pelear.",
    active: true,
  },
  "barbarian-unarmored-defense": {
    name: "Defensa sin Armadura",
    description: "Sin armadura, tu Clase de Armadura es 10 + tu Destreza + tu Constitución. Sos duro incluso en cuero.",
    active: false,
  },
  "reckless-attack": {
    name: "Ataque Temerario",
    description: "Atacás con ventaja (tirás dos dados y elegís el mejor), pero a cambio te pegan más fácil a vos ese turno.",
    active: true,
  },
  "danger-sense": {
    name: "Sentir el Peligro",
    description: "Tirás con ventaja para esquivar efectos que ves venir, como trampas y hechizos de área.",
    active: false,
  },
  "fast-movement": {
    name: "Movimiento Veloz",
    description: "Tu velocidad aumenta mientras no lleves armadura pesada.",
    active: false,
  },
  "feral-instinct": {
    name: "Instinto Feral",
    description: "Tirás con ventaja la iniciativa y podés actuar aunque te agarren desprevenido, si entrás en furia.",
    active: false,
  },
  "brutal-critical": {
    name: "Crítico Brutal",
    description: "Cuando hacés un golpe crítico cuerpo a cuerpo, tirás dados de daño extra.",
    active: false,
  },

  // Bard
  "bardic-inspiration": {
    name: "Inspiración de Bardo",
    description: "Como acción adicional le das un dado a un aliado; puede sumarlo a un ataque, prueba o salvación. Usos igual a tu Carisma.",
    active: true,
  },
  "jack-of-all-trades": {
    name: "Aprendiz de Todo",
    description: "Sumás la mitad de tu bono de competencia a cualquier prueba que no tenga ya tu competencia. Sabés un poco de todo.",
    active: false,
  },
  "song-of-rest": {
    name: "Canción de Descanso",
    description: "Cuando el grupo hace un descanso corto, tu música los cura un poco extra.",
    active: false,
  },
  "font-of-inspiration": {
    name: "Fuente de Inspiración",
    description: "Recuperás tus usos de Inspiración de Bardo también en descansos cortos, no solo largos.",
    active: false,
  },
  countercharm: {
    name: "Contraencanto",
    description: "Con tu música, das ventaja a vos y tus aliados para resistir el miedo y los encantamientos.",
    active: true,
  },
  "magical-secrets": {
    name: "Secretos Mágicos",
    description: "Aprendés conjuros de CUALQUIER clase, no solo de bardo. Robás la mejor magia de todos.",
    active: false,
  },

  // Cleric
  "channel-divinity": {
    name: "Canalizar Divinidad",
    description: "Usás el poder de tu dios para un efecto especial (según tu dominio). Se recupera al descansar.",
    active: true,
  },
  "turn-undead": {
    name: "Expulsar No-Muertos",
    description: "Obligás a los no-muertos cercanos a huir de vos por un rato si no resisten. Ideal contra zombis y esqueletos.",
    active: true,
  },
  "destroy-undead": {
    name: "Destruir No-Muertos",
    description: "Los no-muertos débiles que expulsás son destruidos al instante en vez de solo huir.",
    active: false,
  },
  "divine-intervention": {
    name: "Intervención Divina",
    description: "Le pedís ayuda directa a tu dios; hay chance de que responda con un milagro.",
    active: true,
  },

  // Druid
  druidic: {
    name: "Druídico",
    description: "Conocés el idioma secreto de los druidas y podés dejar mensajes ocultos en la naturaleza.",
    active: false,
  },
  "wild-shape": {
    name: "Forma Salvaje",
    description: "Te transformás en un animal que hayas visto, con sus capacidades. Usos que se recuperan al descansar.",
    active: true,
  },

  // Fighter
  "second-wind": {
    name: "Segundo Aliento",
    description: "Como acción adicional recuperás algo de vida en plena pelea. Una vez por descanso.",
    active: true,
  },
  "action-surge": {
    name: "Oleada de Acción",
    description: "Una vez por descanso, ganás una acción extra en tu turno. Perfecto para un momento clave.",
    active: true,
  },
  indomitable: {
    name: "Indómito",
    description: "Cuando fallás una salvación, podés repetirla. Una vez por descanso.",
    active: true,
  },

  // Monk
  "monk-unarmored-defense": {
    name: "Defensa sin Armadura",
    description: "Sin armadura ni escudo, tu Clase de Armadura es 10 + tu Destreza + tu Sabiduría.",
    active: false,
  },
  "martial-arts": {
    name: "Artes Marciales",
    description: "Peleás con puños y armas de monje usando Destreza, y podés dar un golpe extra como acción adicional.",
    active: false,
  },
  ki: {
    name: "Ki",
    description: "Energía interior que gastás en maniobras especiales (ver abajo). Recuperás todos los puntos al descansar un rato.",
    active: true,
  },
  "flurry-of-blows": {
    name: "Lluvia de Golpes",
    description: "Gastás 1 de Ki para dar dos golpes sin arma extra como acción adicional.",
    active: true,
  },
  "patient-defense": {
    name: "Defensa Paciente",
    description: "Gastás 1 de Ki para Esquivar como acción adicional: te pegan con desventaja.",
    active: true,
  },
  "step-of-the-wind": {
    name: "Paso del Viento",
    description: "Gastás 1 de Ki para Correr o Retirarte como acción adicional, y tu salto se duplica.",
    active: true,
  },
  "deflect-missiles": {
    name: "Desviar Proyectiles",
    description: "Como reacción, reducís mucho el daño de un ataque a distancia, y hasta podés devolverlo.",
    active: true,
  },
  "slow-fall": {
    name: "Caída Lenta",
    description: "Como reacción, reducís el daño de una caída. Los monjes no se lastiman fácil.",
    active: false,
  },
  "stunning-strike": {
    name: "Golpe Aturdidor",
    description: "Gastás 1 de Ki al pegar para intentar aturdir al enemigo: si falla la salvación, queda sin poder actuar.",
    active: true,
  },
  "ki-empowered-strikes": {
    name: "Golpes con Ki",
    description: "Tus golpes sin arma cuentan como mágicos, así que dañan a criaturas que resisten armas normales.",
    active: false,
  },
  "monk-evasion": {
    name: "Evasión",
    description: "Cuando esquivás un efecto de área (salvación de Destreza), no recibís daño si lo pasás, y la mitad si lo fallás.",
    active: false,
  },
  "stillness-of-mind": {
    name: "Mente Serena",
    description: "En tu turno podés cortar por vos mismo cualquier encanto o miedo que te afecte.",
    active: true,
  },
  "purity-of-body": {
    name: "Pureza de Cuerpo",
    description: "Te volvés inmune a enfermedades y venenos. Tu cuerpo es un templo.",
    active: false,
  },

  // Paladin
  "divine-sense": {
    name: "Sentido Divino",
    description: "Como acción, detectás celestiales, infernales y no-muertos cercanos. Usos igual a tu Carisma.",
    active: true,
  },
  "lay-on-hands": {
    name: "Imposición de Manos",
    description: "Tenés una reserva de curación (5 × tu nivel) que repartís tocando a los heridos. También cura enfermedad o veneno.",
    active: true,
  },
  "divine-smite": {
    name: "Castigo Divino",
    description: "Cuando pegás con un arma, gastás un espacio de conjuro para hacer daño radiante extra. ¡Devastador contra no-muertos!",
    active: true,
  },
  "divine-health": {
    name: "Salud Divina",
    description: "La magia sagrada te hace inmune a las enfermedades.",
    active: false,
  },
  "aura-of-protection": {
    name: "Aura de Protección",
    description: "Vos y tus aliados cercanos suman tu Carisma a todas sus salvaciones. Protegés al grupo con tu presencia.",
    active: false,
  },
  "aura-of-courage": {
    name: "Aura de Coraje",
    description: "Vos y tus aliados cercanos no pueden ser asustados. Tu valor es contagioso.",
    active: false,
  },

  // Ranger
  "favored-enemy": {
    name: "Enemigo Predilecto",
    description: "Elegís un tipo de criatura que conocés muy bien: te va mejor rastreándola y recordando datos sobre ella.",
    active: false,
  },
  "natural-explorer": {
    name: "Explorador Natural",
    description: "Elegís un tipo de terreno donde sos un experto: viajás más rápido, no te perdés y estás más alerta ahí.",
    active: false,
  },
  "primeval-awareness": {
    name: "Conciencia Primigenia",
    description: "Gastás un espacio de conjuro para sentir si hay ciertos tipos de criaturas en la zona.",
    active: true,
  },
  "lands-stride": {
    name: "Paso por la Tierra",
    description: "Te movés sin problema por terreno difícil natural y plantas, y esquivás mejor sus peligros.",
    active: false,
  },
  "hide-in-plain-sight": {
    name: "Ocultarse a Plena Vista",
    description: "Podés camuflarte tan bien que te volvés muy difícil de detectar mientras estés quieto.",
    active: true,
  },

  // Rogue
  "sneak-attack": {
    name: "Ataque Furtivo",
    description: "Una vez por turno, si tenés ventaja o un aliado al lado del objetivo, hacés un montón de daño extra. Tu golpe marca.",
    active: true,
  },
  "thieves-cant": {
    name: "Jerga de Ladrones",
    description: "Conocés el código secreto de los pícaros para pasar mensajes ocultos sin que otros entiendan.",
    active: false,
  },
  "cunning-action": {
    name: "Acción Astuta",
    description: "Cada turno podés Correr, Retirarte o Esconderte como acción adicional. Sos escurridizo.",
    active: true,
  },
  "uncanny-dodge": {
    name: "Esquiva Asombrosa",
    description: "Como reacción, cuando un ataque te acierta, reducís su daño a la mitad.",
    active: true,
  },
  "rogue-evasion": {
    name: "Evasión",
    description: "Cuando esquivás un efecto de área (salvación de Destreza), no recibís daño si lo pasás, y la mitad si lo fallás.",
    active: false,
  },

  // Sorcerer
  "font-of-magic": {
    name: "Fuente de Magia",
    description: "Ganás Puntos de Hechicería que podés convertir en espacios de conjuro extra, o gastar en Metamagia.",
    active: false,
  },
  "flexible-casting": {
    name: "Lanzamiento Flexible",
    description: "Convertís Puntos de Hechicería en espacios de conjuro (o al revés) cuando lo necesitás.",
    active: true,
  },
  metamagic: {
    name: "Metamagia",
    description: "Modificás tus hechizos gastando Puntos de Hechicería: lanzarlos más rápido, a dos objetivos, más lejos, etc.",
    active: true,
  },

  // Warlock
  "pact-magic": {
    name: "Magia de Pacto",
    description: "Lanzás conjuros con pocos espacios pero siempre al nivel más alto, y los recuperás en descansos cortos.",
    active: false,
  },
  "eldritch-invocations": {
    name: "Invocaciones Sobrenaturales",
    description: "Poderes mágicos permanentes que elegís y siempre tenés disponibles (ver visión, hablar idiomas, mejorar tu magia...).",
    active: false,
  },
  "pact-boon": {
    name: "Don del Pacto",
    description: "Tu mecenas te da un regalo: un arma mágica, un libro de conjuros, o un familiar especial.",
    active: false,
  },

  // Wizard
  "arcane-recovery": {
    name: "Recuperación Arcana",
    description: "Una vez por día, en un descanso corto, recuperás algunos espacios de conjuro gastados. Estudiar rinde.",
    active: true,
  },
};

export function resolveFeatureES(index: string, fallbackName: string): FeatureDef {
  if (FEATURE_ES[index]) return FEATURE_ES[index];
  for (const [re, key] of CANONICAL_RULES) {
    if (re.test(index) && FEATURE_ES[key]) return FEATURE_ES[key];
  }
  return { name: fallbackName, description: "", active: false };
}
