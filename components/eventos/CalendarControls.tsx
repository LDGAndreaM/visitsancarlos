type CalendarControlsProps = {
  view: "month" | "week";
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onSetView: (view: "month" | "week") => void;
  onOpenAdd: () => void;
};

export default function CalendarControls({ view, monthLabel, onPrev, onNext, onSetView, onOpenAdd }: CalendarControlsProps) {
  const isMonth = view === "month";

  return (
    <section style={{ padding: "30px 48px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onPrev}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
          >
            ‹
          </button>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#143840", minWidth: 200, textAlign: "center" }}>{monthLabel}</span>
          <button
            onClick={onNext}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
          >
            ›
          </button>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", background: "#F4FAFB", borderRadius: 999, padding: 4 }}>
            <button
              onClick={() => onSetView("month")}
              style={{
                border: "none",
                background: isMonth ? "#009BA4" : "transparent",
                color: isMonth ? "#ffffff" : "#3B5C61",
                fontWeight: 700,
                fontSize: 13,
                padding: "8px 18px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Mes
            </button>
            <button
              onClick={() => onSetView("week")}
              style={{
                border: "none",
                background: !isMonth ? "#009BA4" : "transparent",
                color: !isMonth ? "#ffffff" : "#3B5C61",
                fontWeight: 700,
                fontSize: 13,
                padding: "8px 18px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Semana
            </button>
          </div>
          <button
            onClick={onOpenAdd}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            + Agregar evento
          </button>
        </div>
      </div>
    </section>
  );
}
