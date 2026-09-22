import ClasificadoCategoryDropdown from "./ClasificadoCategoryDropdown";
import type { ClasificadoCategory } from "@/lib/clasificadosData";

type ClasificadosHeroProps = {
  searchText: string;
  onSearchTextChange: (v: string) => void;
  searchLocation: string;
  onSearchLocationChange: (v: string) => void;
  filterCategory: ClasificadoCategory | null;
  onSelectCategory: (category: ClasificadoCategory) => void;
};

export default function ClasificadosHero({ searchText, onSearchTextChange, searchLocation, onSearchLocationChange, filterCategory, onSelectCategory }: ClasificadosHeroProps) {
  return (
    <section style={{ padding: "44px 48px 20px", textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#143840" }}>Clasificados</h1>
      <p style={{ margin: 0, fontSize: 15, color: "#3B5C61", maxWidth: 580 }}>
        Autos, casas en renta, propiedades en venta y todo tipo de artículos publicados por la comunidad de San Carlos y Guaymas.
      </p>
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
        <ClasificadoCategoryDropdown selected={filterCategory} onSelect={onSelectCategory} />
        <button style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 26px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}>
          Buscar
        </button>
      </div>
    </section>
  );
}
