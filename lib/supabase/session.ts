import { createClient } from "@/lib/supabase/client";

export type CurrentUser = { id: string; name: string; email: string };

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single();
  return { id: user.id, name: profile?.full_name || profile?.email || "Usuario", email: profile?.email ?? user.email ?? "" };
}

export async function signOutUser(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function updateMyName(userId: string, fullName: string): Promise<void> {
  const supabase = createClient();
  await supabase.from("profiles").update({ full_name: fullName }).eq("id", userId);
}
