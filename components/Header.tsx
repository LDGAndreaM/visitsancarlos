"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import MobileAppBar from "@/components/mobile/MobileAppBar";
import MobileDrawer from "@/components/mobile/MobileDrawer";
import MobileTabBar from "@/components/mobile/MobileTabBar";

type HeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  mobileTitle?: string;
  mobileRightAction?: React.ReactNode;
  mobileBelow?: React.ReactNode;
};

const ctaStyle: React.CSSProperties = {
  flexShrink: 0,
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  background: "#EB600A",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: "0.02em",
  padding: "12px 24px",
  borderRadius: 999,
  boxShadow: "0 6px 16px rgba(235,96,10,0.35)",
};

const PAGE_TITLES: Record<string, string> = {
  "/": "Visit San Carlos",
  ...Object.fromEntries(NAV_LINKS.map((l) => [l.href, l.label])),
  "/galeria": "Galería",
  "/paquetes": "Publicidad",
  "/soporte": "Soporte",
  "/login": "Inicia sesión",
};

export default function Header({
  ctaLabel = "AGREGAR NEGOCIO",
  ctaHref = "/login",
  onCtaClick,
  mobileTitle,
  mobileRightAction,
  mobileBelow,
}: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const resolvedTitle = mobileTitle ?? PAGE_TITLES[pathname] ?? "Visit San Carlos";

  return (
    <>
      <header
        className="vsc-desktop-only"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "14px 48px",
          background: "#ffffff",
          boxShadow: "0 2px 14px rgba(0,60,66,0.08)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link href="/" style={{ flexShrink: 0, display: "flex" }}>
            <Image
              src="/uploads/Recurso 1visitsancarlos.png"
              alt="Visit San Carlos"
              height={52}
              width={180}
              style={{ height: 52, width: "auto" }}
              priority
            />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontWeight: 600, fontSize: 15, color: pathname === link.href ? "#009BA4" : "#143840" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {onCtaClick ? (
            <button onClick={onCtaClick} style={ctaStyle}>
              {ctaLabel}
            </button>
          ) : (
            <Link href={ctaHref} style={ctaStyle}>
              {ctaLabel}
            </Link>
          )}
        </div>
      </header>

      <MobileAppBar
        title={resolvedTitle}
        showLogo
        onOpenMenu={() => setMenuOpen(true)}
        rightAction={mobileRightAction}
      >
        {mobileBelow}
      </MobileAppBar>
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} activeHref={pathname} />
      <MobileTabBar />
    </>
  );
}
