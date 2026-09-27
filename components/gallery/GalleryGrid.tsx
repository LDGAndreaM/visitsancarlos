"use client";

import { useEffect, useState } from "react";
import { fetchApprovedPhotos, type GalleryPhotoView } from "@/lib/supabase/gallery";
import { GALLERY_FILTERS } from "@/lib/galleryData";

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<GalleryPhotoView[]>([]);
  const [activeFilter, setActiveFilter] = useState(GALLERY_FILTERS[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchApprovedPhotos().then(setPhotos);
  }, []);

  const filtered = activeFilter === "Todas" ? photos : photos.filter((p) => p.categories.includes(activeFilter));

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeFilter]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  const activePhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <section style={{ padding: "10px 48px 40px", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {GALLERY_FILTERS.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                background: isActive ? "#009BA4" : "#F4FAFB",
                color: isActive ? "#ffffff" : "#3B5C61",
                fontWeight: isActive ? 700 : 600,
                fontSize: 13,
                padding: "9px 18px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
              }}
            >
              {filter}
            </button>
          );
        })}
      </section>

      <section style={{ padding: "0 48px 60px" }}>
        <div className="vsc-gallery-grid" style={{ maxWidth: 1180, margin: "0 auto" }}>
          {filtered.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              style={{ gridRow: photo.tall ? "span 2" : undefined, borderRadius: 16, overflow: "hidden", cursor: "pointer" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA", gridColumn: "1 / -1", textAlign: "center" }}>Aún no hay fotos en esta categoría.</p>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            style={{
              background: "#ffffff",
              color: "#009BA4",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 28px",
              borderRadius: 10,
              border: "2px solid #009BA4",
              cursor: "pointer",
            }}
          >
            Cargar más fotos
          </button>
        </div>
      </section>

      {activePhoto && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(10,30,34,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Cerrar"
            style={{ position: "absolute", top: 20, right: 24, border: "none", background: "rgba(255,255,255,0.12)", color: "#ffffff", width: 40, height: 40, borderRadius: "50%", fontSize: 20, cursor: "pointer" }}
          >
            ×
          </button>

          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
              }}
              aria-label="Anterior"
              style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "rgba(255,255,255,0.12)", color: "#ffffff", width: 44, height: 44, borderRadius: "50%", fontSize: 22, cursor: "pointer" }}
            >
              ‹
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", maxWidth: "min(90vw, 1100px)", maxHeight: "88vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activePhoto.url} alt={activePhoto.caption} style={{ maxWidth: "100%", maxHeight: "72vh", borderRadius: 14, objectFit: "contain", display: "block" }} />
            {(activePhoto.caption || activePhoto.categories.length > 0) && (
              <div style={{ textAlign: "center", color: "#ffffff" }}>
                {activePhoto.caption && <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700 }}>{activePhoto.caption}</p>}
                {activePhoto.categories.length > 0 && (
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    {activePhoto.categories.map((c) => (
                      <span key={c} style={{ fontSize: 11, fontWeight: 700, color: "#ffffff", background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 999 }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
              }}
              aria-label="Siguiente"
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", border: "none", background: "rgba(255,255,255,0.12)", color: "#ffffff", width: 44, height: 44, borderRadius: "50%", fontSize: 22, cursor: "pointer" }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
