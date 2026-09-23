type SoporteHeroProps = {
  query: string;
  onQueryChange: (v: string) => void;
};

export default function SoporteHero({ query, onQueryChange }: SoporteHeroProps) {
  return (
    <section style={{ padding: "60px 48px 36px", textAlign: "center", display: "flex", flexDirection: "column", gap: 14, alignItems: "center", background: "#F4FAFB" }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: "#009BA4" }}>CENTRO DE AYUDA</span>
      <h1 style={{ margin: 0, fontSize: 38, fontWeight: 800, color: "#143840" }}>¿En qué te podemos ayudar?</h1>
      <p style={{ margin: 0, fontSize: 16, color: "#3B5C61", maxWidth: 560 }}>Busca una respuesta, mira un tutorial o escríbenos por el chat en línea.</p>
      <div
        style={{
          marginTop: 10,
          width: "100%",
          maxWidth: 620,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#ffffff",
          borderRadius: 999,
          padding: "6px 6px 6px 22px",
          boxShadow: "0 12px 30px rgba(0,60,66,0.1)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#009BA4" strokeWidth="1.8" />
          <path d="M13.5 13.5L17 17" stroke="#009BA4" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ej. cómo publicar un clasificado"
          style={{ flex: 1, minWidth: 0, border: "none", outline: "none", fontSize: 15, color: "#143840", background: "transparent", padding: "10px 0" }}
        />
        <button style={{ border: "none", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 999, cursor: "pointer" }}>Buscar</button>
      </div>
    </section>
  );
}
