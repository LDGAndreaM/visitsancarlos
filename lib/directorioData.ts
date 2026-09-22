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
};

export const BUSINESSES: Business[] = [
  { id: "dir-1", name: "Hotel Playa Bonita", category: "HOTELES", location: "San Carlos, Sonora", price: "$$", rating: 4.7, reviewCount: 32, added: "2026-08-01", addedLabel: "1 agosto, 2026", popularity: 120, views: 210, phone: "622 114 5316", badge: "Popular", placeholder: "Foto: Hotel Playa Bonita" },
  { id: "dir-2", name: "Marina San Carlos Suites", category: "HOTELES", location: "San Carlos, Sonora", price: "$$$", rating: 4.8, reviewCount: 45, added: "2026-07-10", addedLabel: "10 julio, 2026", popularity: 200, views: 340, phone: "622 225 2020", badge: "Popular", placeholder: "Foto: Marina San Carlos Suites" },
  { id: "dir-3", name: "Posada Tetakawi", category: "HOTELES", location: "San Carlos, Sonora", price: "$", rating: 4.5, reviewCount: 12, added: "2026-09-01", addedLabel: "1 septiembre, 2026", popularity: 60, views: 80, phone: "622 100 3344", badge: "Nuevo", placeholder: "Foto: Posada Tetakawi" },
  { id: "dir-4", name: "El Pargo Rojo", category: "RESTAURANTES", location: "San Carlos, Sonora", price: "$$", rating: 4.6, reviewCount: 28, added: "2026-06-15", addedLabel: "15 junio, 2026", popularity: 180, views: 190, phone: "622 126 6557", badge: "Popular", placeholder: "Foto: El Pargo Rojo" },
  { id: "dir-5", name: "Tacos La Palapa", category: "RESTAURANTES", location: "Guaymas, Sonora", price: "$", rating: 4.9, reviewCount: 51, added: "2026-09-10", addedLabel: "10 septiembre, 2026", popularity: 220, views: 260, phone: "622 118 9090", badge: "Nuevo", placeholder: "Foto: Tacos La Palapa" },
  { id: "dir-6", name: "Cañón del Nainari Grill", category: "RESTAURANTES", location: "Guaymas, Sonora", price: "$$", rating: 4.4, reviewCount: 15, added: "2026-05-20", addedLabel: "20 mayo, 2026", popularity: 90, views: 95, phone: "622 130 4411", badge: "", placeholder: "Foto: Cañón del Nainari Grill" },
  { id: "dir-7", name: "Clínica San Carlos", category: "DOCTORES", location: "San Carlos, Sonora", price: "$$", rating: 4.3, reviewCount: 9, added: "2026-04-01", addedLabel: "1 abril, 2026", popularity: 50, views: 60, phone: "622 114 7788", badge: "", placeholder: "Foto: Clínica San Carlos" },
  { id: "dir-8", name: "Renta de Kayaks Bahía", category: "CLASIFICADOS", location: "San Carlos, Sonora", price: "$", rating: 4.5, reviewCount: 18, added: "2026-08-20", addedLabel: "20 agosto, 2026", popularity: 70, views: 100, phone: "622 141 2233", badge: "", placeholder: "Foto: Renta de Kayaks Bahía" },
  { id: "dir-9", name: "Ferretería Guaymas", category: "NEGOCIOS", location: "Guaymas, Sonora", price: "$", rating: 4.2, reviewCount: 7, added: "2026-03-05", addedLabel: "5 marzo, 2026", popularity: 40, views: 45, phone: "622 122 8899", badge: "", placeholder: "Foto: Ferretería Guaymas" },
  { id: "dir-10", name: "Buceo Sonora Adventures", category: "NEGOCIOS", location: "San Carlos, Sonora", price: "$$", rating: 4.7, reviewCount: 22, added: "2026-09-15", addedLabel: "15 septiembre, 2026", popularity: 150, views: 150, phone: "622 155 6677", badge: "Nuevo", placeholder: "Foto: Buceo Sonora Adventures" },
];

export const BANNER_PAIRS: [PromoPair, PromoPair][] = [
  [
    { bg: "linear-gradient(120deg,#009BA4,#00767E)", name: "Marina San Carlos Suites", tag: "Vistas a la bahía · Reserva hoy" },
    { bg: "linear-gradient(120deg,#EB600A,#C94C05)", name: "El Pargo Rojo", tag: "Mariscos frente al mar" },
  ],
  [
    { bg: "linear-gradient(120deg,#6AC7E2,#3FA8C4)", name: "Buceo Sonora Adventures", tag: "Tours de buceo y snorkel" },
    { bg: "linear-gradient(120deg,#143840,#0B2B30)", name: "Renta de Kayaks Bahía", tag: "Paquetes familiares" },
  ],
  [
    { bg: "linear-gradient(120deg,#EB600A,#9C3D07)", name: "Tacos La Palapa", tag: "Tacos de camarón estilo Guaymas" },
    { bg: "linear-gradient(120deg,#009BA4,#3FA8C4)", name: "Hotel Playa Bonita", tag: "Alberca y restaurante propio" },
  ],
];

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
