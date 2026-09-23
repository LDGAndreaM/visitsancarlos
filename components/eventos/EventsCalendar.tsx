"use client";

import { useState } from "react";
import CalendarControls from "./CalendarControls";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import WeekEventsList from "./WeekEventsList";
import EventDetailModal from "./EventDetailModal";
import { INITIAL_EVENTS, MONTH_NAMES, type EventItem } from "@/lib/eventsData";
import { monthMatrix, weekDaysOf, weekEventsList } from "@/lib/eventsUtils";
import type { MonthCell } from "@/lib/eventsUtils";

export default function EventsCalendar() {
  const [view, setView] = useState<"month" | "week">("month");
  const [current, setCurrent] = useState(() => new Date(2026, 8, 19));
  const events = INITIAL_EVENTS;
  const [detail, setDetail] = useState<EventItem | null>(null);

  const year = current.getFullYear();
  const month = current.getMonth();
  const isMonth = view === "month";
  const weekDays = weekDaysOf(current, events);
  const weekList = weekEventsList(current, events);

  const shiftMonth = (delta: number) => {
    setCurrent((d) => {
      const next = new Date(d);
      next.setDate(1);
      next.setMonth(next.getMonth() + delta);
      return next;
    });
  };
  const shiftWeek = (delta: number) => {
    setCurrent((d) => {
      const next = new Date(d);
      next.setDate(next.getDate() + delta * 7);
      return next;
    });
  };

  const monthLabel = isMonth ? `${MONTH_NAMES[month]} ${year}` : `Semana del ${weekDays[0].day} de ${MONTH_NAMES[month]}`;

  const handleMonthDayClick = (cell: MonthCell) => {
    if (cell.events.length > 0) setDetail(cell.events[0]);
  };

  return (
    <>
      <CalendarControls
        view={view}
        monthLabel={monthLabel}
        onPrev={() => (isMonth ? shiftMonth(-1) : shiftWeek(-1))}
        onNext={() => (isMonth ? shiftMonth(1) : shiftWeek(1))}
        onSetView={setView}
      />

      {isMonth ? (
        <MonthView weeks={monthMatrix(year, month, events)} onDayClick={handleMonthDayClick} />
      ) : (
        <WeekView weekDays={weekDays} onEventClick={setDetail} />
      )}

      <WeekEventsList events={weekList} onEventClick={setDetail} />

      {detail && <EventDetailModal event={detail} onClose={() => setDetail(null)} />}
    </>
  );
}
