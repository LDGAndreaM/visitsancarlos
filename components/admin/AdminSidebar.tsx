import Image from "next/image";
import Link from "next/link";
import type { AdminAccount, AdminTab } from "@/lib/adminAuth";

const NAV_LABELS: Record<AdminTab, string> = {
  resumen: "Resumen",
  administradores: "Administradores",
  usuarios: "Usuarios",
  aprobaciones: "Aprobaciones",
  directorio: "Directorio",
  clasificados: "Clasificados",
  blog: "Blog",
  eventos: "Eventos",
  galeria: "Galería",
  publicidad: "Publicidad",
  soporte: "Soporte",
};

const NAV_ORDER: AdminTab[] = ["resumen", "administradores", "usuarios", "aprobaciones", "directorio", "clasificados", "blog", "eventos", "galeria", "publicidad", "soporte"];

type AdminSidebarProps = {
  tab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  allowedTabs: AdminTab[];
  pendingCount: number;
  unreadCount: number;
  account: AdminAccount;
  onLogout: () => void;
};

export default function AdminSidebar({ tab, onTabChange, allowedTabs, pendingCount, unreadCount, account, onLogout }: AdminSidebarProps) {
  const badgeFor = (t: AdminTab): number | null => {
    if (t === "aprobaciones") return pendingCount || null;
    if (t === "soporte") return unreadCount || null;
    return null;
  };

  const items = NAV_ORDER.filter((t) => allowedTabs.includes(t));

  return (
    <aside style={{ background: "#143840", padding: "24px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
      <Link href="/" style={{ marginBottom: 10, padding: "0 6px", display: "flex", alignItems: "center", gap: 8 }}>
        <Image src="/uploads/Recurso 1visitsancarlos.png" alt="Visit San Carlos" width={115} height={34} style={{ height: 34, width: "auto", filter: "brightness(0) invert(1)" }} />
      </Link>
      <span style={{ padding: "0 6px 14px", fontSize: 11, fontWeight: 700, color: "#7FA7AA", letterSpacing: "0.06em" }}>PANEL ADMINISTRATIVO</span>
      {items.map((t) => {
        const active = tab === t;
        const badge = badgeFor(t);
        return (
          <button
            key={t}
            onClick={() => onTabChange(t)}
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
            {NAV_LABELS[t]}
            {badge && (
              <span style={{ marginLeft: "auto", background: "#EB600A", color: "#ffffff", fontSize: 11, fontWeight: 800, padding: "2px 7px", borderRadius: 999 }}>{badge}</span>
            )}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <div style={{ padding: "0 6px", display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#ffffff" }}>{account.name}</span>
        <span style={{ fontSize: 11.5, color: "#7FA7AA" }}>{account.role === "super" ? "Administrador principal" : "Administrador limitado"}</span>
      </div>
      <button
        onClick={onLogout}
        style={{ display: "flex", alignItems: "center", gap: 10, border: "none", background: "none", fontWeight: 600, fontSize: 13, color: "#7FA7AA", padding: "11px 14px", cursor: "pointer", textAlign: "left" }}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
