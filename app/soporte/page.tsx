import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SoporteApp from "@/components/soporte/SoporteApp";
import { SOCIAL_SET_MAIN } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Soporte | Visit San Carlos",
  description: "Busca una respuesta, mira un tutorial o escríbenos por el chat en línea.",
};

export default function Soporte() {
  return (
    <>
      <SoporteApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </>
  );
}
