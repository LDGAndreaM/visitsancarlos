import BusinessListCard from "./BusinessListCard";
import type { Business } from "@/lib/directorioData";

export default function ResultsList({ businesses }: { businesses: Business[] }) {
  return (
    <section style={{ padding: "24px 48px 60px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {businesses.map((biz) => (
          <BusinessListCard key={biz.id} business={biz} />
        ))}
      </div>
      {businesses.length === 0 && <p style={{ textAlign: "center", fontSize: 14, color: "#7FA7AA", marginTop: 20 }}>No hay negocios que coincidan con estos filtros.</p>}
    </section>
  );
}
