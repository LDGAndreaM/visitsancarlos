import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { createServiceClient } from "@/lib/supabase/serviceClient";

// Mercado Pago llama este endpoint directo desde sus servidores (sin sesión
// de usuario) cada vez que cambia el estado de un pago. Siempre respondemos
// 200 — si devolviéramos un error, Mercado Pago reintentaría sin parar.
async function handleNotification(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return NextResponse.json({ ok: true });

  const url = new URL(request.url);
  let paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");
  let type = url.searchParams.get("type") || url.searchParams.get("topic");

  try {
    const body = await request.json();
    if (body?.data?.id) paymentId = String(body.data.id);
    if (body?.type) type = body.type;
  } catch {
    // Sin body JSON (o vacío) — nos quedamos con lo que vino en la query string.
  }

  if (type !== "payment" || !paymentId) {
    return NextResponse.json({ ok: true });
  }

  try {
    const mpClient = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(mpClient);
    const result = await payment.get({ id: paymentId });

    const orderId = result.external_reference;
    if (result.status !== "approved" || !orderId) {
      return NextResponse.json({ ok: true });
    }

    const supabase = createServiceClient();
    const { data: order } = await supabase.from("ad_orders").select("billing").eq("id", orderId).single();
    if (!order) return NextResponse.json({ ok: true });

    const start = new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + (order.billing === "trimestral" ? 3 : 1));

    // El filtro por status evita reprocesar si Mercado Pago reenvía la misma notificación.
    await supabase
      .from("ad_orders")
      .update({
        status: "pendiente_aprobacion",
        mp_payment_id: String(paymentId),
        paid_at: new Date().toISOString(),
        starts_at: start.toISOString().slice(0, 10),
        ends_at: end.toISOString().slice(0, 10),
      })
      .eq("id", orderId)
      .eq("status", "pendiente_pago");
  } catch (err) {
    console.error("[mercadopago webhook] error procesando la notificación:", err);
  }

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  return handleNotification(request);
}

export async function GET(request: Request) {
  return handleNotification(request);
}
