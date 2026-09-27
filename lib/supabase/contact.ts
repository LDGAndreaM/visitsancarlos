import { createClient } from "@/lib/supabase/client";

export type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  dateLabel: string;
};

type ContactMessageRow = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

const fmtDateLabel = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function toContactMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name ?? "",
    email: row.email,
    phone: row.phone ?? "",
    subject: row.subject,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
    dateLabel: fmtDateLabel(row.created_at),
  };
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const supabase = createClient();
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((row) => toContactMessage(row as ContactMessageRow));
}

export async function setContactMessageRead(id: string, read: boolean): Promise<void> {
  const supabase = createClient();
  await supabase.from("contact_messages").update({ read }).eq("id", id);
}

export async function deleteContactMessage(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
}
