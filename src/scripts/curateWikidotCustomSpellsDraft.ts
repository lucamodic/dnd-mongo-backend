import fs from "fs/promises";
import path from "path";

const INPUT = path.resolve(__dirname, "../data/generated/wikidot-custom-spells.draft.json");
const OUTPUT = path.resolve(__dirname, "../data/generated/wikidot-custom-spells.es.json");

const DAMAGE_ES: Record<string, string> = {
  acid: "Ácido",
  bludgeoning: "Contundente",
  cold: "Frío",
  fire: "Fuego",
  force: "Fuerza",
  lightning: "Relámpago",
  necrotic: "Necrótico",
  piercing: "Perforante",
  poison: "Veneno",
  psychic: "Psíquico",
  radiant: "Radiante",
  slashing: "Cortante",
  thunder: "Trueno",
};

const SAVE_ES: Record<string, string> = {
  Strength: "Fuerza",
  Dexterity: "Destreza",
  Constitution: "Constitución",
  Intelligence: "Inteligencia",
  Wisdom: "Sabiduría",
  Charisma: "Carisma",
};

const SCHOOL_ACTION_ES: Record<string, string> = {
  Abjuración: "protege, bloquea o anula un efecto peligroso",
  Adivinación: "revela información útil o mejora la percepción mágica",
  Conjuración: "crea, invoca o transporta energía, criaturas u objetos",
  Encantamiento: "afecta la mente, las emociones o la voluntad del objetivo",
  Evocación: "canaliza energía mágica de forma directa",
  Ilusión: "crea un engaño visual, sensorial o mental",
  Nigromancia: "manipula energía vital, muerte o poder necrótico",
  Transmutación: "altera una criatura, objeto o zona",
};

const CLASS_OVERRIDES: Record<string, string[]> = {
  "encode-thoughts": ["bard", "wizard"],
  "fast-friends": ["bard", "cleric", "wizard"],
  "intellect-fortress": ["artificer", "bard", "sorcerer", "warlock", "wizard"],
  "life-transference": ["cleric", "wizard"],
  "motivational-speech": ["bard", "cleric"],
};

function detectDice(text: string) {
  const dice = Array.from(new Set((text.match(/\b\d+d\d+(?:\s*[+-]\s*\d+)?\b/gi) || []).map((d) => d.replace(/\s+/g, ""))));
  return dice[0] || "";
}

function detectDamage(text: string) {
  const lower = text.toLowerCase();
  if (!/\b(takes?|deals?|suffers?|damage increases|extra)\b/.test(lower)) return "";
  for (const [en, es] of Object.entries(DAMAGE_ES)) {
    if (lower.includes(`${en} damage`)) return es;
  }
  return "";
}

function detectSave(text: string) {
  const match = text.match(/\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw\b/i);
  if (!match) return "";
  const normalized = match[1][0].toUpperCase() + match[1].slice(1).toLowerCase();
  return SAVE_ES[normalized] || "";
}

function spanishSummary(spell: any, fullText: string, damageType: string, savingThrow: string, dice: string) {
  const action = SCHOOL_ACTION_ES[spell.school] || "produce un efecto mágico";
  const parts = [`${spell.name} es un hechizo de ${spell.school.toLowerCase()} que ${action}.`];
  if (savingThrow) parts.push(`El objetivo suele resistirlo con una salvación de ${savingThrow}.`);
  if (damageType && dice) parts.push(`Su efecto principal usa ${dice} de daño ${damageType.toLowerCase()}.`);
  else if (damageType) parts.push(`Puede causar daño ${damageType.toLowerCase()}.`);
  else if (dice) parts.push(`Su efecto principal usa ${dice}.`);
  if (/teleport|transport|space you can see|appears in an unoccupied space/i.test(fullText)) parts.push("Incluye movimiento, aparición o reubicación mágica.");
  if (/summon|conjure|spirit|creature appears/i.test(fullText)) parts.push("Invoca o crea una presencia mágica que ayuda durante la escena.");
  if (/until the spell ends|for the duration|concentration/i.test(fullText)) parts.push("Su efecto dura mientras se mantenga la magia indicada.");
  return parts.join(" ").replace(/\bor\b/g, "o");
}

async function run() {
  const draft = JSON.parse(await fs.readFile(INPUT, "utf8"));
  const curated = draft.map((spell: any) => {
    const fullText = [...(spell.sourceDescriptionEn || []), ...(spell.sourceHigherLevelEn || [])].join(" ");
    const dice = detectDice(fullText);
    const damageType = detectDamage(fullText);
    const savingThrow = detectSave(fullText);
    const simpleDescription = spanishSummary(spell, fullText, damageType, savingThrow, dice);
    return {
      index: spell.index,
      name: spell.name,
      level: spell.level,
      school: spell.school,
      castingTime: spell.castingTime,
      range: spell.range,
      duration: String(spell.duration).replace(/\bor\b/g, "o"),
      components: spell.components,
      concentration: spell.concentration,
      ritual: spell.ritual,
      description: [simpleDescription],
      higherLevel: spell.higherLevel || [],
      damageType,
      savingThrow,
      simpleDescription,
      dice,
      classes: spell.classes?.length ? spell.classes : CLASS_OVERRIDES[spell.index] || [],
    };
  });
  await fs.writeFile(OUTPUT, `${JSON.stringify(curated, null, 2)}\n`);
  console.log({ input: INPUT, output: OUTPUT, spells: curated.length });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
