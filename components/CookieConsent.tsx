"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GoogleAnalytics from "./GoogleAnalytics";

type Consent = "accepted" | "rejected";

const STORAGE_KEY = "vsc-cookie-consent";

export default function CookieConsent({ gaMeasurementId }: { gaMeasurementId?: string }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "rejected") setConsent(stored);
    } catch {
      // Modo privado o storage bloqueado: simplemente mostramos el banner.
    }
    setReady(true);
  }, []);

  const decide = (value: Consent) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Si no se puede guardar, se volverá a preguntar en la próxima visita.
    }
  };

  return (
    <>
      {/* Google Analytics solo se carga si el visitante aceptó cookies. */}
      {consent === "accepted" && gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}

      {ready && consent === null && (
        <div
          className="vsc-cookie-banner"
          style={{
            background: "#143840",
            color: "#ffffff",
            borderRadius: 16,
            padding: "18px 22px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.28)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, flex: "1 1 280px", color: "#DCE9EA" }}>
            Usamos cookies propias y de terceros para mejorar tu experiencia y medir el uso del sitio.{" "}
            <Link href="/politicas-de-privacidad" style={{ color: "#6AC7E2", fontWeight: 700 }}>
              Leer políticas de privacidad
            </Link>
          </p>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button
              onClick={() => decide("rejected")}
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                background: "transparent",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Rechazar
            </button>
            <button
              onClick={() => decide("accepted")}
              style={{
                border: "none",
                background: "#EB600A",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                padding: "10px 18px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
