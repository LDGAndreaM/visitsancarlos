import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactoHero from "@/components/contacto/ContactoHero";
import ContactForm from "@/components/contacto/ContactForm";
import ContactInfoCards from "@/components/contacto/ContactInfoCards";

export const metadata: Metadata = {
  title: "Contacto | Visit San Carlos",
  description: "Escríbenos y te responderemos lo antes posible.",
};

const CONTACTO_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

export default function Contacto() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <ContactoHero />
      <ContactForm />
      <ContactInfoCards />
      <Footer marginTop={0} padding="0 48px 28px" socials={CONTACTO_SOCIALS} />
    </div>
  );
}
