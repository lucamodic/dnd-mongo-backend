/**
 * Mapea las claves de `class_specific` del SRD a recursos mostrables en español.
 * `trackable`: si son "pips" que el jugador gasta y recupera al descansar (furias, ki...),
 * o solo un dato informativo (bonus de daño de furia, dado de artes marciales...).
 * `format`: cómo mostrar el valor informativo (por defecto el número tal cual).
 */
export interface ResourceMeta {
  label: string;
  description: string;
  trackable: boolean;
}

export const CLASS_RESOURCE_META: Record<string, ResourceMeta> = {
  rage_count: {
    label: "Furias",
    description: "Veces que podés entrar en furia por día. En furia pegás más fuerte y aguantás mejor los golpes. Se recuperan al descansar.",
    trackable: true,
  },
  ki_points: {
    label: "Puntos de Ki",
    description: "Energía interior que gastás para hacer maniobras de monje (golpes extra, esquivar, correr por paredes). Se recuperan al descansar un rato.",
    trackable: true,
  },
  sorcery_points: {
    label: "Puntos de Hechicería",
    description: "Energía mágica que gastás para modificar tus hechizos (Metamagia) o crear espacios de conjuro. Se recuperan al descansar bien.",
    trackable: true,
  },
  channel_divinity_charges: {
    label: "Canalizar Divinidad",
    description: "Usos de tu poder divino para efectos especiales (expulsar no-muertos, etc.). Se recuperan al descansar.",
    trackable: true,
  },
  // Informativos (no se gastan como pips):
  rage_damage_bonus: {
    label: "Daño de Furia",
    description: "Daño extra que sumás a tus ataques cuerpo a cuerpo mientras estás en furia.",
    trackable: false,
  },
  brutal_critical_dice: {
    label: "Crítico Brutal",
    description: "Dados de daño extra que tirás cuando hacés un golpe crítico.",
    trackable: false,
  },
  martial_arts: {
    label: "Artes Marciales",
    description: "El dado de daño de tus golpes sin arma y armas de monje.",
    trackable: false,
  },
  unarmored_movement: {
    label: "Movimiento sin Armadura",
    description: "Velocidad extra (en pies) que ganás mientras no uses armadura ni escudo.",
    trackable: false,
  },
  metamagic_known: {
    label: "Metamagias",
    description: "Cantidad de trucos de Metamagia que conocés para modificar tus hechizos.",
    trackable: false,
  },
  invocations_known: {
    label: "Invocaciones",
    description: "Poderes mágicos permanentes de brujo que vas eligiendo y siempre tenés disponibles.",
    trackable: false,
  },
};

/** Formatea el valor de martial_arts (viene como objeto {dice_count, dice_value}). */
export const formatMartialArts = (v: any): number | string => {
  if (v && typeof v === "object" && v.dice_value) return `${v.dice_count || 1}d${v.dice_value}` as string;
  return 0;
};
