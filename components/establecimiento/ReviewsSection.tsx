"use client";

import { useRef, useState } from "react";
import type { Review } from "@/lib/establishmentDetails";
import { starsArr } from "@/lib/directorioUtils";

export default function ReviewsSection({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const nameRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLSelectElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const submitReview = () => {
    const comment = commentRef.current?.value ?? "";
    if (!comment) return;
    const name = nameRef.current?.value || "Anónimo";
    const rating = Number(ratingRef.current?.value ?? 5);
    setReviews((prev) => [{ id: "r" + Date.now(), name, rating, comment, date: "Hoy" }, ...prev]);
    if (nameRef.current) nameRef.current.value = "";
    if (commentRef.current) commentRef.current.value = "";
  };

  return (
    <section id="reviews" style={{ padding: "24px 48px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#143840" }}>Reseñas ({reviews.length})</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {reviews.map((r) => (
            <div key={r.id} style={{ borderBottom: "1px solid #EEF3F3", paddingBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{r.name}</span>
                <span style={{ fontSize: 12, color: "#7FA7AA" }}>{r.date}</span>
              </div>
              <span style={{ display: "flex", gap: 1 }}>
                {starsArr(r.rating).map((filled, i) => (
                  <span key={i} style={{ fontSize: 12, color: filled ? "#F2A93B" : "#E3E9EA" }}>
                    ★
                  </span>
                ))}
              </span>
              <p style={{ margin: 0, fontSize: 13, color: "#3B5C61", lineHeight: 1.6 }}>{r.comment}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #EEF3F3", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#143840" }}>Deja tu reseña</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: 12 }}>
            <input
              ref={nameRef}
              type="text"
              placeholder="Tu nombre"
              style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontFamily: "inherit", fontSize: 14 }}
            />
            <select ref={ratingRef} defaultValue="5" style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontFamily: "inherit", fontSize: 14, color: "#143840", background: "#ffffff" }}>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>
          <textarea
            ref={commentRef}
            rows={3}
            placeholder="Comparte tu experiencia..."
            style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontFamily: "inherit", fontSize: 14, resize: "vertical" }}
          />
          <button
            onClick={submitReview}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 10, cursor: "pointer", alignSelf: "flex-start" }}
          >
            Publicar reseña
          </button>
        </div>
      </div>
    </section>
  );
}
