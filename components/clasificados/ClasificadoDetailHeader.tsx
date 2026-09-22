import type { Clasificado } from "@/lib/clasificadosData";
import { categoryColor, priceLabel } from "@/lib/clasificadosUtils";

export default function ClasificadoDetailHeader({ item }: { item: Clasificado }) {
  return (
    <section style={{ padding: "16px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ background: categoryColor(item.category), color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>
          {item.category}
        </span>
        <span style={{ background: item.condition === "Nuevo" ? "#E23E7E" : "#7FA7AA", color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>
          {item.condition}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#143840", maxWidth: 700 }}>{item.title}</h1>
        <span style={{ fontSize: 30, fontWeight: 800, color: "#EB600A", whiteSpace: "nowrap" }}>{priceLabel(item)}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#5C7679" }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
            <path d="M10 18s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" stroke="#5C7679" strokeWidth="1.4" fill="none" />
            <circle cx="10" cy="8" r="2" stroke="#5C7679" strokeWidth="1.4" />
          </svg>
          <span>{item.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#5C7679" }}>
          <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#5C7679" strokeWidth="1.4" />
            <path d="M9 5v4l3 2" stroke="#5C7679" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
          <span>Publicado el {item.addedLabel}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7FA7AA" }}>
          <svg width="14" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M1 7s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="#7FA7AA" strokeWidth="1.3" fill="none" />
            <circle cx="10" cy="7" r="2.4" stroke="#7FA7AA" strokeWidth="1.3" />
          </svg>
          <span>{item.views} vistas</span>
        </div>
      </div>
    </section>
  );
}
