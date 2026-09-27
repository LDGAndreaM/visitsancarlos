"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileIcon } from "./icons";

const TABS = [
  { icon: "home", label: "Inicio", href: "/" },
  { icon: "pin", label: "Directorio", href: "/directorio" },
  { fab: true, label: "Publicar", href: "/login" },
  { icon: "tag", label: "Clasificados", href: "/clasificados" },
  { icon: "calendar", label: "Eventos", href: "/eventos" },
] as const;

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="vsc-mobile-only"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        height: 76,
        padding: "8px 8px max(8px, env(safe-area-inset-bottom))",
        background: "#ffffff",
        boxShadow: "0 -4px 18px rgba(0,60,66,0.08)",
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)",
        alignItems: "center",
      }}
    >
      {TABS.map((t) => {
        if ("fab" in t) {
          return (
            <Link
              key={t.label}
              href={t.href}
              aria-label={t.label}
              style={{
                justifySelf: "center",
                marginTop: -26,
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "#EB600A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 18px rgba(235,96,10,0.4)",
                border: "4px solid #ffffff",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M11 4v14M4 11h14" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </Link>
          );
        }
        const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        const color = active ? "#009BA4" : "#9DB6B8";
        return (
          <Link key={t.label} href={t.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minHeight: 40, justifyContent: "center" }}>
            <MobileIcon name={t.icon} color={color} size={21} />
            <span style={{ fontSize: 10, fontWeight: 700, color }}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
