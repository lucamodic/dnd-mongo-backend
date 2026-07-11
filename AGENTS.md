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
- **User**: username, password (hash), role (`admin`|`user`). `insomnya` = admin.
- **Race / Class / Spell / Monster**: catálogo importado del SRD + metadata en español
  (`utils/raceMeta.ts`, `utils/classMeta.ts`, `utils/dndTranslate.ts`). Spell incluye además
  `damageType` y `savingThrow` (traducidos del SRD) y `simpleDescription`/`dice` (curados a mano).
- **ClassSpell**: tabla de unión N:M `spells_classes` (clase ↔ hechizo).
- **Class**: incluye `progression[]` (por nivel: features en español, `spellSlots`, `resources` como
  furias/ki/puntos de hechicería, cantrips/spells known) + `skillOptions`/`skillChoiceCount` +
  `savingThrows` (índices) + `spellcastingAbility`.
- **Race**: `traits[]` como `{name, description}` (en español) + `languages`.
- **Character**: PJ de un usuario (nivel, HP, stats, AC, `currency {gp,sp,cp}`, `skillProficiencies`,
  `spellSlotsUsed`, `resourcesUsed`). HP nivel 1 = `hitDie + mod(CON)`. Se edita con `PATCH /characters/:id`
  (whitelist de campos).
- **Tracker**: documento **único global** con `participants[]`, `round`, `activeIndex`.

## Auth y permisos
- `POST /auth/login` con `{ username, password }` → `{ token, user }`. Token dura 30 días.
- `requireAuth`: exige `Authorization: Bearer <token>`.
- `requireAdmin`: exige `role === "admin"` (solo insomnya). Gatea imports y mutaciones del tracker.

## Endpoints principales
- Auth: `POST /auth/login`, `GET /auth/me`
- Catálogo: `GET /races`, `GET /classes`, `GET /spells?classId=`, `GET /monsters?search=`
- Personajes (scoped al usuario del token): `GET/POST /characters`, `GET/PATCH/DELETE /characters/:id`,
  `POST /characters/:id/level-up` (body `{ rolled }`), `POST /characters/:id/hp` (body `{ currentHp }`)
- Tracker: `GET /tracker` (polling), `POST /tracker/join`, `PATCH|DELETE /tracker/participants/:pid`
  (admin o dueño), y admin-only: `POST /tracker/participants|next|sort|reset`
- Imports (admin): `POST /races|classes|spells|monsters/import-all`
- Hechizos simples: `GET /spells/export-summary`, `POST /spells/import-summaries`

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

## Deploy (Vercel)
- `vercel.json` buildea `src/server.ts` con `@vercel/node`.
- Variables de entorno en el dashboard de Vercel: `MONGO_URI`, `JWT_SECRET`, `SECRET`.
- La conexión Mongo se cachea en `global` para no reventar el pool de Atlas.

## Reglas para cambios
- Mantené el patrón route→controller→service. Un endpoint nuevo = los tres archivos.
- Si agregás un modelo, seguí el guard `models.X || model(...)`.
- Corré `npm run build` (tsc) antes de dar por terminado un cambio.
