import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con la service role key: ignora RLS por completo. Úsalo SOLO en
// código de servidor que no tiene sesión de usuario que validar (p. ej. el
// webhook de Mercado Pago, que Mercado Pago llama directo sin cookies).
// Nunca lo importes desde un componente "use client" ni lo expongas al navegador.
export function createServiceClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
