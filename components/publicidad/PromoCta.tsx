import Link from "next/link";

export default function PromoCta() {
  return (
    <section
      style={{
        margin: "20px 48px 56px",
        padding: "48px 56px",
        borderRadius: 24,
        background: "linear-gradient(120deg,#009BA4,#00767E)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#ffffff" }}>Empieza a promocionar tu negocio hoy</h2>
        <p style={{ margin: 0, fontSize: 14, color: "#DFF6F8" }}>Crea tu cuenta gratis y elige el plan que mejor se adapte a ti.</p>
      </div>
      <Link href="/login" style={{ background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 10, flexShrink: 0 }}>
        Crear cuenta gratis
      </Link>
    </section>
  );
}
