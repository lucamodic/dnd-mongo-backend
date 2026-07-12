/**
 * Imágenes de razas (fotos reales de Wikimedia Commons / Wikipedia, hotlinkeables — verificadas
 * con HTTP 200 + content-type image/*). Las que quedan en "" muestran el card con gradiente en la app.
 *
 * Usamos las miniaturas (`/thumb/.../500px-...`) de Wikimedia en vez del archivo original: los
 * originales de Commons suelen ser escaneos de varios MB en alta resolución, que en un celular
 * pueden fallar al decodificar (memoria) o tardar mucho en redes lentas — eso causaba que la foto
 * quedara en blanco. Las miniaturas son 60-70% más livianas y se ven perfecto en un círculo chico.
 *
 * Las CLASES no usan imagen acá: en la app se muestran con un ícono de símbolo sobre el color de la clase.
 */
export const RACE_IMAGES: Record<string, string> = {
  aarakocra: "",
  dragonborn: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Reptilian_humanoid.png/500px-Reptilian_humanoid.png",
  dwarf: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/DnD_Dwarf.png/500px-DnD_Dwarf.png",
  elf: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/DnD_Elven.png/500px-DnD_Elven.png",
  gnome: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/DnD_gnome.png/500px-DnD_gnome.png",
  goblin: "",
  kenku: "",
  kobold: "",
  // Ya son chicos de por sí (~12kb), no hace falta miniatura.
  halfling: "https://upload.wikimedia.org/wikipedia/en/2/21/D%26DHalflings.JPG",
  human: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/D%26D_Game_1.jpg/500px-D%26D_Game_1.jpg",
  orc: "",
  shifter: "",
  tiefling: "https://upload.wikimedia.org/wikipedia/en/b/b0/Tiefling_rangersm.JPG",
  owlin: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Bubo_bubo_sibiricus_-_01.JPG/500px-Bubo_bubo_sibiricus_-_01.JPG",
  // Eladrin es una subraza de elfo → reutilizamos el arte de elfo.
  eladrin: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/DnD_Elven.png/500px-DnD_Elven.png",
  // Semielfo y semiorco: reutilizamos el arte de su raza "pariente" (elfo / orco).
  "half-elf": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/DnD_Elven.png/500px-DnD_Elven.png",
  "half-orc": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/DnD_Orc.png/500px-DnD_Orc.png",
};
