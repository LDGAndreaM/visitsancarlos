import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoCarousel from "@/components/eventos/PromoCarousel";
import EventsHero from "@/components/eventos/EventsHero";
import EventsCalendar from "@/components/eventos/EventsCalendar";

export const metadata: Metadata = {
  title: "Eventos | Visit San Carlos",
  description: "Qué está pasando en San Carlos: festivales, deportes, gastronomía y actividades comunitarias.",
};

const EVENTOS_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Eventos() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      <Header />
      <PromoCarousel />
      <EventsHero />
      <EventsCalendar />
      <Footer marginTop={0} padding="0 48px 28px" socials={EVENTOS_SOCIALS} />
    </div>
  );
}
