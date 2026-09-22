import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { AdminBusiness } from "@/lib/adminData";

type ApprovalDetailModalProps = {
  business: AdminBusiness;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
};

export default function ApprovalDetailModal({ business, onClose, onApprove, onReject }: ApprovalDetailModalProps) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>{business.name}</h3>
        <div style={{ width: "100%", height: 140, borderRadius: 12, overflow: "hidden" }}>
          <ImagePlaceholder caption="Foto del negocio" />
        </div>
        <span style={{ fontSize: 13, color: "#5C7679" }}>
          {business.category} · {business.location}
        </span>
        <span style={{ fontSize: 13, color: "#5C7679" }}>
          Dueño: {business.owner} · Tel. {business.phone}
        </span>
        <p style={{ margin: 0, fontSize: 13.5, color: "#3B5C61", lineHeight: 1.5 }}>{business.description}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cerrar
          </button>
          <button onClick={onReject} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Rechazar
          </button>
          <button onClick={onApprove} style={{ border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Aprobar
          </button>
        </div>
      </div>
    </div>
  );
}
