"use client";

import { useState } from "react";
import ClasificadoCategoryIcon from "./ClasificadoCategoryIcon";
import { CLASIFICADOS_CATEGORIES, type ClasificadoCategory } from "@/lib/clasificadosData";

type ClasificadoCategoryDropdownProps = {
  selected: ClasificadoCategory | null;
  onSelect: (category: ClasificadoCategory) => void;
};

export default function ClasificadoCategoryDropdown({ selected, onSelect }: ClasificadoCategoryDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: 6, border: "none", background: "transparent", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "#3B5C61", padding: "10px 6px", cursor: "pointer" }}
      >
        <span>{selected ?? "Categoría"}</span>
        <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "5px solid #9DB6B8" }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            right: -10,
            width: 220,
            background: "#ffffff",
            borderRadius: 14,
            boxShadow: "0 16px 32px rgba(0,60,66,0.18)",
            border: "1px solid #EAF0F0",
            padding: 8,
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {CLASIFICADOS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelect(cat);
                setOpen(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", border: "none", padding: "9px 10px", borderRadius: 8, cursor: "pointer", textAlign: "left", fontSize: 13, color: "#284246", width: "100%" }}
            >
              <ClasificadoCategoryIcon category={cat} />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
