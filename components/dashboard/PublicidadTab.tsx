import Link from "next/link";
import type { AdView } from "./DashboardApp";

type AdStats = {
  activeCount: number;
  monthlySpendFmt: string;
  nextExpiry: string;
};

type PublicidadTabProps = {
  ads: AdView[];
  adStats: AdStats;
  onOpenAdModal: () => void;
  onAdAction: (id: string) => void;
  onCancelAd: (id: string) => void;
};

const statCardStyle: React.CSSProperties = { background: "#ffffff", borderRadius: 16, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 6 };
const gridCols = "1.8fr 1.3fr 1.3fr 0.9fr 1fr 1.4fr";

export default function PublicidadTab({ ads, adStats, onOpenAdModal, onAdAction, onCancelAd }: PublicidadTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>Gestión de publicidad</h2>
        <button onClick={onOpenAdModal} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Contratar espacio
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Espacios activos</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#009BA4" }}>{adStats.activeCount}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Gasto mensual estimado</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>{adStats.monthlySpendFmt}</span>
        </div>
        <div style={statCardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#5C7679" }}>Próximo vencimiento</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#EB600A" }}>{adStats.nextExpiry}</span>
        </div>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Espacio</span>
          <span>Negocio</span>
          <span>Vigencia</span>
          <span>Precio</span>
          <span>Estado</span>
          <span />
        </div>
        {ads.map((ad) => (
          <div key={ad.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3", gap: 6 }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840", display: "block" }}>{ad.name}</span>
              <span style={{ fontSize: 11.5, color: "#5C7679" }}>{ad.billingLabel}</span>
            </div>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{ad.businessName}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{ad.period}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>{ad.priceFmt}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ad.statusColor, background: ad.statusBg, padding: "5px 12px", borderRadius: 999, width: "fit-content" }}>{ad.status}</span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button
                onClick={() => onAdAction(ad.id)}
                style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 12, padding: "8px 14px", borderRadius: 8, cursor: "pointer", width: "fit-content" }}
              >
                {ad.actionLabel}
              </button>
              <button onClick={() => onCancelAd(ad.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                Cancelar
              </button>
            </div>
          </div>
        ))}
        {ads.length === 0 && <div style={{ padding: "32px 20px", textAlign: "center", fontSize: 13, color: "#7FA7AA" }}>Aún no has contratado ningún espacio publicitario.</div>}
      </div>

      <p style={{ margin: 0, fontSize: 12.5, color: "#7FA7AA" }}>
        Los contratos trimestrales incluyen sesión de fotografía (2h) + vuelo de dron. Consulta el <Link href="/publicidad">tarifario completo</Link>.
      </p>
    </div>
  );
}
