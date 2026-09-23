import SocialIcon from "@/components/SocialIcon";
import { SOCIAL_LINKS } from "@/lib/nav";

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 18,
  padding: "28px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
  boxShadow: "0 10px 24px rgba(0,60,66,0.08)",
};

export default function ContactInfoCards() {
  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, maxWidth: 920, margin: "0 auto" }}>
        <div style={cardStyle}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#E5F6F7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="#009BA4" strokeWidth="1.6" />
              <path d="M3 5l7 6 7-6" stroke="#009BA4" strokeWidth="1.6" fill="none" />
            </svg>
          </span>
          <span style={{ fontSize: 13, color: "#3B5C61" }}>Mándanos un correo</span>
          <a href="mailto:visit.sancarlos.son@gmail.com" style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>
            visit.sancarlos.son@gmail.com
          </a>
        </div>
        <div style={cardStyle}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#EAF8FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="6" y="2" width="8" height="16" rx="2" stroke="#6AC7E2" strokeWidth="1.6" />
            </svg>
          </span>
          <span style={{ fontSize: 13, color: "#3B5C61" }}>Llámanos</span>
          <a href="tel:+526221145316" style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>
            +52 622 114 5316
          </a>
        </div>
        <div style={cardStyle}>
          <span style={{ fontSize: 13, color: "#3B5C61" }}>Síguenos</span>
          <div style={{ display: "flex", gap: 10 }}>
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
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>@visit.sancarlos.son</span>
        </div>
      </div>
    </section>
  );
}
