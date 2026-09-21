"use client";

import { useState } from "react";

type NewsletterCtaProps = {
  id?: string;
  margin?: string;
  body?: string;
};

export default function NewsletterCta({
  id,
  margin = "56px 48px 0",
  body = "Eventos, promociones y novedades directo a tu correo.",
}: NewsletterCtaProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to the newsletter subscription API once it exists.
  };

  return (
    <section
      id={id}
      style={{
        margin,
        padding: "48px 56px",
        borderRadius: 24,
        background: "linear-gradient(120deg,#009BA4,#00767E)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#ffffff" }}>No te pierdas nada de San Carlos y Guaymas</h2>
        <p style={{ margin: 0, fontSize: 14, color: "#DFF6F8" }}>{body}</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1, maxWidth: 420 }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          style={{ flex: 1, minWidth: 200, border: "none", outline: "none", borderRadius: 10, padding: "13px 16px", fontFamily: "inherit", fontSize: 14, color: "#143840", background: "#ffffff" }}
        />
        <button
          type="submit"
          style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
        >
          Suscribirme
        </button>
      </form>
    </section>
  );
}
