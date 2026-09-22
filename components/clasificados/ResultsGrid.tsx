import ClasificadoGridCard from "./ClasificadoGridCard";
import type { Clasificado } from "@/lib/clasificadosData";

export default function ResultsGrid({ items }: { items: Clasificado[] }) {
  return (
    <section style={{ padding: "24px 48px 60px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {items.map((it) => (
          <ClasificadoGridCard key={it.id} item={it} />
        ))}
      </div>
      {items.length === 0 && <p style={{ textAlign: "center", fontSize: 14, color: "#7FA7AA", marginTop: 20 }}>No hay artículos que coincidan con estos filtros.</p>}
    </section>
  );
}
