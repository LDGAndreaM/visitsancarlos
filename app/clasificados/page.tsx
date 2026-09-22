import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ClasificadosApp from "@/components/clasificados/ClasificadosApp";

export const metadata: Metadata = {
  title: "Clasificados | Visit San Carlos",
  description: "Autos, casas en renta, propiedades en venta y todo tipo de artículos publicados por la comunidad de San Carlos y Guaymas.",
};

const CLASIFICADOS_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Clasificados() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff", position: "relative" }}>
      <ClasificadosApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={CLASIFICADOS_SOCIALS} />
    </div>
  );
}
