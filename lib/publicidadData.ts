export function formatMXN(n: number): string {
  return "$" + n.toLocaleString("es-MX");
}

export type WebPackage = {
  letter: string;
  name: string;
  space: string;
  mensual: number;
  trimestral: number;
  features: string[];
};

export const WEB_PACKAGES: WebPackage[] = [
  { letter: "A", name: "Vistas Doradas", space: "Carrusel Home", mensual: 1500, trimestral: 4050, features: ["Máx. 6 anunciantes", '⭐ Perfil Destacado "POPULAR"', "Newsletter"] },
  { letter: "B", name: "Sueño con vista al mar", space: "Carrusel Hospedaje", mensual: 1200, trimestral: 3240, features: ["Máx. 6 establecimientos", '⭐ Perfil Destacado "POPULAR"', "Newsletter"] },
  { letter: "C", name: "Sabor local", space: "Sección Restaurantes", mensual: 1000, trimestral: 2700, features: ['Presencia en "Dónde comer"', '⭐ Perfil "POPULAR"', "Logo/foto · Rango de precio · Ranking", "Newsletter"] },
  { letter: "D", name: "Escápate a San Carlos", space: "Anuncio lateral", mensual: 800, trimestral: 2160, features: ["360×440 px · CTA/enlace", '⭐ Perfil "POPULAR"', "2 stories fotográficas/mes", "Newsletter"] },
  { letter: "E", name: "Estrella del mes", space: "Banner exclusivo", mensual: 2500, trimestral: 6750, features: ["1146×272 px · CTA/enlace", '⭐ Perfil "POPULAR"', "Newsletter"] },
  { letter: "F", name: "Directorio Premium", space: "Carrusel Directorio", mensual: 1900, trimestral: 5130, features: ["1451×260 px · CTA", "Máx. 5 anunciantes", '⭐ Perfil "POPULAR"', "Newsletter"] },
  { letter: "G", name: "Eventos Destacados", space: "Carrusel Eventos", mensual: 1600, trimestral: 4320, features: ["1451×260 px · CTA", "Máx. 5 anunciantes", '⭐ Perfil "POPULAR"', "Newsletter"] },
];

export const POPULAR_FEATURES = [
  "Etiqueta ⭐ POPULAR visible en el listado",
  "Mayor destaque visual frente a perfiles gratuitos",
  "Fotografías / galería",
  "Descripción del negocio",
  "Ubicación y mapa",
  "Horarios",
  "Teléfono y sitio web",
  "Redes sociales",
  "Rango de precios y botón de contacto",
];

export type SocialPackage = {
  name: string;
  mensual: number;
  trimestral: number;
  features: string[];
  extra?: string;
  highlighted?: boolean;
  badge?: string;
};

export const SOCIAL_PACKAGES: SocialPackage[] = [
  {
    name: "Presencia Digital",
    mensual: 1400,
    trimestral: 3780,
    features: ["4 posts al mes", "2 stories en nuestras cuentas", "Etiquetado del negocio", "Copy promocional básico"],
  },
  {
    name: "Promoción Premium",
    mensual: 2600,
    trimestral: 7020,
    features: ["8 publicaciones al mes", "4 stories/reels en nuestras cuentas", "Etiquetado del negocio", "Diseño gráfico básico + copywriting"],
    extra: "📸 Trimestral: sesión de fotos (2h) + dron*",
    highlighted: true,
    badge: "MÁS COMPLETO",
  },
];

export type ComboPackage = {
  name: string;
  mensual: number;
  trimestral: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const COMBO_PACKAGES: ComboPackage[] = [
  {
    name: "Presencia Estratégica",
    mensual: 3500,
    trimestral: 9450,
    features: ["Carrusel Home – Vistas Doradas", "⭐ Perfil Destacado en Directorio", "Mención en newsletter", "4 posts + 2 stories al mes", "Copy y diseño básico"],
  },
  {
    name: "Visibilidad Plus",
    mensual: 5000,
    trimestral: 13500,
    features: ["Carrusel Home – Vistas Doradas", "Presencia adicional en otra sección", "⭐ Perfil Destacado + newsletter", "8 posts + 4 stories/reels al mes", "Diseño y copywriting"],
  },
  {
    name: "Impacto Total",
    mensual: 6500,
    trimestral: 17550,
    features: ["Banner destacado – Estrella del mes", "⭐ Perfil Destacado + newsletter", "8 posts + 4 stories/reels al mes", "Diseño, copywriting", "Mayor exposición en el sitio"],
  },
  {
    name: "Socio Elite Visit San Carlos",
    mensual: 8500,
    trimestral: 22950,
    features: ["Banner exclusivo – Estrella del mes", "Carrusel Directorio Premium", "Perfil completo + ⭐ Destacado", "8 posts + 4 stories/reels al mes", "Prioridad en campañas especiales"],
    highlighted: true,
    badge: "TOP · SOCIO ELITE",
  },
];
