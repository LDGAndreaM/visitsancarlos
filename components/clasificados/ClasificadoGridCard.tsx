import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Clasificado } from "@/lib/clasificadosData";
import { categoryColor, priceLabel } from "@/lib/clasificadosUtils";

export default function ClasificadoGridCard({ item }: { item: Clasificado }) {
  return (
    <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,60,66,0.08)" }}>
      <div style={{ position: "relative", height: 180 }}>
        <ImagePlaceholder caption={item.placeholder} />
        <span style={{ position: "absolute", top: 10, left: 10, background: categoryColor(item.category), color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999, zIndex: 2 }}>
          {item.category}
        </span>
        {item.condition === "Nuevo" && (
          <span style={{ position: "absolute", top: 10, right: 10, background: "#E23E7E", color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999, zIndex: 2 }}>
            Nuevo
          </span>
        )}
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{item.title}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "#EB600A" }}>{priceLabel(item)}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5C7679" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path d="M10 18s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" stroke="#5C7679" strokeWidth="1.4" fill="none" />
            <circle cx="10" cy="8" r="2" stroke="#5C7679" strokeWidth="1.4" />
          </svg>
          <span>{item.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5C7679" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <rect x="6" y="2" width="8" height="16" rx="2" stroke="#5C7679" strokeWidth="1.4" />
          </svg>
          <span>{item.phone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #EEF3F3", marginTop: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#3B5C61" }}>{item.condition}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#7FA7AA" }}>
            <svg width="13" height="13" viewBox="0 0 20 14" fill="none">
              <path d="M1 7s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="#7FA7AA" strokeWidth="1.3" fill="none" />
              <circle cx="10" cy="7" r="2.4" stroke="#7FA7AA" strokeWidth="1.3" />
            </svg>
            <span>{item.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
