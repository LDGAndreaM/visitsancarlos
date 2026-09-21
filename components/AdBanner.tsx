import ImagePlaceholder from "./ImagePlaceholder";

export default function AdBanner() {
  return (
    <section style={{ padding: "20px 48px" }}>
      <div style={{ borderRadius: 18, overflow: "hidden", height: 150, position: "relative", boxShadow: "0 10px 24px rgba(0,60,66,0.1)" }}>
        <ImagePlaceholder caption="Banner publicitario 1200×150" />
        <span
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.55)",
            color: "#ffffff",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          PUBLICIDAD
        </span>
      </div>
    </section>
  );
}
