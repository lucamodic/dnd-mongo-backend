/**
 * Razas que NO están en el SRD API (Owlin, Eladrin), cargadas a mano en español.
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
  traits: { name: string; description: string }[];
  languages: string;
}

export const CUSTOM_RACES: CustomRace[] = [
  {
    index: "owlin",
    name: "Owlin",
    description:
      "Humanoides con forma de búho, sigilosos y observadores, ¡que pueden volar! Perfectos para exploradores, pícaros o magos que quieran una ventaja aérea.",
    size: "Medium",
    speed: 30,
    abilityBonuses: [
      { ability: "dex", bonus: 2 },
      { ability: "wis", bonus: 1 },
    ],
    traits: [
      {
        name: "Vuelo",
        description:
          "Gracias a tus alas tenés una velocidad de vuelo de 30 pies. No podés volar si llevás armadura mediana o pesada.",
      },
      {
        name: "Visión en la Oscuridad (30 m)",
        description:
          "Ves en la penumbra hasta 30 m como si fuera luz, y en la oscuridad total como penumbra (en blanco y negro). Ves mucho mejor de noche que la mayoría.",
      },
      {
        name: "Plumas Silenciosas",
        description: "Tu vuelo es silencioso: sos competente en la habilidad de Sigilo.",
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
    abilityBonuses: [
      { ability: "dex", bonus: 2 },
      { ability: "int", bonus: 1 },
    ],
    traits: [
      {
        name: "Visión en la Oscuridad",
        description:
          "Ves en la penumbra hasta 18 m como si fuera luz, y en la oscuridad como penumbra (en blanco y negro).",
      },
      {
        name: "Linaje Feérico",
        description: "Tirás con ventaja para resistir que te encanten, y la magia no puede dormirte.",
      },
      {
        name: "Paso Feérico",
        description:
          "Como acción adicional te teletransportás hasta 9 m a un lugar que veas. Lo usás un número de veces igual a tu bono de competencia por descanso largo. Según tu estación agrega un efecto extra (miedo, encanto, daño de fuego o teletransportar a un aliado).",
      },
      {
        name: "Trance",
        description:
          "No dormís: meditás 4 horas y descansás igual que otros en 8. Al terminar podés cambiar tu estación.",
      },
      {
        name: "Sentidos Agudos",
        description: "Sos competente en la habilidad de Percepción.",
      },
    ],
    languages: "Común y Élfico",
  },
];
