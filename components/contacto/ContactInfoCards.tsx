import SocialIcon from "@/components/SocialIcon";
import { SOCIAL_LINKS } from "@/lib/nav";

const iconWrap = (bg: string): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: bg,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const itemStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 14, padding: "0 32px" };
const labelStyle: React.CSSProperties = { fontSize: 12, color: "#5C7679" };
const valueStyle: React.CSSProperties = { fontSize: 15, fontWeight: 700, color: "#143840" };

export default function ContactInfoCards() {
  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div className="vsc-contact-info-row" style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={itemStyle}>
          <span style={iconWrap("#E5F6F7")}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="#009BA4" strokeWidth="1.6" />
              <path d="M3 5l7 6 7-6" stroke="#009BA4" strokeWidth="1.6" fill="none" />
            </svg>
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={labelStyle}>Mándanos un correo</span>
            <a href="mailto:hola@visitsancarlos.com.mx" style={valueStyle}>
              hola@visitsancarlos.com.mx
            </a>
          </div>
        </div>

        <span className="vsc-contact-info-divider" />

        <div style={itemStyle}>
          <span style={iconWrap("#EAF8FA")}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="6" y="2" width="8" height="16" rx="2" stroke="#6AC7E2" strokeWidth="1.6" />
            </svg>
          </span>
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
