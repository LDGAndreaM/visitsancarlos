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

export const ITEMS: Clasificado[] = [
  { id: "cls-1", title: "Sedán compacto 2018, único dueño", category: "Autos", price: 145000, location: "San Carlos, Sonora", condition: "Usado", phone: "622 114 2201", added: "2026-09-10", addedLabel: "10 septiembre, 2026", views: 88, placeholder: "Foto: Sedán compacto 2018" },
  { id: "cls-2", title: "Camioneta pickup 2021, 4x4", category: "Autos", price: 385000, location: "Guaymas, Sonora", condition: "Usado", phone: "622 100 5522", added: "2026-08-22", addedLabel: "22 agosto, 2026", views: 140, placeholder: "Foto: Camioneta pickup 2021" },
  { id: "cls-3", title: "Casa 3 recámaras en renta, cerca de la marina", category: "Renta de casas", price: 14500, location: "San Carlos, Sonora", condition: "Usado", phone: "622 141 8890", added: "2026-09-05", addedLabel: "5 septiembre, 2026", views: 210, placeholder: "Foto: Casa en renta 3 recámaras" },
  { id: "cls-4", title: "Departamento amueblado frente al mar", category: "Renta de casas", price: 9800, location: "San Carlos, Sonora", condition: "Usado", phone: "622 155 3344", added: "2026-07-18", addedLabel: "18 julio, 2026", views: 95, placeholder: "Foto: Departamento frente al mar" },
  { id: "cls-5", title: "Terreno residencial 500m2 con vista a la bahía", category: "Venta de propiedades", price: 980000, location: "San Carlos, Sonora", condition: "Nuevo", phone: "622 122 7766", added: "2026-09-14", addedLabel: "14 septiembre, 2026", views: 175, placeholder: "Foto: Terreno con vista a la bahía" },
  { id: "cls-6", title: "Casa de playa 4 recámaras en venta", category: "Venta de propiedades", price: 3200000, location: "San Carlos, Sonora", condition: "Usado", phone: "622 130 9911", added: "2026-06-30", addedLabel: "30 junio, 2026", views: 260, placeholder: "Foto: Casa de playa en venta" },
  { id: "cls-7", title: "Kayak doble inflable, poco uso", category: "Otros productos", price: 4200, location: "San Carlos, Sonora", condition: "Usado", phone: "622 118 4455", added: "2026-09-18", addedLabel: "18 septiembre, 2026", views: 52, placeholder: "Foto: Kayak doble inflable" },
  { id: "cls-8", title: "Equipo de buceo completo, talla M", category: "Otros productos", price: 6800, location: "Guaymas, Sonora", condition: "Nuevo", phone: "622 126 3300", added: "2026-08-02", addedLabel: "2 agosto, 2026", views: 64, placeholder: "Foto: Equipo de buceo completo" },
  { id: "cls-9", title: "Se busca mesero(a) con inglés, temporada alta", category: "Empleos", price: 9500, location: "San Carlos, Sonora", condition: "Nuevo", phone: "622 140 2210", added: "2026-09-19", addedLabel: "19 septiembre, 2026", views: 118, placeholder: "Foto: Restaurante / logo del negocio" },
  { id: "cls-10", title: "Recepcionista para hotel, turno matutino", category: "Empleos", price: 11000, location: "Guaymas, Sonora", condition: "Nuevo", phone: "622 132 7788", added: "2026-09-08", addedLabel: "8 septiembre, 2026", views: 92, placeholder: "Foto: Hotel / logo del negocio" },
  { id: "cls-11", title: "Lote de trajes de baño y pareos, varias tallas", category: "Ropa y accesorios", price: 1200, location: "San Carlos, Sonora", condition: "Nuevo", phone: "622 117 6543", added: "2026-09-16", addedLabel: "16 septiembre, 2026", views: 47, placeholder: "Foto: Trajes de baño y pareos" },
  { id: "cls-12", title: "Chamarra de mezclilla vintage, talla M", category: "Ropa y accesorios", price: 650, location: "Guaymas, Sonora", condition: "Usado", phone: "622 109 3321", added: "2026-08-27", addedLabel: "27 agosto, 2026", views: 31, placeholder: "Foto: Chamarra de mezclilla" },
  { id: "cls-13", title: "Voluntarios para limpieza de playa Los Algodones", category: "Servicio comunitario", price: 0, location: "San Carlos, Sonora", condition: "Nuevo", phone: "622 150 4400", added: "2026-09-20", addedLabel: "20 septiembre, 2026", views: 156, placeholder: "Foto: Limpieza de playa" },
  { id: "cls-14", title: "Colecta de víveres para albergue de mascotas", category: "Servicio comunitario", price: 0, location: "Guaymas, Sonora", condition: "Nuevo", phone: "622 128 9090", added: "2026-09-12", addedLabel: "12 septiembre, 2026", views: 83, placeholder: "Foto: Albergue de mascotas" },
];

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

export const PROMO_PAIRS: [PromoPair, PromoPair][] = [
  [
    { bg: "linear-gradient(120deg,#009BA4,#00767E)", name: "Camioneta pickup 2021, 4x4", tag: "4x4 con factura original" },
    { bg: "linear-gradient(120deg,#EB600A,#C94C05)", name: "Casa de playa 4 recámaras en venta", tag: "A pie de playa" },
  ],
  [
    { bg: "linear-gradient(120deg,#6AC7E2,#3FA8C4)", name: "Casa 3 recámaras en renta, cerca de la marina", tag: "Disponible todo el año" },
    { bg: "linear-gradient(120deg,#143840,#0B2B30)", name: "Terreno residencial 500m2 con vista a la bahía", tag: "Vista panorámica a la bahía" },
  ],
  [
    { bg: "linear-gradient(120deg,#EB600A,#9C3D07)", name: "Sedán compacto 2018, único dueño", tag: "Único dueño, agencia al corriente" },
    { bg: "linear-gradient(120deg,#009BA4,#3FA8C4)", name: "Equipo de buceo completo, talla M", tag: "Casi nuevo, listo para usar" },
  ],
];
