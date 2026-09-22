import Link from "next/link";
import { SOCIAL_PACKAGES } from "@/lib/publicidadData";

export default function SocialPackages() {
  return (
    <section style={{ padding: "36px 48px 8px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 22px", fontSize: 24, fontWeight: 800, color: "#143840", textAlign: "center" }}>Paquetes de redes sociales</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {SOCIAL_PACKAGES.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#ffffff",
                border: p.highlighted ? "2px solid #EB600A" : "1px solid #EEF3F3",
                borderRadius: 20,
                padding: 30,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: p.highlighted ? "0 16px 34px rgba(235,96,10,0.12)" : "0 10px 24px rgba(0,60,66,0.06)",
                position: "relative",
              }}
            >
              {p.badge && (
                <span style={{ position: "absolute", top: -14, left: 24, background: "#EB600A", color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>
                  {p.badge}
                </span>
              )}
              <span style={{ fontSize: 12, fontWeight: 700, color: p.highlighted ? "#EB600A" : "#009BA4", letterSpacing: "0.04em" }}>REDES SOCIALES</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>{p.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: "#143840" }}>{p.mensual}</span>
                  <span style={{ fontSize: 12, color: "#5C7679" }}>MXN / mes</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#009BA4" }}>{p.trimestral}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                {p.features.map((f) => (
                  <span key={f} style={{ fontSize: 13, color: "#3B5C61" }}>
                    ✓ {f}
                  </span>
                ))}
                {p.extra && <span style={{ fontSize: 12, color: "#EB600A" }}>{p.extra}</span>}
              </div>
              <Link
                href="/login"
                style={{
                  marginTop: "auto",
                  textAlign: "center",
                  background: p.highlighted ? "#EB600A" : "#ffffff",
                  border: p.highlighted ? "none" : "2px solid #009BA4",
                  color: p.highlighted ? "#ffffff" : "#009BA4",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                Contratar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
