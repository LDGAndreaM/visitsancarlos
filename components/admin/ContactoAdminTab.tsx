import type { ContactMessage } from "@/lib/supabase/contact";

type ContactoAdminTabProps = {
  messages: ContactMessage[];
  onToggleRead: (id: string, read: boolean) => void;
  onDelete: (id: string) => void;
};

export default function ContactoAdminTab({ messages, onToggleRead, onDelete }: ContactoAdminTabProps) {
  if (messages.length === 0) {
    return <p style={{ margin: 0, padding: 24, textAlign: "center", fontSize: 13, color: "#7FA7AA" }}>Aún no hay mensajes de contacto.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {messages.map((m) => (
        <div
          key={m.id}
          style={{
            background: "#ffffff",
            border: m.read ? "1px solid #EEF3F3" : "1px solid #009BA4",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 8px 20px rgba(0,60,66,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>
                {m.firstName} {m.lastName}
                {!m.read && (
                  <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, color: "#ffffff", background: "#EB600A", padding: "2px 8px", borderRadius: 999, verticalAlign: "middle" }}>NUEVO</span>
                )}
              </span>
              <a href={`mailto:${m.email}`} style={{ fontSize: 13, color: "#009BA4" }}>
                {m.email}
              </a>
              {m.phone && <span style={{ fontSize: 13, color: "#5C7679" }}>{m.phone}</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#009BA4", background: "#E5F6F7", padding: "4px 10px", borderRadius: 999 }}>{m.subject}</span>
              <span style={{ fontSize: 11, color: "#9DB6B8" }}>{m.dateLabel}</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: "#3B5C61", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.message}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onToggleRead(m.id, !m.read)}
              style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 12, padding: "8px 14px", borderRadius: 8, cursor: "pointer" }}
            >
              {m.read ? "Marcar como no leído" : "Marcar como leído"}
            </button>
            <button onClick={() => onDelete(m.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
