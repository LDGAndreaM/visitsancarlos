import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Business } from "@/lib/directorioData";

export default function BusinessMapCard({ business: biz }: { business: Business }) {
  return (
    <Link
      href={`/directorio/${biz.id}`}
      style={{ display: "flex", gap: 12, background: "#ffffff", borderRadius: 14, padding: 12, boxShadow: "0 6px 16px rgba(0,60,66,0.08)", alignItems: "center", color: "inherit" }}
    >
      <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
        <ImagePlaceholder caption={biz.placeholder} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
        <span style={{ fontSize: 12, color: "#3B5C61" }}>{biz.location}</span>
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#EB600A", flexShrink: 0 }}>★ {biz.rating}</span>
    </Link>
  );
}
