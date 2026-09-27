import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoCarousel from "@/components/eventos/PromoCarousel";
import EventsHero from "@/components/eventos/EventsHero";
import EventsCalendar from "@/components/eventos/EventsCalendar";
import JsonLd from "@/components/JsonLd";
import { fetchApprovedEvents } from "@/lib/supabase/events";
import type { EventItem } from "@/lib/eventsData";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { absoluteUrl, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Eventos",
  description: "Qué está pasando en San Carlos: festivales, deportes, gastronomía y actividades comunitarias.",
  path: "/eventos",
});

// Sin esto, los datos estructurados de eventos (JSON-LD) quedarían
// congelados con lo que había al momento del build — mismo problema que tuvo
// el sitemap. Se recalcula como máximo cada hora.
export const revalidate = 3600;

// San Carlos y Guaymas están en zona horaria de Sonora (UTC-7, sin horario de
// verano), así que el offset es siempre el mismo.
const SONORA_OFFSET = "-07:00";

function toIsoDateTime(date: string, time: string) {
  return `${date}T${time || "00:00"}:00${SONORA_OFFSET}`;
}

function eventJsonLd(e: EventItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    startDate: toIsoDateTime(e.date, e.time),
    endDate: toIsoDateTime(e.endDate || e.date, e.endTime || e.time),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: e.description || undefined,
    url: absoluteUrl("/eventos"),
    location: e.place ? { "@type": "Place", name: e.place, address: e.place } : undefined,
    organizer: e.organizers ? { "@type": "Organization", name: e.organizers } : undefined,
  };
}

async function safeFetchEvents() {
  try {
    return await fetchApprovedEvents();
  } catch {
    return [];
  }
}

export default async function Eventos() {
  const events = await safeFetchEvents();

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      {events.length > 0 && <JsonLd data={events.map(eventJsonLd)} />}
      <Header />
      <PromoCarousel />
      <EventsHero />
      <EventsCalendar />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
