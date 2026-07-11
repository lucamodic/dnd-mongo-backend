/**
 * Imágenes de razas (fotos reales de Wikimedia Commons / Wikipedia, hotlinkeables — verificadas
 * con HTTP 200 + content-type image/*). Las que quedan en "" muestran el card con gradiente en la app.
 * Podés reemplazar cualquiera por una URL propia (o subirla directo al documento en Mongo).
 *
 * Las CLASES no usan imagen acá: en la app se muestran con un ícono de símbolo sobre el color de la clase.
 */
export const RACE_IMAGES: Record<string, string> = {
  dragonborn: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Reptilian_humanoid.png",
  dwarf: "https://upload.wikimedia.org/wikipedia/commons/c/cb/DnD_Dwarf.png",
  elf: "https://upload.wikimedia.org/wikipedia/commons/2/27/DnD_Elven.png",
  gnome: "https://upload.wikimedia.org/wikipedia/commons/1/1a/DnD_gnome.png",
  halfling: "https://upload.wikimedia.org/wikipedia/en/2/21/D%26DHalflings.JPG",
  human: "https://upload.wikimedia.org/wikipedia/commons/0/0b/D%26D_Game_1.jpg",
  tiefling: "https://upload.wikimedia.org/wikipedia/en/b/b0/Tiefling_rangersm.JPG",
  owlin: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bubo_bubo_sibiricus_-_01.JPG",
  // Eladrin es una subraza de elfo → reutilizamos el arte de elfo.
  eladrin: "https://upload.wikimedia.org/wikipedia/commons/2/27/DnD_Elven.png",
  // half-elf y half-orc: sin foto confiable → card con gradiente (fallback en la app).
  "half-elf": "",
  "half-orc": "",
};
