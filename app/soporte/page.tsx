import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SoporteApp from "@/components/soporte/SoporteApp";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Soporte",
  description: "Busca una respuesta, mira un tutorial o escríbenos por el chat en línea.",
  path: "/soporte",
});

export default function Soporte() {
  return (
    <>
      <SoporteApp />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </>
  );
}
