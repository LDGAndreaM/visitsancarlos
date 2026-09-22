import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { AdminBusiness } from "@/lib/adminData";

type AprobacionesTabProps = {
  pendingBusinesses: AdminBusiness[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDetail: (id: string) => void;
};

export default function AprobacionesTab({ pendingBusinesses, onApprove, onReject, onDetail }: AprobacionesTabProps) {
  if (pendingBusinesses.length === 0) {
    return (
      <div style={{ background: "#ffffff", borderRadius: 18, padding: 40, textAlign: "center", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#7FA7AA" }}>No hay negocios pendientes de aprobación. 🎉</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {pendingBusinesses.map((biz) => (
        <div key={biz.id} style={{ background: "#ffffff", borderRadius: 18, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", alignItems: "center", gap: 18 }}>
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
          <button
            onClick={() => onDetail(biz.id)}
            style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
          >
            Ver detalle
          </button>
          <button
            onClick={() => onApprove(biz.id)}
            style={{ border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 16px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
          >
            Aprobar
          </button>
          <button onClick={() => onReject(biz.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
            Rechazar
          </button>
        </div>
      ))}
    </div>
  );
}
