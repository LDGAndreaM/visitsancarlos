import { createClient } from "@/lib/supabase/client";
import { setEventFeatured } from "@/lib/supabase/events";
import type { AdSlot } from "@/lib/supabase/adPlacements";

export type AdOrderStatus = "pendiente_pago" | "pendiente_aprobacion" | "aprobado" | "rechazado";
export type AdBilling = "mensual" | "trimestral";
export type AdListingType = "business" | "event";

// Qué hace falta para "cumplir" cada paquete una vez que el admin lo aprueba:
// - un slot de ad_placements (carrusel/banner/directorio) para A, B, C, E, F.
// - "eventos" marca el evento elegido como destacado (mismo mecanismo que ya
//   usa Admin → Eventos, no crea una fila en ad_placements).
// - null: paquetes de redes sociales/combinados — no automatizables, el
//   equipo de Visit San Carlos los cumple manualmente (posts, sesión de fotos).
export const PACKAGE_SLOT_MAP: Record<string, AdSlot | "eventos" | null> = {
  A: "carrusel_home",
  B: "carrusel_hospedaje",
  C: "restaurantes",
  E: "banner_estrella",
  F: "carrusel_directorio",
  G: "eventos",
  S1: null,
  S2: null,
  C1: null,
  C2: null,
  C3: null,
  C4: null,
};

type AdOrderRow = {
  id: string;
  owner_id: string;
  package_id: string;
  package_name: string;
  billing: AdBilling;
  amount: number;
  listing_type: AdListingType | null;
  listing_id: string | null;
  listing_name: string;
  status: AdOrderStatus;
  mp_preference_id: string | null;
  mp_payment_id: string | null;
  starts_at: string | null;
  ends_at: string | null;
  ad_placement_id: string | null;
  created_at: string;
  paid_at: string | null;
};

export type AdOrder = {
  id: string;
  packageId: string;
  packageName: string;
  billing: AdBilling;
  amount: number;
  listingType: AdListingType | null;
  listingId: string;
  listingName: string;
  status: AdOrderStatus;
  startsAt: string;
  endsAt: string;
  adPlacementId: string;
  createdAt: string;
  paidAt: string;
};

function toAdOrder(row: AdOrderRow): AdOrder {
  return {
    id: row.id,
    packageId: row.package_id,
    packageName: row.package_name,
    billing: row.billing,
    amount: row.amount,
    listingType: row.listing_type,
    listingId: row.listing_id ?? "",
    listingName: row.listing_name,
    status: row.status,
    startsAt: row.starts_at ?? "",
    endsAt: row.ends_at ?? "",
    adPlacementId: row.ad_placement_id ?? "",
    createdAt: row.created_at,
    paidAt: row.paid_at ?? "",
  };
}

export async function fetchMyAdOrders(userId: string): Promise<AdOrder[]> {
  const supabase = createClient();
  const { data } = await supabase.from("ad_orders").select("*").eq("owner_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdOrder(row as AdOrderRow));
}

export async function fetchAllOrdersAdmin(): Promise<AdOrder[]> {
  const supabase = createClient();
  const { data } = await supabase.from("ad_orders").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdOrder(row as AdOrderRow));
}

// Solo borra el "carrito abandonado": la RLS ya limita esto a las órdenes
// propias que sigan en pendiente_pago (nunca una ya pagada).
export async function deleteMyDraftOrder(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_orders").delete().eq("id", id);
}

export async function rejectOrder(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_orders").update({ status: "rechazado" }).eq("id", id);
}

// Paquete G: no crea ad_placement, solo destaca el evento elegido (mismo
// campo `featured` que ya usa el carrusel de Eventos destacados).
export async function approveOrderAsEventFeature(order: AdOrder): Promise<void> {
  if (!order.listingId) return;
  await setEventFeatured(order.listingId, true);
  const supabase = createClient();
  await supabase.from("ad_orders").update({ status: "aprobado" }).eq("id", order.id);
}

// Paquetes de redes sociales / combinados: no hay nada que crear en el sitio,
// el equipo de Visit San Carlos cumple el servicio manualmente.
export async function approveOrderManual(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_orders").update({ status: "aprobado" }).eq("id", id);
}

// Paquetes A/B/C/E/F: se llama después de crear el ad_placement real
// (createAd, en lib/supabase/adPlacements.ts) para vincularlo a la orden.
export async function approveOrderWithPlacement(orderId: string, placementId: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_orders").update({ status: "aprobado", ad_placement_id: placementId }).eq("id", orderId);
}
