import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalContent from "@/components/legal/LegalContent";
import LegalSection from "@/components/legal/LegalSection";
import { TERMINOS_INTRO, TERMINOS_SECTIONS, TERMINOS_UPDATED } from "@/lib/terminosData";
import { SOCIAL_SET_MAIN } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Términos y condiciones | Visit San Carlos",
  description: "Términos y condiciones de uso de Visit San Carlos.",
};

export default function TerminosYCondiciones() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <LegalHero title="Términos y condiciones" updatedLabel={TERMINOS_UPDATED} />
      <LegalContent intro={TERMINOS_INTRO}>
        {TERMINOS_SECTIONS.map((s) => (
          <LegalSection key={s.title} title={s.title}>
            {s.body}
          </LegalSection>
        ))}
        <LegalSection title="9. Contacto">
          Si tienes dudas sobre estos términos, contáctanos en{" "}
          <a href="mailto:visit.sancarlos.son@gmail.com">visit.sancarlos.son@gmail.com</a> o al teléfono <a href="tel:+526221145316">+52 622 114 5316</a>.
        </LegalSection>
      </LegalContent>
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} activeHref="/terminos-y-condiciones" />
    </div>
  );
}
