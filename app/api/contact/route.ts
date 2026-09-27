import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@/lib/supabase/server";
import { CONTACT_EMAIL_GENERAL, CONTACT_EMAIL_SOPORTE } from "@/lib/site";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const SOPORTE_SUBJECTS = new Set(["Soporte", "Reportar un error"]);

function recipientFor(subject: string): string {
  return SOPORTE_SUBJECTS.has(subject) ? CONTACT_EMAIL_SOPORTE : CONTACT_EMAIL_GENERAL;
}

async function saveToSupabase(payload: ContactPayload): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      first_name: payload.firstName,
      last_name: payload.lastName || null,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject,
      message: payload.message,
    });
    if (error) console.error("[contact] error guardando en Supabase:", error.message);
    return !error;
  } catch (err) {
    console.error("[contact] excepción guardando en Supabase:", err);
    return false;
  }
}

async function sendEmail(payload: ContactPayload): Promise<boolean> {
  const host = process.env.CONTACT_SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.CONTACT_SMTP_PORT || 465);
  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASS;
  if (!user || !pass) {
    console.error("[contact] CONTACT_SMTP_USER o CONTACT_SMTP_PASS no están configuradas");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const fullName = `${payload.firstName} ${payload.lastName}`.trim();

    await transporter.sendMail({
      from: `"Visit San Carlos - Contacto" <${user}>`,
      to: recipientFor(payload.subject),
      replyTo: payload.email,
      subject: `[Contacto web] ${payload.subject} — ${fullName}`,
      text: [
        `Nombre: ${fullName}`,
        `Correo: ${payload.email}`,
        `Teléfono: ${payload.phone || "(no proporcionado)"}`,
        `Asunto: ${payload.subject}`,
        "",
        payload.message,
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[contact] error enviando el correo SMTP:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const payload: ContactPayload = {
    firstName: (body.firstName ?? "").trim(),
    lastName: (body.lastName ?? "").trim(),
    email: (body.email ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    subject: (body.subject ?? "").trim(),
    message: (body.message ?? "").trim(),
  };

  if (!payload.firstName || !payload.email || !payload.subject || !payload.message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const [savedToSupabase, emailSent] = await Promise.all([saveToSupabase(payload), sendEmail(payload)]);

  if (!savedToSupabase && !emailSent) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
