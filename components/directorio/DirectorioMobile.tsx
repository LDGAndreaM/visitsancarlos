"use client";

import { useState } from "react";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import MobileBottomSheet from "@/components/mobile/MobileBottomSheet";
import { MobileIcon } from "@/components/mobile/icons";
import {
  CATEGORY_CHIPS,
  PRICE_OPTIONS,
  RATING_OPTIONS,
  SORT_KEYS,
  SORT_LABELS,
  type Business,
  type BusinessCategory,
  type SortKey,
} from "@/lib/directorioData";

type DirectorioMobileProps = {
  businesses: Business[];
  searchText: string;
  onSearchTextChange: (v: string) => void;
  category: BusinessCategory | "Todo";
  onCategoryChange: (v: BusinessCategory | "Todo") => void;
  filterPrice: string;
  onFilterPriceChange: (v: string) => void;
  filterRating: string;
  onFilterRatingChange: (v: string) => void;
  sortBy: SortKey;
  onSortByChange: (v: SortKey) => void;
  view: "list" | "map";
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
};

const chipBase: React.CSSProperties = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  gap: 6,
  height: 38,
  padding: "0 14px",
  borderRadius: 999,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

export default function DirectorioMobile({
  businesses,
  searchText,
  onSearchTextChange,
  category,
  onCategoryChange,
  filterPrice,
  onFilterPriceChange,
  filterRating,
  onFilterRatingChange,
  sortBy,
  onSortByChange,
  view,
  favorites,
  onToggleFavorite,
}: DirectorioMobileProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filterCount = [filterPrice !== "Todos", Number(filterRating) > 0].filter(Boolean).length;
  const selected = businesses.find((b) => b.id === selectedId) ?? businesses[0] ?? null;

  const clearAll = () => {
    onSearchTextChange("");
    onCategoryChange("Todo");
    onFilterPriceChange("Todos");
    onFilterRatingChange("0");
  };

  return (
    <div className="vsc-mobile-only">
      <div style={{ position: "sticky", top: 58, zIndex: 40, background: "#ffffff", boxShadow: "0 2px 12px rgba(0,60,66,0.06)", display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
        <div style={{ padding: "0 16px", display: "flex", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10, background: "#F4FAFB", border: "1px solid #E2ECED", borderRadius: 16, padding: "0 14px", height: 48 }}>
            <MobileIcon name="search" color="#009BA4" size={18} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              placeholder="Buscar negocio o servicio"
              style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 14, color: "#143840" }}
            />
          </div>
          <button
            onClick={() => setSheetOpen(true)}
            aria-label="Filtros y orden"
            style={{ position: "relative", width: 48, height: 48, border: "none", borderRadius: 16, background: "#EB600A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <MobileIcon name="filter" color="#ffffff" size={18} />
            {filterCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 10, background: "#143840", color: "#ffffff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ffffff" }}>
                {filterCount}
              </span>
            )}
          </button>
        </div>
        <div className="vsc-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 16px" }}>
          {CATEGORY_CHIPS.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value}
                onClick={() => onCategoryChange(c.value)}
                style={{ ...chipBase, border: active ? "1px solid #009BA4" : "1px solid #E2ECED", background: active ? "#009BA4" : "#ffffff", color: active ? "#ffffff" : "#143840" }}
              >
                <MobileIcon name={c.icon} color={active ? "#ffffff" : "#009BA4"} size={15} />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {view === "list" && (
        <div style={{ padding: "16px 16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#5C7679" }}>
              <span style={{ color: "#143840", fontWeight: 800 }}>{businesses.length}</span> resultados
            </span>
            <button onClick={() => setSheetOpen(true)} style={{ border: "none", background: "transparent", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#009BA4", cursor: "pointer", padding: "6px 0" }}>
              {SORT_LABELS[sortBy]} ▾
            </button>
          </div>

          {businesses.length === 0 ? (
            <div style={{ padding: "40px 16px", textAlign: "center", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>Sin resultados</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>Prueba con otra búsqueda o quita filtros.</span>
              <button onClick={clearAll} style={{ marginTop: 4, border: "none", height: 44, padding: "0 20px", background: "#009BA4", color: "#ffffff", fontFamily: "inherit", fontWeight: 700, fontSize: 14, borderRadius: 12, cursor: "pointer" }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            businesses.map((b) => (
              <Link
                key={b.id}
                href={`/directorio/${b.id}`}
                style={{ background: "#ffffff", borderRadius: 22, overflow: "hidden", boxShadow: "0 8px 22px rgba(0,60,66,0.1)", display: "flex", flexDirection: "column", color: "#143840" }}
              >
                <div style={{ height: 150, position: "relative" }}>
                  <ImagePlaceholder caption={b.placeholder} />
                  <span style={{ position: "absolute", top: 12, left: 12, background: "#ffffff", color: "#009BA4", fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "4px 10px", borderRadius: 999 }}>
                    {b.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite(b.id);
                    }}
                    aria-label="Guardar en favoritos"
                    style={{ position: "absolute", top: 8, right: 8, width: 40, height: 40, border: "none", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.12)" }}
                  >
                    <MobileIcon name="heart" color={favorites[b.id] ? "#EB600A" : "#143840"} size={18} fill={favorites[b.id] ? "#EB600A" : "none"} />
                  </button>
                </div>
                <div style={{ padding: "12px 16px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{b.name}</span>
                    <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: "#EB600A" }}>
                      ★ {b.rating} <span style={{ color: "#9DB6B8", fontWeight: 500 }}>({b.reviewCount})</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#5C7679", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MobileIcon name="pin" color="#9DB6B8" size={13} />
                      {b.location}
                    </span>
                    <span style={{ color: "#CFDCDD" }}>•</span>
                    <span style={{ fontWeight: 700, color: "#009BA4" }}>{b.price}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {view === "map" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 320, borderBottom: "1px solid #EEF3F3" }}>
            <iframe src="https://maps.google.com/maps?q=San+Carlos,+Sonora&z=12&output=embed" style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
          </div>
          <div className="vsc-scroll" style={{ display: "flex", gap: 12, overflowX: "auto", padding: "14px 16px 24px" }}>
            {businesses.length === 0 && <span style={{ fontSize: 13, color: "#5C7679", padding: "8px 4px" }}>Sin resultados con estos filtros.</span>}
            {businesses.map((b) => (
              <Link
                key={b.id}
                href={`/directorio/${b.id}`}
                onMouseEnter={() => setSelectedId(b.id)}
                style={{
                  flexShrink: 0,
                  width: 240,
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 10,
                  boxShadow: selected?.id === b.id ? "0 8px 20px rgba(0,155,164,0.25)" : "0 8px 20px rgba(0,60,66,0.1)",
                  border: selected?.id === b.id ? "1.5px solid #009BA4" : "1.5px solid transparent",
                  color: "#143840",
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  <ImagePlaceholder caption={b.placeholder} />
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", color: "#009BA4" }}>{b.category}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#143840", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.name}</span>
                  <span style={{ fontSize: 11, color: "#5C7679" }}>★ {b.rating} · {b.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <MobileBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#143840" }}>Filtros</span>
          <button
            onClick={() => {
              onFilterPriceChange("Todos");
              onFilterRatingChange("0");
            }}
            style={{ border: "none", background: "transparent", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "#EB600A", cursor: "pointer", padding: "8px 0" }}
          >
            Limpiar
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "#9DB6B8" }}>ORDENAR POR</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SORT_KEYS.map((key) => {
              const active = sortBy === key;
              return (
                <button
                  key={key}
                  onClick={() => onSortByChange(key)}
                  style={{ height: 40, padding: "0 16px", borderRadius: 999, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", border: active ? "1px solid #143840" : "1px solid #E2ECED", background: active ? "#143840" : "#ffffff", color: active ? "#ffffff" : "#143840" }}
                >
                  {SORT_LABELS[key]}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "#9DB6B8" }}>PRECIO</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {PRICE_OPTIONS.filter((p) => p !== "Todos").map((p) => {
              const active = filterPrice === p;
              return (
                <button
                  key={p}
                  onClick={() => onFilterPriceChange(active ? "Todos" : p)}
                  style={{ height: 44, borderRadius: 12, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer", border: active ? "1px solid #009BA4" : "1px solid #E2ECED", background: active ? "#E5F6F7" : "#ffffff", color: active ? "#009BA4" : "#143840" }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", color: "#9DB6B8" }}>CALIFICACIÓN</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {RATING_OPTIONS.map((r) => {
              const active = filterRating === r.value;
              return (
                <button
                  key={r.value}
                  onClick={() => onFilterRatingChange(r.value)}
                  style={{ height: 40, padding: "0 16px", borderRadius: 999, fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", border: active ? "1px solid #009BA4" : "1px solid #E2ECED", background: active ? "#E5F6F7" : "#ffffff", color: active ? "#009BA4" : "#143840" }}
                >
                  {active && "✓ "}
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setSheetOpen(false)}
          style={{ height: 52, border: "none", background: "#EB600A", color: "#ffffff", fontFamily: "inherit", fontWeight: 700, fontSize: 15, borderRadius: 16, cursor: "pointer", boxShadow: "0 6px 16px rgba(235,96,10,0.3)" }}
        >
          Ver {businesses.length} resultados
        </button>
      </MobileBottomSheet>
    </div>
  );
}
