import { MONTH_NAMES, WEEKDAY_LABELS, type EventItem } from "./eventsData";

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export type MonthCell = {
  day: number | "";
  dateStr: string;
  events: EventItem[];
};

export function monthMatrix(year: number, month: number, events: EventItem[]): MonthCell[][] {
  const startDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: MonthCell[] = [];
  for (let i = 0; i < startDow; i++) cells.push({ day: "", dateStr: "", events: [] });
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = toDateStr(year, month, d);
    cells.push({ day: d, dateStr, events: events.filter((e) => e.date === dateStr) });
  }
  while (cells.length % 7 !== 0) cells.push({ day: "", dateStr: "", events: [] });
  const weeks: MonthCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export type WeekDay = {
  day: number;
  dateStr: string;
  weekday: string;
  events: EventItem[];
};

export function weekDaysOf(current: Date, events: EventItem[]): WeekDay[] {
  const d = new Date(current);
  const sunday = new Date(d);
  sunday.setDate(d.getDate() - d.getDay());
  const days: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const dd = new Date(sunday);
    dd.setDate(sunday.getDate() + i);
    const dateStr = toDateStr(dd.getFullYear(), dd.getMonth(), dd.getDate());
    const dayEvents = events.filter((e) => e.date === dateStr);
    days.push({ day: dd.getDate(), dateStr, weekday: WEEKDAY_LABELS[dd.getDay()], events: dayEvents });
  }
  return days;
}

export function weekEventsList(current: Date, events: EventItem[]): EventItem[] {
  const days = weekDaysOf(current, events);
  const dateStrs = days.map((d) => d.dateStr);
  return events
    .filter((e) => dateStrs.includes(e.date))
    .sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)));
}

export function fmtDateLabel(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} de ${MONTH_NAMES[m - 1]} ${y}`;
}

export function downloadIcs(ev: EventItem) {
  const dt = (dateStr: string, timeStr: string) => `${(dateStr || "").replace(/-/g, "")}T${(timeStr || "00:00").replace(":", "")}00`;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
    `DTSTART:${dt(ev.date, ev.time)}`,
    `DTEND:${dt(ev.endDate || ev.date, ev.endTime || ev.time)}`,
    `SUMMARY:${ev.name}`,
    `DESCRIPTION:${(ev.description || "").replace(/\n/g, " ")}`,
    `LOCATION:${ev.place || ""}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.name || "evento"}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
