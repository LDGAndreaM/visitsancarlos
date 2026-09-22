"use client";

import { useState } from "react";
import Link from "next/link";

type TopActionsProps = {
  shareTitle: string;
  backHref: string;
  backLabel?: string;
};

export default function TopActions({ shareTitle, backHref, backLabel = "← Volver" }: TopActionsProps) {
  const [isFav, setIsFav] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: shareTitle, url: window.location.href });
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <section style={{ padding: "20px 48px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", maxWidth: 1180, margin: "0 auto" }}>
      <Link href={backHref} style={{ display: "flex", alignItems: "center", gap: 6, background: "#F4FAFB", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 8 }}>
        {backLabel}
      </Link>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleShare}
          style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E2ECED", background: "#ffffff", color: "#3B5C61", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 8, cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <circle cx="14" cy="4" r="2" stroke="#3B5C61" strokeWidth="1.4" />
            <circle cx="14" cy="14" r="2" stroke="#3B5C61" strokeWidth="1.4" />
            <circle cx="4" cy="9" r="2" stroke="#3B5C61" strokeWidth="1.4" />
            <line x1="5.7" y1="8" x2="12.3" y2="4.8" stroke="#3B5C61" strokeWidth="1.4" />
            <line x1="5.7" y1="10" x2="12.3" y2="13.2" stroke="#3B5C61" strokeWidth="1.4" />
          </svg>
          Compartir
        </button>
        <button
          onClick={() => setIsFav((v) => !v)}
          style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E2ECED", background: isFav ? "#FDEEE4" : "#ffffff", color: isFav ? "#EB600A" : "#3B5C61", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 8, cursor: "pointer" }}
        >
          <svg width="14" height="13" viewBox="0 0 20 18" fill={isFav ? "#EB600A" : "#3B5C61"}>
            <path d="M10 17S1 11.5 1 5.8C1 2.6 3.4 1 5.9 1c1.7 0 3.2 1 4.1 2.4C10.9 2 12.4 1 14.1 1 16.6 1 19 2.6 19 5.8 19 11.5 10 17 10 17z" />
          </svg>
          {isFav ? "Guardado" : "Favoritos"}
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #E2ECED", background: "#ffffff", color: "#3B5C61", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 8, cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#3B5C61" strokeWidth="1.4" />
            <line x1="9" y1="6" x2="9" y2="10" stroke="#3B5C61" strokeWidth="1.4" />
            <circle cx="9" cy="12.4" r="0.9" fill="#3B5C61" />
          </svg>
          Reportar
        </button>
      </div>
    </section>
  );
}
