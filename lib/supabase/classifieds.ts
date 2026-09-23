import { createClient } from "@/lib/supabase/client";
import type { Clasificado, ClasificadoCategory } from "@/lib/clasificadosData";
import type { ClasificadoListing } from "@/lib/dashboardData";
import type { AdminClasificado, AdminClasificadoStatus } from "@/lib/adminData";

type ClasificadoRow = {
  id: string;
  owner_id: string;
  title: string;
  category: string;
  price: number;
  condition: "Nuevo" | "Usado";
  location: string | null;
  phone: string | null;
  description: string | null;
  photo_placeholder: string | null;
  status: "pendiente" | "aprobado" | "rechazado" | "archivado";
  views: number;
  created_at: string;
};

const fmtDateLabel = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

export function toPublicClasificado(row: ClasificadoRow): Clasificado {
  return {
    id: row.id,
    title: row.title,
    category: row.category as ClasificadoCategory,
    price: row.price,
    location: row.location ?? "",
    condition: row.condition,
    phone: row.phone ?? "",
    added: row.created_at.slice(0, 10),
    addedLabel: fmtDateLabel(row.created_at),
    views: row.views,
    placeholder: row.photo_placeholder ?? `Foto: ${row.title}`,
  };
}

const DASH_STATUS: Record<ClasificadoRow["status"], { status: string; color: string; bg: string; visibility: "Publicado" | "Invisible"; pending: boolean }> = {
  pendiente: { status: "En revisión", color: "#EB600A", bg: "#FDEEE4", visibility: "Invisible", pending: true },
  aprobado: { status: "Activo", color: "#009BA4", bg: "#E5F6F7", visibility: "Publicado", pending: false },
  rechazado: { status: "Rechazado", color: "#B94A2E", bg: "#FBEAE6", visibility: "Invisible", pending: false },
  archivado: { status: "Archivado", color: "#5C7679", bg: "#EEF3F3", visibility: "Invisible", pending: false },
};

export function toClasificadoListing(row: ClasificadoRow): ClasificadoListing {
  const s = DASH_STATUS[row.status];
  return {
    id: row.id,
    type: "clasificado",
    title: row.title,
    category: row.category as ClasificadoCategory,
    price: row.price,
    condition: row.condition,
    location: row.location ?? "",
    phone: row.phone ?? "",
    status: s.status,
    statusColor: s.color,
    statusBg: s.bg,
    description: row.description ?? "",
    visibility: s.visibility,
    pendingApproval: s.pending,
  };
}

const ADMIN_STATUS: Record<ClasificadoRow["status"], AdminClasificadoStatus> = {
  pendiente: "Pendiente",
  aprobado: "Publicado",
  rechazado: "Rechazado",
  archivado: "Archivado",
};

type ClasificadoRowWithOwner = ClasificadoRow & { profiles: { full_name: string | null; email: string } | null };

export function toAdminClasificado(row: ClasificadoRowWithOwner): AdminClasificado {
  return {
    id: row.id,
    title: row.title,
    owner: row.profiles?.full_name || row.profiles?.email || "—",
    category: row.category,
    price: row.price,
    location: row.location ?? "",
    status: ADMIN_STATUS[row.status],
    submitted: fmtDateShort(row.created_at),
  };
}

export async function fetchApprovedClasificados(): Promise<Clasificado[]> {
  const supabase = createClient();
  const { data } = await supabase.from("classifieds").select("*").eq("status", "aprobado").order("created_at", { ascending: false });
  return (data ?? []).map(toPublicClasificado);
}

export async function fetchMyClasificados(userId: string): Promise<ClasificadoListing[]> {
  const supabase = createClient();
  const { data } = await supabase.from("classifieds").select("*").eq("owner_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map(toClasificadoListing);
}

export async function fetchAllClasificadosAdmin(): Promise<AdminClasificado[]> {
  const supabase = createClient();
  const { data } = await supabase.from("classifieds").select("*, profiles(full_name, email)").order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdminClasificado(row as ClasificadoRowWithOwner));
}

export async function createClasificado(ownerId: string, values: Omit<Clasificado, "id" | "added" | "addedLabel" | "views">): Promise<ClasificadoListing | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("classifieds")
    .insert({
      owner_id: ownerId,
      title: values.title,
      category: values.category,
      price: values.price,
      condition: values.condition,
      location: values.location,
      phone: values.phone,
      photo_placeholder: values.placeholder,
    })
    .select()
    .single();
  return data ? toClasificadoListing(data as ClasificadoRow) : null;
}

export async function createClasificadoAsAdmin(ownerId: string, values: { title: string; category: string; price: number }) {
  const supabase = createClient();
  await supabase.from("classifieds").insert({ owner_id: ownerId, title: values.title, category: values.category, price: values.price, status: "aprobado" });
}

export async function updateClasificadoFromDashboard(id: string, listing: ClasificadoListing) {
  const supabase = createClient();
  await supabase
    .from("classifieds")
    .update({ title: listing.title, category: listing.category, price: Number(listing.price) || 0, condition: listing.condition, location: listing.location, phone: listing.phone, description: listing.description })
    .eq("id", id);
}

export async function setClasificadoStatus(id: string, status: ClasificadoRow["status"]) {
  const supabase = createClient();
  await supabase.from("classifieds").update({ status }).eq("id", id);
}

export async function deleteClasificado(id: string) {
  const supabase = createClient();
  await supabase.from("classifieds").delete().eq("id", id);
}
