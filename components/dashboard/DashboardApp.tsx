"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import ResumenTab from "./ResumenTab";
import NegociosTab from "./NegociosTab";
import PublicidadTab from "./PublicidadTab";
import CuentaTab from "./CuentaTab";
import EditBusinessModal from "./EditBusinessModal";
import AdModal from "./AdModal";
import { AD_CATALOG, INITIAL_ADS, INITIAL_BUSINESSES, fmtMoney, type DashboardAd, type DashboardBusiness } from "@/lib/dashboardData";

export type DashboardTab = "resumen" | "negocios" | "publicidad" | "cuenta";

export type AdView = DashboardAd & {
  businessName: string;
  billingLabel: string;
  priceFmt: string;
  actionLabel: string;
};

function actionLabelFor(status: string): string {
  if (status === "Activo") return "Pausar";
  if (status === "Pausado") return "Reactivar";
  if (status === "Vencido") return "Renovar";
  return "Pagar ahora";
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export default function DashboardApp() {
  const [tab, setTab] = useState<DashboardTab>("resumen");
  const [businesses, setBusinesses] = useState<DashboardBusiness[]>(INITIAL_BUSINESSES);
  const [ads, setAds] = useState<DashboardAd[]>(INITIAL_ADS);
  const [userName, setUserName] = useState("Andrea");
  const [userNameInput, setUserNameInput] = useState("Andrea");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);

  const editing = businesses.find((b) => b.id === editingId) ?? null;

  const bizName = (id: string) => businesses.find((b) => b.id === id)?.name ?? "—";
  const adViews: AdView[] = ads.map((ad) => ({
    ...ad,
    businessName: bizName(ad.businessId),
    billingLabel: ad.billing === "trimestral" ? "Trimestral" : "Mensual",
    priceFmt: fmtMoney(ad.price) + " MXN",
    actionLabel: actionLabelFor(ad.status),
  }));
  const activeAds = adViews.filter((a) => a.status === "Activo");
  const adStats = {
    activeCount: activeAds.length,
    monthlySpendFmt: fmtMoney(activeAds.reduce((sum, a) => sum + (a.billing === "trimestral" ? Math.round(a.price / 3) : a.price), 0)) + " MXN",
    nextExpiry: activeAds.length
      ? activeAds
          .slice()
          .sort((a, b) => a.expires.localeCompare(b.expires))[0]
          .expires.split("-")
          .reverse()
          .join("/")
      : "—",
  };

  const handleSaveBusiness = (updated: DashboardBusiness) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setEditingId(null);
  };

  const handleAddBusiness = () => {
    const id = "db-" + Date.now();
    const newBiz: DashboardBusiness = {
      id,
      name: "Nuevo negocio",
      category: "Negocios",
      location: "",
      hours: "",
      phone: "",
      status: "Pendiente de aprobación",
      statusColor: "#EB600A",
      statusBg: "#FDEEE4",
      description: "",
      priceRange: "$",
      visibility: "Invisible",
      pendingApproval: true,
      features: [],
    };
    setBusinesses((prev) => [...prev, newBiz]);
    setEditingId(id);
    setTab("negocios");
  };

  const handleAdAction = (id: string) => {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id !== id) return ad;
        if (ad.status === "Activo") return { ...ad, status: "Pausado", statusColor: "#5C7679", statusBg: "#EEF3F3" };
        return { ...ad, status: "Activo", statusColor: "#009BA4", statusBg: "#E5F6F7" };
      })
    );
  };

  const handleCancelAd = (id: string) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  const handleConfirmAdModal = ({ businessId, billing, packageId }: { businessId: string; billing: "mensual" | "trimestral"; packageId: string }) => {
    const pkg = AD_CATALOG.find((p) => p.id === packageId);
    if (!pkg || !businessId) return;
    const months = billing === "trimestral" ? 3 : 1;
    const start = new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);
    const newAd: DashboardAd = {
      id: "ad-" + Date.now(),
      name: pkg.name,
      businessId,
      billing,
      price: billing === "trimestral" ? pkg.trimestral : pkg.mensual,
      period: `${fmtDate(start)} – ${fmtDate(end)}`,
      expires: end.toISOString().slice(0, 10),
      status: "Pendiente de pago",
      statusColor: "#EB600A",
      statusBg: "#FDEEE4",
    };
    setAds((prev) => [...prev, newAd]);
    setShowAdModal(false);
  };

  return (
    <div style={{ maxWidth: "100%", minHeight: "100vh", overflowX: "hidden", background: "#F7FBFC", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <Sidebar tab={tab} onTabChange={setTab} />

      <main style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#143840" }}>Hola, {userName} 👋</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5C7679" }}>Administras {businesses.length} negocios en Visit San Carlos.</p>
          </div>
          <a href="/directorio" style={{ background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10 }}>
            Ver directorio público
          </a>
        </div>

        {tab === "resumen" && <ResumenTab businesses={businesses} ads={adViews} onTabChange={setTab} />}
        {tab === "negocios" && <NegociosTab businesses={businesses} onEdit={setEditingId} onAddBusiness={handleAddBusiness} />}
        {tab === "publicidad" && <PublicidadTab ads={adViews} adStats={adStats} onOpenAdModal={() => setShowAdModal(true)} onAdAction={handleAdAction} onCancelAd={handleCancelAd} />}
        {tab === "cuenta" && <CuentaTab userNameInput={userNameInput} onUserNameInputChange={setUserNameInput} onSave={() => setUserName(userNameInput)} />}
      </main>

      {editing && <EditBusinessModal business={editing} onClose={() => setEditingId(null)} onSave={handleSaveBusiness} />}
      {showAdModal && <AdModal businesses={businesses} onClose={() => setShowAdModal(false)} onConfirm={handleConfirmAdModal} />}
    </div>
  );
}
