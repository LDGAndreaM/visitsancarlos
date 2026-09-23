import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { AdminBusiness, AdminClasificado, AdminEvent } from "@/lib/adminData";

type AprobacionesTabProps = {
  pendingBusinesses: AdminBusiness[];
  pendingEvents: AdminEvent[];
  pendingClasificados: AdminClasificado[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDetail: (id: string) => void;
  onApproveEvent: (id: string) => void;
  onRejectEvent: (id: string) => void;
  onApproveClasificado: (id: string) => void;
  onRejectClasificado: (id: string) => void;
};

const cardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 18, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", alignItems: "center", gap: 18 };
const detailBtnStyle: React.CSSProperties = { border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 10, cursor: "pointer", flexShrink: 0 };
const approveBtnStyle: React.CSSProperties = { border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 10, cursor: "pointer", flexShrink: 0 };
const rejectBtnStyle: React.CSSProperties = { border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 };

export default function AprobacionesTab({
  pendingBusinesses,
  pendingEvents,
  pendingClasificados,
  onApprove,
  onReject,
  onDetail,
  onApproveEvent,
  onRejectEvent,
  onApproveClasificado,
  onRejectClasificado,
}: AprobacionesTabProps) {
  const total = pendingBusinesses.length + pendingEvents.length + pendingClasificados.length;

  if (total === 0) {
    return (
      <div style={{ background: "#ffffff", borderRadius: 18, padding: 40, textAlign: "center", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#7FA7AA" }}>No hay publicaciones pendientes de aprobación. 🎉</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {pendingBusinesses.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#143840" }}>Negocios ({pendingBusinesses.length})</h3>
          {pendingBusinesses.map((biz) => (
            <div key={biz.id} style={cardStyle}>
              <div style={{ width: 64, height: 64, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption="Logo" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
                <span style={{ fontSize: 13, color: "#5C7679" }}>
                  {biz.owner} · {biz.category} · {biz.location}
                </span>
                <span style={{ fontSize: 12, color: "#7FA7AA" }}>Enviado el {biz.submitted}</span>
              </div>
              <button onClick={() => onDetail(biz.id)} style={detailBtnStyle}>
                Ver detalle
              </button>
              <button onClick={() => onApprove(biz.id)} style={approveBtnStyle}>
                Aprobar
              </button>
              <button onClick={() => onReject(biz.id)} style={rejectBtnStyle}>
                Rechazar
              </button>
            </div>
          ))}
        </div>
      )}

      {pendingEvents.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#143840" }}>Eventos ({pendingEvents.length})</h3>
          {pendingEvents.map((ev) => (
            <div key={ev.id} style={cardStyle}>
              <div style={{ width: 64, height: 64, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption="Evento" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{ev.name}</span>
                <span style={{ fontSize: 13, color: "#5C7679" }}>
                  {ev.category} · {ev.date}
                </span>
              </div>
              <button onClick={() => onApproveEvent(ev.id)} style={approveBtnStyle}>
                Aprobar
              </button>
              <button onClick={() => onRejectEvent(ev.id)} style={rejectBtnStyle}>
                Rechazar
              </button>
            </div>
          ))}
        </div>
      )}

      {pendingClasificados.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#143840" }}>Clasificados ({pendingClasificados.length})</h3>
          {pendingClasificados.map((it) => (
            <div key={it.id} style={cardStyle}>
              <div style={{ width: 64, height: 64, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption="Artículo" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{it.title}</span>
                <span style={{ fontSize: 13, color: "#5C7679" }}>
                  {it.owner} · {it.category} · ${it.price.toLocaleString("es-MX")}
                </span>
                <span style={{ fontSize: 12, color: "#7FA7AA" }}>Enviado el {it.submitted}</span>
              </div>
              <button onClick={() => onApproveClasificado(it.id)} style={approveBtnStyle}>
                Aprobar
              </button>
              <button onClick={() => onRejectClasificado(it.id)} style={rejectBtnStyle}>
                Rechazar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
