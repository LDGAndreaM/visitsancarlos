"use client";

import { useRef } from "react";
import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { HOTELS } from "@/lib/homeData";

export default function HotelsCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth || 600), behavior: "smooth" });
  };

  return (
    <section id="directorio" style={{ padding: "56px 48px 20px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840" }}>Hospedajes</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            onClick={() => scroll(-1)}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
          >
            ‹
          </button>
          <button
            onClick={() => scroll(1)}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
          >
            ›
          </button>
          <Link href="/directorio?categoria=hospedaje" style={{ fontWeight: 700, fontSize: 14 }}>
            Ver todos →
          </Link>
        </div>
      </div>
      <div ref={ref} className="vsc-scroll" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory" }}>
        {HOTELS.map((h) => (
          <div
            key={h.id}
            style={{
              scrollSnapAlign: "start",
              flex: "0 0 calc((100% - 40px)/3)",
              minWidth: 260,
              background: "#ffffff",
              borderRadius: 18,
              boxShadow: "0 10px 24px rgba(0,60,66,0.1)",
            }}
          >
            <div style={{ height: 180, borderRadius: "18px 18px 0 0", overflow: "hidden" }}>
              <ImagePlaceholder caption={h.placeholder} />
            </div>
            <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{h.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#009BA4" }}>{h.price}</span>
              </div>
              <span style={{ fontSize: 13, color: "#3B5C61" }}>{h.desc}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#EB600A" }}>★ {h.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
