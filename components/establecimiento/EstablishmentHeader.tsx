import type { Business } from "@/lib/directorioData";
import { badgeColor, starsArr } from "@/lib/directorioUtils";

type EstablishmentHeaderProps = {
  business: Business;
  tags: string;
};

export default function EstablishmentHeader({ business, tags }: EstablishmentHeaderProps) {
  return (
    <section style={{ padding: "16px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 10px", fontSize: 30, fontWeight: 800, color: "#143840" }}>{business.name}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {business.badge && (
          <span style={{ background: badgeColor(business.badge), color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>{business.badge}</span>
        )}
        <span style={{ fontSize: 14, fontWeight: 800, color: "#143840" }}>
          {business.price}
          <span style={{ color: "#D8E2E3" }}>{"$".repeat(3 - business.price.length)}</span>
        </span>
        <span style={{ display: "flex", gap: 1 }}>
          {starsArr(business.rating).map((filled, i) => (
            <span key={i} style={{ fontSize: 14, color: filled ? "#F2A93B" : "#E3E9EA" }}>
              ★
            </span>
          ))}
        </span>
        <a href="#reviews" style={{ fontSize: 13, color: "#009BA4", fontWeight: 600 }}>
          {business.rating} ({business.reviewCount} reseñas)
        </a>
        <span style={{ fontSize: 13, color: "#5C7679" }}>{tags}</span>
      </div>
    </section>
  );
}
