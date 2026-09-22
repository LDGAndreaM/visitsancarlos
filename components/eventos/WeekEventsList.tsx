import type { EventItem } from "@/lib/eventsData";

type WeekEventsListProps = {
  events: EventItem[];
  onEventClick: (event: EventItem) => void;
};

export default function WeekEventsList({ events, onEventClick }: WeekEventsListProps) {
  return (
    <section style={{ padding: "48px 48px 60px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800, color: "#143840" }}>Eventos de esta semana</h2>
        {events.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {events.map((e) => (
              <div
                key={e.id}
                onClick={() => onEventClick(e)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "#ffffff",
                  borderRadius: 14,
                  padding: "14px 18px",
                  boxShadow: "0 8px 20px rgba(0,60,66,0.08)",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 54, height: 54, borderRadius: 12, background: "#E5F6F7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#009BA4" }}>{Number(e.date.slice(-2))}</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#EB600A" }}>{e.category}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{e.name}</span>
                  <span style={{ fontSize: 13, color: "#3B5C61" }}>
                    {e.time} · {e.place}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 14, color: "#7FA7AA" }}>No hay eventos programados esta semana.</p>
        )}
      </div>
    </section>
  );
}
