import type { EventItem } from "@/lib/eventsData";
import type { WeekDay } from "@/lib/eventsUtils";

type WeekViewProps = {
  weekDays: WeekDay[];
  onEventClick: (event: EventItem) => void;
};

export default function WeekView({ weekDays, onEventClick }: WeekViewProps) {
  return (
    <section style={{ padding: "24px 48px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 }}>
        {weekDays.map((d) => (
          <div key={d.dateStr} style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 180, border: "1px solid #EEF3F3", borderRadius: 12, padding: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7FA7AA" }}>{d.weekday}</span>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#143840" }}>{d.day}</span>
            {d.events.map((e) => (
              <div key={e.id} onClick={() => onEventClick(e)} style={{ background: "#E5F6F7", borderRadius: 8, padding: "6px 8px", cursor: "pointer" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#009BA4", display: "block" }}>{e.time}</span>
                <span style={{ fontSize: 12, color: "#143840", display: "block" }}>{e.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
