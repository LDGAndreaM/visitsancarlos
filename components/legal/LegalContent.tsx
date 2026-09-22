import type { ReactNode } from "react";

export default function LegalContent({ intro, children }: { intro: string; children: ReactNode }) {
  return (
    <section style={{ padding: "30px 48px 70px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#3B5C61" }}>{intro}</p>
        {children}
      </div>
    </section>
  );
}
