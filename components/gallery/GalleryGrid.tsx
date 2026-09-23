"use client";

import { useEffect, useState } from "react";
import { fetchApprovedPhotos, type GalleryPhotoView } from "@/lib/supabase/gallery";

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<GalleryPhotoView[]>([]);
  useEffect(() => {
    fetchApprovedPhotos().then(setPhotos);
  }, []);

  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: 160, gap: 16 }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ gridRow: photo.tall ? "span 2" : undefined, borderRadius: 16, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        ))}
        {photos.length === 0 && <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA", gridColumn: "1 / -1", textAlign: "center" }}>Aún no hay fotos en la galería.</p>}
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
  );
}
