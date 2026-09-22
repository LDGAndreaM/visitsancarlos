"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { ALL_FEATURES, BUSINESS_CATEGORIES, type DashboardBusiness } from "@/lib/dashboardData";

type EditBusinessModalProps = {
  business: DashboardBusiness;
  onClose: () => void;
  onSave: (business: DashboardBusiness) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditBusinessModal({ business, onClose, onSave }: EditBusinessModalProps) {
  const [form, setForm] = useState({
    name: business.name,
    category: business.category,
    location: business.location,
    hours: business.hours,
    phone: business.phone,
    description: business.description,
    priceRange: business.priceRange,
    visibility: business.visibility,
    features: business.features,
  });

  const toggleFeature = (name: string) => {
    setForm((f) => ({ ...f, features: f.features.includes(name) ? f.features.filter((x) => x !== name) : [...f.features, name] }));
  };

  const handleSave = () => {
    onSave({ ...business, ...form });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Editar {business.name}</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {BUSINESS_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Ubicación</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Horario</label>
          <input value={form.hours} onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Teléfono</label>
          <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} type="tel" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Rango de precios</label>
          <select value={form.priceRange} onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Características</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ALL_FEATURES.map((name) => (
              <label key={name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
                <input type="checkbox" checked={form.features.includes(name)} onChange={() => toggleFeature(name)} />
                {name}
              </label>
            ))}
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Logo</label>
          <div style={{ width: 80, height: 80, borderRadius: 14, overflow: "hidden" }}>
            <ImagePlaceholder caption="Logo" />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Foto principal</label>
          <div style={{ height: 120, borderRadius: 12, overflow: "hidden" }}>
            <ImagePlaceholder caption="Foto del negocio" />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Galería (hasta 10 fotos)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ height: 56, borderRadius: 8, overflow: "hidden" }}>
                <ImagePlaceholder caption="+" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #EEF3F3", paddingTop: 14 }}>
          <label style={labelStyle}>Visibilidad</label>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility" checked={form.visibility === "Publicado"} onChange={() => setForm((f) => ({ ...f, visibility: "Publicado" }))} />
              Publicado
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility" checked={form.visibility === "Invisible"} onChange={() => setForm((f) => ({ ...f, visibility: "Invisible" }))} />
              Invisible
            </label>
          </div>
          {business.pendingApproval && (
            <p style={{ margin: 0, fontSize: 12, color: "#EB600A", background: "#FDEEE4", padding: "8px 12px", borderRadius: 8 }}>
              Este negocio está pendiente de aprobación por el equipo de Visit San Carlos. Una vez aprobado podrás publicarlo.
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
