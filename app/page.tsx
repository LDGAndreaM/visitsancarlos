import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SponsoredCarousel from "@/components/SponsoredCarousel";
import HotelsCarousel from "@/components/HotelsCarousel";
import RestaurantsSection from "@/components/RestaurantsSection";
import EventsSection from "@/components/EventsSection";
import WeatherFacebook from "@/components/WeatherFacebook";
import AdBanner from "@/components/AdBanner";
import BlogPreview from "@/components/BlogPreview";
import NewsletterCta from "@/components/NewsletterCta";

export default function Home() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <Hero />
      <SponsoredCarousel />
      <HotelsCarousel />
      <RestaurantsSection />
      <EventsSection />
      <WeatherFacebook />
      <AdBanner />
      <BlogPreview />
      <NewsletterCta id="agregar-negocio" />
      <Footer />
    </div>
  );
}
