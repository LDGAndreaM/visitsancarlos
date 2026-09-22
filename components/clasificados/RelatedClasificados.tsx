import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { Clasificado } from "@/lib/clasificadosData";
import { priceLabel } from "@/lib/clasificadosUtils";

export default function RelatedClasificados({ items }: { items: Clasificado[] }) {
  if (items.length === 0) return null;

  return (
    <section style={{ padding: "24px 48px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Anuncios similares</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {items.map((it) => (
          <Link
            key={it.id}
            href={`/clasificados/${it.id}`}
            style={{ display: "block", background: "#ffffff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.08)", color: "inherit" }}
          >
            <div style={{ height: 130 }}>
              <ImagePlaceholder caption={it.placeholder} />
            </div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{it.title}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#EB600A" }}>{priceLabel(it)}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
