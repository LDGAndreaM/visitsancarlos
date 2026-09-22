import type { ReactNode } from "react";

export default function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#EB600A" }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "#3B5C61" }}>{children}</p>
    </div>
  );
}
