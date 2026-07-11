import axios from "axios";

/**
 * Cliente del SRD de D&D 5e (dnd5eapi.co).
 * La API redirige a la versión /api/2014, así que apuntamos directo ahí.
 * axios sigue los redirects por defecto igual.
 */
export const DND_API_BASE = "https://www.dnd5eapi.co";
export const DND_API = "https://www.dnd5eapi.co/api/2014";

export const dndGet = async <T = any>(path: string): Promise<T> => {
  // path puede venir como "/api/2014/races/elf" (desde results[].url) o "/races".
  const url = path.startsWith("http")
    ? path
    : path.startsWith("/api/")
    ? `${DND_API_BASE}${path}`
    : `${DND_API}${path}`;
  const { data } = await axios.get<T>(url, { timeout: 20000 });
  return data;
};
