"use client";

import { useCurrency } from "@/lib/publicidad/currency";

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ display: "inline-flex", background: "#F4FAFB", borderRadius: 999, padding: 4, gap: 4 }}>
        {(["MXN", "USD"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              background: currency === c ? "#009BA4" : "transparent",
              color: currency === c ? "#ffffff" : "#5C7679",
            }}
          >
            {c === "MXN" ? "Pesos (MXN)" : "Dólares (USD)"}
          </button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 11.5, color: "#7FA7AA" }}>Precios más impuestos. Se puede facturar.</p>
    </div>
  );
}
