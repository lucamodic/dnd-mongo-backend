# CLAUDE.md

Este proyecto sigue las convenciones descritas en **@AGENTS.md**. Leé ese archivo primero:
contiene el stack, la arquitectura (route → controller → service → model), los modelos,
la auth/permisos y los comandos para correr y poblar datos.

## Recordatorios rápidos para Claude
- Toda la lógica de negocio va en el **service**; el controller solo orquesta.
- Los services tiran `HttpError(status, msg)`; no armes respuestas de error a mano.
- Comentarios, nombres de cara al usuario y mensajes de error en **español**.
- Antes de terminar un cambio, corré `npm run build` para verificar que compila.
- `insomnya` es el único admin: cualquier endpoint de import o mutación del tracker va con `requireAdmin`.
- No rompas el patrón de `spells_classes`: los hechizos se linkean a clases en la tabla de unión.
