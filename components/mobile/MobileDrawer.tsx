"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/nav";
import { MobileIcon } from "./icons";

const MENU_GROUPS: { title: string; items: { icon: string; label: string; href: string }[] }[] = [
  {
    title: "EXPLORAR",
    items: [
      { icon: "home", label: "Inicio", href: "/" },
      { icon: "pin", label: "Directorio", href: "/directorio" },
      { icon: "tag", label: "Clasificados", href: "/clasificados" },
      { icon: "calendar", label: "Eventos", href: "/eventos" },
      { icon: "galeria", label: "Galería", href: "/galeria" },
      { icon: "blog", label: "Blog", href: "/blog" },
      { icon: "wave", label: "Tabla de mareas", href: FOOTER_LINKS.interes.find((l) => l.label === "Tabla de mareas")?.href ?? "#" },
    ],
  },
  {
    title: "VISIT SAN CARLOS",
    items: [
      { icon: "info", label: "Acerca de", href: "/acerca-de" },
      { icon: "megafono", label: "Publicidad", href: "/publicidad" },
      { icon: "chat", label: "Soporte", href: "/soporte" },
      { icon: "mail", label: "Contacto", href: "/contacto" },
    ],
  },
];

export default function MobileDrawer({ open, onClose, activeHref }: { open: boolean; onClose: () => void; activeHref?: string }) {
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(20,56,64,0.5)" }} />
      <aside
        className="vsc-scroll"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 100,
          width: "min(310px, 84vw)",
          background: "#ffffff",
          borderRadius: "0 28px 28px 0",
          display: "flex",
          flexDirection: "column",
          padding: "18px 0 max(18px, env(safe-area-inset-bottom))",
          boxShadow: "10px 0 40px rgba(0,0,0,0.2)",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px 18px" }}>
          <Image src="/uploads/Recurso 1visitsancarlos.png" alt="Visit San Carlos" width={140} height={40} style={{ height: 36, width: "auto" }} />
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            style={{ width: 40, height: 40, border: "none", borderRadius: 12, background: "#F4FAFB", color: "#143840", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <MobileIcon name="close" size={16} />
          </button>
        </div>

        <Link
          href="/login"
          onClick={onClose}
          style={{ margin: "0 20px 16px", display: "flex", alignItems: "center", gap: 12, background: "#E5F6F7", borderRadius: 18, padding: "12px 14px" }}
        >
          <span style={{ width: 40, height: 40, borderRadius: "50%", background: "#009BA4", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
            VS
          </span>
          <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>Inicia sesión</span>
            <span style={{ fontSize: 12, color: "#3B5C61" }}>Administra tus publicaciones</span>
          </span>
          <span style={{ color: "#009BA4", fontSize: 18 }}>›</span>
        </Link>

        <div style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {MENU_GROUPS.map((g) => (
            <div key={g.title}>
              <span style={{ display: "block", padding: "12px 12px 6px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#9DB6B8" }}>{g.title}</span>
              {g.items.map((m) => {
                const isCurrent = activeHref === m.href;
                const isExternal = m.href.startsWith("http");
                return (
                  <Link
                    key={m.label}
                    href={m.href}
                    onClick={onClose}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      minHeight: 46,
                      padding: "0 12px",
                      borderRadius: 14,
                      color: "#143840",
                      background: isCurrent ? "#E5F6F7" : "transparent",
                    }}
                  >
                    <span style={{ width: 34, height: 34, borderRadius: 11, background: "#F4FAFB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MobileIcon name={m.icon} color="#009BA4" size={18} />
                    </span>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{m.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ padding: "14px 20px 0", display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid #EEF3F3", marginTop: 8 }}>
          <Link
            href="/login"
            onClick={onClose}
            style={{
              height: 48,
              background: "#EB600A",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.02em",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(235,96,10,0.3)",
            }}
          >
            AGREGAR NEGOCIO
          </Link>
          <a
            href="tel:911"
            style={{ height: 44, border: "1.5px solid #E2ECED", color: "#143840", fontWeight: 700, fontSize: 13, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <MobileIcon name="sos" color="#EB600A" size={18} />
            Números de emergencia
          </a>
        </div>
      </aside>
    </>
  );
}
