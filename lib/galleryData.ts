export const GALLERY_FILTERS = ["Todas", "Playas", "Gastronomía", "Eventos", "Comunidad"];

export type GalleryPhoto = { id: string; placeholder: string; tall?: boolean };

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "gal-1", placeholder: "Foto: bahía de San Carlos", tall: true },
  { id: "gal-2", placeholder: "Foto: atardecer" },
  { id: "gal-3", placeholder: "Foto: mariscos" },
  { id: "gal-4", placeholder: "Foto: Cerro Tetakawi", tall: true },
  { id: "gal-5", placeholder: "Foto: malecón Guaymas", tall: true },
  { id: "gal-6", placeholder: "Foto: festival local" },
  { id: "gal-7", placeholder: "Foto: comunidad" },
  { id: "gal-8", placeholder: "Foto: playa", tall: true },
  { id: "gal-9", placeholder: "Foto: buceo" },
  { id: "gal-10", placeholder: "Foto: kayak" },
  { id: "gal-11", placeholder: "Foto: letrero San Carlos", tall: true },
  { id: "gal-12", placeholder: "Foto: restaurante" },
];
