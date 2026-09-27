"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import CategoryDropdown from "./CategoryDropdown";

export default function Hero() {
  const [catSelected, setCatSelected] = useState("Categorías");

  return (
    <section
      id="inicio"
      style={{
        padding: "70px 48px 90px",
        background: "#ffffff",
      }}
    >
      <div
        className="vsc-hero-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
      <svg
        className="vsc-hero-visual"
        style={{ position: "absolute", top: 0, right: 0, width: 930, height: 519, zIndex: 0, opacity: 0.5, pointerEvents: "none" }}
        viewBox="0 0 500 560"
        fill="none"
      >
        <path d="M0 40 Q40 10 80 40 T160 40 T240 40 T320 40 T400 40 T480 40" stroke="#CFDCDD" strokeWidth="2" />
        <path d="M0 140 Q40 110 80 140 T160 140 T240 140 T320 140 T400 140 T480 140" stroke="#CFDCDD" strokeWidth="2" />
        <path d="M0 260 Q40 230 80 260 T160 260 T240 260 T320 260 T400 260 T480 260" stroke="#CFDCDD" strokeWidth="2" />
        <path d="M0 380 Q40 350 80 380 T160 380 T240 380 T320 380 T400 380 T480 380" stroke="#CFDCDD" strokeWidth="2" />
        <path d="M0 460 Q40 430 80 460 T160 460 T240 460 T320 460 T400 460 T480 460" stroke="#CFDCDD" strokeWidth="2" />
        <path d="M0 530 Q40 500 80 530 T160 530 T240 530 T320 530 T400 530 T480 530" stroke="#CFDCDD" strokeWidth="2" />
        <polyline points="60,150 300,150 300,260" stroke="#6AC7E2" strokeWidth="5" fill="none" />
        <polyline points="10,540 470,540 470,300" stroke="#6AC7E2" strokeWidth="5" fill="none" />
      </svg>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 18, maxWidth: 660, width: "100%" }}>
        <h1 style={{ margin: 0, fontSize: 46, lineHeight: 1.15, fontWeight: 800, color: "#143840" }}>
          Comienza a explorar
          <br />
          <span style={{ color: "#EB600A" }}>San Carlos</span>
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: "#3B5C61" }}>Todo lo que necesitas saber, en un solo lugar.</p>

        <div className="vsc-hero-search">
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "2px solid #9DB6B8",
              flexShrink: 0,
              position: "relative",
              marginRight: 10,
            }}
          >
            <span style={{ position: "absolute", bottom: -6, right: -6, width: 6, height: 2, background: "#9DB6B8", transform: "rotate(45deg)" }} />
          </span>
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            style={{
              flex: 1,
              minWidth: 80,
              border: "none",
              outline: "none",
              fontFamily: "inherit",
              fontSize: 14,
              padding: "10px 6px",
              color: "#143840",
              background: "transparent",
            }}
          />
          <div className="vsc-hero-search-actions">
            <span style={{ width: 1, height: 22, background: "#E2ECED", flexShrink: 0, margin: "0 10px" }} />
            <CategoryDropdown selected={catSelected} onSelect={setCatSelected} />
            <button
              style={{
                border: "none",
                background: "#EB600A",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 999,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, height: 400 }}>
        <div style={{ position: "absolute", top: 0, left: "20%", width: "62%", height: 230, borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,60,66,0.18)" }}>
          <ImagePlaceholder caption="Foto: Cerro Tetakawi y bahía" />
        </div>
        <div
          style={{
            position: "absolute",
            top: 190,
            left: "38%",
            width: "58%",
            height: 210,
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 16px 36px rgba(0,60,66,0.2)",
            border: "4px solid #ffffff",
          }}
        >
          <ImagePlaceholder caption="Foto: Atardecer en San Carlos" />
        </div>
        <Image
          src="/uploads/Recurso 4pin.png"
          alt=""
          width={64}
          height={88}
          style={{ position: "absolute", top: 150, right: 0, width: 64, height: "auto", filter: "drop-shadow(0 8px 16px rgba(235,96,10,0.35))" }}
        />
      </div>
      </div>
    </section>
  );
}
