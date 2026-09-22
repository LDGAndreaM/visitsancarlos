"use client";

import { useMemo, useState } from "react";
import { AD_CATALOG, fmtMoney } from "@/lib/dashboardData";
import type { ListingRow } from "./DashboardApp";

type AdModalProps = {
  listings: ListingRow[];
  onClose: () => void;
  onConfirm: (params: { businessId: string; billing: "mensual" | "trimestral"; packageId: string }) => void;
};

export default function AdModal({ listings, onClose, onConfirm }: AdModalProps) {
  const [businessId, setBusinessId] = useState(listings[0]?.id ?? "");
  const [billing, setBilling] = useState<"mensual" | "trimestral">("mensual");
  const [packageId, setPackageId] = useState(AD_CATALOG[0].id);

  const catalogGroups = useMemo(() => {
    const byCategory = new Map<string, typeof AD_CATALOG>();
    for (const pkg of AD_CATALOG) {
      if (!byCategory.has(pkg.category)) byCategory.set(pkg.category, []);
      byCategory.get(pkg.category)!.push(pkg);
    }
    return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
  }, []);

  const selectedPkg = AD_CATALOG.find((p) => p.id === packageId) ?? AD_CATALOG[0];
  const totalFmt = `${fmtMoney(billing === "trimestral" ? selectedPkg.trimestral : selectedPkg.mensual)} MXN / ${billing === "trimestral" ? "trimestre" : "mes"}`;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 520, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Contratar espacio publicitario</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Publicación a promocionar</label>
          <select
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, background: "#ffffff", fontFamily: "inherit" }}
          >
            {listings.map((l) => (
              <option key={l.id} value={l.id}>
                {l.displayName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Facturación</label>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="billing" checked={billing === "mensual"} onChange={() => setBilling("mensual")} />
              Mensual
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="billing" checked={billing === "trimestral"} onChange={() => setBilling("trimestral")} />
              Trimestral <span style={{ color: "#009BA4" }}>(mejor precio + sesión de fotos)</span>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Espacio publicitario</label>
          {catalogGroups.map((grp) => (
            <div key={grp.category} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "#009BA4", letterSpacing: "0.03em", textTransform: "uppercase" }}>{grp.category}</span>
              {grp.items.map((pkg) => {
                const selected = pkg.id === packageId;
                return (
                  <label
                    key={pkg.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      border: `1px solid ${selected ? "#EB600A" : "#E2ECED"}`,
                      background: selected ? "#FFF6F0" : "#ffffff",
                      borderRadius: 10,
                      padding: "12px 14px",
                      cursor: "pointer",
                    }}
                  >
                    <input type="radio" name="pkg" checked={selected} onChange={() => setPackageId(pkg.id)} />
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#143840" }}>{pkg.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>{fmtMoney(billing === "trimestral" ? pkg.trimestral : pkg.mensual)} MXN</span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F4FAFB", borderRadius: 12, padding: "14px 18px" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>Total a contratar</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#EB600A" }}>{totalFmt}</span>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onConfirm({ businessId, billing, packageId })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Continuar al pago
          </button>
        </div>
      </div>
    </div>
  );
}
