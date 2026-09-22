import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { DashboardBusiness } from "@/lib/dashboardData";
import type { AdView } from "./DashboardApp";
import type { DashboardTab } from "./DashboardApp";

const statCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 16, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 6 };
const sectionCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 18, padding: 24, boxShadow: "0 8px 20px rgba(0,60,66,0.06)" };

type ResumenTabProps = {
  businesses: DashboardBusiness[];
  ads: AdView[];
  onTabChange: (tab: DashboardTab) => void;
};

export default function ResumenTab({ businesses, ads, onTabChange }: ResumenTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Estado del perfil</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#009BA4" }}>Activo</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Vistas este mes</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>210</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Calificación</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#EB600A" }}>★ 4.7</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Publicidad activa</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>{ads.filter((a) => a.status === "Activo").length}</span>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>Mis establecimientos</h2>
          <button onClick={() => onTabChange("negocios")} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Ver todos →
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {businesses.map((biz) => (
            <div key={biz.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #EEF3F3", borderRadius: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption="Logo" />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{biz.name}</span>
                <span style={{ fontSize: 12, color: "#5C7679" }}>{biz.category}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: biz.statusColor, background: biz.statusBg, padding: "5px 12px", borderRadius: 999 }}>{biz.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>Publicidad contratada</h2>
          <button onClick={() => onTabChange("publicidad")} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Ver todas →
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ads.map((ad) => (
            <div key={ad.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #EEF3F3", borderRadius: 12 }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{ad.name}</span>
                <span style={{ fontSize: 12, color: "#5C7679" }}>
                  {ad.businessName} · vigencia {ad.period}
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: ad.statusColor, background: ad.statusBg, padding: "5px 12px", borderRadius: 999 }}>{ad.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
