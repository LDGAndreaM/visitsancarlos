import { WEEKDAY_LABELS } from "@/lib/eventsData";
import type { MonthCell } from "@/lib/eventsUtils";

type MonthViewProps = {
  weeks: MonthCell[][];
  onDayClick: (cell: MonthCell) => void;
};

export default function MonthView({ weeks, onDayClick }: MonthViewProps) {
  return (
    <section style={{ padding: "24px 48px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginBottom: 8 }}>
          {WEEKDAY_LABELS.map((wl) => (
            <span key={wl} style={{ fontSize: 12, fontWeight: 700, color: "#7FA7AA", textAlign: "center" }}>
              {wl}
            </span>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginBottom: 8 }}>
            {week.map((cell, ci) => {
              const hasEvents = cell.events.length > 0;
              return (
                <div
                  key={ci}
                  onClick={() => hasEvents && onDayClick(cell)}
                  style={{
                    minHeight: 76,
                    border: "1px solid #EEF3F3",
                    borderRadius: 10,
                    padding: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    cursor: hasEvents ? "pointer" : "default",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#3B5C61" }}>{cell.day}</span>
                  {hasEvents && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#ffffff",
                        background: "#EB600A",
                        borderRadius: 6,
                        padding: "2px 6px",
                        display: "inline-block",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cell.events[0].name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
