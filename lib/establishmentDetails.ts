import type { Business, BusinessCategory } from "./directorioData";

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  HOTELES: "Hoteles",
  RESTAURANTES: "Restaurantes",
  DOCTORES: "Doctores",
  NEGOCIOS: "Negocios",
  CLASIFICADOS: "Clasificados",
};

export type EstablishmentDetail = {
  tags: string;
  description: string;
  features: string[];
  images: { id: string; placeholder: string; url?: string }[];
};

// Construye el contenido de la página de detalle solo a partir de campos
// reales del negocio (Supabase). No inventa descripciones, características
// ni fotos adicionales: si el negocio aún no las llenó, quedan vacías y los
// componentes que las muestran (FeaturesSection, Gallery) se ocultan o se
// adaptan en consecuencia. La foto principal va primero, seguida de la
// galería que haya subido el negocio.
export function getEstablishmentDetail(business: Business): EstablishmentDetail {
  const images = [
    { id: `${business.id}-img-0`, placeholder: business.placeholder, url: business.photoUrl || undefined },
    ...(business.galleryUrls ?? []).map((url, i) => ({ id: `${business.id}-img-${i + 1}`, placeholder: business.placeholder, url })),
  ];
  return {
    tags: CATEGORY_LABELS[business.category],
    description: business.description ?? "",
    features: business.features ?? [],
    images,
  };
}
