import type { Spec } from "@/lib/clasificadoDetails";

export default function SpecsSection({ specs }: { specs: Spec[] }) {
  return (
    <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 28 }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Detalles del artículo</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {specs.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 12, color: "#7FA7AA", fontWeight: 600 }}>{s.label}</span>
              <span style={{ fontSize: 14, color: "#143840", fontWeight: 700 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
