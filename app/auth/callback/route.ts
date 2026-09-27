import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  // Detrás de un proxy (Vercel), el origin real que ve el visitante puede no
  // coincidir con el de request.url — usamos el host reenviado si está presente,
  // igual que recomienda la guía de Supabase para App Router.
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const redirectBase = forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin;

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${redirectBase}${next}`);
      }
    } catch {
      // Supabase no está configurado todavía; cae al redirect de error de abajo.
    }
  }

  return NextResponse.redirect(`${redirectBase}/login?error=auth`);
}
