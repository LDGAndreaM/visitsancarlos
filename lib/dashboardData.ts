import type { ClasificadoCategory } from "./clasificadosData";

const MONTHS_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function fmtEventDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${MONTHS_ABBR[m - 1]} ${y}`;
}

export type ListingBase = {
  id: string;
  status: string;
  statusColor: string;
  statusBg: string;
  location: string;
  phone: string;
  description: string;
  visibility: "Publicado" | "Invisible";
  pendingApproval: boolean;
};

export type DirectorioListing = ListingBase & {
  type: "directorio";
  name: string;
  category: string;
  hours: string;
  priceRange: string;
  features: string[];
};

export type ClasificadoListing = ListingBase & {
  type: "clasificado";
  title: string;
  category: ClasificadoCategory;
  price: number | "";
  condition: "Nuevo" | "Usado";
};

export type EventListing = ListingBase & {
  type: "evento";
  name: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  category: string;
  cost: string;
  organizers: string;
  email: string;
  facebook: string;
  instagram: string;
  website: string;
};

export type DashboardListing = DirectorioListing | ClasificadoListing | EventListing;

export const INITIAL_LISTINGS: DashboardListing[] = [
  {
    id: "db-1",
    type: "directorio",
    name: "Hotel Playa Bonita",
    category: "Hoteles",
    location: "San Carlos, Sonora",
    hours: "Lun–Dom 8:00–22:00",
    phone: "622 114 5316",
    status: "Activo",
    statusColor: "#009BA4",
    statusBg: "#E5F6F7",
    description: "Hotel frente al mar con alberca y restaurante propio.",
    priceRange: "$$",
    visibility: "Publicado",
    pendingApproval: false,
    features: ["WiFi gratis", "Estacionamiento", "Alberca", "Aire acondicionado"],
  },
  {
    id: "db-2",
    type: "directorio",
    name: "Buceo Sonora Adventures",
    category: "Negocios",
    location: "San Carlos, Sonora",
    hours: "Lun–Sáb 7:00–17:00",
    phone: "622 155 6677",
    status: "En revisión",
    statusColor: "#EB600A",
    statusBg: "#FDEEE4",
    description: "Tours de buceo y snorkel en la bahía de San Carlos.",
    priceRange: "$$",
    visibility: "Invisible",
    pendingApproval: true,
    features: ["Reservaciones", "Equipo incluido"],
  },
  {
    id: "cl-1",
    type: "clasificado",
    title: "Sedán compacto 2018, único dueño",
    category: "Autos",
    price: 145000,
    condition: "Usado",
    location: "San Carlos, Sonora",
    phone: "622 114 2201",
    status: "Activo",
    statusColor: "#009BA4",
    statusBg: "#E5F6F7",
    description: "Único dueño, servicios de agencia al corriente.",
    visibility: "Publicado",
    pendingApproval: false,
  },
  {
    id: "cl-2",
    type: "clasificado",
    title: "Kayak doble inflable, poco uso",
    category: "Otros productos",
    price: 4200,
    condition: "Usado",
    location: "San Carlos, Sonora",
    phone: "622 118 4455",
    status: "En revisión",
    statusColor: "#EB600A",
    statusBg: "#FDEEE4",
    description: "Kayak doble, incluye remos y bomba de aire.",
    visibility: "Invisible",
    pendingApproval: true,
  },
  {
    id: "ev-1",
    type: "evento",
    name: "Torneo de Pesca",
    category: "DEPORTIVO",
    date: "2026-09-22",
    endDate: "2026-09-22",
    time: "07:00",
    endTime: "13:00",
    location: "Marina San Carlos, San Carlos, Sonora",
    phone: "622 114 5316",
    status: "Activo",
    statusColor: "#009BA4",
    statusBg: "#E5F6F7",
    description: "Competencia anual de pesca deportiva abierta a locales y visitantes.",
    cost: "$500 MXN por equipo",
    organizers: "Club de Pesca San Carlos",
    email: "eventos@visitsancarlos.com",
    facebook: "https://facebook.com",
    instagram: "",
    website: "",
    visibility: "Publicado",
    pendingApproval: false,
  },
  {
    id: "ev-2",
    type: "evento",
    name: "Noche de Música en Vivo",
    category: "ENTRETENIMIENTO",
    date: "2026-09-25",
    endDate: "2026-09-25",
    time: "19:30",
    endTime: "23:00",
    location: "Plaza San Carlos, San Carlos, Sonora",
    phone: "622 114 5316",
    status: "En revisión",
    statusColor: "#EB600A",
    statusBg: "#FDEEE4",
    description: "Bandas locales en vivo con food trucks y ambiente familiar.",
    cost: "Gratis",
    organizers: "Visit San Carlos",
    email: "visit.sancarlos.son@gmail.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    website: "",
    visibility: "Invisible",
    pendingApproval: true,
  },
];

export type DashboardAd = {
  id: string;
  name: string;
  businessId: string;
  billing: "mensual" | "trimestral";
  price: number;
  period: string;
  expires: string;
  status: string;
  statusColor: string;
  statusBg: string;
};

export const INITIAL_ADS: DashboardAd[] = [
  { id: "ad-1", name: "Vistas Doradas — Carrusel Home", businessId: "db-1", billing: "mensual", price: 1500, period: "1 sep – 30 sep 2026", expires: "2026-09-30", status: "Activo", statusColor: "#009BA4", statusBg: "#E5F6F7" },
  { id: "ad-2", name: "Directorio Premium — Carrusel Directorio", businessId: "db-2", billing: "mensual", price: 1900, period: "1 jul – 1 ago 2026", expires: "2026-08-01", status: "Vencido", statusColor: "#B94A2E", statusBg: "#FBEAE6" },
  { id: "ad-3", name: "Eventos Destacados — Carrusel Eventos", businessId: "db-1", billing: "trimestral", price: 4320, period: "15 sep – 15 dic 2026", expires: "2026-12-15", status: "Activo", statusColor: "#009BA4", statusBg: "#E5F6F7" },
];

export type AdCatalogItem = {
  id: string;
  category: string;
  name: string;
  mensual: number;
  trimestral: number;
};

export const AD_CATALOG: AdCatalogItem[] = [
  { id: "A", category: "Sitio web", name: "Vistas Doradas — Carrusel Home", mensual: 1500, trimestral: 4050 },
  { id: "B", category: "Sitio web", name: "Sueño con vista al mar — Carrusel Hospedaje", mensual: 1200, trimestral: 3240 },
  { id: "C", category: "Sitio web", name: "Sabor local — Sección Restaurantes", mensual: 1000, trimestral: 2700 },
  { id: "D", category: "Sitio web", name: "Escápate a San Carlos — Anuncio lateral", mensual: 800, trimestral: 2160 },
  { id: "E", category: "Sitio web", name: "Estrella del mes — Banner exclusivo", mensual: 2500, trimestral: 6750 },
  { id: "F", category: "Sitio web", name: "Directorio Premium — Carrusel Directorio", mensual: 1900, trimestral: 5130 },
  { id: "G", category: "Sitio web", name: "Eventos Destacados — Carrusel Eventos", mensual: 1600, trimestral: 4320 },
  { id: "S1", category: "Redes sociales", name: "Presencia Digital", mensual: 1400, trimestral: 3780 },
  { id: "S2", category: "Redes sociales", name: "Promoción Premium", mensual: 2600, trimestral: 7020 },
  { id: "C1", category: "Combinado", name: "Presencia Estratégica", mensual: 3500, trimestral: 9450 },
  { id: "C2", category: "Combinado", name: "Visibilidad Plus", mensual: 5000, trimestral: 13500 },
  { id: "C3", category: "Combinado", name: "Impacto Total", mensual: 6500, trimestral: 17550 },
  { id: "C4", category: "Combinado", name: "Socio Elite Visit San Carlos", mensual: 8500, trimestral: 22950 },
];

export const ALL_FEATURES = [
  "WiFi gratis",
  "Estacionamiento",
  "Terraza",
  "Acepta tarjetas",
  "Pet friendly",
  "Aire acondicionado",
  "Reservaciones",
  "Entrega a domicilio",
  "Alberca",
  "Equipo incluido",
];

export const DIRECTORIO_CATEGORIES = ["Hoteles", "Restaurantes", "Doctores", "Negocios"];

export function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("es-MX");
}

export type ListingView = DashboardListing & {
  displayName: string;
  subtitle: string;
  extraLine: string;
  typeLabel: string;
  typeColor: string;
  typeBg: string;
};

export function toListingView(l: DashboardListing): ListingView {
  if (l.type === "directorio") {
    return {
      ...l,
      displayName: l.name,
      subtitle: `${l.category} · ${l.location}`,
      extraLine: l.hours,
      typeLabel: "Directorio",
      typeColor: "#009BA4",
      typeBg: "#E5F6F7",
    };
  }
  if (l.type === "clasificado") {
    return {
      ...l,
      displayName: l.title,
      subtitle: `${l.category} · ${fmtMoney(Number(l.price) || 0)}`,
      extraLine: `${l.condition} · ${l.location}`,
      typeLabel: "Clasificados",
      typeColor: "#EB600A",
      typeBg: "#FDEEE4",
    };
  }
  return {
    ...l,
    displayName: l.name,
    subtitle: `${l.category} · ${fmtEventDate(l.date)}`,
    extraLine: l.location,
    typeLabel: "Eventos",
    typeColor: "#3FA8C4",
    typeBg: "#EAF8FA",
  };
}
