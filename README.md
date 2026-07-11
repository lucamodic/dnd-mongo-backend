# dnd-mongo-backend

Backend (Express + Mongoose + MongoDB) para la app de D&D de principiantes. Deploy en Vercel.

## Arranque rápido

```bash
cp .env.example .env         # completá MONGO_URI y JWT_SECRET
npm install
npm run seed:users           # vero, gonza, theo, ory, insomnya  (pass: 12345678)
npm run import:all           # razas, clases, hechizos (+ spells_classes), monstruos
npm run dev                  # http://localhost:4000
```

- **Usuarios**: `vero`, `gonza`, `theo`, `ory` (jugadores) e `insomnya` (**admin**). Todos con pass `12345678`.
- La documentación completa (arquitectura, endpoints, convenciones) está en **AGENTS.md**.
- Para simplificar los hechizos con ChatGPT, ver **SUMMARIZE_PROMPT.md**.

## Endpoints (resumen)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/login` | Login → `{ token, user }` |
| GET | `/auth/me` | Datos del usuario del token |
| GET | `/races` | Lista de razas |
| GET | `/classes` | Lista de clases |
| GET | `/spells?classId=` | Hechizos (opcional filtrados por clase) |
| GET | `/monsters?search=` | Bestiario |
| GET/POST | `/characters` | Personajes del usuario |
| POST | `/characters/:id/level-up` | Sube de nivel (`{ rolled }`) |
| POST | `/characters/:id/hp` | Setea vida actual (`{ currentHp }`) |
| GET | `/tracker` | Estado del turn tracker (polling) |
| POST | `/tracker/join` | El jugador suma su PJ |
| POST | `/tracker/participants` | (admin) agrega un bicho |
| POST | `/tracker/next` | (admin) siguiente turno |

## Deploy en Vercel

1. Importá el repo en Vercel.
2. Variables de entorno: `MONGO_URI`, `JWT_SECRET`, `SECRET`.
3. Deploy. Probá `GET /` → `{ ok: true }`.
4. Corré los seeders/imports una vez apuntando `MONGO_URI` a Atlas (localmente o con un job).
