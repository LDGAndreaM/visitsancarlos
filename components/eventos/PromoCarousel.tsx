"use client";

import { useEffect, useState } from "react";
import { BANNERS } from "@/lib/eventsData";

export default function PromoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ position: "relative", height: 280, overflow: "hidden" }}>
      {BANNERS.map((b, i) => (
        <div
          key={b.title}
          style={{
            position: "absolute",
            inset: 0,
            background: b.bg,
            opacity: i === index ? 1 : 0,
            pointerEvents: i === index ? "auto" : "none",
            zIndex: i === index ? 1 : 0,
            transition: "opacity 0.8s ease",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            padding: "0 56px",
          }}
        >
          <div />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", textAlign: "right" }}>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: "#ffffff" }}>{b.title}</h2>
            <p style={{ margin: 0, fontSize: 15, color: "#ffffff", maxWidth: 420 }}>{b.subtitle}</p>
            <a href="#" style={{ border: "2px solid #ffffff", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "10px 22px", borderRadius: 8 }}>
              {b.cta}
            </a>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
        {BANNERS.map((b, i) => (
          <span
            key={b.title}
            style={{ width: 8, height: 8, borderRadius: "50%", background: i === index ? "#EB600A" : "rgba(255,255,255,0.6)" }}
          />
        ))}
      </div>
    </section>
  );
}
