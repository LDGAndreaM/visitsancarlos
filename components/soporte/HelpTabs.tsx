export type HelpTab = "faq" | "tut" | "files";

type HelpTabsProps = {
  tab: HelpTab;
  onTabChange: (tab: HelpTab) => void;
  counts: Record<HelpTab, number>;
};

const TAB_DEFS: { id: HelpTab; label: string }[] = [
  { id: "faq", label: "Preguntas frecuentes" },
  { id: "tut", label: "Tutoriales" },
  { id: "files", label: "Guías y archivos" },
];

export default function HelpTabs({ tab, onTabChange, counts }: HelpTabsProps) {
  return (
    <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #E2ECED", flexWrap: "wrap" }}>
      {TAB_DEFS.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 15,
              fontWeight: active ? 700 : 600,
              color: active ? "#009BA4" : "#5C7679",
              padding: "12px 16px",
              borderBottom: active ? "3px solid #009BA4" : "3px solid transparent",
              marginBottom: -1,
              cursor: "pointer",
            }}
          >
            {t.label}{" "}
            <span style={{ fontSize: 12, color: active ? "#ffffff" : "#5C7679", background: active ? "#009BA4" : "#EEF3F3", borderRadius: 999, padding: "1px 8px", marginLeft: 4 }}>
              {counts[t.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
