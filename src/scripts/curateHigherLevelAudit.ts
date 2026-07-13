import fs from "fs/promises";
import path from "path";

const INPUT_FILE = path.resolve(__dirname, "../data/generated/wikidot-higher-level-audit.json");
const OUTPUT_FILE = path.resolve(__dirname, "../data/generated/wikidot-higher-level.es.json");

interface HigherLevelAuditRow {
  index: string;
  suggestedHigherLevel?: string[];
  needsManualTranslation?: boolean;
}

interface HigherLevelPatch {
  index: string;
  higherLevel: string[];
}

const manualHigherLevel: Record<string, string[]> = {
  "eldritch-blast": [
    "El hechizo crea más de un rayo a niveles altos: dos rayos a nivel 5, tres a nivel 11 y cuatro a nivel 17. Podés dirigirlos al mismo objetivo o a objetivos distintos; hacé una tirada de ataque separada por cada rayo.",
  ],
  "charm-person": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 2 o superior, podés elegir una criatura adicional por cada nivel de espacio por encima del 1º. Las criaturas deben estar a 30 pies o menos entre sí cuando las elegís.",
  ],
  command: [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 2 o superior, podés afectar una criatura adicional por cada nivel de espacio por encima del 1º. Las criaturas deben estar a 30 pies o menos entre sí cuando las elegís.",
  ],
  "hunters-mark": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 3 o 4, podés mantener la concentración hasta 8 horas. Si usás un espacio de nivel 5 o superior, podés mantener la concentración hasta 24 horas.",
  ],
  aid: [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 3 o superior, los puntos de vida de cada objetivo aumentan 5 adicionales por cada nivel de espacio por encima del 2º.",
  ],
  "animal-messenger": [
    "Si lanzás este hechizo con un espacio de conjuro de nivel 3 o superior, la duración aumenta 48 horas por cada nivel de espacio por encima del 2º.",
  ],
  "hold-person": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 3 o superior, podés elegir un humanoide adicional por cada nivel de espacio por encima del 2º. Los humanoides deben estar a 30 pies o menos entre sí cuando los elegís.",
  ],
  "magic-weapon": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, el bono sube a +2. Cuando usás un espacio de nivel 6 o superior, el bono sube a +3.",
  ],
  "bestow-curse": [
    "Si lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, la duración es concentración, hasta 10 minutos. Si usás un espacio de nivel 5 o superior, la duración es 8 horas. Si usás un espacio de nivel 7 o superior, la duración es 24 horas. Si usás un espacio de nivel 9, dura hasta que sea disipado. Usar un espacio de nivel 5 o superior hace que la duración no requiera concentración.",
  ],
  "call-lightning": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, el daño aumenta 1d10 por cada nivel de espacio por encima del 3º.",
  ],
  "conjure-animals": [
    "Cuando lanzás este hechizo con ciertos espacios de nivel superior, elegís una de las opciones de invocación y aparecen más criaturas: el doble con un espacio de nivel 5, el triple con uno de nivel 7 y el cuádruple con uno de nivel 9.",
  ],
  counterspell: [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, el hechizo interrumpido no tiene efecto si su nivel es igual o menor al nivel del espacio que usaste.",
  ],
  "dispel-magic": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, terminás automáticamente los efectos de un hechizo sobre el objetivo si el nivel de ese hechizo es igual o menor al nivel del espacio que usaste.",
  ],
  "glyph-of-warding": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 4 o superior, el daño de un glifo de runas explosivas aumenta 1d8 por cada nivel de espacio por encima del 3º. Si creás un glifo de conjuro, podés almacenar cualquier hechizo de nivel igual o menor al espacio usado para Glifo de Advertencia.",
  ],
  "conjure-minor-elementals": [
    "Cuando lanzás este hechizo con ciertos espacios de nivel superior, elegís una de las opciones de invocación y aparecen más criaturas: el doble con un espacio de nivel 6 y el triple con uno de nivel 8.",
  ],
  "conjure-woodland-beings": [
    "Cuando lanzás este hechizo con ciertos espacios de nivel superior, elegís una de las opciones de invocación y aparecen más criaturas: el doble con un espacio de nivel 6 y el triple con uno de nivel 8.",
  ],
  "dominate-beast": [
    "Cuando lanzás este hechizo con un espacio de nivel 5, la duración es concentración, hasta 10 minutos. Con un espacio de nivel 6, la duración es concentración, hasta 1 hora. Con un espacio de nivel 7 o superior, la duración es concentración, hasta 8 horas.",
  ],
  "animate-objects": [
    "Si lanzás este hechizo con un espacio de conjuro de nivel 6 o superior, podés animar dos objetos adicionales por cada nivel de espacio por encima del 5º.",
  ],
  "dominate-person": [
    "Cuando lanzás este hechizo con un espacio de nivel 6, la duración es concentración, hasta 10 minutos. Con un espacio de nivel 7, la duración es concentración, hasta 1 hora. Con un espacio de nivel 8 o superior, la duración es concentración, hasta 8 horas.",
  ],
  "flame-strike": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 6 o superior, el daño de fuego o el daño radiante (a tu elección) aumenta 1d6 por cada nivel de espacio por encima del 5º.",
  ],
  geas: [
    "Cuando lanzás este hechizo con un espacio de nivel 7 u 8, la duración es 1 año. Cuando lo lanzás con un espacio de nivel 9, dura hasta que termine por uno de los hechizos mencionados en su descripción.",
  ],
  "hold-monster": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 6 o superior, podés elegir una criatura adicional por cada nivel de espacio por encima del 5º. Las criaturas deben estar a 30 pies o menos entre sí cuando las elegís.",
  ],
  "modify-memory": [
    "Si lanzás este hechizo con un espacio de conjuro de nivel 6 o superior, podés alterar recuerdos de un evento ocurrido hasta hace 7 días (nivel 6), 30 días (nivel 7), 1 año (nivel 8) o cualquier momento del pasado de la criatura (nivel 9).",
  ],
  "planar-binding": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel superior, la duración aumenta a 10 días con un espacio de nivel 6, 30 días con nivel 7, 180 días con nivel 8, o 1 año y 1 día con nivel 9.",
  ],
  "chain-lightning": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 7 o superior, salta un rayo adicional desde el primer objetivo hacia otro objetivo por cada nivel de espacio por encima del 6º.",
  ],
  "create-undead": [
    "Cuando lanzás este hechizo con un espacio de nivel 7, podés animar o reafirmar control sobre cuatro ghouls. Con un espacio de nivel 8, podés animar o reafirmar control sobre cinco ghouls o dos ghasts o wights. Con un espacio de nivel 9, podés animar o reafirmar control sobre seis ghouls, tres ghasts o wights, o dos momias.",
  ],
  "globe-of-invulnerability": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 7 o superior, la barrera bloquea hechizos de un nivel más alto por cada nivel de espacio por encima del 6º.",
  ],
  "mass-suggestion": [
    "Cuando lanzás este hechizo con un espacio de nivel 7, la duración es 10 días. Con un espacio de nivel 8, la duración es 30 días. Con un espacio de nivel 9, la duración es 1 año y 1 día.",
  ],
  "wall-of-ice": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 7 o superior, el daño que hace el muro al aparecer aumenta 2d6 y el daño por atravesar el aire helado aumenta 1d6 por cada nivel de espacio por encima del 6º.",
  ],
  "wall-of-thorns": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 7 o superior, ambos tipos de daño aumentan 1d8 por cada nivel de espacio por encima del 6º.",
  ],
  "conjure-celestial": [
    "Cuando lanzás este hechizo con un espacio de nivel 9, invocás un celestial con valor de desafío 5 o menor.",
  ],
  etherealness: [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 8 o superior, podés elegir hasta tres criaturas voluntarias (incluyéndote) por cada nivel de espacio por encima del 7º. Las criaturas deben estar a 10 pies o menos de vos cuando lanzás el hechizo.",
  ],
  "dominate-monster": [
    "Cuando lanzás este hechizo con un espacio de nivel 9, la duración es concentración, hasta 8 horas.",
  ],
};

const curatedHigherLevelOverrides: Record<string, string[]> = {
  "ice-knife": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 2 o superior, el daño de frío aumenta 1d6 por cada nivel de espacio por encima del 1º.",
  ],
  "branding-smite": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 3 o superior, el daño adicional aumenta 1d6 por cada nivel de espacio por encima del 2º.",
  ],
  "ice-storm": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 5 o superior, el daño contundente aumenta 1d8 por cada nivel de espacio por encima del 4º.",
  ],
  "delayed-blast-fireball": [
    "Cuando lanzás este hechizo con un espacio de conjuro de nivel 8 o superior, el daño base aumenta 1d6 por cada nivel de espacio por encima del 7º.",
  ],
};

async function run() {
  const audit = JSON.parse(await fs.readFile(INPUT_FILE, "utf8")) as HigherLevelAuditRow[];
  if (!Array.isArray(audit)) throw new Error("El audit debe ser un array");

  const patches: HigherLevelPatch[] = audit.map((row) => {
    if (!row.index) throw new Error("Fila sin index");
    const higherLevel =
      curatedHigherLevelOverrides[row.index] ||
      (row.needsManualTranslation ? manualHigherLevel[row.index] : row.suggestedHigherLevel);
    if (!higherLevel?.length) throw new Error(`${row.index}: falta higherLevel curado`);
    return { index: row.index, higherLevel };
  });

  const missingManual = audit
    .filter((row) => row.needsManualTranslation && !manualHigherLevel[row.index])
    .map((row) => row.index);
  if (missingManual.length) {
    throw new Error(`Faltan traducciones manuales: ${missingManual.join(", ")}`);
  }

  await fs.writeFile(OUTPUT_FILE, `${JSON.stringify(patches, null, 2)}\n`);
  console.log({
    input: INPUT_FILE,
    output: OUTPUT_FILE,
    total: patches.length,
    manual: Object.keys(manualHigherLevel).length,
  });
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
