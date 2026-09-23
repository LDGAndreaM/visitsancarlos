import { CATS, type SupportCategory } from "@/lib/soporteData";

type CategoryPillsProps = {
  active: "all" | SupportCategory;
  onSelect: (cat: "all" | SupportCategory) => void;
};

export default function CategoryPills({ active, onSelect }: CategoryPillsProps) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CATS.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{
              border: `1px solid ${isActive ? "#143840" : "#E2ECED"}`,
              background: isActive ? "#143840" : "#ffffff",
              color: isActive ? "#ffffff" : "#143840",
              fontSize: 13,
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: 999,
              cursor: "pointer",
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
