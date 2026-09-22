"use client";

import { useState } from "react";
import CategoryDropdown from "@/components/CategoryDropdown";
import { PRICE_OPTIONS, RATING_OPTIONS, SORT_KEYS, SORT_LABELS, type SortKey } from "@/lib/directorioData";

export type ViewMode = "grid" | "list" | "map";

type FilterBarProps = {
  filterPrice: string;
  onFilterPriceChange: (v: string) => void;
  filterRating: string;
  onFilterRatingChange: (v: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  sortBy: SortKey;
  onSortByChange: (v: SortKey) => void;
};

const selectStyle: React.CSSProperties = {
  border: "1px solid #E2ECED",
  borderRadius: 999,
  padding: "9px 16px",
  fontSize: 13,
  fontWeight: 600,
  color: "#3B5C61",
  background: "#ffffff",
};

const viewBtnStyle = (active: boolean): React.CSSProperties => ({
  width: 36,
  height: 32,
  border: "none",
  borderRadius: 8,
  background: active ? "#009BA4" : "transparent",
  color: active ? "#ffffff" : "#3B5C61",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function FilterBar({ filterPrice, onFilterPriceChange, filterRating, onFilterRatingChange, viewMode, onViewModeChange, sortBy, onSortByChange }: FilterBarProps) {
  const [filterCatLabel, setFilterCatLabel] = useState("Categoría: todas");
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <section style={{ padding: "10px 48px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <CategoryDropdown selected={filterCatLabel} onSelect={setFilterCatLabel} variant="pill" align="left" />
          <select value={filterPrice} onChange={(e) => onFilterPriceChange(e.target.value)} style={selectStyle}>
            <option value="Todos">Precio: todos</option>
            {PRICE_OPTIONS.filter((p) => p !== "Todos").map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select value={filterRating} onChange={(e) => onFilterRatingChange(e.target.value)} style={selectStyle}>
            {RATING_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6, background: "#F4FAFB", borderRadius: 10, padding: 4 }}>
            <button onClick={() => onViewModeChange("grid")} style={viewBtnStyle(viewMode === "grid")}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="0" y="0" width="6" height="6" fill="currentColor" />
                <rect x="10" y="0" width="6" height="6" fill="currentColor" />
                <rect x="0" y="10" width="6" height="6" fill="currentColor" />
                <rect x="10" y="10" width="6" height="6" fill="currentColor" />
              </svg>
            </button>
            <button onClick={() => onViewModeChange("list")} style={viewBtnStyle(viewMode === "list")}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <rect x="0" y="1" width="16" height="2.5" fill="currentColor" />
                <rect x="0" y="6.5" width="16" height="2.5" fill="currentColor" />
                <rect x="0" y="12" width="16" height="2.5" fill="currentColor" />
              </svg>
            </button>
            <button onClick={() => onViewModeChange("map")} style={viewBtnStyle(viewMode === "map")}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M2 4l5-2 6 2 5-2v14l-5 2-6-2-5 2z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #E2ECED", borderRadius: 10, background: "#ffffff", padding: "9px 16px", fontSize: 13, fontWeight: 600, color: "#3B5C61", cursor: "pointer" }}
            >
              <span>{SORT_LABELS[sortBy]}</span>
              <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "5px solid #9DB6B8" }} />
            </button>
            {sortOpen && (
              <div style={{ position: "absolute", top: 44, right: 0, width: 220, background: "#ffffff", borderRadius: 14, boxShadow: "0 16px 32px rgba(0,60,66,0.18)", border: "1px solid #EAF0F0", padding: 8, zIndex: 30, display: "flex", flexDirection: "column" }}>
                {SORT_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onSortByChange(key);
                      setSortOpen(false);
                    }}
                    style={{ background: "transparent", border: "none", textAlign: "left", padding: "9px 10px", borderRadius: 8, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
