"use client";

import { useState } from "react";
import CategoryIcon, { CATEGORIES } from "./CategoryIcon";

type CategoryDropdownProps = {
  selected: string;
  onSelect: (label: string) => void;
  variant?: "plain" | "pill";
  align?: "left" | "right";
};

export default function CategoryDropdown({ selected, onSelect, variant = "plain", align = "right" }: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);

  const triggerStyle =
    variant === "pill"
      ? {
          display: "flex" as const,
          alignItems: "center" as const,
          gap: 8,
          border: "1px solid #E2ECED",
          borderRadius: 999,
          background: "#ffffff",
          padding: "9px 16px",
          fontSize: 13,
          fontWeight: 600,
          color: "#3B5C61",
          cursor: "pointer" as const,
        }
      : {
          display: "flex" as const,
          alignItems: "center" as const,
          gap: 6,
          border: "none",
          background: "transparent",
          fontSize: 13,
          fontWeight: 600,
          color: "#3B5C61",
          padding: "10px 6px",
          cursor: "pointer" as const,
        };

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button onClick={() => setOpen((v) => !v)} style={triggerStyle}>
        <span>{selected}</span>
        <span style={{ width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "5px solid #9DB6B8" }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            ...(align === "right" ? { right: -10 } : { left: 0 }),
            width: 210,
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
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                onSelect(c.label);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "transparent",
                border: "none",
                padding: "9px 10px",
                borderRadius: 8,
                cursor: "pointer",
                textAlign: "left",
                fontSize: 13,
                color: "#284246",
                width: "100%",
              }}
            >
              <CategoryIcon category={c.key} />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
