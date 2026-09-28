import { createClient } from "@/lib/supabase/client";

export type AdSlot = "carrusel_home" | "carrusel_hospedaje" | "restaurantes" | "banner_estrella" | "carrusel_directorio";

export const AD_SLOTS: AdSlot[] = ["carrusel_home", "carrusel_hospedaje", "restaurantes", "banner_estrella", "carrusel_directorio"];

export const AD_SLOT_LABELS: Record<AdSlot, string> = {
  carrusel_home: "Carrusel Home — Vistas Doradas",
  carrusel_hospedaje: "Carrusel Hospedaje — Sueño con vista al mar",
  restaurantes: "Sección Restaurantes — Sabor local",
  banner_estrella: "Banner exclusivo — Estrella del mes",
  carrusel_directorio: "Carrusel Directorio — Directorio Premium",
};

// Cuántos anuncios activos caben por espacio, según lo que promete cada
// paquete en /paquetes (solo de referencia visual para el admin).
export const AD_SLOT_LIMITS: Record<AdSlot, number> = {
  carrusel_home: 6,
  carrusel_hospedaje: 6,
  restaurantes: 3,
  banner_estrella: 1,
  carrusel_directorio: 5,
};

type AdPlacementRow = {
  id: string;
  slot: AdSlot;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  starts_at: string;
  ends_at: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
};

export type AdPlacement = {
  id: string;
  slot: AdSlot;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
  sortOrder: number;
};

function toAdPlacement(row: AdPlacementRow): AdPlacement {
  return {
    id: row.id,
    slot: row.slot,
    title: row.title,
    subtitle: row.subtitle ?? "",
    imageUrl: row.image_url,
    linkUrl: row.link_url ?? "",
    startsAt: row.starts_at,
    endsAt: row.ends_at ?? "",
    active: row.active,
    sortOrder: row.sort_order,
  };
}

export async function fetchActiveAds(slot: AdSlot): Promise<AdPlacement[]> {
  const supabase = createClient();
  const { data } = await supabase.from("ad_placements").select("*").eq("slot", slot).eq("active", true).order("sort_order", { ascending: true });
  return (data ?? []).map((row) => toAdPlacement(row as AdPlacementRow));
}

export async function fetchAllAdsAdmin(): Promise<AdPlacement[]> {
  const supabase = createClient();
  const { data } = await supabase.from("ad_placements").select("*").order("slot", { ascending: true }).order("sort_order", { ascending: true });
  return (data ?? []).map((row) => toAdPlacement(row as AdPlacementRow));
}

export type AdPlacementInput = {
  slot: AdSlot;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
  sortOrder: number;
};

export async function createAd(values: AdPlacementInput): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("ad_placements").insert({
    slot: values.slot,
    title: values.title,
    subtitle: values.subtitle || null,
    image_url: values.imageUrl,
    link_url: values.linkUrl || null,
    starts_at: values.startsAt,
    ends_at: values.endsAt || null,
    active: values.active,
    sort_order: values.sortOrder,
  });
  return { error: error?.message ?? null };
}

export async function updateAd(id: string, values: AdPlacementInput): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase
    .from("ad_placements")
    .update({
      slot: values.slot,
      title: values.title,
      subtitle: values.subtitle || null,
      image_url: values.imageUrl,
      link_url: values.linkUrl || null,
      starts_at: values.startsAt,
      ends_at: values.endsAt || null,
      active: values.active,
      sort_order: values.sortOrder,
    })
    .eq("id", id);
  return { error: error?.message ?? null };
}

export async function setAdActive(id: string, active: boolean): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_placements").update({ active }).eq("id", id);
}

export async function deleteAd(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("ad_placements").delete().eq("id", id);
}

export async function uploadAdImage(file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("ads").upload(path, file);
  if (uploadError) return { url: null, error: uploadError.message };

  const { data } = supabase.storage.from("ads").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
