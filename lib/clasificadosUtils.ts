import { CATEGORY_COLORS, type Clasificado, type ClasificadoCategory, type SortKey } from "./clasificadosData";

export const SORTERS: Record<SortKey, (a: Clasificado, b: Clasificado) => number> = {
  latest: (a, b) => b.added.localeCompare(a.added),
  oldest: (a, b) => a.added.localeCompare(b.added),
  priceLow: (a, b) => a.price - b.price,
  priceHigh: (a, b) => b.price - a.price,
  az: (a, b) => a.title.localeCompare(b.title),
  popular: (a, b) => b.views - a.views,
};

export type ClasificadosFilters = {
  category: ClasificadoCategory | null;
  price: string;
  condition: string;
  searchText: string;
  searchLocation: string;
};

export function filterClasificados(items: Clasificado[], filters: ClasificadosFilters): Clasificado[] {
  return items.filter((it) => {
    if (filters.category && it.category !== filters.category) return false;
    if (filters.condition !== "Todas" && it.condition !== filters.condition) return false;
    if (filters.price !== "Todos") {
      const [min, max] = filters.price.split("-").map(Number);
      if (it.price < min || it.price > max) return false;
    }
    if (filters.searchText && !it.title.toLowerCase().includes(filters.searchText.toLowerCase())) return false;
    if (filters.searchLocation && !it.location.toLowerCase().includes(filters.searchLocation.toLowerCase())) return false;
    return true;
  });
}

export function priceLabel(item: Clasificado): string {
  if (item.category === "Servicio comunitario" && !item.price) return "Gratis";
  const currency = "$" + item.price.toLocaleString("es-MX");
  return item.category === "Renta de casas" || item.category === "Empleos" ? `${currency}/mes` : currency;
}

export function categoryColor(category: ClasificadoCategory): string {
  return CATEGORY_COLORS[category];
}

export function relatedItems(items: Clasificado[], current: Clasificado, limit = 3): Clasificado[] {
  const sameCategory = items.filter((it) => it.id !== current.id && it.category === current.category);
  const rest = items.filter((it) => it.id !== current.id && it.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
