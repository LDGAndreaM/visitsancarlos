"use client";

import { useState } from "react";
import { DIRECTORIO_CATEGORIES } from "@/lib/dashboardData";

type AddBusinessAdminModalProps = {
  onClose: () => void;
  onSave: (draft: { name: string; category: string; location: string; phone: string; description: string }) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function AddBusinessAdminModal({ onClose, onSave }: AddBusinessAdminModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(DIRECTORIO_CATEGORIES[0]);
  const [location, setLocation] = useState("San Carlos, Sonora");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 460, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Nuevo negocio</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ej. Hotel Playa Bonita" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, background: "#ffffff" }}>
            {DIRECTORIO_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Ubicación</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Teléfono</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onSave({ name, category, location, phone, description })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Publicar negocio
          </button>
        </div>
      </div>
    </div>
  );
}
