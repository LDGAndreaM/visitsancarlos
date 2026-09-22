import { POPULAR_FEATURES } from "@/lib/publicidadData";

export default function PopularFeatures() {
  return (
    <section style={{ padding: "36px 48px 8px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", background: "#F4FAFB", borderRadius: 20, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 18 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>⭐ ¿Qué incluye el Perfil Destacado &quot;POPULAR&quot;?</h2>
        <p style={{ margin: 0, fontSize: 13.5, color: "#3B5C61" }}>
          El perfil básico de tu negocio puede aparecer gratis en el Directorio. Al anunciarte obtienes el distintivo ⭐ POPULAR y una presentación destacada frente a los perfiles gratuitos.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px 24px" }}>
          {POPULAR_FEATURES.map((f) => (
            <span key={f} style={{ fontSize: 13, color: "#143840" }}>
              ✓ {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
