import Image from "next/image";
import Link from "next/link";
import type { AdminTab } from "./AdminApp";

const NAV_ITEMS: { tab: AdminTab; label: string }[] = [
  { tab: "resumen", label: "Resumen" },
  { tab: "usuarios", label: "Usuarios" },
  { tab: "aprobaciones", label: "Aprobaciones" },
  { tab: "directorio", label: "Directorio" },
  { tab: "blog", label: "Blog" },
  { tab: "eventos", label: "Eventos" },
  { tab: "publicidad", label: "Publicidad" },
  { tab: "soporte", label: "Soporte" },
];

type AdminSidebarProps = {
  tab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  pendingCount: number;
  unreadCount: number;
};

export default function AdminSidebar({ tab, onTabChange, pendingCount, unreadCount }: AdminSidebarProps) {
  const badgeFor = (t: AdminTab): number | null => {
    if (t === "aprobaciones") return pendingCount || null;
    if (t === "soporte") return unreadCount || null;
    return null;
  };

  return (
    <aside style={{ background: "#143840", padding: "24px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      <Link href="/" style={{ marginBottom: 10, padding: "0 6px", display: "flex", alignItems: "center", gap: 8 }}>
        <Image src="/uploads/Recurso 1visitsancarlos.png" alt="Visit San Carlos" width={115} height={34} style={{ height: 34, width: "auto", filter: "brightness(0) invert(1)" }} />
      </Link>
      <span style={{ padding: "0 6px 14px", fontSize: 11, fontWeight: 700, color: "#7FA7AA", letterSpacing: "0.06em" }}>PANEL ADMINISTRATIVO</span>
      {NAV_ITEMS.map((item) => {
        const active = tab === item.tab;
        const badge = badgeFor(item.tab);
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "none",
              background: active ? "#1D5158" : "transparent",
              color: active ? "#ffffff" : "#B7CBCD",
              fontWeight: 700,
              fontSize: 13.5,
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {item.label}
            {badge && (
              <span style={{ marginLeft: "auto", background: "#EB600A", color: "#ffffff", fontSize: 11, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>{badge}</span>
            )}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 13, color: "#7FA7AA", padding: "11px 14px" }}>
        Cerrar sesión
      </Link>
    </aside>
  );
}
