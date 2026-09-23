"use client";

import { useState } from "react";

type AddAdminModalProps = {
  existingEmails: string[];
  onClose: () => void;
  onSave: (values: { email: string }) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function AddAdminModal({ existingEmails, onClose, onSave }: AddAdminModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!email.trim()) {
      setError("Ingresa un correo.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Ingresa un correo válido.");
      return;
    }
    if (existingEmails.some((e) => e.toLowerCase() === email.trim().toLowerCase())) {
      setError("Ya existe un administrador con ese correo.");
      return;
    }
    onSave({ email: email.trim() });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 420, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Invitar administrador</h3>
        <p style={{ margin: 0, fontSize: 13, color: "#5C7679" }}>
          Cuando esa persona inicie sesión con Google o Facebook usando este correo, tendrá acceso limitado: chat de soporte, blog, aprobación de publicaciones y métricas. No podrá agregar ni eliminar
          administradores.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle}>Correo electrónico</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="correo@visitsancarlos.com" style={inputStyle} />
        </div>

        {error && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Invitar
          </button>
        </div>
      </div>
    </div>
  );
}
