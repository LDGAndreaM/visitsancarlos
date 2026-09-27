import type { Clasificado } from "./clasificadosData";

export type Spec = { label: string; value: string };

export type ClasificadoDetail = {
  description: string;
  specs: Spec[];
  images: { id: string; placeholder: string }[];
  sellerName: string;
};

function defaultSpecs(item: Clasificado): Spec[] {
  return [
    { label: "Categoría", value: item.category },
    { label: "Condición", value: item.condition },
    { label: "Ubicación", value: item.location },
    { label: "Publicado", value: item.addedLabel },
  ];
}

// Construye el contenido de la página de detalle solo a partir de campos
// reales del artículo (Supabase) y del perfil de quien lo publicó. No
// inventa descripciones, specs adicionales ni datos del vendedor.
export function getClasificadoDetail(item: Clasificado): ClasificadoDetail {
  return {
    description: item.description ?? "",
    specs: defaultSpecs(item),
    images: [{ id: `${item.id}-img-0`, placeholder: item.placeholder }],
    sellerName: item.sellerName || "Vendedor",
  };
}
