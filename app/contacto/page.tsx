import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactoHero from "@/components/contacto/ContactoHero";
import ContactForm from "@/components/contacto/ContactForm";
import ContactInfoCards from "@/components/contacto/ContactInfoCards";
import { SOCIAL_SET_MAIN } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contacto | Visit San Carlos",
  description: "Escríbenos y te responderemos lo antes posible.",
};

export default function Contacto() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <ContactoHero />
      <ContactForm />
      <ContactInfoCards />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
