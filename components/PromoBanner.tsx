"use client";

import { useEffect, useState } from "react";

export type PromoPair = { bg: string; name: string; tag: string };

export default function PromoBanner({ pairs }: { pairs: [PromoPair, PromoPair][] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % pairs.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [pairs.length]);

  return (
    <section style={{ position: "relative", height: 220, overflow: "hidden" }}>
      {pairs.map((pair, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === index ? 1 : 0,
            pointerEvents: i === index ? "auto" : "none",
            zIndex: i === index ? 1 : 0,
            transition: "opacity 0.8s ease",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            padding: "26px 48px 0",
            height: 194,
          }}
        >
          {pair.map((biz) => (
            <div key={biz.name} style={{ background: biz.bg, display: "flex", alignItems: "center", padding: "0 40px", borderRadius: 17 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#ffffff", letterSpacing: "0.03em" }}>PATROCINADO</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#ffffff" }}>{biz.name}</span>
                <span style={{ fontSize: 13, color: "#ffffff" }}>{biz.tag}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
        {pairs.map((_, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === index ? "#EB600A" : "#DCEEEF" }} />
        ))}
      </div>
    </section>
  );
}
