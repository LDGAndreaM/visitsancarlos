"use client";

import { useState } from "react";
import Image from "next/image";
import CategoryDropdown from "./CategoryDropdown";

export default function Hero() {
  const [catSelected, setCatSelected] = useState("Categorías");

  return (
    <section id="inicio" className="vsc-hero-banner">
      <Image
        src="/uploads/hero-san-carlos.jpg"
        alt="Letrero de bienvenida a San Carlos, Sonora"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 45%" }}
      />
      <div className="vsc-hero-overlay" />

      <div className="vsc-hero-content">
        <h1 style={{ margin: 0, fontSize: 46, lineHeight: 1.15, fontWeight: 800, color: "#ffffff", textShadow: "0 2px 18px rgba(0,0,0,0.25)" }}>
          Comienza a explorar
          <br />
          <span style={{ color: "#FFB27A" }}>San Carlos</span>
        </h1>
        <p style={{ margin: 0, fontSize: 16, color: "rgba(255,255,255,0.92)", textShadow: "0 1px 10px rgba(0,0,0,0.25)" }}>
          Todo lo que necesitas saber, en un solo lugar.
        </p>

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
    </section>
  );
}
