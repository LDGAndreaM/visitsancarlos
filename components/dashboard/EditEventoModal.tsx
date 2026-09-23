"use client";

import { useState } from "react";
import { EVENT_CATEGORIES } from "@/lib/eventsData";
import type { EventListing } from "@/lib/dashboardData";

type EditEventoModalProps = {
  listing: EventListing;
  onClose: () => void;
  onSave: (listing: EventListing) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditEventoModal({ listing, onClose, onSave }: EditEventoModalProps) {
  const [form, setForm] = useState({
    name: listing.name,
    date: listing.date,
    endDate: listing.endDate,
    time: listing.time,
    endTime: listing.endTime,
    category: listing.category,
    description: listing.description,
    cost: listing.cost,
    organizers: listing.organizers,
    location: listing.location,
    phone: listing.phone,
    email: listing.email,
    facebook: listing.facebook,
    instagram: listing.instagram,
    website: listing.website,
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
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Evento — {listing.name}</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre del evento</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fecha de inicio</label>
            <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} type="date" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fecha de término</label>
            <input value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} type="date" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Hora de inicio</label>
            <input value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} type="time" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Hora de término</label>
            <input value={form.endTime} onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))} type="time" style={inputStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c.toUpperCase()}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Costo</label>
          <input value={form.cost} onChange={(e) => setForm((f) => ({ ...f, cost: e.target.value }))} type="text" placeholder="Ej. Gratis o $150 MXN" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Organizador(es)</label>
          <input value={form.organizers} onChange={(e) => setForm((f) => ({ ...f, organizers: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Dirección</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Teléfono</label>
            <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} type="tel" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Correo</label>
            <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} type="email" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Facebook</label>
            <input value={form.facebook} onChange={(e) => setForm((f) => ({ ...f, facebook: e.target.value }))} type="url" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Instagram</label>
            <input value={form.instagram} onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))} type="url" style={inputStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Página web</label>
          <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} type="url" style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #EEF3F3", paddingTop: 14 }}>
          <label style={labelStyle}>Visibilidad</label>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility-evt" checked={form.visibility === "Publicado"} onChange={() => setForm((f) => ({ ...f, visibility: "Publicado" }))} />
              Publicado
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility-evt" checked={form.visibility === "Invisible"} onChange={() => setForm((f) => ({ ...f, visibility: "Invisible" }))} />
              Invisible
            </label>
          </div>
          {listing.pendingApproval && (
            <p style={{ margin: 0, fontSize: 12, color: "#EB600A", background: "#FDEEE4", padding: "8px 12px", borderRadius: 8 }}>
              Este evento está pendiente de aprobación por el equipo de Visit San Carlos. Una vez aprobado se publicará en el calendario.
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
