# Cómo resumir los hechizos con ChatGPT

Objetivo: convertir el texto original (inglés, técnico) de cada hechizo en una explicación
**simple en español** para jugadores principiantes, y detectar la **tirada de dados** asociada.

## Paso a paso

1. Generá el archivo con los hechizos crudos:
   ```bash
   npm run export:summary
   ```
   Esto crea `spells-to-summarize.json` con objetos `{ id, index, name, level, text }`.

   > Es un archivo grande (~300 hechizos). Si ChatGPT no lo procesa entero de una,
   > partilo en tandas (por ejemplo por nivel) y repetí el proceso; los `id` se mantienen.

2. Abrí ChatGPT y pegá **exactamente** este prompt, y a continuación el contenido del JSON:

---

**PROMPT PARA CHATGPT:**

> Sos un Dungeon Master que le explica D&D 5e a jugadores **principiantes** en español rioplatense.
> Te voy a pasar un array JSON de hechizos, cada uno con la forma `{id, name, level, text}`.
>
> Para **cada** hechizo devolvé un objeto `{id, simpleDescription, dice}` donde:
> - `id`: el mismo id que te pasé (no lo cambies).
> - `simpleDescription`: una explicación clara en **1 o 2 oraciones**, sin jerga, que diga
>   **qué hace** el hechizo y **cuándo conviene usarlo**. Nada de copiar el texto en inglés.
> - `dice`: la tirada principal de daño o efecto en notación estándar (ej `"2d8"`, `"3d6"`, `"1d4"`).
>   Si el hechizo **no** tira dados (ej. un buff, invocación o utilidad), poné `null`.
>   Si escala con el nivel, poné la tirada **base** (la del nivel mínimo del hechizo).
>
> Respondé **SOLO** con el array JSON válido, sin texto adicional, sin markdown, sin ```.

---

3. Copiá la respuesta de ChatGPT y guardala como `spells-summarized.json`.

4. Subila a la base con el endpoint (logueado como **insomnya**, que es admin):
   ```bash
   curl -X POST https://TU-BACKEND.vercel.app/spells/import-summaries \
     -H "Authorization: Bearer <TOKEN_DE_INSOMNYA>" \
     -H "Content-Type: application/json" \
     --data @spells-summarized.json
   ```
   El endpoint actualiza `simpleDescription` y `dice` de cada hechizo (busca por `id`, o por `index`
   si no viene `id`). Responde `{ updated, received }`.

## Notas
- Podés re-correr el proceso las veces que quieras; siempre hace *update* sobre el mismo hechizo.
- En la app, cuando un hechizo tiene `dice`, aparece el botón **"Lanzar 2d8"** que tira los dados.
