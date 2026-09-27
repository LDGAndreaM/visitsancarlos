import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <section
        style={{
          minHeight: "60vh",
          padding: "80px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 18,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.06em", color: "#EB600A" }}>ERROR 404</span>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#143840" }}>No encontramos esta página</h1>
        <p style={{ margin: 0, fontSize: 15, color: "#5C7679", maxWidth: 480 }}>
          Puede que el enlace esté roto o que la página se haya movido. Revisa la dirección o regresa al inicio.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
          <Link
            href="/"
            style={{ background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 10, boxShadow: "0 6px 16px rgba(235,96,10,0.3)" }}
          >
            Volver al inicio
          </Link>
          <Link
            href="/directorio"
            style={{ border: "1px solid #E2ECED", color: "#143840", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 10 }}
          >
            Ver el directorio
          </Link>
        </div>
      </section>
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
