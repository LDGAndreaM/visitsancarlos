import Image from "next/image";
import Link from "next/link";
import { OFRECEMOS_ITEMS } from "@/lib/acercaDeData";

export default function QueOfrecemos() {
  return (
    <section style={{ background: "#6AC7E2", padding: "64px 48px" }}>
      <div className="vsc-split-grid" style={{ maxWidth: 1080, margin: "0 auto", alignItems: "center" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 380, aspectRatio: "941 / 1328", borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 36px rgba(0,60,66,0.15)" }}>
          <Image
            src="/uploads/acerca-de-ofrecemos.jpg"
            alt="Vista aérea de la marina y el pueblo de San Carlos"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#ffffff" }}>¿Qué ofrecemos?</h2>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#E9F8FB" }}>Dentro de Visit San Carlos encontrarás:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {OFRECEMOS_ITEMS.map((item) => (
              <span key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#ffffff", lineHeight: 1.5 }}>
                <svg width="16" height="16" viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M4 9l3 4 7-8" stroke="#EB600A" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </div>
          <Link
            href="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EB600A",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 14,
              padding: "13px 24px",
              borderRadius: 10,
              width: "fit-content",
              marginTop: 8,
            }}
          >
            + Agregar mi negocio
          </Link>
        </div>
      </div>
    </section>
  );
}
