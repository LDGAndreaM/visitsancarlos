"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import ResumenTab from "./ResumenTab";
import PublicacionesTab from "./PublicacionesTab";
import PublicidadTab from "./PublicidadTab";
import CuentaTab from "./CuentaTab";
import ChooseListingTypeModal from "./ChooseListingTypeModal";
import EditDirectorioModal from "./EditDirectorioModal";
import EditClasificadoModal from "./EditClasificadoModal";
import EditEventoModal from "./EditEventoModal";
import AdModal from "./AdModal";
import {
  AD_CATALOG,
  INITIAL_ADS,
  fmtMoney,
  toListingView,
  type DashboardAd,
  type DashboardListing,
  type DirectorioListing,
  type ClasificadoListing,
  type EventListing,
  type ListingView,
} from "@/lib/dashboardData";
import { EVENT_CATEGORIES } from "@/lib/eventsData";
import { getCurrentUser, signOutUser, updateMyName, type CurrentUser } from "@/lib/supabase/session";
import { createBusiness, fetchMyBusinesses, updateBusinessFromDashboard } from "@/lib/supabase/businesses";
import { createEvent, fetchMyEvents, updateEventFromDashboard } from "@/lib/supabase/events";
import { createClasificado, fetchMyClasificados, updateClasificadoFromDashboard } from "@/lib/supabase/classifieds";

export type DashboardTab = "resumen" | "publicaciones" | "publicidad" | "cuenta";
export type ListingFilter = "todos" | "directorio" | "clasificado" | "evento";

export type ListingRow = ListingView & { onEdit: () => void };

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

async function fetchAllMyListings(userId: string): Promise<DashboardListing[]> {
  const [businesses, events, clasificados] = await Promise.all([fetchMyBusinesses(userId), fetchMyEvents(userId), fetchMyClasificados(userId)]);
  return [...businesses, ...events, ...clasificados];
}

export default function DashboardApp() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [tab, setTab] = useState<DashboardTab>("resumen");
  const [listings, setListings] = useState<DashboardListing[]>([]);
  const [ads, setAds] = useState<DashboardAd[]>(INITIAL_ADS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [listingFilter, setListingFilter] = useState<ListingFilter>("todos");
  const [userNameInput, setUserNameInput] = useState("");

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setCurrentUser(user);
      setUserNameInput(user.name);
      setListings(await fetchAllMyListings(user.id));
      setAuthChecked(true);
    })();
  }, [router]);

  const handleLogout = async () => {
    await signOutUser();
    router.push("/login");
  };

  const listingRows: ListingRow[] = listings.map((l) => ({ ...toListingView(l), onEdit: () => setEditingId(l.id) }));
  const editing = listings.find((l) => l.id === editingId) ?? null;

  const bizName = (id: string) => listingRows.find((l) => l.id === id)?.displayName ?? "—";
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

  const handleSaveListing = async (updated: DashboardListing) => {
    setEditingId(null);
    setListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    if (updated.type === "directorio") await updateBusinessFromDashboard(updated.id, updated);
    if (updated.type === "evento") await updateEventFromDashboard(updated.id, updated);
    if (updated.type === "clasificado") await updateClasificadoFromDashboard(updated.id, updated);
  };

  const handleChooseDirectorio = async () => {
    if (!currentUser) return;
    setShowTypePicker(false);
    const newBiz = await createBusiness(currentUser.id, { name: "Nuevo negocio", category: "Negocios", location: "", hours: "", priceRange: "$", phone: "", description: "", features: [] });
    if (!newBiz) return;
    setListings((prev) => [...prev, newBiz]);
    setEditingId(newBiz.id);
    setTab("publicaciones");
  };

  const handleChooseClasificado = async () => {
    if (!currentUser) return;
    setShowTypePicker(false);
    const newCl = await createClasificado(currentUser.id, { title: "Nuevo artículo", category: "Autos", price: 0, location: "", condition: "Usado", phone: "", placeholder: "Foto: Nuevo artículo" });
    if (!newCl) return;
    setListings((prev) => [...prev, newCl]);
    setEditingId(newCl.id);
    setTab("publicaciones");
  };

  const handleChooseEvento = async () => {
    if (!currentUser) return;
    setShowTypePicker(false);
    const today = new Date().toISOString().slice(0, 10);
    const newEvt = await createEvent(currentUser.id, {
      name: "Nuevo evento",
      category: EVENT_CATEGORIES[0],
      date: today,
      endDate: today,
      time: "00:00",
      endTime: "",
      location: "",
      phone: "",
      description: "",
      cost: "",
      organizers: "",
      email: "",
      facebook: "",
      instagram: "",
      website: "",
    });
    if (!newEvt) return;
    setListings((prev) => [...prev, newEvt]);
    setEditingId(newEvt.id);
    setTab("publicaciones");
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

  const filteredListings = listingRows.filter((l) => listingFilter === "todos" || l.type === listingFilter);

  if (!authChecked || !currentUser) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7FBFC" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#5C7679" }}>Verificando acceso…</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "100%", minHeight: "100vh", overflowX: "hidden", background: "#F7FBFC", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <Sidebar tab={tab} onTabChange={setTab} onLogout={handleLogout} />

      <main style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#143840" }}>Hola, {currentUser.name} 👋</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5C7679" }}>Administras {listings.length} publicaciones en Visit San Carlos.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/directorio" style={{ background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10 }}>
              Ver directorio
            </a>
            <a href="/clasificados" style={{ background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10 }}>
              Ver clasificados
            </a>
            <a href="/eventos" style={{ background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10 }}>
              Ver eventos
            </a>
          </div>
        </div>

        {tab === "resumen" && <ResumenTab listings={listingRows} ads={adViews} onTabChange={setTab} />}
        {tab === "publicaciones" && (
          <PublicacionesTab
            listings={filteredListings}
            filter={listingFilter}
            onFilterChange={setListingFilter}
            onAddListing={() => setShowTypePicker(true)}
          />
        )}
        {tab === "publicidad" && <PublicidadTab ads={adViews} adStats={adStats} onOpenAdModal={() => setShowAdModal(true)} onAdAction={handleAdAction} onCancelAd={handleCancelAd} />}
        {tab === "cuenta" && (
          <CuentaTab
            userNameInput={userNameInput}
            onUserNameInputChange={setUserNameInput}
            onSave={async () => {
              await updateMyName(currentUser.id, userNameInput);
              setCurrentUser((u) => (u ? { ...u, name: userNameInput } : u));
            }}
          />
        )}
      </main>

      {showTypePicker && (
        <ChooseListingTypeModal
          onClose={() => setShowTypePicker(false)}
          onChooseDirectorio={handleChooseDirectorio}
          onChooseClasificado={handleChooseClasificado}
          onChooseEvento={handleChooseEvento}
        />
      )}
      {editing && editing.type === "directorio" && <EditDirectorioModal listing={editing} onClose={() => setEditingId(null)} onSave={handleSaveListing} />}
      {editing && editing.type === "clasificado" && <EditClasificadoModal listing={editing} onClose={() => setEditingId(null)} onSave={handleSaveListing} />}
      {editing && editing.type === "evento" && <EditEventoModal listing={editing} onClose={() => setEditingId(null)} onSave={handleSaveListing} />}
      {showAdModal && <AdModal listings={listingRows} onClose={() => setShowAdModal(false)} onConfirm={handleConfirmAdModal} />}
    </div>
  );
}
