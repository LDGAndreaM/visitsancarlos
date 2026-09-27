import type { PromoPair } from "@/components/PromoBanner";

export type BusinessCategory = "HOTELES" | "RESTAURANTES" | "DOCTORES" | "NEGOCIOS" | "CLASIFICADOS";

export type Business = {
  id: string;
  name: string;
  category: BusinessCategory;
  location: string;
  price: "$" | "$$" | "$$$";
  rating: number;
  reviewCount: number;
  added: string;
  addedLabel: string;
  popularity: number;
  views: number;
  phone: string;
  badge: "Popular" | "Nuevo" | "";
  placeholder: string;
  description?: string;
  features?: string[];
};

export const BANNER_PAIRS: [PromoPair, PromoPair][] = [];

export const PRICE_OPTIONS = ["Todos", "$", "$$", "$$$"] as const;

export const RATING_OPTIONS = [
  { value: "0", label: "Calificación: todas" },
  { value: "4.5", label: "4.5+ estrellas" },
  { value: "4", label: "4+ estrellas" },
  { value: "3", label: "3+ estrellas" },
];

export const PRICE_RANK: Record<string, number> = { $: 1, $$: 2, $$$: 3 };

export type SortKey = "az" | "za" | "latest" | "oldest" | "popular" | "priceLow" | "priceHigh" | "random";

export const SORT_LABELS: Record<SortKey, string> = {
  az: "De la A a la Z",
  za: "De la Z a la A",
  latest: "Últimos agregados",
  oldest: "Más antiguos",
  popular: "Más populares",
  priceLow: "Precio: menor a mayor",
  priceHigh: "Precio: mayor a menor",
  random: "Aleatorio",
};

export const SORT_KEYS = Object.keys(SORT_LABELS) as SortKey[];

export const PAGE_SIZE = 12;

export const CATEGORY_CHIPS: { value: BusinessCategory | "Todo"; label: string; icon: string }[] = [
  { value: "Todo", label: "Todo", icon: "todo" },
  { value: "HOTELES", label: "Hoteles", icon: "hospedaje" },
  { value: "RESTAURANTES", label: "Restaurantes", icon: "comida" },
  { value: "DOCTORES", label: "Salud", icon: "salud" },
  { value: "NEGOCIOS", label: "Negocios", icon: "tienda" },
  { value: "CLASIFICADOS", label: "Clasificados", icon: "tag" },
];
