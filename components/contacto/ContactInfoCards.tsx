import SocialIcon from "@/components/SocialIcon";
import { SOCIAL_LINKS } from "@/lib/nav";

const itemStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 14, padding: "0 32px" };
const labelStyle: React.CSSProperties = { fontSize: 12, color: "#5C7679" };
const valueStyle: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: "#143840" };

export default function ContactInfoCards() {
  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div className="vsc-contact-info-row" style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={itemStyle}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#009BA4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={labelStyle}>Mándanos un correo</span>
            <a href="mailto:hola@visitsancarlos.com.mx" style={valueStyle}>
              hola@visitsancarlos.com.mx
            </a>
          </div>
        </div>

        <span className="vsc-contact-info-divider" />

        <div style={itemStyle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6AC7E2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M15 7a2 2 0 0 1 2 2" />
            <path d="M15 3a6 6 0 0 1 6 6" />
            <path d="M21 16.42v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.42z" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={labelStyle}>Llámanos</span>
            <a href="tel:+526221145316" style={valueStyle}>
              +52 622 114 5316
            </a>
          </div>
        </div>

        <span className="vsc-contact-info-divider" />

        <div style={itemStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={labelStyle}>Síguenos</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <a
                href={SOCIAL_LINKS.facebook.href}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{ width: 24, height: 23, borderRadius: "50%", background: "#009BA4", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}
              >
                <SocialIcon network="facebook" size={12} />
              </a>
              <a href={SOCIAL_LINKS.instagram.href} aria-label="Instagram" style={{ width: 24, height: 23, borderRadius: "50%", background: "#EB600A", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <SocialIcon network="instagram" size={12} />
              </a>
              <a href={SOCIAL_LINKS.tiktok.href} aria-label="TikTok" style={{ width: 24, height: 23, borderRadius: "50%", background: "#143840", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                <SocialIcon network="tiktok" size={11} />
              </a>
              <span style={valueStyle}>@visit.sancarlos.son</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
