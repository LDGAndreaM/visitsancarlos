type LegalHeroProps = {
  title: string;
  updatedLabel: string;
  eyebrow?: string;
};

export default function LegalHero({ title, updatedLabel, eyebrow }: LegalHeroProps) {
  return (
    <section style={{ padding: "56px 48px 10px", textAlign: "center", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      {eyebrow && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#E5F6F7",
            color: "#009BA4",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.04em",
            padding: "6px 14px",
            borderRadius: 999,
          }}
        >
          {eyebrow}
        </span>
      )}
      <h1 style={{ margin: 0, fontSize: 34, fontWeight: 800, color: "#143840" }}>{title}</h1>
      <p style={{ margin: 0, fontSize: 14, color: "#7FA7AA" }}>{updatedLabel}</p>
    </section>
  );
}
