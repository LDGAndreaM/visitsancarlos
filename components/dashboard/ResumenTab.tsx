import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { AdView, DashboardTab, ListingRow } from "./DashboardApp";

const statCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 16, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 6 };
const sectionCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 18, padding: 24, boxShadow: "0 8px 20px rgba(0,60,66,0.06)" };

type ResumenTabProps = {
  listings: ListingRow[];
  ads: AdView[];
  onTabChange: (tab: DashboardTab) => void;
};

export default function ResumenTab({ listings, ads, onTabChange }: ResumenTabProps) {
  const directorioCount = listings.filter((l) => l.type === "directorio").length;
  const clasificadoCount = listings.filter((l) => l.type === "clasificado").length;
  const eventoCount = listings.filter((l) => l.type === "evento").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Negocios en directorio</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#009BA4" }}>{directorioCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Anuncios en clasificados</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>{clasificadoCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Eventos publicados</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#3FA8C4" }}>{eventoCount}</span>
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
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>Mis publicaciones</h2>
          <button onClick={() => onTabChange("publicaciones")} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Ver todas →
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {listings.map((l) => (
            <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #EEF3F3", borderRadius: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption="Foto" />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{l.displayName}</span>
                <span style={{ fontSize: 12, color: "#5C7679" }}>{l.subtitle}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: l.typeColor, background: l.typeBg, padding: "4px 10px", borderRadius: 999, flexShrink: 0 }}>{l.typeLabel}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: l.statusColor, background: l.statusBg, padding: "5px 12px", borderRadius: 999, flexShrink: 0 }}>{l.status}</span>
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
