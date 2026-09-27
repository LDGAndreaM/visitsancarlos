"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { starsArr } from "@/lib/directorioUtils";
import { getCurrentUser, type CurrentUser } from "@/lib/supabase/session";
import { deleteReview, fetchReviewsForBusiness, submitReview, type Review } from "@/lib/supabase/reviews";

const starButtonStyle = (active: boolean): React.CSSProperties => ({
  border: "none",
  background: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: 26,
  lineHeight: 1,
  color: active ? "#F2A93B" : "#E3E9EA",
});

export default function ReviewsSection({ businessId, ownerId, rating, reviewCount }: { businessId: string; ownerId?: string; rating: number; reviewCount: number }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviewsForBusiness(businessId)
      .then(setReviews)
      .catch(() => setReviews([]));
    getCurrentUser().then(setCurrentUser);
  }, [businessId]);

  const myReview = useMemo(() => reviews?.find((r) => r.authorId === currentUser?.id) ?? null, [reviews, currentUser]);

  useEffect(() => {
    if (myReview) {
      setFormRating(myReview.rating);
      setFormComment(myReview.comment);
    }
  }, [myReview]);

  const isOwner = !!currentUser && !!ownerId && currentUser.id === ownerId;
  const displayCount = reviews?.length ?? reviewCount;
  const displayRating = reviews && reviews.length > 0 ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10 : reviews ? 0 : rating;

  const handleSubmit = async () => {
    if (!currentUser) return;
    setSubmitting(true);
    try {
      await submitReview(businessId, currentUser.id, formRating, formComment.trim());
      setReviews(await fetchReviewsForBusiness(businessId));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!myReview) return;
    setSubmitting(true);
    try {
      await deleteReview(myReview.id);
      setFormRating(5);
      setFormComment("");
      setReviews(await fetchReviewsForBusiness(businessId));
    } finally {
      setSubmitting(false);
    }
  };

  const others = reviews?.filter((r) => r.id !== myReview?.id) ?? [];

  return (
    <section id="reviews" style={{ padding: "24px 48px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#143840" }}>Reseñas</h2>
          {displayCount > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "flex", gap: 1 }}>
                {starsArr(displayRating).map((filled, i) => (
                  <span key={i} style={{ fontSize: 16, color: filled ? "#F2A93B" : "#E3E9EA" }}>
                    ★
                  </span>
                ))}
              </span>
              <span style={{ fontSize: 14, color: "#3B5C61" }}>
                {displayRating} · {displayCount} {displayCount === 1 ? "reseña" : "reseñas"}
              </span>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: "#5C7679" }}>Este negocio aún no tiene reseñas.</p>
          )}
        </div>

        {others.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {others.map((r) => (
              <div key={r.id} style={{ borderBottom: "1px solid #EEF3F3", paddingBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{r.authorName}</span>
                  <span style={{ fontSize: 12, color: "#7FA7AA" }}>{r.dateLabel}</span>
                </div>
                <span style={{ display: "flex", gap: 1 }}>
                  {starsArr(r.rating).map((filled, i) => (
                    <span key={i} style={{ fontSize: 12, color: filled ? "#F2A93B" : "#E3E9EA" }}>
                      ★
                    </span>
                  ))}
                </span>
                {r.comment && <p style={{ margin: 0, fontSize: 13, color: "#3B5C61", lineHeight: 1.6 }}>{r.comment}</p>}
              </div>
            ))}
          </div>
        )}

        <div style={{ borderTop: "1px solid #EEF3F3", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {!currentUser ? (
            <p style={{ margin: 0, fontSize: 14, color: "#5C7679" }}>
              <Link href="/login" style={{ color: "#009BA4", fontWeight: 700 }}>
                Inicia sesión
              </Link>{" "}
              para dejar una reseña.
            </p>
          ) : isOwner ? (
            <p style={{ margin: 0, fontSize: 14, color: "#5C7679" }}>No puedes dejar una reseña en tu propio negocio.</p>
          ) : (
            <>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#143840" }}>{myReview ? "Edita tu reseña" : "Deja tu reseña"}</h3>
              <div style={{ display: "flex", gap: 4 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setFormRating(n)} style={starButtonStyle(n <= formRating)} aria-label={`${n} estrellas`}>
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                rows={3}
                placeholder="Comparte tu experiencia..."
                style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontFamily: "inherit", fontSize: 14, resize: "vertical" }}
              />
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 10, cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.7 : 1 }}
                >
                  {myReview ? "Guardar cambios" : "Publicar reseña"}
                </button>
                {myReview && (
                  <button
                    onClick={handleDelete}
                    disabled={submitting}
                    style={{ border: "none", background: "transparent", color: "#B94A2E", fontWeight: 700, fontSize: 13, cursor: submitting ? "default" : "pointer" }}
                  >
                    Eliminar mi reseña
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
