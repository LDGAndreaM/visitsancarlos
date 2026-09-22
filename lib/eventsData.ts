export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const WEEKDAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export type EventItem = {
  id: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  name: string;
  place: string;
  category: string;
  description: string;
  cost: string;
  organizers: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  website: string;
};

export const INITIAL_EVENTS: EventItem[] = [
  { id: "e1", date: "2026-09-20", endDate: "2026-09-20", time: "18:00", endTime: "22:00", name: "Festival del Mar", place: "Malecón San Carlos, San Carlos, Sonora", category: "CULTURAL", description: "Música, gastronomía y arte local para celebrar la bahía de San Carlos.", cost: "Entrada libre", organizers: "Ayuntamiento de Guaymas, Colectivo San Carlos", phone: "+526221145316", email: "eventos@visitsancarlos.com", facebook: "https://facebook.com", instagram: "https://instagram.com", website: "https://visitsancarlos.com/festival-del-mar" },
  { id: "e2", date: "2026-09-22", endDate: "2026-09-22", time: "07:00", endTime: "13:00", name: "Torneo de Pesca", place: "Marina San Carlos, San Carlos, Sonora", category: "DEPORTIVO", description: "Competencia anual de pesca deportiva abierta a locales y visitantes.", cost: "$500 MXN por equipo", organizers: "Club de Pesca San Carlos", phone: "+526221145316", email: "eventos@visitsancarlos.com", facebook: "https://facebook.com", instagram: "", website: "" },
  { id: "e3", date: "2026-09-25", endDate: "2026-09-25", time: "19:30", endTime: "23:00", name: "Noche de Música en Vivo", place: "Plaza San Carlos, San Carlos, Sonora", category: "ENTRETENIMIENTO", description: "Bandas locales en vivo con food trucks y ambiente familiar.", cost: "Gratis", organizers: "Visit San Carlos", phone: "+526221145316", email: "visit.sancarlos.son@gmail.com", facebook: "https://facebook.com", instagram: "https://instagram.com", website: "" },
  { id: "e4", date: "2026-09-27", endDate: "2026-09-27", time: "10:00", endTime: "15:00", name: "Mercado Local", place: "Guaymas Centro, Guaymas, Sonora", category: "COMUNIDAD", description: "Productores y artesanos locales ofrecen sus productos frescos.", cost: "Gratis", organizers: "Comunidad de Guaymas", phone: "", email: "", facebook: "https://facebook.com", instagram: "", website: "" },
  { id: "e5", date: "2026-10-03", endDate: "2026-10-04", time: "12:00", endTime: "20:00", name: "Feria Gastronómica", place: "Malecón Guaymas, Guaymas, Sonora", category: "GASTRONOMÍA", description: "Los mejores restaurantes de la región reunidos en un solo lugar.", cost: "$100 MXN entrada", organizers: "Cámara de Restaurantes de Guaymas", phone: "+526221145316", email: "eventos@visitsancarlos.com", facebook: "https://facebook.com", instagram: "https://instagram.com", website: "https://visitsancarlos.com/feria-gastronomica" },
  { id: "e6", date: "2026-10-10", endDate: "2026-10-11", time: "09:00", endTime: "17:00", name: "Regata San Carlos", place: "Bahía San Carlos, San Carlos, Sonora", category: "DEPORTIVO", description: "Competencia de vela con equipos nacionales e internacionales.", cost: "$1,200 MXN por tripulación", organizers: "Club Náutico San Carlos", phone: "+526221145316", email: "regata@visitsancarlos.com", facebook: "https://facebook.com", instagram: "https://instagram.com", website: "https://visitsancarlos.com/regata" },
];

export const EVENT_CATEGORIES = ["Cultural", "Deportivo", "Gastronomía", "Comunidad", "Entretenimiento"];

export type Banner = { bg: string; title: string; subtitle: string; cta: string };

export const BANNERS: Banner[] = [
  { bg: "linear-gradient(120deg,#009BA4,#00767E)", title: "Festival del Mar 2026", subtitle: "Música, arte y gastronomía frente a la bahía.", cta: "Ver evento" },
  { bg: "linear-gradient(120deg,#EB600A,#C94C05)", title: "Torneo de Pesca San Carlos", subtitle: "Inscríbete y compite por los mejores premios.", cta: "Inscribirme" },
  { bg: "linear-gradient(120deg,#6AC7E2,#3FA8C4)", title: "Feria Gastronómica Guaymas", subtitle: "Los mejores sabores de la región en un solo lugar.", cta: "Más información" },
  { bg: "linear-gradient(120deg,#143840,#0B2B30)", title: "Regata San Carlos", subtitle: "Vela y competencia náutica en la bahía.", cta: "Ver detalles" },
];
