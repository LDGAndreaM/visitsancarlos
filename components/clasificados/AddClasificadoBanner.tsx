export default function AddClasificadoBanner({ onOpen }: { onOpen: () => void }) {
  return (
    <section style={{ padding: "0 48px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", background: "#EB600A", borderRadius: 20, padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#ffffff" }}>¿Tienes algo que vender o rentar?</h3>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#FFE3D3" }}>
            Publica tu artículo en minutos y llega a toda la comunidad de San Carlos y Guaymas, ¡ES GRATIS!
          </p>
        </div>
        <button onClick={onOpen} style={{ border: "none", cursor: "pointer", background: "#ffffff", color: "#143840", fontWeight: 700, fontSize: 14, padding: "13px 26px", borderRadius: 10, flexShrink: 0 }}>
          Agregar artículo
        </button>
      </div>
    </section>
  );
}
