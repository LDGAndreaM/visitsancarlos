import { useRef } from "react";
import { EVENT_CATEGORIES } from "@/lib/eventsData";
import type { EventItem } from "@/lib/eventsData";

type AddEventModalProps = {
  onClose: () => void;
  onSubmit: (values: Omit<EventItem, "id">) => void;
  defaultDate: string;
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #E2ECED",
  outline: "none",
  borderRadius: 10,
  padding: "11px 14px",
  fontFamily: "inherit",
  fontSize: 14,
};

const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };

export default function AddEventModal({ onClose, onSubmit, defaultDate }: AddEventModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  const catRef = useRef<HTMLSelectElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const organizersRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const facebookRef = useRef<HTMLInputElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const val = (r: React.RefObject<{ value: string } | null>) => r.current?.value ?? "";
    const dateVal = val(startDateRef) || defaultDate;
    onSubmit({
      date: dateVal,
      endDate: val(endDateRef) || dateVal,
      time: val(startTimeRef) || "00:00",
      endTime: val(endTimeRef) || "",
      name: val(nameRef) || "Nuevo evento",
      place: val(addressRef) || "Por confirmar",
      category: (val(catRef) || "General").toUpperCase(),
      description: val(descRef) || "",
      cost: val(costRef) || "Por confirmar",
      organizers: val(organizersRef) || "",
      phone: val(phoneRef) || "",
      email: val(emailRef) || "",
      facebook: val(facebookRef) || "",
      instagram: val(instagramRef) || "",
      website: val(websiteRef) || "",
    });
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 20,
          padding: 36,
          maxWidth: 480,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: "0 24px 50px rgba(0,0,0,0.25)",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Agregar evento</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre del evento</label>
          <input ref={nameRef} type="text" placeholder="Nombre del evento" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fecha de inicio</label>
            <input ref={startDateRef} type="date" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fecha de término</label>
            <input ref={endDateRef} type="date" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Hora de inicio</label>
            <input ref={startTimeRef} type="time" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Hora de término</label>
            <input ref={endTimeRef} type="time" style={inputStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select ref={catRef} style={{ ...inputStyle, color: "#143840", background: "#ffffff" }}>
            {EVENT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea ref={descRef} rows={3} placeholder="Detalles del evento" style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Costo</label>
          <input ref={costRef} type="text" placeholder="Ej. Gratis o $150 MXN" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Organizador(es)</label>
          <input ref={organizersRef} type="text" placeholder="Nombre del organizador" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Dirección</label>
          <input ref={addressRef} type="text" placeholder="Ej. Malecón San Carlos, San Carlos, Sonora" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Teléfono</label>
            <input ref={phoneRef} type="tel" placeholder="+52 622 000 0000" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Correo</label>
            <input ref={emailRef} type="email" placeholder="correo@evento.com" style={inputStyle} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Facebook</label>
            <input ref={facebookRef} type="url" placeholder="https://facebook.com/..." style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Instagram</label>
            <input ref={instagramRef} type="url" placeholder="https://instagram.com/..." style={inputStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Página web</label>
          <input ref={websiteRef} type="url" placeholder="https://..." style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button
            onClick={onClose}
            style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Guardar evento
          </button>
        </div>
      </div>
    </div>
  );
}
