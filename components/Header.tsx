"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import MobileAppBar from "@/components/mobile/MobileAppBar";
import MobileDrawer from "@/components/mobile/MobileDrawer";
import MobileTabBar from "@/components/mobile/MobileTabBar";
import { getCurrentUser } from "@/lib/supabase/session";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const resolvedTitle = mobileTitle ?? PAGE_TITLES[pathname] ?? "Visit San Carlos";

  useEffect(() => {
    getCurrentUser().then((u) => setLoggedIn(!!u));
  }, []);

  // Cuando nadie personalizó el botón (ni onCtaClick ni ctaHref/ctaLabel
  // propios, como en Clasificados), y hay sesión iniciada, lo convertimos en
  // el acceso de vuelta al Dashboard — si no, un usuario logueado no tiene
  // forma de regresar ahí desde el resto del sitio.
  const usingDefaultCta = !onCtaClick && ctaHref === "/login" && ctaLabel === "AGREGAR NEGOCIO";
  const resolvedCtaLabel = usingDefaultCta && loggedIn ? "MI CUENTA" : ctaLabel;
  const resolvedCtaHref = usingDefaultCta && loggedIn ? "/dashboard" : ctaHref;

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
              {resolvedCtaLabel}
            </button>
          ) : (
            <Link href={resolvedCtaHref} style={ctaStyle}>
              {resolvedCtaLabel}
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
