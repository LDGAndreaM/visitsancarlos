export default function DescriptionSection({ description }: { description: string }) {
  return (
    <section style={{ padding: "36px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Descripción</h2>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#3B5C61" }}>{description}</p>
      </div>
    </section>
  );
}
