"use client";

import { useState } from "react";
import { ADMIN_BUSINESS_CATEGORIES, type AdminBusiness, type AdminBusinessStatus } from "@/lib/adminData";

const BUSINESS_STATUS_OPTIONS: AdminBusinessStatus[] = ["Publicado", "Invisible", "Pendiente", "Archivado"];
const CATEGORY_OPTIONS = ADMIN_BUSINESS_CATEGORIES.filter((c) => c !== "Todas");

type EditBusinessAdminModalProps = {
  business: AdminBusiness;
  onClose: () => void;
  onSave: (business: AdminBusiness) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditBusinessAdminModal({ business, onClose, onSave }: EditBusinessAdminModalProps) {
  const [form, setForm] = useState({
    name: business.name,
    category: business.category,
    location: business.location,
    phone: business.phone,
    description: business.description,
    status: business.status,
  });

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Editar negocio (admin)</h3>
        <p style={{ margin: 0, fontSize: 12.5, color: "#7FA7AA" }}>Estos cambios se aplican aunque el dueño no los haya hecho desde su panel.</p>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Ubicación</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} type="text" style={inputStyle} />
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
          <label style={labelStyle}>Estado</label>
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AdminBusinessStatus }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {BUSINESS_STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onSave({ ...business, ...form })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
