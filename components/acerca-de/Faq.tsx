"use client";

import { useState } from "react";
import { FAQ_COLUMNS, type FaqItem } from "@/lib/acercaDeData";

function FaqColumn({ title, items, openIds, onToggle }: { title: string; items: FaqItem[]; openIds: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <h3 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 800, color: "#EB600A", letterSpacing: "0.03em" }}>{title}</h3>
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <div key={item.id} style={{ borderBottom: "1px solid #EEF3F3" }}>
            <button
              onClick={() => onToggle(item.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "10px 0",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 13.5,
                fontWeight: 600,
                color: "#009BA4",
              }}
            >
              <span style={{ flexShrink: 0, color: "#EB600A", fontWeight: 700 }}>{open ? "–" : "+"}</span>
              <span>{item.q}</span>
            </button>
            {open && <p style={{ margin: "0 0 12px 22px", fontSize: 13, color: "#3B5C61", lineHeight: 1.6 }}>{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function Faq() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="faq" style={{ padding: "70px 48px" }}>
      <h2 style={{ margin: "0 0 44px", textAlign: "center", fontSize: 30, fontWeight: 800, color: "#143840" }}>Preguntas frecuentes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 36, maxWidth: 1280, margin: "0 auto" }}>
        {FAQ_COLUMNS.map((col) => (
          <FaqColumn key={col.title} title={col.title} items={col.items} openIds={openIds} onToggle={toggle} />
        ))}
      </div>
    </section>
  );
}
