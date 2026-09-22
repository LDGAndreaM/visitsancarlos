import { AD_STATUS_COLORS, fmtMoneyMXN, type AdminAd } from "@/lib/adminData";

const gridCols = "2fr 1.3fr 1.3fr 1fr 1fr";
const statCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 16, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 6 };

type PublicidadAdminTabProps = {
  ads: AdminAd[];
  adminAdStats: { activeCount: number; pendingCount: number };
  revenueFmt: string;
};

export default function PublicidadAdminTab({ ads, adminAdStats, revenueFmt }: PublicidadAdminTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Espacios activos</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#009BA4" }}>{adminAdStats.activeCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Pendientes de pago</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#EB600A" }}>{adminAdStats.pendingCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Ingreso mensual estimado</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>{revenueFmt}</span>
        </div>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Espacio</span>
          <span>Negocio</span>
          <span>Vigencia</span>
          <span>Precio</span>
          <span>Estado</span>
        </div>
        {ads.map((ad) => {
          const [statusColor, statusBg] = AD_STATUS_COLORS[ad.status];
          return (
            <div key={ad.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{ad.name}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{ad.businessName}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{ad.period}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>{fmtMoneyMXN(ad.price)}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: statusBg, padding: "5px 12px", borderRadius: 999, width: "fit-content" }}>{ad.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
