import { EVENT_STATUS_COLORS, type AdminEvent } from "@/lib/adminData";

const gridCols = "1.8fr 1fr 0.9fr 0.9fr 0.5fr 2.1fr";

type EventosAdminTabProps = {
  events: AdminEvent[];
  onOpenNewEvent: () => void;
  onToggleFeatured: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function EventosAdminTab({ events, onOpenNewEvent, onToggleFeatured, onEdit, onArchive, onDelete }: EventosAdminTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onOpenNewEvent} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Nuevo evento
        </button>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Evento</span>
          <span>Fecha</span>
          <span>Categoría</span>
          <span>Estado</span>
          <span>⭐</span>
          <span />
        </div>
        {events.map((ev) => {
          const [statusColor, statusBg] = EVENT_STATUS_COLORS[ev.status];
          return (
            <div key={ev.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{ev.name}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{ev.date}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{ev.category}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: statusBg, padding: "5px 12px", borderRadius: 999, width: "fit-content" }}>{ev.status}</span>
              <button onClick={() => onToggleFeatured(ev.id)} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", width: "fit-content" }}>
                {ev.featured ? "⭐" : "☆"}
              </button>
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button onClick={() => onEdit(ev.id)} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 12, padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
                  Editar
                </button>
                <button onClick={() => onArchive(ev.id)} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 12, padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
                  {ev.status === "Archivado" ? "Reactivar" : "Archivar"}
                </button>
                <button onClick={() => onDelete(ev.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
