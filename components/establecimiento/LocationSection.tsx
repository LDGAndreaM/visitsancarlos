export default function LocationSection({ location }: { location: string }) {
  const query = encodeURIComponent(location);
  return (
    <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28 }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Ubicación</h2>
        <p style={{ margin: "0 0 14px", fontSize: 14, color: "#3B5C61" }}>{location}</p>
        <div style={{ borderRadius: 14, overflow: "hidden", height: 280, border: "1px solid #EEF3F3" }}>
          <iframe src={`https://maps.google.com/maps?q=${query}&output=embed`} style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 10 }}
        >
          Cómo llegar
        </a>
      </div>
    </section>
  );
}
