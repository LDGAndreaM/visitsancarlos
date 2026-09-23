import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { AdminBusiness, Chat } from "@/lib/adminData";
import type { AdminTab } from "@/lib/adminAuth";

const statCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 16, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 6 };
const cardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 18, padding: 24, boxShadow: "0 8px 20px rgba(0,60,66,0.06)" };

type ResumenTabProps = {
  stats: { userCount: number; publishedCount: number; pendingCount: number; revenueFmt: string };
  pendingBusinesses: AdminBusiness[];
  unreadChats: Chat[];
  onApprove: (id: string) => void;
  onTabChange: (tab: AdminTab) => void;
  onOpenChat: (id: string) => void;
};

export default function ResumenTab({ stats, pendingBusinesses, unreadChats, onApprove, onTabChange, onOpenChat }: ResumenTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Usuarios registrados</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#143840" }}>{stats.userCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Negocios publicados</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#009BA4" }}>{stats.publishedCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Pendientes de aprobación</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#EB600A" }}>{stats.pendingCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Ingreso mensual estimado</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: "#143840" }}>{stats.revenueFmt}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>Aprobaciones pendientes</h2>
            <button onClick={() => onTabChange("aprobaciones")} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Ver todas →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pendingBusinesses.map((biz) => (
              <div key={biz.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #EEF3F3", borderRadius: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                  <ImagePlaceholder caption="Logo" />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{biz.name}</span>
                  <span style={{ fontSize: 12, color: "#5C7679" }}>
                    {biz.owner} · {biz.category}
                  </span>
                </div>
                <button onClick={() => onApprove(biz.id)} style={{ border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 12, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
                  Aprobar
                </button>
              </div>
            ))}
            {pendingBusinesses.length === 0 && <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA" }}>No hay negocios pendientes.</p>}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>Soporte sin responder</h2>
            <button onClick={() => onTabChange("soporte")} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Ver todas →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {unreadChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onOpenChat(chat.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid #EEF3F3", background: "none", borderRadius: 12, cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EB600A", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{chat.userName}</span>
                  <span style={{ fontSize: 12, color: "#5C7679" }}>{chat.messages[chat.messages.length - 1]?.text}</span>
                </div>
              </button>
            ))}
            {unreadChats.length === 0 && <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA" }}>Sin mensajes pendientes. 🎉</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
