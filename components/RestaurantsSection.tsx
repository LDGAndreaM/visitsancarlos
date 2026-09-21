import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { RESTAURANTS } from "@/lib/homeData";

export default function RestaurantsSection() {
  return (
    <section style={{ padding: "56px 48px 20px", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 28 }}>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840" }}>Dónde comer</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {RESTAURANTS.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "#ffffff",
                borderRadius: 16,
                padding: "14px 18px",
                boxShadow: "0 6px 18px rgba(0,60,66,0.08)",
              }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <ImagePlaceholder caption={r.logoPlaceholder} round />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{r.name}</span>
                <span style={{ fontSize: 13, color: "#3B5C61" }}>{r.desc}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#EB600A", flexShrink: 0 }}>★ {r.rating}</span>
            </div>
          ))}
        </div>
        <Link
          href="/directorio?categoria=comida"
          style={{ display: "inline-block", marginTop: 18, background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10 }}
        >
          Ver más
        </Link>
      </div>
      <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", boxShadow: "0 10px 24px rgba(0,60,66,0.1)" }}>
        <ImagePlaceholder caption="Espacio publicitario: restaurante de paga" />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.55)",
            color: "#ffffff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          PATROCINADO
        </span>
      </div>
    </section>
  );
}
