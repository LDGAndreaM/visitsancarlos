import { PRICE_RANK, type Business, type SortKey } from "./directorioData";

export const SORTERS: Record<SortKey, (a: Business, b: Business) => number> = {
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
  latest: (a, b) => b.added.localeCompare(a.added),
  oldest: (a, b) => a.added.localeCompare(b.added),
  popular: (a, b) => b.popularity - a.popularity,
  priceLow: (a, b) => PRICE_RANK[a.price] - PRICE_RANK[b.price],
  priceHigh: (a, b) => PRICE_RANK[b.price] - PRICE_RANK[a.price],
  random: () => Math.random() - 0.5,
};

export type BusinessFilters = {
  price: string;
  rating: string;
  searchText: string;
  searchLocation: string;
};

export function filterBusinesses(businesses: Business[], filters: BusinessFilters): Business[] {
  return businesses.filter((b) => {
    if (filters.price !== "Todos" && b.price !== filters.price) return false;
    if (Number(filters.rating) > 0 && b.rating < Number(filters.rating)) return false;
    if (filters.searchText && !b.name.toLowerCase().includes(filters.searchText.toLowerCase())) return false;
    if (filters.searchLocation && !b.location.toLowerCase().includes(filters.searchLocation.toLowerCase())) return false;
    return true;
  });
}

export function priceChars(price: string): boolean[] {
  return [0, 1, 2].map((i) => i < price.length);
}

export function starsArr(rating: number): boolean[] {
  const rounded = Math.round(rating);
  return [0, 1, 2, 3, 4].map((i) => i < rounded);
}

export function badgeColor(badge: string): string {
  return badge === "Popular" ? "#E23E7E" : "#009BA4";
}
