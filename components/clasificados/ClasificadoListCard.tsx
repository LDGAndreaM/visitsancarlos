import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Clasificado } from "@/lib/clasificadosData";
import { priceLabel } from "@/lib/clasificadosUtils";

export default function ClasificadoListCard({ item }: { item: Clasificado }) {
  return (
    <div style={{ display: "flex", gap: 16, background: "#ffffff", borderRadius: 16, padding: 14, boxShadow: "0 8px 20px rgba(0,60,66,0.08)", alignItems: "center" }}>
      <div style={{ width: 110, height: 80, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
        <ImagePlaceholder caption={item.placeholder} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#6AC7E2", letterSpacing: "0.04em" }}>{item.category}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{item.title}</span>
        <span style={{ fontSize: 13, color: "#3B5C61" }}>
          {item.location} · {item.condition}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: "#EB600A" }}>{priceLabel(item)}</span>
        <span style={{ fontSize: 12, color: "#7FA7AA" }}>{item.addedLabel}</span>
      </div>
    </div>
  );
}
