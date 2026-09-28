import { createClient } from "@/lib/supabase/client";
import type { Chat, ChatMessage } from "@/lib/adminData";

type ChatConversationRow = {
  id: string;
  visitor_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  messages: ChatMessage[];
  read: boolean;
  created_at: string;
  updated_at: string;
};

export function toAdminChat(row: ChatConversationRow): Chat {
  return {
    id: row.id,
    userName: row.visitor_name,
    contactEmail: row.contact_email ?? "",
    contactPhone: row.contact_phone ?? "",
    unread: !row.read,
    messages: row.messages ?? [],
  };
}

export async function createChatConversation(
  id: string,
  values: { visitorName: string; email: string; phone: string; messages: ChatMessage[] }
): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("chat_conversations").insert({
    id,
    visitor_name: values.visitorName,
    contact_email: values.email || null,
    contact_phone: values.phone || null,
    messages: values.messages,
  });
  return { error: error?.message ?? null };
}

export async function appendChatMessages(id: string, messages: ChatMessage[]): Promise<void> {
  const supabase = createClient();
  await supabase.from("chat_conversations").update({ messages, updated_at: new Date().toISOString() }).eq("id", id);
}

export async function fetchAllChatConversationsAdmin(): Promise<Chat[]> {
  const supabase = createClient();
  const { data } = await supabase.from("chat_conversations").select("*").order("updated_at", { ascending: false });
  return (data ?? []).map((row) => toAdminChat(row as ChatConversationRow));
}

export async function markChatConversationRead(id: string, read: boolean): Promise<void> {
  const supabase = createClient();
  await supabase.from("chat_conversations").update({ read }).eq("id", id);
}
