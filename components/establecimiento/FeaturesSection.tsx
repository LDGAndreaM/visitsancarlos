export default function FeaturesSection({ features }: { features: string[] }) {
  return (
    <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28 }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Características</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {features.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#3B5C61" }}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" fill="#E5F6F7" />
                <path d="M5 9l3 3 5-6" stroke="#009BA4" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {f}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
