import Link from "next/link";

export default function EmailCta() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", background: "#143840", borderRadius: 20, padding: "26px 30px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#ffffff" }}>¿Prefieres escribirnos por correo?</span>
        <span style={{ fontSize: 14, color: "#CFE3E5" }}>Respondemos en menos de 24 horas hábiles.</span>
      </div>
      <Link href="/contacto" style={{ background: "#ffffff", color: "#143840", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10 }}>
        Ir a contacto
      </Link>
    </div>
  );
}
