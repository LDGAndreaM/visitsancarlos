import Script from "next/script";
import FacebookPagePlugin from "./FacebookPagePlugin";

export default function WeatherFacebook() {
  return (
    <section className="vsc-split-grid" style={{ padding: "56px 48px 20px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          padding: 28,
        }}
      >
        <h3 style={{ margin: 0, textAlign: "center", fontSize: 18, fontWeight: 800, color: "#009BA4" }}>Clima y mareas</h3>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
          <div className="elfsight-app-b5c53759-b649-4399-a5ab-97a110adedfa" data-elfsight-app-lazy />
        </div>
        <a
          href="https://tablademareas.com/mx/sonora/guaymas"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13, fontWeight: 700, color: "#EB600A", textAlign: "center" }}
        >
          Ver tabla de mareas completa →
        </a>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 20, padding: 24, boxShadow: "0 10px 24px rgba(0,60,66,0.1)", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <h3 style={{ margin: 0, alignSelf: "flex-start", fontSize: 18, fontWeight: 800, color: "#143840" }}>Desde nuestro Facebook</h3>
        <FacebookPagePlugin height={360} />
      </div>
    </section>
  );
}
