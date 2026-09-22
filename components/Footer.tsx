import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";

export type Social = { label: string; name: string; fontSize?: number };

const DEFAULT_SOCIALS: Social[] = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "x", name: "Twitter" },
  { label: "in", name: "LinkedIn" },
];

type FooterProps = {
  marginTop?: number;
  padding?: string;
  socials?: Social[];
  activeHref?: string;
};

export default function Footer({ marginTop = 70, padding = "64px 48px 28px", socials = DEFAULT_SOCIALS, activeHref }: FooterProps) {
  return (
    <footer
      id="contacto"
      style={{
        marginTop,
        background: "#ffffff",
        color: "#5C7679",
        padding,
        borderTop: "1px solid #EEF3F3",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
          gap: 40,
          alignItems: "start",
          paddingBottom: 36,
        }}
      >
        <Image
          src="/uploads/Recurso 4pin.png"
          alt="Visit San Carlos"
          width={96}
          height={120}
          style={{ width: 96, height: "auto", flexShrink: 0 }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#143840" }}>Contáctanos</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
            <span>Guaymas, Sonora</span>
          </div>
          <a href="mailto:visit.sancarlos.son@gmail.com" style={{ fontSize: 14, color: "#5C7679" }}>
            visit.sancarlos.son@gmail.com
          </a>
          <a href="tel:+526221145316" style={{ fontSize: 14, color: "#5C7679" }}>
            +52 622 114 5316
          </a>
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "#009BA4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: s.fontSize ?? 12,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Sitios de interés</h3>
          {FOOTER_LINKS.interes.map((l) => {
            const linkStyle = { fontSize: 14, color: l.href === activeHref ? "#009BA4" : "#5C7679" };
            return l.href.startsWith("http") ? (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={linkStyle}>
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Más información</h3>
          {FOOTER_LINKS.info.map((l) => (
            <Link key={l.label} href={l.href} style={{ fontSize: 14, color: l.href === activeHref ? "#009BA4" : "#5C7679" }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 19, fontWeight: 800, color: "#143840" }}>Números de emergencia</h3>
          {FOOTER_LINKS.emergencias.map((l) => (
            <a key={l.label} href={l.href} style={{ fontSize: 14, color: "#5C7679" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div
        style={{
          paddingTop: 22,
          borderTop: "1px solid #EEF3F3",
          textAlign: "center",
          fontSize: 12,
          color: "#A9BCBE",
        }}
      >
        © Derechos reservados Visit San Carlos 2026 | Creado por Black &amp; White Studio
      </div>
    </footer>
  );
}
