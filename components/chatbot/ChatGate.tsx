"use client";

import { useState } from "react";

type ChatGateProps = {
  onStart: (name: string, email: string, phone: string) => void;
};

const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "10px 13px", fontSize: 13.5, fontFamily: "inherit", background: "#ffffff", color: "#143840" };
const labelStyle: React.CSSProperties = { fontSize: 12.5, fontWeight: 700, color: "#143840" };
const legendStyle: React.CSSProperties = { margin: 0, fontSize: 10.5, color: "#9DB6B8", lineHeight: 1.4 };

export default function ChatGate({ onStart }: ChatGateProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setError("Cuéntanos tu nombre para comenzar.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Déjanos al menos tu correo o tu WhatsApp.");
      return;
    }
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError("");
    onStart(name.trim(), email.trim(), phone.trim());
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: 20, background: "#F4FAFB", overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>Antes de comenzar</span>
        <span style={{ fontSize: 12.5, color: "#5C7679" }}>Así, si se corta la conexión, guardamos tu chat y podemos contactarte.</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={labelStyle}>Tu nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="¿Cómo te llamas?" style={inputStyle} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={labelStyle}>Correo electrónico</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tu@correo.com" style={inputStyle} />
        <p style={legendStyle}>Al dejar tu correo te suscribes a nuestro boletín de novedades.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label style={labelStyle}>WhatsApp (opcional si ya diste tu correo)</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+52 622 000 0000" style={inputStyle} />
        <p style={legendStyle}>Al dejar tu teléfono podrías recibir promociones por WhatsApp.</p>
      </div>

      {error && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

      <button onClick={handleSubmit} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, cursor: "pointer" }}>
        Iniciar chat
      </button>
    </div>
  );
}
