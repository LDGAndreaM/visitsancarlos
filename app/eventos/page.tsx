import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoCarousel from "@/components/eventos/PromoCarousel";
import EventsHero from "@/components/eventos/EventsHero";
import EventsCalendar from "@/components/eventos/EventsCalendar";
import { SOCIAL_SET_MAIN } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Eventos | Visit San Carlos",
  description: "Qué está pasando en San Carlos: festivales, deportes, gastronomía y actividades comunitarias.",
};

export default function Eventos() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      <Header />
      <PromoCarousel />
      <EventsHero />
      <EventsCalendar />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
