"use client";

import { useState } from "react";

type FilterPillsProps = {
  filters: string[];
};

export default function FilterPills({ filters }: FilterPillsProps) {
  const [active, setActive] = useState(filters[0]);

  return (
    <section style={{ padding: "10px 48px 40px", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            style={{
              background: isActive ? "#009BA4" : "#F4FAFB",
              color: isActive ? "#ffffff" : "#3B5C61",
              fontWeight: isActive ? 700 : 600,
              fontSize: 13,
              padding: "9px 18px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
            }}
          >
            {filter}
          </button>
        );
      })}
    </section>
  );
}
