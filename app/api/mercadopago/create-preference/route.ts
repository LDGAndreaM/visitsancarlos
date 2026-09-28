import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { createClient } from "@/lib/supabase/server";
import { AD_CATALOG } from "@/lib/dashboardData";
import { absoluteUrl } from "@/lib/site";

type CreatePreferenceBody = {
  packageId: string;
  billing: "mensual" | "trimestral";
  listingType: "business" | "event";
  listingId: string;
  listingName: string;
};

export async function POST(request: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ ok: false, error: "mercadopago_not_configured" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Partial<CreatePreferenceBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const packageId = (body.packageId ?? "").trim();
  const billing: "mensual" | "trimestral" = body.billing === "trimestral" ? "trimestral" : "mensual";
  const listingType: "business" | "event" = body.listingType === "event" ? "event" : "business";
  const listingId = (body.listingId ?? "").trim();
  const listingName = (body.listingName ?? "").trim();

  // El precio SIEMPRE se recalcula aquí, en el servidor, a partir del
  // catálogo real — nunca se confía en un monto que mande el navegador.
  const pkg = AD_CATALOG.find((p) => p.id === packageId);
  if (!pkg || !listingId || !listingName) {
    return NextResponse.json({ ok: false, error: "invalid_package_or_listing" }, { status: 400 });
  }

  const amount = billing === "trimestral" ? pkg.trimestral : pkg.mensual;

  const { data: order, error: insertError } = await supabase
    .from("ad_orders")
    .insert({
      owner_id: user.id,
      package_id: pkg.id,
      package_name: pkg.name,
      billing,
      amount,
      listing_type: listingType,
      listing_id: listingId,
      listing_name: listingName,
    })
    .select()
    .single();

  if (insertError || !order) {
    console.error("[mercadopago] error creando la orden:", insertError?.message);
    return NextResponse.json({ ok: false, error: "order_creation_failed" }, { status: 500 });
  }

  try {
    const mpClient = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(mpClient);

    const result = await preference.create({
      body: {
        items: [
          {
            id: pkg.id,
            title: `${pkg.name} — ${listingName} (${billing})`,
            quantity: 1,
            currency_id: "MXN",
            unit_price: amount,
          },
        ],
        external_reference: order.id,
        notification_url: absoluteUrl("/api/mercadopago/webhook"),
        back_urls: {
          success: absoluteUrl("/dashboard?mp_status=success"),
          pending: absoluteUrl("/dashboard?mp_status=pending"),
          failure: absoluteUrl("/dashboard?mp_status=failure"),
        },
        auto_return: "approved",
      },
    });

    await supabase.from("ad_orders").update({ mp_preference_id: result.id }).eq("id", order.id);

    return NextResponse.json({ ok: true, initPoint: result.init_point, orderId: order.id });
  } catch (err) {
    console.error("[mercadopago] error creando la preferencia:", err);
    await supabase.from("ad_orders").delete().eq("id", order.id);
    return NextResponse.json({ ok: false, error: "mercadopago_error" }, { status: 502 });
  }
}
