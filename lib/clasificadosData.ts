import type { PromoPair } from "@/components/PromoBanner";

export type ClasificadoCategory = "Autos" | "Renta de casas" | "Venta de propiedades" | "Empleos" | "Ropa y accesorios" | "Servicio comunitario" | "Otros productos";

export type Clasificado = {
  id: string;
  title: string;
  category: ClasificadoCategory;
  price: number;
  location: string;
  condition: "Nuevo" | "Usado";
  phone: string;
  added: string;
  addedLabel: string;
  views: number;
  placeholder: string;
  description?: string;
  sellerName?: string;
};

export const CLASIFICADOS_CATEGORIES: ClasificadoCategory[] = [
  "Autos",
  "Renta de casas",
  "Venta de propiedades",
  "Empleos",
  "Ropa y accesorios",
  "Servicio comunitario",
  "Otros productos",
];

export const CATEGORY_COLORS: Record<ClasificadoCategory, string> = {
  Autos: "#009BA4",
  "Renta de casas": "#6AC7E2",
  "Venta de propiedades": "#143840",
  Empleos: "#7A5AF8",
  "Ropa y accesorios": "#E23E7E",
  "Servicio comunitario": "#2E9E5B",
  "Otros productos": "#EB600A",
};

export const PRICE_OPTIONS = [
  { value: "Todos", label: "Precio: todos" },
  { value: "0-5000", label: "Hasta $5,000" },
  { value: "5000-50000", label: "$5,000 – $50,000" },
  { value: "50000-300000", label: "$50,000 – $300,000" },
  { value: "300000-99999999", label: "Más de $300,000" },
] as const;

export const CONDITION_OPTIONS = ["Todas", "Nuevo", "Usado"] as const;

export type SortKey = "latest" | "oldest" | "priceLow" | "priceHigh" | "az" | "popular";

export const SORT_LABELS: Record<SortKey, string> = {
  latest: "Últimos agregados",
  oldest: "Más antiguos",
  priceLow: "Precio: menor a mayor",
  priceHigh: "Precio: mayor a menor",
  az: "De la A a la Z",
  popular: "Más vistos",
};

export const SORT_KEYS = Object.keys(SORT_LABELS) as SortKey[];

export const PROMO_PAIRS: [PromoPair, PromoPair][] = [];
