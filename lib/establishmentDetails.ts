import type { Business, BusinessCategory } from "./directorioData";

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  HOTELES: "Hoteles",
  RESTAURANTES: "Restaurantes",
  DOCTORES: "Doctores",
  NEGOCIOS: "Negocios",
  CLASIFICADOS: "Clasificados",
};

const TAGS_OVERRIDE: Record<string, string> = {
  "dir-4": "Restaurantes, Mariscos, Terraza",
};

const FEATURES_BY_CATEGORY: Record<BusinessCategory, string[]> = {
  HOTELES: ["WiFi gratis", "Alberca", "Estacionamiento", "Aire acondicionado", "Desayuno incluido", "Pet friendly"],
  RESTAURANTES: ["WiFi gratis", "Terraza con vista al mar", "Acepta tarjetas", "Estacionamiento", "Apto para niños", "Reservaciones"],
  DOCTORES: ["Estacionamiento", "Acepta seguros", "Citas en línea", "Urgencias", "Acceso para sillas de ruedas", "Pago con tarjeta"],
  NEGOCIOS: ["Estacionamiento", "Entrega a domicilio", "Acepta tarjetas", "Atención personalizada", "Cotizaciones", "Garantía"],
  CLASIFICADOS: ["Reservación anticipada", "Equipo incluido", "Guías certificados", "Grupos familiares", "Pago en línea", "Seguro incluido"],
};

const DESCRIPTIONS: Record<string, string> = {
  "dir-1": "Hotel frente al mar en San Carlos, con habitaciones cómodas, alberca y fácil acceso a la playa.",
  "dir-2": "Suites de lujo con vista a la marina, ideales para estancias prolongadas o escapadas de fin de semana.",
  "dir-3": "Posada acogedora a los pies del Cerro Tetakawi, perfecta para viajeros que buscan tranquilidad y buen precio.",
  "dir-4": "Restaurante familiar frente a la bahía de San Carlos, especializado en mariscos frescos de la región. Nuestra terraza ofrece vista directa al mar, ideal para comer al atardecer. Contamos con menú de temporada, cortes de pescado del día y coctelería de mariscos.",
  "dir-5": "Taquería de barrio en Guaymas, famosa por sus tacos de camarón y salsas caseras.",
  "dir-6": "Parrillada y cortes a la leña con ambiente familiar, a unos minutos del centro de Guaymas.",
  "dir-7": "Clínica general con atención médica de calidad para residentes y visitantes de San Carlos.",
  "dir-8": "Renta de kayaks y equipo náutico para explorar la bahía de San Carlos a tu propio ritmo.",
  "dir-9": "Ferretería local con material de construcción, herramientas y artículos para el hogar.",
  "dir-10": "Tours de buceo y snorkel guiados por instructores certificados en las aguas del mar de Cortés.",
};

export type Review = { id: string; name: string; rating: number; comment: string; date: string };

const DEFAULT_REVIEWS: Review[] = [
  { id: "g1", name: "Ana L.", rating: 5, comment: "Excelente atención, superó mis expectativas.", date: "2 sep 2026" },
  { id: "g2", name: "Roberto M.", rating: 4, comment: "Buen servicio, aunque hay que esperar un poco en fin de semana.", date: "20 ago 2026" },
  { id: "g3", name: "Paola S.", rating: 5, comment: "Uno de mis lugares favoritos para visitar en la zona.", date: "5 ago 2026" },
];

const REVIEWS_OVERRIDE: Record<string, Review[]> = {
  "dir-4": [
    { id: "r1", name: "Marcela R.", rating: 5, comment: "Excelente vista y los camarones al mojo de ajo son increíbles.", date: "2 sep 2026" },
    { id: "r2", name: "Jorge T.", rating: 4, comment: "Buen servicio, un poco de espera en fin de semana pero vale la pena.", date: "20 ago 2026" },
    { id: "r3", name: "Diana P.", rating: 5, comment: "Nuestro lugar favorito para ver el atardecer con buena comida.", date: "5 ago 2026" },
  ],
};

export type EstablishmentDetail = {
  tags: string;
  description: string;
  features: string[];
  images: { id: string; placeholder: string }[];
  reviews: Review[];
};

export function getEstablishmentDetail(business: Business): EstablishmentDetail {
  return {
    tags: TAGS_OVERRIDE[business.id] ?? CATEGORY_LABELS[business.category],
    description: DESCRIPTIONS[business.id] ?? `${CATEGORY_LABELS[business.category]} en ${business.location}.`,
    features: FEATURES_BY_CATEGORY[business.category],
    images: Array.from({ length: 5 }, (_, i) => ({
      id: `${business.id}-img-${i}`,
      placeholder: `Foto: ${business.name} ${i + 1}`,
    })),
    reviews: REVIEWS_OVERRIDE[business.id] ?? DEFAULT_REVIEWS,
  };
}
