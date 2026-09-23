import { createClient } from "@/lib/supabase/client";
import type { EventItem } from "@/lib/eventsData";
import type { EventListing } from "@/lib/dashboardData";
import type { AdminEvent, AdminEventStatus } from "@/lib/adminData";

type EventRow = {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  date: string;
  end_date: string | null;
  time: string | null;
  end_time: string | null;
  location: string | null;
  phone: string | null;
  description: string | null;
  cost: string | null;
  organizers: string | null;
  email: string | null;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  photo_placeholder: string | null;
  status: "pendiente" | "aprobado" | "rechazado" | "archivado";
  featured: boolean;
  created_at: string;
};

const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

export function toPublicEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    date: row.date,
    endDate: row.end_date ?? row.date,
    time: row.time ?? "",
    endTime: row.end_time ?? "",
    name: row.name,
    place: row.location ?? "",
    category: row.category.toUpperCase(),
    description: row.description ?? "",
    cost: row.cost ?? "",
    organizers: row.organizers ?? "",
    phone: row.phone ?? "",
    email: row.email ?? "",
    facebook: row.facebook ?? "",
    instagram: row.instagram ?? "",
    website: row.website ?? "",
  };
}

const DASH_STATUS: Record<EventRow["status"], { status: string; color: string; bg: string; visibility: "Publicado" | "Invisible"; pending: boolean }> = {
  pendiente: { status: "En revisión", color: "#EB600A", bg: "#FDEEE4", visibility: "Invisible", pending: true },
  aprobado: { status: "Activo", color: "#009BA4", bg: "#E5F6F7", visibility: "Publicado", pending: false },
  rechazado: { status: "Rechazado", color: "#B94A2E", bg: "#FBEAE6", visibility: "Invisible", pending: false },
  archivado: { status: "Archivado", color: "#5C7679", bg: "#EEF3F3", visibility: "Invisible", pending: false },
};

export function toEventListing(row: EventRow): EventListing {
  const s = DASH_STATUS[row.status];
  return {
    id: row.id,
    type: "evento",
    name: row.name,
    date: row.date,
    endDate: row.end_date ?? row.date,
    time: row.time ?? "",
    endTime: row.end_time ?? "",
    location: row.location ?? "",
    phone: row.phone ?? "",
    category: row.category.toUpperCase(),
    status: s.status,
    statusColor: s.color,
    statusBg: s.bg,
    description: row.description ?? "",
    cost: row.cost ?? "",
    organizers: row.organizers ?? "",
    email: row.email ?? "",
    facebook: row.facebook ?? "",
    instagram: row.instagram ?? "",
    website: row.website ?? "",
    visibility: s.visibility,
    pendingApproval: s.pending,
  };
}

const ADMIN_STATUS: Record<EventRow["status"], AdminEventStatus> = {
  pendiente: "Pendiente",
  aprobado: "Publicado",
  rechazado: "Rechazado",
  archivado: "Archivado",
};

export function toAdminEvent(row: EventRow): AdminEvent {
  return {
    id: row.id,
    name: row.name,
    date: fmtDateShort(row.date),
    category: row.category,
    status: ADMIN_STATUS[row.status],
    featured: row.featured,
  };
}

export async function fetchApprovedEvents(): Promise<EventItem[]> {
  const supabase = createClient();
  const { data } = await supabase.from("events").select("*").eq("status", "aprobado").order("date", { ascending: true });
  return (data ?? []).map(toPublicEvent);
}

export async function fetchMyEvents(userId: string): Promise<EventListing[]> {
  const supabase = createClient();
  const { data } = await supabase.from("events").select("*").eq("owner_id", userId).order("created_at", { ascending: false });
  return (data ?? []).map(toEventListing);
}

export async function fetchAllEventsAdmin(): Promise<AdminEvent[]> {
  const supabase = createClient();
  const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
  return (data ?? []).map(toAdminEvent);
}

export async function createEvent(
  ownerId: string,
  values: { name: string; category: string; date: string; endDate: string; time: string; endTime: string; location: string; phone: string; description: string; cost: string; organizers: string; email: string; facebook: string; instagram: string; website: string }
): Promise<EventListing | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("events")
    .insert({
      owner_id: ownerId,
      name: values.name,
      category: values.category,
      date: values.date,
      end_date: values.endDate || values.date,
      time: values.time,
      end_time: values.endTime,
      location: values.location,
      phone: values.phone,
      description: values.description,
      cost: values.cost,
      organizers: values.organizers,
      email: values.email,
      facebook: values.facebook,
      instagram: values.instagram,
      website: values.website,
    })
    .select()
    .single();
  return data ? toEventListing(data as EventRow) : null;
}

export async function createEventAsAdmin(ownerId: string, values: { name: string; date: string; category: string }) {
  const supabase = createClient();
  await supabase.from("events").insert({ owner_id: ownerId, name: values.name, date: values.date, category: values.category, status: "aprobado" });
}

export async function updateEventFromDashboard(id: string, listing: EventListing) {
  const supabase = createClient();
  await supabase
    .from("events")
    .update({
      name: listing.name,
      category: listing.category,
      date: listing.date,
      end_date: listing.endDate,
      time: listing.time,
      end_time: listing.endTime,
      location: listing.location,
      phone: listing.phone,
      description: listing.description,
      cost: listing.cost,
      organizers: listing.organizers,
      email: listing.email,
      facebook: listing.facebook,
      instagram: listing.instagram,
      website: listing.website,
    })
    .eq("id", id);
}

const ADMIN_STATUS_TO_DB: Record<AdminEventStatus, EventRow["status"]> = {
  Pendiente: "pendiente",
  Publicado: "aprobado",
  Rechazado: "rechazado",
  Archivado: "archivado",
};

export async function updateEventFromAdmin(id: string, values: { name: string; category: string; status: AdminEventStatus }) {
  const supabase = createClient();
  await supabase.from("events").update({ name: values.name, category: values.category, status: ADMIN_STATUS_TO_DB[values.status] }).eq("id", id);
}

export async function setEventStatus(id: string, status: EventRow["status"]) {
  const supabase = createClient();
  await supabase.from("events").update({ status }).eq("id", id);
}

export async function setEventFeatured(id: string, featured: boolean) {
  const supabase = createClient();
  await supabase.from("events").update({ featured }).eq("id", id);
}

export async function deleteEvent(id: string) {
  const supabase = createClient();
  await supabase.from("events").delete().eq("id", id);
}
