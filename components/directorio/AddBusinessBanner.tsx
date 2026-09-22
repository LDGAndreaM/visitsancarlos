import Link from "next/link";

export default function AddBusinessBanner() {
  return (
    <section style={{ padding: "0 48px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", background: "#EB600A", borderRadius: 20, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#ffffff" }}>¿No aparece tu negocio?</h3>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#FFE3D3" }}>
            Mándanos un mensaje con los detalles y con gusto lo agregamos, recuerda que aparecer aquí ¡ES GRATIS!
          </p>
        </div>
        <Link href="/contacto" style={{ background: "#ffffff", color: "#143840", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 10, flexShrink: 0 }}>
          Agregar negocio
        </Link>
      </div>
    </section>
  );
}
