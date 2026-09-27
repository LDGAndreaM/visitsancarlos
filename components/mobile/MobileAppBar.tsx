"use client";

import Image from "next/image";
import { MobileIcon } from "./icons";

export default function MobileAppBar({
  title,
  subtitle,
  showLogo,
  onOpenMenu,
  rightAction,
  children,
}: {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  onOpenMenu: () => void;
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="vsc-mobile-only"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#ffffff",
        boxShadow: "0 2px 12px rgba(0,60,66,0.06)",
      }}
    >
      <div style={{ height: 58, padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button
          onClick={onOpenMenu}
          aria-label="Abrir menú"
          style={{ width: 42, height: 42, border: "none", background: "#F4FAFB", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
        >
          <MobileIcon name="burger" color="#143840" size={18} />
        </button>
        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {showLogo ? (
            <Image src="/uploads/Recurso 1visitsancarlos.png" alt="Visit San Carlos" height={34} width={118} style={{ height: 34, width: "auto" }} priority />
          ) : (
            <span style={{ fontSize: 17, fontWeight: 800, color: "#143840", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
          )}
          {subtitle && <span style={{ fontSize: 11, fontWeight: 600, color: "#5C7679" }}>{subtitle}</span>}
        </span>
        {rightAction ?? <span style={{ width: 42, height: 42, flexShrink: 0 }} />}
      </div>
      {children}
    </div>
  );
}
