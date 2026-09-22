import Script from "next/script";
import ImagePlaceholder from "./ImagePlaceholder";
import { FB_POSTS } from "@/lib/homeData";

export default function WeatherFacebook() {
  return (
    <section style={{ padding: "56px 48px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          padding: 28,
        }}
      >
        <h3 style={{ margin: 0, alignSelf: "flex-start", fontSize: 18, fontWeight: 800, color: "#009BA4" }}>Clima y mareas</h3>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div style={{ width: "100%", maxWidth: 340, margin: "0 auto" }}>
          <div className="elfsight-app-b5c53759-b649-4399-a5ab-97a110adedfa" data-elfsight-app-lazy />
        </div>
        <a
          href="https://tablademareas.com/mx/sonora/guaymas"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 13, fontWeight: 700, color: "#009BA4", alignSelf: "flex-start" }}
        >
          Ver tabla de mareas completa →
        </a>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 20, padding: 24, boxShadow: "0 10px 24px rgba(0,60,66,0.1)", display: "flex", flexDirection: "column", gap: 14 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>Desde nuestro Facebook</h3>
        {FB_POSTS.map((f) => (
          <div key={f.id} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
              <ImagePlaceholder caption={f.placeholder} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 13, color: "#3B5C61", lineHeight: 1.4 }}>{f.text}</span>
              <span style={{ fontSize: 11, color: "#7FA7AA" }}>{f.time}</span>
            </div>
          </div>
        ))}
        <a href="https://facebook.com" style={{ fontSize: 13, fontWeight: 700 }}>
          Ver más en Facebook →
        </a>
      </div>
    </section>
  );
}
