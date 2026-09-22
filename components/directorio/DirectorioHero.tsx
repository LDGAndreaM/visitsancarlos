"use client";

import { useState } from "react";
import CategoryDropdown from "@/components/CategoryDropdown";

type DirectorioHeroProps = {
  searchText: string;
  onSearchTextChange: (v: string) => void;
  searchLocation: string;
  onSearchLocationChange: (v: string) => void;
};

export default function DirectorioHero({ searchText, onSearchTextChange, searchLocation, onSearchLocationChange }: DirectorioHeroProps) {
  const [catSelected, setCatSelected] = useState("Categoría");

  return (
    <section style={{ padding: "44px 48px 20px", textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#143840" }}>Directorio de negocios</h1>
      <p style={{ margin: 0, fontSize: 15, color: "#3B5C61", maxWidth: 560 }}>Hoteles, restaurantes, servicios y comercios de San Carlos y Guaymas.</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          background: "#ffffff",
          border: "1px solid #E2ECED",
          borderRadius: 14,
          padding: 8,
          boxShadow: "0 12px 28px rgba(0,60,66,0.08)",
          width: "100%",
          maxWidth: 820,
          flexWrap: "wrap",
        }}
      >
        <input
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          type="text"
          placeholder="¿Qué estás buscando?"
          style={{ flex: 1.3, minWidth: 160, border: "none", outline: "none", fontSize: 14, padding: "10px 12px", color: "#143840" }}
        />
        <span style={{ width: 1, height: 22, background: "#E2ECED", margin: "0 4px" }} />
        <input
          value={searchLocation}
          onChange={(e) => onSearchLocationChange(e.target.value)}
          type="text"
          placeholder="Ubicación"
          style={{ flex: 1, minWidth: 120, border: "none", outline: "none", fontSize: 14, padding: "10px 12px", color: "#143840" }}
        />
        <span style={{ width: 1, height: 22, background: "#E2ECED", margin: "0 4px" }} />
        <CategoryDropdown selected={catSelected} onSelect={setCatSelected} />
        <button style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 26px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}>
          Buscar
        </button>
      </div>
    </section>
  );
}
