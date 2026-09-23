"use client";

import { useEffect, useState } from "react";

type ChatGateProps = {
  pendingHint?: string | null;
  onStart: (name: string, email: string) => void;
};

const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, background: "#ffffff", color: "#143840" };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };

export default function ChatGate({ pendingHint, onStart }: ChatGateProps) {
  const [step, setStep] = useState<"intro" | "form">("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pendingHint) setStep("form");
  }, [pendingHint]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError("Completa tu nombre y correo para comenzar.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }
    onStart(name.trim(), email.trim());
  };

  if (step === "intro") {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 32, textAlign: "center", background: "#F4FAFB" }}>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "#E5F6F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 5h16v11H8l-4 4V5z" stroke="#009BA4" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#143840" }}>¿Necesitas ayuda?</span>
          <span style={{ fontSize: 13, color: "#5C7679" }}>Conéctate con nuestro equipo en tiempo real y te ayudamos a resolver tu duda.</span>
        </div>
        <button
          onClick={() => setStep("form")}
          style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 999, cursor: "pointer" }}
        >
          Comenzar chat en vivo
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, padding: 28, background: "#F4FAFB", overflowY: "auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#143840" }}>Antes de comenzar</span>
        <span style={{ fontSize: 13, color: "#5C7679" }}>Déjanos tus datos para poder ayudarte y contactarte si perdemos la conexión.</span>
      </div>

      {pendingHint && (
        <div style={{ background: "#ffffff", border: "1px solid #E2ECED", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#3B5C61" }}>
          <strong style={{ color: "#143840" }}>Tu mensaje: </strong>
          {pendingHint}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Tu nombre" style={inputStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>Correo electrónico</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tu@correo.com" style={inputStyle} />
      </div>

      {error && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

      <button onClick={handleSubmit} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, cursor: "pointer" }}>
        Iniciar chat
      </button>
    </div>
  );
}
