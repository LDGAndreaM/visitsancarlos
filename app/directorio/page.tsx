import type { Metadata } from "next";
import Footer from "@/components/Footer";
import DirectorioApp from "@/components/directorio/DirectorioApp";
import { SOCIAL_SET_MAIN } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Directorio | Visit San Carlos",
  description: "Hoteles, restaurantes, servicios y comercios de San Carlos y Guaymas.",
};

export default function Directorio() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      <DirectorioApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
