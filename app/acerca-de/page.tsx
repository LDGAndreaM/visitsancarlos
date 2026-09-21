import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterCta from "@/components/NewsletterCta";
import QuienesSomos from "@/components/acerca-de/QuienesSomos";
import PorQueExiste from "@/components/acerca-de/PorQueExiste";
import MisionVisionValores from "@/components/acerca-de/MisionVisionValores";
import QueOfrecemos from "@/components/acerca-de/QueOfrecemos";
import Faq from "@/components/acerca-de/Faq";

export const metadata: Metadata = {
  title: "Acerca de | Visit San Carlos",
  description: "Qué es Visit San Carlos, nuestra misión y para quién es.",
};

export default function AcercaDe() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <QuienesSomos />
      <PorQueExiste />
      <MisionVisionValores />
      <QueOfrecemos />
      <Faq />
      <NewsletterCta margin="20px 48px 56px" />
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
