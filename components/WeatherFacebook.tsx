import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { FB_POSTS } from "@/lib/homeData";

export default function WeatherFacebook() {
  return (
    <section style={{ padding: "56px 48px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
      <div
        style={{
          background: "linear-gradient(135deg,#009BA4,#00767E)",
          borderRadius: 20,
          padding: 28,
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Clima y mareas</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 20px" }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, display: "block" }}>San Carlos</span>
            <span style={{ fontSize: 12, color: "#DFF6F8" }}>Soleado</span>
          </div>
          <span style={{ fontSize: 30, fontWeight: 800 }}>32°C</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "16px 20px" }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, display: "block" }}>Guaymas</span>
            <span style={{ fontSize: 12, color: "#DFF6F8" }}>Parcialmente nublado</span>
          </div>
          <span style={{ fontSize: 30, fontWeight: 800 }}>31°C</span>
        </div>
        <Link href="/mareas" style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", alignSelf: "flex-start" }}>
          Ver tabla de mareas completa →
        </Link>
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
