import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/directorio/PromoBanner";
import DirectorioApp from "@/components/directorio/DirectorioApp";

export const metadata: Metadata = {
  title: "Directorio | Visit San Carlos",
  description: "Hoteles, restaurantes, servicios y comercios de San Carlos y Guaymas.",
};

const DIRECTORIO_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Directorio() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      <Header />
      <PromoBanner />
      <DirectorioApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={DIRECTORIO_SOCIALS} />
    </div>
  );
}
