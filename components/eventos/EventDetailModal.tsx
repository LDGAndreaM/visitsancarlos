import ImagePlaceholder from "@/components/ImagePlaceholder";
import SocialIcon from "@/components/SocialIcon";
import type { EventItem } from "@/lib/eventsData";
import { downloadIcs, fmtDateLabel } from "@/lib/eventsUtils";

type EventDetailModalProps = {
  event: EventItem;
  onClose: () => void;
};

export default function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const dateRangeLabel =
    event.endDate && event.endDate !== event.date
      ? `${fmtDateLabel(event.date)} – ${fmtDateLabel(event.endDate)}`
      : fmtDateLabel(event.date);
  const timeRangeLabel = event.endTime ? `${event.time} – ${event.endTime}` : event.time;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(event.place || "")}&output=embed`;

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
          padding: 0,
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ height: 180 }}>
          <ImagePlaceholder caption="Foto del evento" />
        </div>
        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#EB600A", letterSpacing: "0.03em" }}>{event.category}</span>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#143840" }}>{event.name}</h3>
          <span style={{ fontSize: 13, color: "#3B5C61", fontWeight: 600 }}>
            {dateRangeLabel} · {timeRangeLabel}
          </span>
          <span style={{ fontSize: 13, color: "#3B5C61" }}>Costo: {event.cost}</span>
          {event.organizers && <span style={{ fontSize: 13, color: "#3B5C61" }}>Organiza: {event.organizers}</span>}
          <p style={{ margin: 0, fontSize: 14, color: "#3B5C61", lineHeight: 1.6 }}>{event.description}</p>

          <span style={{ fontSize: 13, fontWeight: 700, color: "#143840", marginTop: 4 }}>{event.place}</span>
          <div style={{ borderRadius: 12, overflow: "hidden", height: 160, border: "1px solid #EEF3F3" }}>
            <iframe src={mapSrc} style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
            {event.phone && (
              <a href={`tel:${event.phone}`} aria-label="Teléfono" style={{ width: 36, height: 36, borderRadius: "50%", background: "#E5F6F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <rect x="6" y="2" width="8" height="16" rx="2" stroke="#009BA4" strokeWidth="1.6" />
                </svg>
              </a>
            )}
            {event.email && (
              <a href={`mailto:${event.email}`} aria-label="Correo" style={{ width: 36, height: 36, borderRadius: "50%", background: "#E5F6F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="#009BA4" strokeWidth="1.6" />
                  <path d="M3 5l7 6 7-6" stroke="#009BA4" strokeWidth="1.6" fill="none" />
                </svg>
              </a>
            )}
            {event.facebook && (
              <a href={event.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" style={{ width: 36, height: 36, borderRadius: "50%", background: "#009BA4", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <SocialIcon network="facebook" size={16} />
              </a>
            )}
            {event.instagram && (
              <a href={event.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" style={{ width: 36, height: 36, borderRadius: "50%", background: "#EB600A", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <SocialIcon network="instagram" size={16} />
              </a>
            )}
            {event.website && (
              <a href={event.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 700, color: "#009BA4", display: "flex", alignItems: "center" }}>
                Sitio web →
              </a>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button
              onClick={() => downloadIcs(event)}
              style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 10, cursor: "pointer" }}
            >
              + Agregar al calendario
            </button>
            <button
              onClick={onClose}
              style={{ border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 10, cursor: "pointer" }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
