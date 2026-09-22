"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type GalleryProps = {
  images: { id: string; placeholder: string }[];
};

export default function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={{ height: 420, borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,60,66,0.1)" }}>
        <ImagePlaceholder caption={images[active].placeholder} />
      </div>
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
            <ImagePlaceholder caption={img.placeholder} />
          </button>
        ))}
      </div>
    </div>
  );
}
