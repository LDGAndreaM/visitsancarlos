import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Clasificado } from "@/lib/clasificadosData";
import { priceLabel } from "@/lib/clasificadosUtils";

export default function ClasificadoMapCard({ item }: { item: Clasificado }) {
  return (
    <div style={{ display: "flex", gap: 12, background: "#ffffff", borderRadius: 14, padding: 12, boxShadow: "0 6px 16px rgba(0,60,66,0.08)", alignItems: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
        <ImagePlaceholder caption={item.placeholder} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{item.title}</span>
        <span style={{ fontSize: 12, color: "#3B5C61" }}>{item.location}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 800, color: "#EB600A", flexShrink: 0 }}>{priceLabel(item)}</span>
    </div>
  );
}
