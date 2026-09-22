import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { DashboardBusiness } from "@/lib/dashboardData";

type NegociosTabProps = {
  businesses: DashboardBusiness[];
  onEdit: (id: string) => void;
  onAddBusiness: () => void;
};

export default function NegociosTab({ businesses, onEdit, onAddBusiness }: NegociosTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>Mis establecimientos</h2>
        <button onClick={onAddBusiness} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Agregar negocio
        </button>
      </div>
      {businesses.map((biz) => (
        <div key={biz.id} style={{ background: "#ffffff", borderRadius: 18, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 72, height: 72, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
            <ImagePlaceholder caption="Logo" />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>
              {biz.category} · {biz.location}
            </span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{biz.hours}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: biz.statusColor, background: biz.statusBg, padding: "5px 12px", borderRadius: 999, flexShrink: 0 }}>{biz.status}</span>
          <button
            onClick={() => onEdit(biz.id)}
            style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
