import { createClient } from "@/lib/supabase/client";
import type { Business, BusinessCategory } from "@/lib/directorioData";
import type { DirectorioListing } from "@/lib/dashboardData";
import type { AdminBusiness, AdminBusinessStatus } from "@/lib/adminData";

type BusinessRow = {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  location: string | null;
  hours: string | null;
  price_range: string | null;
  phone: string | null;
  description: string | null;
  features: string[];
  photo_placeholder: string | null;
  status: "pendiente" | "aprobado" | "rechazado" | "archivado";
  featured: boolean;
  rating: number;
  review_count: number;
  views: number;
  created_at: string;
};

type BusinessRowWithOwner = BusinessRow & { profiles: { full_name: string | null; email: string } | null };

const fmtDateLabel = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

export function toPublicBusiness(row: BusinessRow): Business {
  const isNew = Date.now() - new Date(row.created_at).getTime() < 1000 * 60 * 60 * 24 * 14;
  return {
    id: row.id,
    name: row.name,
    category: row.category.toUpperCase() as BusinessCategory,
    location: row.location ?? "",
    price: (row.price_range as Business["price"]) ?? "$",
    rating: row.rating,
    reviewCount: row.review_count,
    added: row.created_at.slice(0, 10),
    addedLabel: fmtDateLabel(row.created_at),
    popularity: row.views,
    views: row.views,
    phone: row.phone ?? "",
    badge: row.featured ? "Popular" : isNew ? "Nuevo" : "",
    placeholder: row.photo_placeholder ?? `Foto: ${row.name}`,
  };
}

const DASH_STATUS: Record<BusinessRow["status"], { status: string; color: string; bg: string; visibility: "Publicado" | "Invisible"; pending: boolean }> = {
  pendiente: { status: "En revisión", color: "#EB600A", bg: "#FDEEE4", visibility: "Invisible", pending: true },
  aprobado: { status: "Activo", color: "#009BA4", bg: "#E5F6F7", visibility: "Publicado", pending: false },
  rechazado: { status: "Rechazado", color: "#B94A2E", bg: "#FBEAE6", visibility: "Invisible", pending: false },
  archivado: { status: "Archivado", color: "#5C7679", bg: "#EEF3F3", visibility: "Invisible", pending: false },
};

export function toDirectorioListing(row: BusinessRow): DirectorioListing {
  const s = DASH_STATUS[row.status];
  return {
    id: row.id,
    type: "directorio",
    name: row.name,
    category: row.category,
    location: row.location ?? "",
    hours: row.hours ?? "",
    phone: row.phone ?? "",
    status: s.status,
    statusColor: s.color,
    statusBg: s.bg,
    description: row.description ?? "",
    priceRange: row.price_range ?? "$",
    visibility: s.visibility,
    pendingApproval: s.pending,
    features: row.features ?? [],
  };
}

const ADMIN_STATUS: Record<BusinessRow["status"], AdminBusinessStatus> = {
  pendiente: "Pendiente",
  aprobado: "Publicado",
  rechazado: "Invisible",
  archivado: "Archivado",
};

export function toAdminBusiness(row: BusinessRowWithOwner): AdminBusiness {
  return {
    id: row.id,
    name: row.name,
    owner: row.profiles?.full_name || row.profiles?.email || "—",
    category: row.category,
    location: row.location ?? "",
    status: ADMIN_STATUS[row.status],
    featured: row.featured,
    phone: row.phone ?? "",
    submitted: fmtDateShort(row.created_at),
    description: row.description ?? "",
  };
}

export async function fetchApprovedBusinesses(): Promise<Business[]> {
  const supabase = createClient();
  const { data } = await supabase.from("businesses").select("*").eq("status", "aprobado").order("created_at", { ascending: false });
  return (data ?? []).map(toPublicBusiness);
}

export async function fetchMyBusinesses(userId: string): Promise<DirectorioListing[]> {
  const supabase = createClient();
  const { data } = await supabase.from("businesses").select("*").eq("owner_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map(toDirectorioListing);
}

export async function fetchAllBusinessesAdmin(): Promise<AdminBusiness[]> {
  const supabase = createClient();
  const { data } = await supabase.from("businesses").select("*, profiles(full_name, email)").order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdminBusiness(row as BusinessRowWithOwner));
}

export async function createBusiness(ownerId: string, values: { name: string; category: string; location: string; hours: string; priceRange: string; phone: string; description: string; features: string[] }): Promise<DirectorioListing | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("businesses")
    .insert({
      owner_id: ownerId,
      name: values.name,
      category: values.category,
      location: values.location,
      hours: values.hours,
      price_range: values.priceRange,
      phone: values.phone,
      description: values.description,
      features: values.features,
    })
    .select()
    .single();
  return data ? toDirectorioListing(data as BusinessRow) : null;
}

export async function createBusinessAsAdmin(ownerId: string, values: { name: string; category: string; location: string; phone: string; description: string }) {
  const supabase = createClient();
  await supabase.from("businesses").insert({ owner_id: ownerId, name: values.name, category: values.category, location: values.location, phone: values.phone, description: values.description, status: "aprobado" });
}

export async function updateBusinessFromDashboard(id: string, listing: DirectorioListing) {
  const supabase = createClient();
  await supabase
    .from("businesses")
    .update({ name: listing.name, category: listing.category, location: listing.location, hours: listing.hours, price_range: listing.priceRange, phone: listing.phone, description: listing.description, features: listing.features })
    .eq("id", id);
}

export async function setBusinessStatus(id: string, status: BusinessRow["status"]) {
  const supabase = createClient();
  await supabase.from("businesses").update({ status }).eq("id", id);
}

export async function setBusinessFeatured(id: string, featured: boolean) {
  const supabase = createClient();
  await supabase.from("businesses").update({ featured }).eq("id", id);
}

const ADMIN_STATUS_TO_DB: Record<AdminBusinessStatus, BusinessRow["status"]> = {
  Pendiente: "pendiente",
  Publicado: "aprobado",
  Invisible: "rechazado",
  Archivado: "archivado",
};

export async function updateBusinessFromAdmin(id: string, values: { name: string; category: string; location: string; phone: string; description: string; status: AdminBusinessStatus }) {
  const supabase = createClient();
  await supabase.from("businesses").update({ name: values.name, category: values.category, location: values.location, phone: values.phone, description: values.description, status: ADMIN_STATUS_TO_DB[values.status] }).eq("id", id);
}

export async function deleteBusiness(id: string) {
  const supabase = createClient();
  await supabase.from("businesses").delete().eq("id", id);
}
