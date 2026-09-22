type SellerCardProps = {
  name: string;
  kind: string;
  phone: string;
};

export default function SellerCard({ name, kind, phone }: SellerCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const digitsOnly = phone.replace(/\D/g, "");

  return (
    <div style={{ background: "#ffffff", border: "1px solid #EEF3F3", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#F4FAFB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#009BA4", flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{name}</span>
          <span style={{ fontSize: 12, color: "#7FA7AA" }}>{kind}</span>
        </div>
      </div>
      <a
        href={`tel:+52${digitsOnly}`}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 18px", borderRadius: 10 }}
      >
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <rect x="6" y="1" width="6" height="16" rx="2" stroke="#ffffff" strokeWidth="1.3" />
        </svg>
        {phone}
      </a>
      <a
        href={`https://wa.me/52${digitsOnly}`}
        target="_blank"
        rel="noreferrer"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "12px 18px", borderRadius: 10 }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2.2a9.8 9.8 0 00-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1012 2.2zm5.7 13.8c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.8-.4h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3.1.2.1.9-.1 1.6z" />
        </svg>
        WhatsApp
      </a>
      <p style={{ margin: 0, fontSize: 12, color: "#9DB6B8", textAlign: "center" }}>Verifica el artículo en persona antes de pagar.</p>
    </div>
  );
}
