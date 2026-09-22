import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PublicidadHero from "@/components/publicidad/PublicidadHero";
import WebPackages from "@/components/publicidad/WebPackages";
import PopularFeatures from "@/components/publicidad/PopularFeatures";
import SocialPackages from "@/components/publicidad/SocialPackages";
import ComboPackages from "@/components/publicidad/ComboPackages";
import QuarterlyBenefit from "@/components/publicidad/QuarterlyBenefit";
import CommercialMessage from "@/components/publicidad/CommercialMessage";
import PublicidadNote from "@/components/publicidad/PublicidadNote";
import PromoCta from "@/components/publicidad/PromoCta";

export const metadata: Metadata = {
  title: "Publicidad | Visit San Carlos",
  description: "Espacios publicitarios y paquetes para que tu negocio gane visibilidad en Visit San Carlos.",
};

const PUBLICIDAD_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Publicidad() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <PublicidadHero />
      <WebPackages />
      <PopularFeatures />
      <SocialPackages />
      <ComboPackages />
      <QuarterlyBenefit />
      <CommercialMessage />
      <PublicidadNote />
      <PromoCta />
      <Footer marginTop={0} padding="0 48px 28px" socials={PUBLICIDAD_SOCIALS} activeHref="/publicidad" />
    </div>
  );
}
