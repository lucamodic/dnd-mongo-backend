/**
 * Hechizos "recomendados" (los mejores/más útiles para principiantes) por clase, por índice del SRD.
 * El script apply:recommended marca estos en la tabla spells_classes; al crear un personaje se cargan
 * como sus hechizos conocidos por defecto (después puede cambiarlos). Solo se marcan los que realmente
 * estén linkeados a la clase, así que sobrar algún índice no rompe nada.
 */
export const RECOMMENDED_SPELLS: Record<string, string[]> = {
  wizard: [
    "fire-bolt", "ray-of-frost", "mage-hand", "prestidigitation", "minor-illusion",
    "magic-missile", "shield", "mage-armor", "sleep", "thunderwave", "detect-magic",
    "misty-step", "invisibility", "fireball",
  ],
  sorcerer: [
    "fire-bolt", "ray-of-frost", "mage-hand", "prestidigitation",
    "magic-missile", "shield", "burning-hands", "thunderwave", "sleep",
    "mirror-image", "misty-step", "scorching-ray", "fireball",
  ],
  cleric: [
    "sacred-flame", "guidance", "light",
    "cure-wounds", "healing-word", "bless", "guiding-bolt", "shield-of-faith", "sanctuary",
    "lesser-restoration", "spiritual-weapon", "spirit-guardians", "revivify",
  ],
  druid: [
    "druidcraft", "produce-flame", "guidance", "shillelagh",
    "cure-wounds", "healing-word", "entangle", "thunderwave", "faerie-fire", "goodberry",
    "moonbeam", "flaming-sphere", "call-lightning",
  ],
  bard: [
    "vicious-mockery", "mage-hand", "minor-illusion", "prestidigitation",
    "cure-wounds", "healing-word", "faerie-fire", "charm-person", "heroism", "hideous-laughter",
    "invisibility", "suggestion", "hypnotic-pattern",
  ],
  warlock: [
    "eldritch-blast", "chill-touch", "mage-hand", "minor-illusion", "prestidigitation",
    "hellish-rebuke", "charm-person", "hold-person", "misty-step", "darkness",
    "hypnotic-pattern", "fear",
  ],
  paladin: [
    "bless", "cure-wounds", "shield-of-faith", "divine-favor", "heroism",
    "lesser-restoration", "aid", "find-steed", "branding-smite", "magic-weapon",
  ],
  ranger: [
    "hunters-mark", "cure-wounds", "goodberry", "longstrider", "jump",
    "spike-growth", "pass-without-trace", "lesser-restoration", "silence",
  ],
  artificer: [
    "fire-bolt", "mage-hand", "guidance", "mending",
    "cure-wounds", "detect-magic", "faerie-fire", "absorb-elements", "catapult", "identify",
    "magic-weapon", "heat-metal",
  ],
};
