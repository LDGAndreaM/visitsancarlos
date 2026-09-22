import { CLASIFICADOS_CATEGORIES, type ClasificadoCategory } from "@/lib/clasificadosData";

type QuickCategoryPillsProps = {
  active: ClasificadoCategory | null;
  onToggle: (category: ClasificadoCategory) => void;
};

export default function QuickCategoryPills({ active, onToggle }: QuickCategoryPillsProps) {
  return (
    <section style={{ padding: "6px 48px 0" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {CLASIFICADOS_CATEGORIES.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onToggle(cat)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${isActive ? "#009BA4" : "#E2ECED"}`,
                background: isActive ? "#009BA4" : "#F4FAFB",
                color: isActive ? "#ffffff" : "#3B5C61",
                borderRadius: 999,
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
