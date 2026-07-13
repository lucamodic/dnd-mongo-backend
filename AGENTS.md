# AGENTS.md — dnd-mongo-backend

Guía de ingeniería para agentes de IA (y humanos) que trabajen en este repo.

## Qué es
Backend REST para una app de D&D pensada para **principiantes**. Guarda usuarios, personajes,
razas, clases, hechizos y un **turn tracker universal** compartido por un grupo de amigos.
Se hostea en **Vercel** (serverless) y usa **MongoDB Atlas** vía Mongoose.

## Stack
- **Express 4** + **TypeScript**
- **Mongoose 8** (MongoDB)
- **jsonwebtoken** (auth JWT) + **bcryptjs** (hash de passwords)
- **axios** (importar datos del SRD de dnd5eapi.co)
- **zod** (validación puntual)

## Arquitectura
Patrón modular por feature. Cada módulo en `src/modules/<feature>/`:

```
route.ts        -> define endpoints y middlewares (requireAuth / requireAdmin)
controller.ts   -> lee req, llama al service, responde con ok()/fail()
service.ts      -> lógica de negocio + acceso a modelos Mongoose (tira HttpError)
```

Otras carpetas:
```
src/db/connect.ts     -> conexión Mongoose cacheada (OBLIGATORIO en serverless)
src/db/models/*.ts    -> esquemas Mongoose
src/utils/            -> helpers (response, asyncHandler, jwt, dndApi, dndRules, *Meta)
src/data/            -> data curada en español (no viene traducida del SRD):
                          spellSummaries.ts (resúmenes + dado de los 319 hechizos),
                          raceTraits.ts (rasgos raciales), classFeatures.ts (habilidades de clase),
                          classResources.ts (furias/ki/etc.), skills.ts (18 competencias)
src/seeders/          -> seedUsers.ts (crea los 5 usuarios)
src/scripts/          -> importAll.ts (migraciones de datos), exportSpellsForSummary.ts,
                          applySpellSummaries.ts (aplica spellSummaries.ts a la base)
src/app.ts            -> arma el express app (cors, json, conexión, rutas)
src/server.ts         -> entrypoint (local: listen; Vercel: export default app)
```

## Convenciones
- **Nunca** poner lógica de negocio en controllers; va en el service.
- Los services tiran `HttpError(status, mensaje)`; el `asyncHandler` los captura y responde.
- Respuestas siempre con `{ data }` (éxito) o `{ error }` (fallo) — ver `utils/response.ts`.
- Modelos con guard `models.X || model(...)` para no redefinir en hot-reload/serverless.
- Comentarios y mensajes de error en **español**.
- IDs de Mongo como strings hacia afuera.

## Modelos
- **User**: username, password (hash), role. Históricamente usa `admin`|`user`, pero a nivel producto debe
  pensarse como **DM**|**Player**: `insomnya` es el DM; el resto son Players. Backlog: agregar `createdBy`
  para que los usuarios creados por el DM apunten al `_id` de `insomnya`, y permitir que el DM cree usuarios
  eligiendo `username` y `password`.
- **Race / Class / Spell / Monster**: catálogo importado del SRD + metadata en español
  (`utils/raceMeta.ts`, `utils/classMeta.ts`, `utils/dndTranslate.ts`). Spell incluye además
  `damageType` y `savingThrow` (traducidos del SRD) y `simpleDescription`/`dice` (curados a mano).
- **Weapon**: catálogo de armas en Mongo. Se siembra desde `src/data/weapons.ts` y se expone por `/weapons`.
  Incluye armas SRD, `natural-talons` y `dragonborn-breath`. El DM puede crear armas custom y asignarlas a PJs.
- **ClassSpell**: tabla de unión N:M `spells_classes` (clase ↔ hechizo).
- **Class**: incluye `progression[]` (por nivel: features en español, `spellSlots`, `resources` como
  furias/ki/puntos de hechicería, cantrips/spells known) + `skillOptions`/`skillChoiceCount` +
  `savingThrows` (índices) + `spellcastingAbility`.
- **Race**: `traits[]` como `{name, description, active}` (en español) + `languages`. `active` = es un
  poder que se usa (acción/recurso limitado, ej. Aliento del dragonborn); si no, es pasivo/de fondo.
  Razas MPMM/homebrew recientes usan `flexibleAbilityBonuses: true`; al crear PJ se aplica `+2/+1` según
  `class.abilityPriority`. Razas custom agregadas/curadas: aarakocra, goblin, orc, owlin, eladrin, kenku,
  kobold, shifter, satyr, tabaxi, firbolg, fairy, changeling, aasimar, githyanki, harengon, sea-elf y tortle.
- **Class**: `progression[].features[]` también tiene `active` (misma lógica, ej. Furia=true, Defensa
  sin Armadura=false). La app separa "activos" (sección principal) de pasivos ("Información avanzada").
- **Character**: PJ de un usuario (nivel, HP, `tempHp`, stats, AC, `currency`, `skillProficiencies`, `spellSlotsUsed`,
  `resourcesUsed`, `knownSpells`, `armor`/`shield`/`acBonus`, `initiativeBonus`, `weapon`). HP nivel 1 = `hitDie + mod(CON)`.
  Al crear sin `abilityScores` se generan solas (`rollAbilityScores`: 4d6-drop-lowest repartido por
  `class.abilityPriority`, las 2 principales ≥14). `knownSpells` arranca con los recomendados de la clase.
  Se edita con `PATCH /characters/:id` (whitelist); al tocar armadura/stats se recalcula `ac` con `computeAc`.
  `hitDiceUsed` (total disponible = `level`) se gasta en descanso corto y se resetea en descanso largo
  (ver `POST /characters/:id/full-rest` y `.../short-rest` más abajo).
  `noteSections` guarda notas categorizadas e incluye `characterInfo` para información propia del personaje.
- Bono racial flexible (+2/+1 de razas MPMM): `pickFlexibleRaceBonusTargets` en `utils/dndRules.ts` decide
  dónde ponerlo evitando desperdiciar puntos por el tope de 20 (si la primera prioridad de la clase ya está
  en 19+, mueve el +2 a la siguiente). La app replica la misma lógica en `src/lib/format.ts`
  (`raceAbilityBonusPreview`) para poder mostrarla en el wizard ANTES de crear el personaje.
- **ClassSpell** además tiene `recommended` (hechizos top por clase, marcados con `apply:recommended`).
- Datos curados nuevos en `src/data/`: `armors.ts`, `weapons.ts` (armas SRD + naturales/raciales),
  `customRaces.ts` (razas fuera del SRD),
  `recommendedSpells.ts`, `classAbilityPriority.ts`, `classNamesES.ts`/`raceNamesES.ts`/`spellNamesES.ts`
  (nombres traducidos, cobertura validada), `images.ts` (RACE_IMAGES, usa miniaturas livianas de Wikimedia
  para evitar fallos de carga por archivos pesados). `dndRules.ts` tiene `rollAbilityScores`/`computeAc`.
- Límites de hechizos conocidos (trucos y hechizos "de verdad") por nivel/clase se calculan en la app
  (`src/lib/sheet.ts`: `cantripLimit`, `spellsKnownLimit` — distingue clases "de conocidos" vs "de
  preparados" según si `progression[level].spellsKnown` es 0).
- Endpoints nuevos: `POST /characters/roll-stats`, `POST /spells/apply-recommended` (admin). Script `npm run apply:recommended`.
- **Tracker**: documento **único global** con `participants[]`, `round`, `activeIndex`. Los participantes guardan
  `hp`, `tempHp`, `maxHp`, `ac`, `conditions`, `characterId`, `ownerUserId`, `color`. La vida y vida temporal se sincronizan
  en ambos sentidos entre `Character` y el participante del tracker. `conditions` es un array de strings validado
  contra condiciones D&D estándar (`blinded`, `charmed`, `deafened`, `frightened`, `grappled`, `incapacitated`,
  `invisible`, `paralyzed`, `petrified`, `poisoned`, `prone`, `restrained`, `stunned`, `unconscious`, `exhaustion`).
  Al borrar un `Character`, también se debe eliminar su participante del tracker y corregir `activeIndex` si queda
  fuera de rango.

## Auth y permisos
- `POST /auth/login` con `{ username, password }` → `{ token, user }`. Token dura 30 días.
- `requireAuth`: exige `Authorization: Bearer <token>`.
- `requireAdmin`: exige `role === "admin"` (producto: **DM**, solo `insomnya`). Gatea imports y mutaciones del tracker.
- Cada vez que un pedido o texto diga "insomnya puede hacer X", interpretarlo como "el **DM** puede hacer X".
- `GET /tracker` se sanitiza por rol: DM ve todo; Player no recibe `hp`, `maxHp` ni `tempHp` de monstruos ni
  de personajes ajenos. Players sí reciben iniciativa, orden y turno activo. La app tampoco debe mostrar CA de
  monstruos cuando esos HP vienen ocultos.
- El DM ve todos los héroes y el dueño de cada héroe.

## Endpoints principales
- Auth: `POST /auth/login`, `GET /auth/me`
- Catálogo: `GET /races`, `GET /classes`, `GET /spells?classId=`, `GET /monsters?search=`
- Personajes (scoped al usuario del token): `GET/POST /characters`, `GET/PATCH/DELETE /characters/:id`,
  `POST /characters/:id/level-up` (body `{ rolled }`), `POST /characters/:id/hp` (body `{ currentHp }`),
  `POST /characters/:id/full-rest` (vida al máximo, resetea `spellSlotsUsed`/`resourcesUsed`/`hitDiceUsed`),
  `POST /characters/:id/short-rest` (body `{ rolls: number[] }`, un valor 1..hitDie por dado gastado; cura
  `roll + mod(CON)` por dado, mínimo 0; no repone hechizos ni recursos, simplificación a propósito)
- Tracker: `GET /tracker` (polling), `POST /tracker/join`, `PATCH|DELETE /tracker/participants/:pid`
  (admin o dueño), y admin-only: `POST /tracker/participants|next|sort|reset`
- Armas: `GET /weapons`; admin-only: `POST /weapons`, `POST /weapons/import-base`,
  `POST /weapons/assign/:characterId`
- Imports (admin): `POST /races|classes|spells|monsters/import-all`
- Hechizos simples: `GET /spells/export-summary`, `POST /spells/import-summaries`
- Hechizos no SRD desde Wikidot: usar `npm run wikidot:build-spell-migration` para generar
  `src/data/generated/current-spells.json`, `wikidot-missing-spells.raw.json`,
  `wikidot-custom-spells.draft.json` y `wikidot-higher-level-audit.json`. Curar/traducir el draft a
  `wikidot-custom-spells.es.json` y correr `npm run wikidot:import-custom-spells -- src/data/generated/wikidot-custom-spells.es.json`.
  El importador rechaza entries sin `description` en español para no meter texto crudo no revisado.
  Existe `npm run wikidot:curate-custom-draft`, que genera un `.es.json` importable con descripciones breves en
  español y extracción heurística de `dice`/`damageType`/`savingThrow`; no es una traducción literal larga del texto
  fuente y debe revisarse si se quiere precisión fina de reglas.
  Existe `npm run wikidot:curate-higher-level-audit`, que toma `wikidot-higher-level-audit.json`, usa las sugerencias
  automáticas donde alcanzan, traduce manualmente los casos marcados y genera `wikidot-higher-level.es.json`.
  Para pruebas rápidas usar `--limit=N --skip-higher-level-audit`; para auditar parcialmente higherLevel usar
  `--higher-level-limit=N`. Para auditar solo `higherLevel` sin regenerar faltantes usar `--only-higher-level-audit`.
  Para aplicar correcciones de `higherLevel`, curar el audit a `wikidot-higher-level.es.json` y correr
  `npm run wikidot:apply-higher-level -- src/data/generated/wikidot-higher-level.es.json`; el script rechaza
  filas con `needsManualTranslation` o texto que parezca inglés. Para validar sin tocar Mongo usar `--dry-run`.
  Estado comprobado el 2026-07-13: `wikidot-higher-level.es.json` tiene 99 parches; Mongo Atlas tenía 99/99
  documentos encontrados y 99/99 `higherLevel` coincidentes exactos contra ese JSON, sin faltantes ni diferencias.
  Para repetir esa verificación, comparar los índices del JSON contra `spells` proyectando `index`, `name` y
  `higherLevel`; en sandbox puede requerir red aprobada porque Atlas usa DNS SRV. El curador tiene overrides para
  limpiar restos heurísticos como `cold`→`frío`, `extra`→`adicional`, `bludgeoning`→`contundente` y `base`→`base`;
  esos overrides ya fueron regenerados, aplicados y verificados contra Mongo.

## Cómo correr
```bash
cp .env.example .env      # completá MONGO_URI y JWT_SECRET
npm install
npm run seed:users        # crea vero, gonza, theo, ory, insomnya (pass 12345678)
npm run import:all        # razas, clases, hechizos (+ spells_classes), monstruos
npm run dev               # http://localhost:4000
```

## Poblar datos ("migraciones")
`npm run import:all` trae todo del SRD en el orden correcto (clases **antes** que hechizos,
porque los hechizos se linkean a clases en `spells_classes`). También hay scripts por entidad.

## Simplificar hechizos
Los 319 hechizos del SRD ya tienen `simpleDescription` (español, para principiantes) y `dice`
curados a mano en **`src/data/spellSummaries.ts`**, aplicados con:
```bash
npm run apply:summaries   # valida cobertura 1:1 contra la base y actualiza cada hechizo
```
Si en el futuro se agregan hechizos homebrew o se quiere regenerar los resúmenes con ChatGPT,
el flujo `export:summary` → pegar en ChatGPT → `POST /spells/import-summaries` sigue disponible
(ver **SUMMARIZE_PROMPT.md**), pero para el catálogo SRD estándar ya no hace falta.

Correcciones recientes de dados:
- `magic-missile`: `1d4+1` por dardo, no `3d4+3`.
- `ice-storm`: `2d8+4d6`.
- `regenerate`: `4d8+15`.
- `meteor-swarm`: `20d6+20d6`.

## Armas en Mongo
- `src/db/models/Weapon.ts` define el catálogo persistido.
- `src/modules/weapons/` sigue el patrón route→controller→service.
- `WeaponService.list()` autosiembra desde `src/data/weapons.ts` si la colección está vacía.
- `WeaponService.create()` es DM-only y genera índices `custom-...`.
- `WeaponService.assign()` es DM-only: agrega el arma a `character.weapons` y la deja equipada en `character.weapon`.
- Si se cambia `src/data/weapons.ts`, correr/pegar el import base para actualizar Mongo. La colección actual debe
  contener 40 armas base incluyendo `natural-talons` y `dragonborn-breath`.

## Backlog backend solicitado
- Renombrar/normalizar roles de producto a `dm` y `player` o mapear claramente `admin`→DM, `user`→Player.
- Agregar `createdBy` a User y script/migración para asignar a `insomnya` como creador de los usuarios existentes.
- Endpoint DM-only para crear usuarios con username/password elegidos por el DM.
- Endpoints/listados para que el DM vea todos los personajes y el owner de cada uno.
- El PATCH del tracker debe permitir curar/dañar HP con cantidad indicada, pero no editar/sumar `tempHp` desde pantalla de combate.
- Agregar foto custom de personaje en base64 al modelo Character; debe tener prioridad sobre foto de raza en listados y ficha.
- Agregar mochila/equipamiento con ítems de texto y notas categorizadas (campaña, NPCs, lugares, otros).

## Deploy (Vercel)
- `vercel.json` buildea `src/server.ts` con `@vercel/node`.
- Variables de entorno en el dashboard de Vercel: `MONGO_URI`, `JWT_SECRET`, `SECRET`.
- La conexión Mongo se cachea en `global` para no reventar el pool de Atlas.

## Reglas para cambios
- Mantené el patrón route→controller→service. Un endpoint nuevo = los tres archivos.
- Si agregás un modelo, seguí el guard `models.X || model(...)`.
- Corré `npm run build` (tsc) antes de dar por terminado un cambio.
