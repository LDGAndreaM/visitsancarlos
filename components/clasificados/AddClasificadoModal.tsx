"use client";

import { useRef, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CLASIFICADOS_CATEGORIES, type Clasificado, type ClasificadoCategory } from "@/lib/clasificadosData";

type AddClasificadoModalProps = {
  onClose: () => void;
  onSubmit: (values: Omit<Clasificado, "id" | "added" | "addedLabel" | "views">) => void;
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #E2ECED",
  outline: "none",
  borderRadius: 10,
  padding: "11px 12px",
  fontFamily: "inherit",
  fontSize: 14,
  color: "#143840",
};

const labelStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 700, color: "#3B5C61" };

export default function AddClasificadoModal({ onClose, onSubmit }: AddClasificadoModalProps) {
  const [category, setCategory] = useState<ClasificadoCategory>("Autos");
  const [condition, setCondition] = useState<"Nuevo" | "Usado">("Usado");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const title = titleRef.current?.value.trim() ?? "";
    const price = priceRef.current?.value ?? "";
    const location = locationRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    if (!title || !price || !location || !phone) {
      setError("Completa título, precio, ubicación y teléfono para publicar.");
      return;
    }
    onSubmit({ title, category, price: Number(price), location, condition, phone, placeholder: "Foto: " + title });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, width: "100%", maxWidth: 560, maxHeight: "88vh", overflowY: "auto", padding: 32, display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#143840" }}>Agregar artículo</h2>
          <button onClick={onClose} style={{ border: "none", background: "#F4FAFB", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16, color: "#3B5C61" }}>
            ✕
          </button>
        </div>

        <div style={{ height: 150, borderRadius: 14, overflow: "hidden" }}>
          <ImagePlaceholder caption="Foto del artículo" />
        </div>

        <label style={labelStyle}>
          Categoría
          <select value={category} onChange={(e) => setCategory(e.target.value as ClasificadoCategory)} style={{ ...inputStyle, background: "#ffffff" }}>
            {CLASIFICADOS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Título
          <input ref={titleRef} type="text" placeholder="Ej. Sedán 2018 en buen estado" style={inputStyle} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={labelStyle}>
            Precio (MXN)
            <input ref={priceRef} type="number" placeholder="150000" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Condición
            <select value={condition} onChange={(e) => setCondition(e.target.value as "Nuevo" | "Usado")} style={{ ...inputStyle, background: "#ffffff" }}>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
          </label>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={labelStyle}>
            Ubicación
            <input ref={locationRef} type="text" placeholder="San Carlos, Sonora" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Teléfono de contacto
            <input ref={phoneRef} type="text" placeholder="622 000 0000" style={inputStyle} />
          </label>
        </div>

        <label style={labelStyle}>
          Descripción
          <textarea placeholder="Cuéntanos más detalles sobre tu artículo..." rows={3} style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }} />
        </label>

        {error && <p style={{ margin: 0, fontSize: 13, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 8, borderTop: "1px solid #EEF3F3" }}>
          <button onClick={onClose} style={{ border: "1px solid #E2ECED", background: "#ffffff", color: "#3B5C61", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSubmit} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 26px", borderRadius: 10, cursor: "pointer" }}>
            Publicar artículo
          </button>
        </div>
      </div>
    </div>
  );
}
