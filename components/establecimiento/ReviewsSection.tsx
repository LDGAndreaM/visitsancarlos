import { starsArr } from "@/lib/directorioUtils";

export default function ReviewsSection({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <section id="reviews" style={{ padding: "24px 48px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#143840" }}>Reseñas</h2>
        {reviewCount > 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "flex", gap: 1 }}>
              {starsArr(rating).map((filled, i) => (
                <span key={i} style={{ fontSize: 16, color: filled ? "#F2A93B" : "#E3E9EA" }}>
                  ★
                </span>
              ))}
            </span>
            <span style={{ fontSize: 14, color: "#3B5C61" }}>
              {rating} · {reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"}
            </span>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 14, color: "#5C7679" }}>Este negocio aún no tiene reseñas.</p>
        )}
      </div>
    </section>
  );
}
