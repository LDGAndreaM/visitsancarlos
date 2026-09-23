import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SoporteApp from "@/components/soporte/SoporteApp";

export const metadata: Metadata = {
  title: "Soporte | Visit San Carlos",
  description: "Busca una respuesta, mira un tutorial o escríbenos por el chat en línea.",
};

const SOPORTE_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Soporte() {
  return (
    <>
      <SoporteApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOPORTE_SOCIALS} />
    </>
  );
}
