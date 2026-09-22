"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CLASIFICADOS_CATEGORIES, type ClasificadoCategory } from "@/lib/clasificadosData";
import type { ClasificadoListing } from "@/lib/dashboardData";

type EditClasificadoModalProps = {
  listing: ClasificadoListing;
  onClose: () => void;
  onSave: (listing: ClasificadoListing) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditClasificadoModal({ listing, onClose, onSave }: EditClasificadoModalProps) {
  const [form, setForm] = useState({
    title: listing.title,
    category: listing.category,
    price: listing.price,
    condition: listing.condition,
    location: listing.location,
    phone: listing.phone,
    description: listing.description,
    visibility: listing.visibility,
  });

  const handleSave = () => {
    onSave({ ...listing, ...form });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Anuncio clasificado — {listing.title}</h3>

        <div style={{ height: 130, borderRadius: 14, overflow: "hidden" }}>
          <ImagePlaceholder caption="Foto del artículo" />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Título</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ClasificadoCategory }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {CLASIFICADOS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Precio (MXN)</label>
            <input
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value === "" ? "" : Number(e.target.value) }))}
              type="number"
              style={inputStyle}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Condición</label>
            <select value={form.condition} onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value as "Nuevo" | "Usado" }))} style={{ ...inputStyle, background: "#ffffff" }}>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Ubicación</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Teléfono de contacto</label>
          <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} type="tel" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #EEF3F3", paddingTop: 14 }}>
          <label style={labelStyle}>Visibilidad</label>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility-cls" checked={form.visibility === "Publicado"} onChange={() => setForm((f) => ({ ...f, visibility: "Publicado" }))} />
              Publicado
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility-cls" checked={form.visibility === "Invisible"} onChange={() => setForm((f) => ({ ...f, visibility: "Invisible" }))} />
              Invisible
            </label>
          </div>
          {listing.pendingApproval && (
            <p style={{ margin: 0, fontSize: 12, color: "#EB600A", background: "#FDEEE4", padding: "8px 12px", borderRadius: 8 }}>
              Este anuncio está pendiente de aprobación por el equipo de Visit San Carlos. Una vez aprobado se publicará en Clasificados.
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
