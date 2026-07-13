import axios from "axios";

export interface WikidotIndexSpell {
  index: string;
  name: string;
  level: number;
  url: string;
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  components: string[];
  ua: boolean;
}

export interface WikidotSpell extends WikidotIndexSpell {
  source: string;
  descriptionEn: string[];
  higherLevelEn: string[];
  classes: string[];
  ritual: boolean;
  concentration: boolean;
}

const BASE_URL = "https://dnd5e.wikidot.com";

const SCHOOL_ES: Record<string, string> = {
  Abjuration: "Abjuración",
  Conjuration: "Conjuración",
  Divination: "Adivinación",
  Enchantment: "Encantamiento",
  Evocation: "Evocación",
  Illusion: "Ilusión",
  Necromancy: "Nigromancia",
  Transmutation: "Transmutación",
};

const CLASS_INDEX: Record<string, string> = {
  Artificer: "artificer",
  Bard: "bard",
  Cleric: "cleric",
  Druid: "druid",
  Paladin: "paladin",
  Ranger: "ranger",
  Sorcerer: "sorcerer",
  Warlock: "warlock",
  Wizard: "wizard",
};

export const spellIndexFromName = (name: string) =>
  name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function translateSchool(school: string) {
  return SCHOOL_ES[school.replace(/\s+/g, " ").trim()] || school;
}

export function translateCastingTime(value: string) {
  return value
    .replace(/\b1 Action\b/i, "1 acción")
    .replace(/\b1 Bonus Action\b/i, "1 acción adicional")
    .replace(/\b1 Reaction\b/i, "1 reacción")
    .replace(/\b1 Minute\b/i, "1 minuto")
    .replace(/\b10 Minutes\b/i, "10 minutos")
    .replace(/\b1 Hour\b/i, "1 hora")
    .replace(/\b12 hours\b/i, "12 horas");
}

export function translateRange(value: string) {
  return value
    .replace(/\((\d+)-foot radius\)/gi, "($1 pies de radio)")
    .replace(/\((\d+)-foot cone\)/gi, "($1 pies en cono)")
    .replace(/\((\d+)-foot cube\)/gi, "($1 pies en cubo)")
    .replace(/\((\d+)-foot line\)/gi, "($1 pies en línea)")
    .replace(/\bSelf\b/i, "Personal")
    .replace(/\bTouch\b/i, "Toque")
    .replace(/\bSight\b/i, "Vista")
    .replace(/\bUnlimited\b/i, "Ilimitado")
    .replace(/\bor\b/gi, "o")
    .replace(/\b(\d[\d,]*)\s*feet\b/gi, "$1 pies")
    .replace(/\b(\d[\d,]*)\s*Feet\b/g, "$1 pies")
    .replace(/\bfoot\b/gi, "pies")
    .replace(/\bmile\b/gi, "milla")
    .replace(/\bmiles\b/gi, "millas");
}

export function translateDuration(value: string) {
  return value
    .replace(/Concentration,?\s*up to/gi, "Concentración, hasta")
    .replace(/\b1 round\b/i, "1 ronda")
    .replace(/\b1 minute\b/i, "1 minuto")
    .replace(/\b1 hour\b/i, "1 hora")
    .replace(/\bInstantaneous\b/i, "Instantáneo")
    .replace(/\bUntil dispelled\b/i, "Hasta disiparlo")
    .replace(/\bSpecial\b/i, "Especial")
    .replace(/\brounds?\b/gi, "rondas")
    .replace(/\bminutes?\b/gi, "minutos")
    .replace(/\bhours?\b/gi, "horas")
    .replace(/\bdays?\b/gi, "días");
}

export function translateHigherLevel(text: string) {
  const withoutPrefix = text.replace(/^At Higher Levels\.\s*/i, "").trim();

  const cantripDamage = withoutPrefix.match(/^(?:This|The) spell[’']s damage increases by (\d+d\d+) when you reach 5th level \(([^)]+)\), 11th level \(([^)]+)\), and 17th level \(([^)]+)\)\.?$/i);
  if (cantripDamage) {
    return `El daño del hechizo aumenta ${cantripDamage[1]} cuando llegás a nivel 5 (${cantripDamage[2]}), nivel 11 (${cantripDamage[3]}) y nivel 17 (${cantripDamage[4]}).`;
  }

  const additionalTarget = withoutPrefix.match(/^When you cast this spell using a spell slot of (\d)(?:st|nd|rd|th) level or higher, you can (?:target|affect) one additional (creature|beast) for each slot level above (\d)(?:st|nd|rd|th)\.?$/i);
  if (additionalTarget) {
    const target = additionalTarget[2].toLowerCase() === "beast" ? "bestia" : "criatura";
    return `Cuando lanzás este hechizo con un espacio de conjuro de nivel ${additionalTarget[1]} o superior, podés afectar una ${target} adicional por cada nivel de espacio por encima del ${additionalTarget[3]}º.`;
  }

  const additionalDart = withoutPrefix.match(/^When you cast this spell using a spell slot of (\d)(?:st|nd|rd|th) level or higher, the spell creates one more dart for each slot level above (\d)(?:st|nd|rd|th)\.?$/i);
  if (additionalDart) {
    return `Cuando lanzás este hechizo con un espacio de conjuro de nivel ${additionalDart[1]} o superior, crea un dardo adicional por cada nivel de espacio por encima del ${additionalDart[2]}º.`;
  }

  return withoutPrefix
    .replace(/^At Higher Levels\.\s*/i, "")
    .replace(/When you cast this spell using a spell slot of (\d)(?:st|nd|rd|th) level or higher,\s*/i, "Cuando lanzás este hechizo con un espacio de conjuro de nivel $1 o superior, ")
    .replace(/for each slot level above (\d)(?:st|nd|rd|th)/gi, "por cada nivel de espacio por encima del $1º")
    .replace(/the (.+?) damage increases by ([0-9]+d[0-9]+)\s*/i, "el daño de $1 aumenta $2 ")
    .replace(/the damage increases by ([0-9]+d[0-9]+)\s*/i, "el daño aumenta $1 ")
    .replace(/the healing increases by ([0-9]+d[0-9]+)\s*/i, "la curación aumenta $1 ")
    .replace(/one additional dart/gi, "un dardo adicional")
    .replace(/one additional target/gi, "un objetivo adicional")
    .trim();
}

export function translateHigherLevelDraft(text: string) {
  const translated = translateHigherLevel(text);
  if (translated === text || /\b(When you|At Higher Levels|level|damage|target|spell slot|creature|beast|you can)\b/i.test(translated)) return "";
  return translated;
}

export function toCustomSpellDraft(spell: WikidotSpell) {
  return {
    index: spell.index,
    name: spell.name,
    level: spell.level,
    school: translateSchool(spell.school),
    castingTime: translateCastingTime(spell.castingTime),
    range: translateRange(spell.range),
    duration: translateDuration(spell.duration),
    components: spell.components,
    concentration: spell.concentration,
    ritual: spell.ritual,
    description: [] as string[],
    higherLevel: spell.higherLevelEn.map(translateHigherLevelDraft).filter(Boolean),
    damageType: "",
    savingThrow: "",
    simpleDescription: "",
    dice: "",
    classes: spell.classes,
    sourceUrl: spell.url,
    sourceBook: spell.source,
    sourceDescriptionEn: spell.descriptionEn,
    sourceHigherLevelEn: spell.higherLevelEn,
    needsSpanishReview: true,
  };
}

export async function fetchHtml(url: string) {
  const { data } = await axios.get<string>(url, {
    timeout: 30000,
    headers: { "user-agent": "dnd-mongo-backend spell importer (local dev)" },
  });
  return data;
}

export async function scrapeWikidotSpellIndex() {
  const html = await fetchHtml(`${BASE_URL}/spells`);
  const tabs = [...html.matchAll(/<div id="wiki-tab-0-(\d+)"[\s\S]*?<table class="wiki-content-table">([\s\S]*?)<\/table>/g)];
  const spells: WikidotIndexSpell[] = [];

  for (const tab of tabs) {
    const level = Number(tab[1]);
    const table = tab[2];
    const rows = [...table.matchAll(/<tr>\s*<td><a href="([^"]+)">([\s\S]*?)<\/a><\/td>\s*<td><em>([\s\S]*?)<\/em><\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g)];
    for (const row of rows) {
      const name = clean(row[2]);
      spells.push({
        index: spellIndexFromName(name),
        name,
        level,
        url: `${BASE_URL}${row[1]}`,
        school: clean(row[3]).replace(/\s+[A-Z]{1,2}$/, ""),
        castingTime: clean(row[4]),
        range: clean(row[5]),
        duration: clean(row[6]),
        components: clean(row[7]).split(",").map((c) => c.trim()).filter(Boolean),
        ua: /\(UA\)/i.test(name) || /\/ua-/i.test(row[1]),
      });
    }
  }

  return spells;
}

export async function scrapeWikidotSpell(spell: WikidotIndexSpell): Promise<WikidotSpell> {
  const html = await fetchHtml(spell.url);
  const content = pageContent(html);
  const textLines = content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .split("\n")
    .map((line) => clean(line))
    .filter(Boolean);

  const source = textLines.find((line) => line.startsWith("Source:"))?.replace(/^Source:\s*/, "") || "";
  const start = textLines.findIndex((line) => /^Casting Time:/i.test(line));
  const spellListsIndex = textLines.findIndex((line) => /^Spell Lists\./i.test(line));
  const bodyLines = textLines
    .slice(start + 4, spellListsIndex === -1 ? undefined : spellListsIndex)
    .filter((line) => !/^(Range|Components|Duration|Casting Time):/i.test(line));

  const higherLevelIndex = bodyLines.findIndex((line) => /^At Higher Levels\./i.test(line));
  const descriptionEn = higherLevelIndex === -1 ? bodyLines : bodyLines.slice(0, higherLevelIndex);
  const higherLevelEn = higherLevelIndex === -1 ? [] : [bodyLines.slice(higherLevelIndex).join(" ")];

  const classHtml = content.match(/Spell Lists\.[\s\S]*?(?:<\/p>|<div|<p><em><sup|$)/i)?.[0] || "";
  const classes = [...classHtml.matchAll(/\/spells:([^"]+)">([^<]+)<\/a>/g)]
    .map((match) => CLASS_INDEX[clean(match[2])] || match[1])
    .filter((classIndex) => !["eldritch-knight", "arcane-trickster"].includes(classIndex));

  return {
    ...spell,
    source,
    descriptionEn,
    higherLevelEn,
    classes: Array.from(new Set(classes)),
    ritual: /\bR\b/.test(spell.components.join(",")) || /\^R/.test(html) || /ritual/i.test(spell.castingTime),
    concentration: /^Concentration/i.test(spell.duration),
  };
}

function pageContent(html: string) {
  return html.match(/<div id="page-content">([\s\S]*?)<div class="page-tags">/)?.[1]
    || html.match(/<div id="page-content">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/)?.[1]
    || html;
}

function clean(input: string) {
  return decodeHtml(
    input
      .replace(/<sup>.*?<\/sup>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function decodeHtml(input: string) {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
