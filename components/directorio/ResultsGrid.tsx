import BusinessGridCard from "./BusinessGridCard";
import Pagination from "./Pagination";
import type { Business } from "@/lib/directorioData";

type ResultsGridProps = {
  businesses: Business[];
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ResultsGrid({ businesses, favorites, onToggleFavorite, page, totalPages, onPageChange }: ResultsGridProps) {
  return (
    <section style={{ padding: "24px 48px 60px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {businesses.map((biz) => (
          <BusinessGridCard key={biz.id} business={biz} isFavorite={!!favorites[biz.id]} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
      {businesses.length === 0 && <p style={{ textAlign: "center", fontSize: 14, color: "#7FA7AA", marginTop: 20 }}>No hay negocios que coincidan con estos filtros.</p>}
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  );
}
