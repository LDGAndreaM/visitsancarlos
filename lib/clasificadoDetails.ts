import type { Clasificado } from "./clasificadosData";

export type Spec = { label: string; value: string };
export type ClasificadoSeller = { name: string; kind: string };

export type ClasificadoDetail = {
  description: string;
  specs: Spec[];
  images: { id: string; placeholder: string }[];
  seller: ClasificadoSeller;
};

const DESCRIPTIONS: Record<string, string> = {
  "cls-1": "Sedán compacto modelo 2018, único dueño, servicios de agencia al corriente. Interior en excelente estado, aire acondicionado funcionando, llantas nuevas. Ideal para ciudad y viajes cortos a Guaymas. Motivo de venta: cambio de vehículo. Se aceptan inspecciones antes de la compra.",
  "cls-2": "Camioneta pickup 2021 con tracción 4x4, motor y transmisión en perfecto estado. Poco uso, siempre guardada en cochera. Excelente para caminos de terracería y remolque. Se entrega con factura original.",
  "cls-3": "Casa de 3 recámaras en renta, a unos minutos de la marina de San Carlos. Cuenta con cocina equipada, patio trasero y estacionamiento para dos autos. Disponible para contrato anual o temporadas largas.",
  "cls-4": "Departamento completamente amueblado con vista al mar, a pie de playa. Incluye internet, agua y mantenimiento del edificio. Ideal para estancias de temporada o trabajo remoto frente al mar.",
  "cls-5": "Terreno residencial de 500m2 con vista panorámica a la bahía de San Carlos. Cuenta con todos los servicios disponibles en la calle y escrituras en regla. Excelente para construir tu casa de descanso.",
  "cls-6": "Casa de playa de 4 recámaras, a pie de arena. Cuenta con terraza, asador y acceso directo a la playa. Ideal para renta vacacional o residencia familiar.",
  "cls-7": "Kayak doble inflable, poco uso, incluye bomba de aire y remos. Fácil de transportar y guardar. Perfecto para explorar la bahía de San Carlos en familia.",
  "cls-8": "Equipo de buceo completo talla M: traje, aletas, visor y regulador. Prácticamente nuevo, usado en solo un par de salidas. Ideal para quien se inicia en el buceo en el mar de Cortés.",
};

const SPECS_OVERRIDE: Record<string, Spec[]> = {
  "cls-1": [
    { label: "Categoría", value: "Autos" },
    { label: "Condición", value: "Usado" },
    { label: "Modelo", value: "2018" },
    { label: "Kilometraje", value: "68,000 km" },
    { label: "Transmisión", value: "Automática" },
    { label: "Ubicación", value: "San Carlos, Sonora" },
  ],
};

const SELLERS: Record<string, ClasificadoSeller> = {
  "cls-1": { name: "Ricardo Gómez", kind: "Vendedor particular" },
};

const FALLBACK_SELLERS: ClasificadoSeller[] = [
  { name: "Marisol Peña", kind: "Vendedor particular" },
  { name: "Iván Castro", kind: "Vendedor particular" },
  { name: "Lucía Ramírez", kind: "Vendedor particular" },
  { name: "Diego Valenzuela", kind: "Vendedor particular" },
];

function defaultSeller(item: Clasificado): ClasificadoSeller {
  const index = Number(item.id.replace("cls-", "")) % FALLBACK_SELLERS.length;
  return FALLBACK_SELLERS[index];
}

function defaultSpecs(item: Clasificado): Spec[] {
  return [
    { label: "Categoría", value: item.category },
    { label: "Condición", value: item.condition },
    { label: "Ubicación", value: item.location },
    { label: "Publicado", value: item.addedLabel },
  ];
}

export function getClasificadoDetail(item: Clasificado): ClasificadoDetail {
  return {
    description: DESCRIPTIONS[item.id] ?? `${item.category} en ${item.location}. Contacta al vendedor para más información.`,
    specs: SPECS_OVERRIDE[item.id] ?? defaultSpecs(item),
    images: Array.from({ length: 4 }, (_, i) => ({ id: `${item.id}-img-${i}`, placeholder: `Foto: ${item.title} ${i + 1}` })),
    seller: SELLERS[item.id] ?? defaultSeller(item),
  };
}
