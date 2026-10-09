"use client";

import { useState } from "react";
import ListingImage from "@/components/ListingImage";

type GalleryProps = {
  images: { id: string; placeholder: string; url?: string }[];
};

export default function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      <div style={{ height: 420, borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,60,66,0.1)" }}>
        <ListingImage src={images[active].url} caption={images[active].placeholder} fit="contain" />
      </div>
      {images.length > 1 && (
        <div className="vsc-scroll" style={{ display: "flex", gap: 12, marginTop: 14, overflowX: "auto" }}>
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              style={{
                flex: "0 0 110px",
                height: 78,
                borderRadius: 10,
                overflow: "hidden",
                border: i === active ? "2px solid #EB600A" : "2px solid transparent",
                padding: 0,
                cursor: "pointer",
                background: "none",
              }}
            >
              <ListingImage src={img.url} caption={img.placeholder} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
