export default function EmptyState({ onAskInChat }: { onAskInChat: () => void }) {
  return (
    <div style={{ background: "#F4FAFB", borderRadius: 18, padding: 36, textAlign: "center", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>No encontramos resultados</span>
      <span style={{ fontSize: 14, color: "#3B5C61" }}>Prueba con otras palabras o pregúntale a nuestro equipo en el chat.</span>
      <button
        onClick={onAskInChat}
        style={{ marginTop: 6, border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, cursor: "pointer" }}
      >
        Preguntar en el chat
      </button>
    </div>
  );
}
