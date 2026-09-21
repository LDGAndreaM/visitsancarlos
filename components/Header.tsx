"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "14px 48px",
        background: "#ffffff",
        boxShadow: "0 2px 14px rgba(0,60,66,0.08)",
      }}
    >
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
      <Link
        href="/login"
        style={{
          flexShrink: 0,
          background: "#EB600A",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.02em",
          padding: "12px 24px",
          borderRadius: 999,
          boxShadow: "0 6px 16px rgba(235,96,10,0.35)",
        }}
      >
        AGREGAR NEGOCIO
      </Link>
    </header>
  );
}
