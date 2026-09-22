import Link from "next/link";
import { COMBO_PACKAGES } from "@/lib/publicidadData";

export default function ComboPackages() {
  return (
    <section style={{ padding: "36px 48px 8px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: "#143840", textAlign: "center" }}>Paquetes combinados</h2>
        <p style={{ margin: "0 0 26px", fontSize: 13, color: "#5C7679", textAlign: "center" }}>
          Exposición dentro de Visit San Carlos + difusión en redes, con tarifa preferencial.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {COMBO_PACKAGES.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#ffffff",
                border: p.highlighted ? "2px solid #EB600A" : "1px solid #EEF3F3",
                borderRadius: 18,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: p.highlighted ? "0 16px 34px rgba(235,96,10,0.14)" : "0 8px 20px rgba(0,60,66,0.05)",
                position: "relative",
              }}
            >
              {p.badge && (
                <span style={{ position: "absolute", top: -14, left: 20, background: "#EB600A", color: "#ffffff", fontSize: 10.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999 }}>
                  {p.badge}
                </span>
              )}
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#143840" }}>{p.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#143840" }}>
                  {p.mensual}
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#5C7679" }}> /mes</span>
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.highlighted ? "#EB600A" : "#009BA4" }}>{p.trimestral}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                {p.features.map((f) => (
                  <span key={f} style={{ fontSize: 12, color: "#3B5C61" }}>
                    ✓ {f}
                  </span>
                ))}
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
                  fontSize: 13,
                  padding: 10,
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
