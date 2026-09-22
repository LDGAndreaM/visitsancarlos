"use client";

import { useState } from "react";
import type { AdminEvent, AdminEventStatus } from "@/lib/adminData";

const STATUS_OPTIONS: AdminEventStatus[] = ["Publicado", "Borrador", "Archivado"];

type EditEventAdminModalProps = {
  event: AdminEvent;
  onClose: () => void;
  onSave: (event: AdminEvent) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditEventAdminModal({ event, onClose, onSave }: EditEventAdminModalProps) {
  const [form, setForm] = useState({ name: event.name, date: event.date, category: event.category, status: event.status });

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 440, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Editar evento (admin)</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre del evento</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Fecha</label>
          <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Estado</label>
          <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AdminEventStatus }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onSave({ ...event, ...form })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
