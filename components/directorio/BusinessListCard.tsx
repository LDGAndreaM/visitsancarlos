import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Business } from "@/lib/directorioData";

export default function BusinessListCard({ business: biz }: { business: Business }) {
  return (
    <Link
      href={`/directorio/${biz.id}`}
      style={{ display: "flex", gap: 16, background: "#ffffff", borderRadius: 16, padding: 14, boxShadow: "0 8px 20px rgba(0,60,66,0.08)", alignItems: "center", color: "inherit" }}
    >
      <div style={{ width: 110, height: 80, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
        <ImagePlaceholder caption={biz.placeholder} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#6AC7E2", letterSpacing: "0.04em" }}>{biz.category}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
        <span style={{ fontSize: 13, color: "#3B5C61" }}>{biz.location}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#009BA4" }}>{biz.price}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#EB600A" }}>★ {biz.rating}</span>
      </div>
    </Link>
  );
}
