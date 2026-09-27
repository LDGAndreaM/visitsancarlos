"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CONTACT_SUBJECTS } from "@/lib/contactoData";

const inputStyle: React.CSSProperties = {
  border: "1px solid #E2ECED",
  outline: "none",
  borderRadius: 10,
  padding: "12px 14px",
  fontFamily: "inherit",
  fontSize: 14,
  background: "#ffffff",
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };

const EMPTY_FORM = { firstName: "", lastName: "", email: "", phone: "", subject: CONTACT_SUBJECTS[0], message: "" };

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Completa al menos tu nombre, correo y mensaje.");
      return;
    }
    if (form.subject === CONTACT_SUBJECTS[0]) {
      setStatus("error");
      setErrorMsg("Elige un asunto para tu mensaje.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo a hola@visitsancarlos.com.mx.");
    }
  };

  return (
    <section style={{ padding: "20px 48px 50px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, alignItems: "stretch" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,60,66,0.1)", minHeight: 520 }}>
          <ImagePlaceholder caption="Foto: San Carlos / Guaymas" />
        </div>
        <form onSubmit={handleSubmit} style={{ background: "#F4FAFB", borderRadius: 24, padding: 44, display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 16px 36px rgba(0,60,66,0.08)" }}>
          {status === "success" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: "#143840" }}>¡Gracias por escribirnos!</span>
              <p style={{ margin: 0, fontSize: 14, color: "#3B5C61" }}>Recibimos tu mensaje y te responderemos lo antes posible.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                style={{ border: "2px solid #009BA4", background: "transparent", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Nombre</label>
                  <input value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} type="text" placeholder="Tu nombre" style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Apellido</label>
                  <input value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} type="text" placeholder="Tu apellido" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} type="email" placeholder="tu@correo.com" style={inputStyle} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Teléfono</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} type="tel" placeholder="+52 622 000 0000" style={inputStyle} />
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Asunto</label>
                <select value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} style={{ ...inputStyle, color: "#143840" }}>
                  {CONTACT_SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Escribe tu mensaje..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              {status === "error" && <p style={{ margin: 0, fontSize: 13, color: "#B94A2E" }}>{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 10, cursor: status === "submitting" ? "default" : "pointer", opacity: status === "submitting" ? 0.7 : 1, alignSelf: "flex-start" }}
              >
                {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
