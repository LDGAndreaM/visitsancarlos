"use client";

import { useEffect, useRef, useState } from "react";
import { VALUES } from "@/lib/acercaDeData";

export default function ValuesCarousel() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.scrollWidth / VALUES.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(VALUES.length - 1, Math.max(0, index)));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={rowRef} className="vsc-values-row vsc-scroll" style={{ maxWidth: 1000, margin: "0 auto" }}>
        {VALUES.map((v) => (
          <div key={v.title} className="vsc-value-card">
            <span style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#D4A017",
                  WebkitMaskImage: `url(${v.icon})`,
                  maskImage: `url(${v.icon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  display: "inline-block",
                }}
              />
            </span>
            <h3 style={{ margin: 0, fontFamily: "var(--font-caveat), cursive", fontSize: 19, fontWeight: 700, color: "#EB600A" }}>{v.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#3B5C61", lineHeight: 1.5 }}>{v.desc}</p>
          </div>
        ))}
      </div>
      <div className="vsc-values-dots">
        {VALUES.map((v, i) => (
          <span key={v.title} className={`vsc-values-dot${i === active ? " active" : ""}`} />
        ))}
      </div>
    </>
  );
}
