import { createClient } from "@/lib/supabase/client";
import type { AdminAccount, AdminRole } from "@/lib/adminAuth";

export async function getCurrentAdminAccount(): Promise<AdminAccount | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("id, email, full_name, admin_role, created_at").eq("id", user.id).single();
  if (!profile || profile.admin_role === "none") return null;

  return {
    id: profile.id,
    name: profile.full_name || profile.email,
    email: profile.email,
    role: profile.admin_role as AdminRole,
    addedAt: new Date(profile.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }),
    pending: false,
  };
}

export async function fetchAdminAccounts(): Promise<AdminAccount[]> {
  const supabase = createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, admin_role, created_at")
    .in("admin_role", ["super", "limitado"]);

  const { data: invites } = await supabase.from("admin_invites").select("email, role, created_at");

  const active: AdminAccount[] = (profiles ?? []).map((p) => ({
    id: p.id,
    name: p.full_name || p.email,
    email: p.email,
    role: p.admin_role as AdminRole,
    addedAt: new Date(p.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }),
    pending: false,
  }));

  const pending: AdminAccount[] = (invites ?? []).map((i) => ({
    id: "invite:" + i.email,
    name: i.email,
    email: i.email,
    role: i.role as AdminRole,
    addedAt: new Date(i.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }),
    pending: true,
  }));

  return [...active, ...pending];
}

export async function inviteAdmin(email: string): Promise<{ error: string | null }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("admin_invites").insert({ email: email.toLowerCase(), role: "limitado", invited_by: user?.id });
  return { error: error ? error.message : null };
}

export async function revokeAdmin(account: AdminAccount): Promise<void> {
  const supabase = createClient();
  if (account.pending) {
    await supabase.from("admin_invites").delete().eq("email", account.email);
  } else {
    await supabase.from("profiles").update({ admin_role: "none" }).eq("id", account.id);
  }
}

export async function signOutAdmin(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
