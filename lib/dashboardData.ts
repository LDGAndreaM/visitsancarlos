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
  logoUrl: string;
  photoUrl: string;
  galleryUrls: string[];
};

export type ClasificadoListing = ListingBase & {
  type: "clasificado";
  title: string;
  category: ClasificadoCategory;
  price: number | "";
  condition: "Nuevo" | "Usado";
  photoUrl: string;
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
  photoUrl: string;
};

export type DashboardListing = DirectorioListing | ClasificadoListing | EventListing;

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

export const INITIAL_ADS: DashboardAd[] = [];

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
