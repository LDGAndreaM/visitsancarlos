"use client";

import { useEffect, useRef } from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import { SPONSORED } from "@/lib/homeData";

export default function SponsoredCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: "64px 48px 20px" }}>
      <div ref={ref} className="vsc-scroll" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory" }}>
        {SPONSORED.map((s) => (
          <div
            key={s.id}
            style={{
              scrollSnapAlign: "start",
              flex: "0 0 calc((100% - 40px)/3)",
              minWidth: 260,
              background: "#ffffff",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,60,66,0.1)",
              border: "1px solid #EAF3F4",
            }}
          >
            <div style={{ height: 150 }}>
              <ImagePlaceholder caption={s.placeholder} />
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{s.name}</span>
              <span style={{ fontSize: 13, color: "#3B5C61" }}>{s.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
