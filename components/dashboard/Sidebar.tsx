import Image from "next/image";
import Link from "next/link";
import type { DashboardTab } from "./DashboardApp";

const NAV_ITEMS: { tab: DashboardTab; label: string; icon: React.ReactNode }[] = [
  {
    tab: "resumen",
    label: "Resumen",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" fill="currentColor" />
        <rect x="10" y="2" width="6" height="6" fill="currentColor" />
        <rect x="2" y="10" width="6" height="6" fill="currentColor" />
        <rect x="10" y="10" width="6" height="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    tab: "publicaciones",
    label: "Mis publicaciones",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="10" width="14" height="4" stroke="currentColor" strokeWidth="1.4" />
        <rect x="3" y="6" width="4" height="4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    tab: "publicidad",
    label: "Publicidad",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <line x1="5" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1.4" />
        <line x1="5" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    tab: "cuenta",
    label: "Mi cuenta",
    icon: (
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 16c0-3 3-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
];

type SidebarProps = {
  tab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
};

export default function Sidebar({ tab, onTabChange, onLogout }: SidebarProps) {
  return (
    <aside style={{ background: "#ffffff", borderRight: "1px solid #EEF3F3", padding: "24px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      <Link href="/" style={{ marginBottom: 20, padding: "0 6px" }}>
        <Image src="/uploads/Recurso 1visitsancarlos.png" alt="Visit San Carlos" width={130} height={38} style={{ height: 38, width: "auto" }} />
      </Link>
      {NAV_ITEMS.map((item) => {
        const active = tab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "none",
              background: active ? "#E5F6F7" : "transparent",
              color: active ? "#009BA4" : "#5C7679",
              fontWeight: 700,
              fontSize: 14,
              padding: "11px 14px",
              borderRadius: 10,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <button
        onClick={onLogout}
        style={{ display: "flex", alignItems: "center", gap: 10, border: "none", background: "none", fontWeight: 600, fontSize: 13, color: "#5C7679", padding: "11px 14px", cursor: "pointer", textAlign: "left" }}
      >
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <path d="M7 3H3v12h4" stroke="#5C7679" strokeWidth="1.4" fill="none" />
          <path d="M11 6l4 3-4 3M15 9H7" stroke="#5C7679" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
        Cerrar sesión
      </button>
    </aside>
  );
}
