/**
 * Descripciones simples en español + imagen por raza.
 * El importador de razas usa este mapa para completar `description` e `image`
 * (la API SRD no trae ni descripción amigable ni arte).
 *
 * `image`: dejá "" para que la app muestre un card con gradiente + inicial.
 * Podés pegar acá una URL, o subir la URL directo al documento en Mongo.
 */
export interface RaceMeta {
  description: string;
  image: string;
}

export const RACE_META: Record<string, RaceMeta> = {
  dragonborn: {
    description:
      "Descendientes de dragones: orgullosos, leales y con un aliento elemental que pueden usar en combate. Buenos para quienes quieren un guerrero imponente.",
    image: "",
  },
  dwarf: {
    description:
      "Enanos resistentes y tercos, expertos en piedra y metal. Aguantan mucho daño, así que son ideales para principiantes que quieren sobrevivir.",
    image: "",
  },
  elf: {
    description:
      "Elfos ágiles y perceptivos, con visión en la oscuridad y afinidad con la magia. Excelentes para arqueros, magos y pícaros.",
    image: "",
  },
  gnome: {
    description:
      "Gnomos pequeños, curiosos e ingeniosos, con talento para la magia y los inventos. Difíciles de engañar mentalmente.",
    image: "",
  },
  "half-elf": {
    description:
      "Mitad humano, mitad elfo: carismáticos y versátiles. Se llevan bien con todos y sirven para casi cualquier clase.",
    image: "",
  },
  "half-orc": {
    description:
      "Fuertes y feroces, con la determinación de aguantar en pie cuando otros caerían. Perfectos para pegar fuerte cuerpo a cuerpo.",
    image: "",
  },
  halfling: {
    description:
      "Mediana estatura, gran suerte y valentía. Su suerte les permite repetir tiradas malas; geniales para pícaros escurridizos.",
    image: "",
  },
  human: {
    description:
      "Adaptables y ambiciosos. Reciben un bonus a todas sus características, así que son la opción más flexible y fácil para empezar.",
    image: "",
  },
  tiefling: {
    description:
      "Con sangre infernal, cuernos y resistencia al fuego. Carismáticos y misteriosos, ideales para hechiceros y brujos.",
    image: "",
  },
};
