"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import ResumenTab from "./ResumenTab";
import UsuariosTab from "./UsuariosTab";
import AprobacionesTab from "./AprobacionesTab";
import ApprovalDetailModal from "./ApprovalDetailModal";
import DirectorioAdminTab from "./DirectorioAdminTab";
import EditBusinessAdminModal from "./EditBusinessAdminModal";
import BlogAdminTab from "./BlogAdminTab";
import NewPostModal from "./NewPostModal";
import EventosAdminTab from "./EventosAdminTab";
import NewEventModal from "./NewEventModal";
import EditEventAdminModal from "./EditEventAdminModal";
import PublicidadAdminTab from "./PublicidadAdminTab";
import SoporteTab from "./SoporteTab";
import AdministradoresTab from "./AdministradoresTab";
import AddAdminModal from "./AddAdminModal";
import {
  INITIAL_ADMIN_ADS,
  INITIAL_ADMIN_BUSINESSES,
  INITIAL_ADMIN_EVENTS,
  INITIAL_BLOG_POSTS,
  INITIAL_CHATS,
  INITIAL_USERS,
  fmtMoneyMXN,
  type AdminBusiness,
  type AdminEvent,
  type Chat,
} from "@/lib/adminData";
import { tabsForRole, type AdminAccount, type AdminTab } from "@/lib/adminAuth";
import { fetchAdminAccounts, getCurrentAdminAccount, inviteAdmin, revokeAdmin, signOutAdmin } from "@/lib/supabase/adminAccounts";

const TITLES: Record<AdminTab, [string, string]> = {
  resumen: ["Panel administrativo", "Resumen general de Visit San Carlos"],
  administradores: ["Administradores", "Cuentas con acceso al panel administrativo"],
  usuarios: ["Usuarios", "Cuentas registradas en la plataforma"],
  aprobaciones: ["Aprobaciones", "Negocios pendientes de revisión"],
  directorio: ["Directorio", "Todas las entradas publicadas en el sitio"],
  blog: ["Blog", "Entradas del blog de Visit San Carlos"],
  eventos: ["Eventos", "Eventos publicados en el sitio"],
  publicidad: ["Publicidad", "Espacios contratados por todos los negocios"],
  soporte: ["Soporte", "Conversaciones con usuarios"],
};

export default function AdminApp() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<AdminAccount | null>(null);
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);

  const [tab, setTab] = useState<AdminTab>("resumen");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [businesses, setBusinesses] = useState(INITIAL_ADMIN_BUSINESSES);
  const [blogPosts, setBlogPosts] = useState(INITIAL_BLOG_POSTS);
  const [events, setEvents] = useState(INITIAL_ADMIN_EVENTS);
  const [ads] = useState(INITIAL_ADMIN_ADS);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState("chat-1");

  const [dirSearch, setDirSearch] = useState("");
  const [dirCategory, setDirCategory] = useState("Todas");
  const [approvalDetailId, setApprovalDetailId] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const account = await getCurrentAdminAccount();
      if (!account) {
        router.replace("/login");
        return;
      }
      setCurrentAccount(account);
      setAccounts(await fetchAdminAccounts());
      setAuthChecked(true);
    })();
  }, [router]);

  const handleLogout = async () => {
    await signOutAdmin();
    router.push("/login");
  };

  const addAdmin = async (values: { email: string }) => {
    const { error } = await inviteAdmin(values.email);
    if (!error) setAccounts(await fetchAdminAccounts());
    setShowAddAdmin(false);
  };

  const removeAdmin = async (id: string) => {
    const account = accounts.find((a) => a.id === id);
    if (!account) return;
    await revokeAdmin(account);
    setAccounts(await fetchAdminAccounts());
  };

  const pendingBusinesses = businesses.filter((b) => b.status === "Pendiente");
  const unreadChats = chats.filter((c) => c.unread);
  const publishedCount = businesses.filter((b) => b.status === "Publicado").length;
  const activeAds = ads.filter((a) => a.status === "Activo");
  const revenueFmt = fmtMoneyMXN(activeAds.reduce((sum, a) => sum + a.price, 0));
  const stats = { userCount: users.length, publishedCount, pendingCount: pendingBusinesses.length, revenueFmt };
  const adminAdStats = { activeCount: activeAds.length, pendingCount: ads.filter((a) => a.status === "Pendiente de pago").length };
  const [pageTitle, pageSubtitle] = TITLES[tab];
  const editingBusiness = businesses.find((b) => b.id === editingBusinessId) ?? null;
  const editingEvent = events.find((ev) => ev.id === editingEventId) ?? null;
  const approvalDetail = businesses.find((b) => b.id === approvalDetailId) ?? null;

  const approveBusiness = (id: string) => setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Publicado" } : b)));
  const rejectBusiness = (id: string) => setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Invisible" } : b)));
  const toggleFeatured = (id: string) => setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, featured: !b.featured } : b)));
  const toggleArchiveBusiness = (id: string) => setBusinesses((prev) => prev.map((b) => (b.id === id ? { ...b, status: b.status === "Archivado" ? "Publicado" : "Archivado" } : b)));
  const removeBusiness = (id: string) => setBusinesses((prev) => prev.filter((b) => b.id !== id));
  const saveBusinessEdit = (updated: AdminBusiness) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setEditingBusinessId(null);
  };
  const toggleSuspendUser = (id: string) => setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "Activo" ? "Suspendido" : "Activo" } : u)));

  const openApprovalDetail = (id: string) => setApprovalDetailId(id);
  const closeApprovalDetail = () => setApprovalDetailId(null);
  const approveFromDetail = () => {
    if (approvalDetailId) approveBusiness(approvalDetailId);
    closeApprovalDetail();
  };
  const rejectFromDetail = () => {
    if (approvalDetailId) rejectBusiness(approvalDetailId);
    closeApprovalDetail();
  };

  const togglePostStatus = (id: string) => setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: p.status === "Publicado" ? "Borrador" : "Publicado" } : p)));
  const deletePost = (id: string) => setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  const saveNewPost = (draft: { title: string; author: string }) => {
    setShowNewPost(false);
    if (!draft.title) return;
    const today = new Date().toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
    setBlogPosts((prev) => [...prev, { id: "p-" + Date.now(), title: draft.title, author: draft.author, date: today, status: "Borrador" }]);
  };

  const toggleEventFeatured = (id: string) => setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, featured: !ev.featured } : ev)));
  const toggleArchiveEvent = (id: string) => setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, status: ev.status === "Archivado" ? "Publicado" : "Archivado" } : ev)));
  const deleteEvent = (id: string) => setEvents((prev) => prev.filter((ev) => ev.id !== id));
  const saveEventEdit = (updated: AdminEvent) => {
    setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
    setEditingEventId(null);
  };
  const saveNewEvent = (draft: { name: string; date: string }) => {
    setShowNewEvent(false);
    if (!draft.name) return;
    setEvents((prev) => [...prev, { id: "e-" + Date.now(), name: draft.name, date: draft.date || "Por definir", category: "General", status: "Borrador", featured: false }]);
  };

  const selectChat = (id: string) => {
    setActiveChatId(id);
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };
  const openChatFromResumen = (id: string) => {
    setTab("soporte");
    selectChat(id);
  };
  const sendChatMessage = (text: string) => {
    setChats((prev) => prev.map((c) => (c.id === activeChatId ? { ...c, messages: [...c.messages, { from: "admin" as const, text }] } : c)));
  };

  if (!authChecked || !currentAccount) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7FBFC" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#5C7679" }}>Verificando acceso…</span>
      </div>
    );
  }

  const allowedTabs = tabsForRole(currentAccount.role);

  return (
    <div style={{ maxWidth: "100%", minHeight: "100vh", overflowX: "hidden", background: "#F7FBFC", display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <AdminSidebar
        tab={tab}
        onTabChange={setTab}
        allowedTabs={allowedTabs}
        pendingCount={pendingBusinesses.length}
        unreadCount={unreadChats.length}
        account={currentAccount}
        onLogout={handleLogout}
      />

      <main style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#143840" }}>{pageTitle}</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5C7679" }}>{pageSubtitle}</p>
          </div>
          <a href="/directorio" style={{ background: "#ffffff", border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10 }}>
            Ver sitio público
          </a>
        </div>

        {tab === "resumen" && (
          <ResumenTab stats={stats} pendingBusinesses={pendingBusinesses} unreadChats={unreadChats} onApprove={approveBusiness} onTabChange={setTab} onOpenChat={openChatFromResumen} />
        )}
        {tab === "administradores" && (
          <AdministradoresTab accounts={accounts} currentAccount={currentAccount} onOpenAdd={() => setShowAddAdmin(true)} onRemove={removeAdmin} />
        )}
        {tab === "usuarios" && <UsuariosTab users={users} onToggleSuspend={toggleSuspendUser} />}
        {tab === "aprobaciones" && <AprobacionesTab pendingBusinesses={pendingBusinesses} onApprove={approveBusiness} onReject={rejectBusiness} onDetail={openApprovalDetail} />}
        {tab === "directorio" && (
          <DirectorioAdminTab
            businesses={businesses}
            search={dirSearch}
            onSearchChange={setDirSearch}
            category={dirCategory}
            onCategoryChange={setDirCategory}
            onToggleFeatured={toggleFeatured}
            onEdit={setEditingBusinessId}
            onArchive={toggleArchiveBusiness}
            onRemove={removeBusiness}
          />
        )}
        {tab === "blog" && <BlogAdminTab posts={blogPosts} onOpenNewPost={() => setShowNewPost(true)} onTogglePublish={togglePostStatus} onDelete={deletePost} />}
        {tab === "eventos" && (
          <EventosAdminTab events={events} onOpenNewEvent={() => setShowNewEvent(true)} onToggleFeatured={toggleEventFeatured} onEdit={setEditingEventId} onArchive={toggleArchiveEvent} onDelete={deleteEvent} />
        )}
        {tab === "publicidad" && <PublicidadAdminTab ads={ads} adminAdStats={adminAdStats} revenueFmt={stats.revenueFmt} />}
        {tab === "soporte" && <SoporteTab chats={chats} activeChatId={activeChatId} onSelectChat={selectChat} onSendMessage={sendChatMessage} />}
      </main>

      {approvalDetail && <ApprovalDetailModal business={approvalDetail} onClose={closeApprovalDetail} onApprove={approveFromDetail} onReject={rejectFromDetail} />}
      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} onSave={saveNewPost} />}
      {showNewEvent && <NewEventModal onClose={() => setShowNewEvent(false)} onSave={saveNewEvent} />}
      {showAddAdmin && <AddAdminModal existingEmails={accounts.map((a) => a.email)} onClose={() => setShowAddAdmin(false)} onSave={addAdmin} />}
      {editingBusiness && <EditBusinessAdminModal business={editingBusiness} onClose={() => setEditingBusinessId(null)} onSave={saveBusinessEdit} />}
      {editingEvent && <EditEventAdminModal event={editingEvent} onClose={() => setEditingEventId(null)} onSave={saveEventEdit} />}
    </div>
  );
}
