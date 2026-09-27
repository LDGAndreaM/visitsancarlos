import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalContent from "@/components/legal/LegalContent";
import LegalSection from "@/components/legal/LegalSection";
import { POLITICAS_CAMBIOS, POLITICAS_INTRO, POLITICAS_SECTIONS, POLITICAS_UPDATED } from "@/lib/politicasData";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Políticas de privacidad",
  description: "Políticas de privacidad de Visit San Carlos.",
  path: "/politicas-de-privacidad",
});

export default function PoliticasDePrivacidad() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <LegalHero eyebrow="LEGAL" title="Políticas de privacidad" updatedLabel={POLITICAS_UPDATED} />
      <LegalContent intro={POLITICAS_INTRO}>
        {POLITICAS_SECTIONS.map((s) => (
          <LegalSection key={s.title} title={s.title}>
            {s.body}
          </LegalSection>
        ))}
        <LegalSection title="6. Tus derechos">
          Puedes solicitar acceso, corrección o eliminación de tu información personal en cualquier momento escribiéndonos a{" "}
          <a href="mailto:hola@visitsancarlos.com.mx">hola@visitsancarlos.com.mx</a>. Responderemos tu solicitud en un plazo razonable.
        </LegalSection>
        <LegalSection title={POLITICAS_CAMBIOS.title}>{POLITICAS_CAMBIOS.body}</LegalSection>
        <LegalSection title="8. Contacto">
          Si tienes dudas sobre esta política de privacidad, contáctanos en{" "}
          <a href="mailto:hola@visitsancarlos.com.mx">hola@visitsancarlos.com.mx</a> o al teléfono <a href="tel:+526221145316">+52 622 114 5316</a>.
        </LegalSection>
      </LegalContent>
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} activeHref="/politicas-de-privacidad" />
    </div>
  );
}
