import Link from "next/link";
import { WEB_PACKAGES, formatMXN } from "@/lib/publicidadData";

export default function WebPackages() {
  return (
    <section style={{ padding: "20px 48px 8px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 800, color: "#143840", textAlign: "center" }}>Publicidad en el sitio web</h2>
        <p style={{ margin: "0 0 26px", fontSize: 13, color: "#5C7679", textAlign: "center" }}>
          Contrata mensual o trimestral — el trimestral incluye descuento y beneficio de fotografía.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center" }}>
          {WEB_PACKAGES.map((p) => (
            <div
              key={p.letter}
              style={{
                width: 260,
                background: "#ffffff",
                border: "1px solid #EEF3F3",
                borderRadius: 16,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: "0 8px 20px rgba(0,60,66,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#009BA4",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {p.letter}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#EB600A", letterSpacing: "0.03em", textTransform: "uppercase" }}>{p.space}</span>
              </div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#143840" }}>{p.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "10px 0", borderTop: "1px solid #F4FAFB", borderBottom: "1px solid #F4FAFB" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#143840" }}>{formatMXN(p.mensual)}</span>
                  <span style={{ fontSize: 11, color: "#5C7679" }}>MXN / mes</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#009BA4" }}>{formatMXN(p.trimestral)}</span>
                  <span style={{ fontSize: 11, color: "#5C7679" }}>MXN / trimestre</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 2 }}>
                {p.features.map((f) => (
                  <span key={f} style={{ fontSize: 12.5, color: "#3B5C61", lineHeight: 1.4 }}>
                    ✓ {f}
                  </span>
                ))}
              </div>
              <Link
                href="/login"
                style={{ marginTop: "auto", textAlign: "center", background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: 10, borderRadius: 10 }}
              >
                Contratar
              </Link>
            </div>
          ))}
        </div>
        <p style={{ margin: "22px 0 0", fontSize: 12.5, color: "#7FA7AA", textAlign: "center", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          La inclusión de un perfil básico en el Directorio es gratuita. Lo que obtienes con estos paquetes es el ⭐ Perfil Destacado &quot;POPULAR&quot;, que aumenta tu visibilidad frente a los perfiles gratuitos.
        </p>
      </div>
    </section>
  );
}
