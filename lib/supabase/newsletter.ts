import { createClient } from "@/lib/supabase/client";

export async function subscribeToNewsletter(email: string, source: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email, source });
  // Ya suscrito (unique constraint) no debe mostrarse como error al usuario.
  if (error && !error.message.toLowerCase().includes("duplicate")) return { error: error.message };
  return { error: null };
}
