import ClasificadoListCard from "./ClasificadoListCard";
import type { Clasificado } from "@/lib/clasificadosData";

export default function ResultsList({ items }: { items: Clasificado[] }) {
  return (
    <section style={{ padding: "24px 48px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((it) => (
          <ClasificadoListCard key={it.id} item={it} />
        ))}
      </div>
      {items.length === 0 && <p style={{ textAlign: "center", fontSize: 14, color: "#7FA7AA", marginTop: 20 }}>No hay artículos que coincidan con estos filtros.</p>}
    </section>
  );
}
