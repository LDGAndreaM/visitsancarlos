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
import AddBusinessAdminModal from "./AddBusinessAdminModal";
import ClasificadosAdminTab from "./ClasificadosAdminTab";
import AddClasificadoAdminModal from "./AddClasificadoAdminModal";
import BlogAdminTab from "./BlogAdminTab";
import NewPostModal from "./NewPostModal";
import EventosAdminTab from "./EventosAdminTab";
import NewEventModal from "./NewEventModal";
import EditEventAdminModal from "./EditEventAdminModal";
import GaleriaAdminTab from "./GaleriaAdminTab";
import UploadPhotoModal from "./UploadPhotoModal";
import PublicidadAdminTab from "./PublicidadAdminTab";
import SoporteTab from "./SoporteTab";
import AdministradoresTab from "./AdministradoresTab";
import AddAdminModal from "./AddAdminModal";
import { INITIAL_ADMIN_ADS, INITIAL_CHATS, INITIAL_USERS, fmtMoneyMXN, type AdminBusiness, type AdminClasificado, type AdminEvent, type Chat } from "@/lib/adminData";
import { tabsForRole, type AdminAccount, type AdminTab } from "@/lib/adminAuth";
import { fetchAdminAccounts, getCurrentAdminAccount, inviteAdmin, revokeAdmin, signOutAdmin } from "@/lib/supabase/adminAccounts";
import { createBusinessAsAdmin, deleteBusiness, fetchAllBusinessesAdmin, setBusinessFeatured, setBusinessStatus, updateBusinessFromAdmin } from "@/lib/supabase/businesses";
import { createEventAsAdmin, deleteEvent as deleteEventApi, fetchAllEventsAdmin, setEventFeatured, setEventStatus, updateEventFromAdmin } from "@/lib/supabase/events";
import { createClasificadoAsAdmin, deleteClasificado, fetchAllClasificadosAdmin, setClasificadoStatus } from "@/lib/supabase/classifieds";
import { createPost, deletePost as deletePostApi, fetchAllPostsAdmin, setPostPublished } from "@/lib/supabase/blogPosts";
import { deletePhoto, fetchAllPhotosAdmin, uploadPhoto, type GalleryPhotoView } from "@/lib/supabase/gallery";

const TITLES: Record<AdminTab, [string, string]> = {
  resumen: ["Panel administrativo", "Resumen general de Visit San Carlos"],
  administradores: ["Administradores", "Cuentas con acceso al panel administrativo"],
  usuarios: ["Usuarios", "Cuentas registradas en la plataforma"],
  aprobaciones: ["Aprobaciones", "Publicaciones pendientes de revisión"],
  directorio: ["Directorio", "Todas las entradas publicadas en el sitio"],
  clasificados: ["Clasificados", "Anuncios publicados en el sitio"],
  blog: ["Blog", "Entradas del blog de Visit San Carlos"],
  eventos: ["Eventos", "Eventos publicados en el sitio"],
  galeria: ["Galería", "Fotos publicadas en la página de galería"],
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
  const [businesses, setBusinesses] = useState<AdminBusiness[]>([]);
  const [clasificados, setClasificados] = useState<AdminClasificado[]>([]);
  const [blogPosts, setBlogPosts] = useState<Awaited<ReturnType<typeof fetchAllPostsAdmin>>>([]);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [photos, setPhotos] = useState<GalleryPhotoView[]>([]);
  const [ads] = useState(INITIAL_ADMIN_ADS);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState("chat-1");

  const [dirSearch, setDirSearch] = useState("");
  const [dirCategory, setDirCategory] = useState("Todas");
  const [clSearch, setClSearch] = useState("");
  const [clCategory, setClCategory] = useState("Todas");
  const [approvalDetailId, setApprovalDetailId] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [showAddClasificado, setShowAddClasificado] = useState(false);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingBusinessId, setEditingBusinessId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const refreshBusinesses = async () => setBusinesses(await fetchAllBusinessesAdmin());
  const refreshEvents = async () => setEvents(await fetchAllEventsAdmin());
  const refreshClasificados = async () => setClasificados(await fetchAllClasificadosAdmin());
  const refreshBlogPosts = async () => setBlogPosts(await fetchAllPostsAdmin());
  const refreshPhotos = async () => setPhotos(await fetchAllPhotosAdmin());

  useEffect(() => {
    (async () => {
      const account = await getCurrentAdminAccount();
      if (!account) {
        router.replace("/login");
        return;
      }
      setCurrentAccount(account);
      const [accts, biz, evs, cls, posts, pics] = await Promise.all([
        fetchAdminAccounts(),
        fetchAllBusinessesAdmin(),
        fetchAllEventsAdmin(),
        fetchAllClasificadosAdmin(),
        fetchAllPostsAdmin(),
        fetchAllPhotosAdmin(),
      ]);
      setAccounts(accts);
      setBusinesses(biz);
      setEvents(evs);
      setClasificados(cls);
      setBlogPosts(posts);
      setPhotos(pics);
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
  const pendingEvents = events.filter((ev) => ev.status === "Pendiente");
  const pendingClasificados = clasificados.filter((c) => c.status === "Pendiente");
  const unreadChats = chats.filter((c) => c.unread);
  const publishedCount = businesses.filter((b) => b.status === "Publicado").length;
  const activeAds = ads.filter((a) => a.status === "Activo");
  const revenueFmt = fmtMoneyMXN(activeAds.reduce((sum, a) => sum + a.price, 0));
  const stats = { userCount: users.length, publishedCount, pendingCount: pendingBusinesses.length + pendingEvents.length + pendingClasificados.length, revenueFmt };
  const adminAdStats = { activeCount: activeAds.length, pendingCount: ads.filter((a) => a.status === "Pendiente de pago").length };
  const [pageTitle, pageSubtitle] = TITLES[tab];
  const editingBusiness = businesses.find((b) => b.id === editingBusinessId) ?? null;
  const editingEvent = events.find((ev) => ev.id === editingEventId) ?? null;
  const approvalDetail = businesses.find((b) => b.id === approvalDetailId) ?? null;

  const approveBusiness = async (id: string) => {
    await setBusinessStatus(id, "aprobado");
    await refreshBusinesses();
  };
  const rejectBusiness = async (id: string) => {
    await setBusinessStatus(id, "rechazado");
    await refreshBusinesses();
  };
  const toggleFeatured = async (id: string) => {
    const b = businesses.find((x) => x.id === id);
    if (!b) return;
    await setBusinessFeatured(id, !b.featured);
    await refreshBusinesses();
  };
  const toggleArchiveBusiness = async (id: string) => {
    const b = businesses.find((x) => x.id === id);
    if (!b) return;
    await setBusinessStatus(id, b.status === "Archivado" ? "aprobado" : "archivado");
    await refreshBusinesses();
  };
  const removeBusiness = async (id: string) => {
    await deleteBusiness(id);
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
  };
  const saveBusinessEdit = async (updated: AdminBusiness) => {
    setEditingBusinessId(null);
    await updateBusinessFromAdmin(updated.id, { name: updated.name, category: updated.category, location: updated.location, phone: updated.phone, description: updated.description, status: updated.status });
    await refreshBusinesses();
  };
  const addBusinessAdmin = async (draft: { name: string; category: string; location: string; phone: string; description: string }) => {
    setShowAddBusiness(false);
    if (!currentAccount || !draft.name.trim()) return;
    await createBusinessAsAdmin(currentAccount.id, draft);
    await refreshBusinesses();
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

  const togglePostStatus = async (id: string) => {
    const p = blogPosts.find((x) => x.id === id);
    if (!p) return;
    await setPostPublished(id, p.status !== "Publicado");
    await refreshBlogPosts();
  };
  const deletePostHandler = async (id: string) => {
    await deletePostApi(id);
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
  };
  const saveNewPost = async (draft: { title: string; author: string }) => {
    setShowNewPost(false);
    if (!currentAccount || !draft.title.trim()) return;
    await createPost(currentAccount.id, { title: draft.title });
    await refreshBlogPosts();
  };

  const toggleEventFeatured = async (id: string) => {
    const ev = events.find((x) => x.id === id);
    if (!ev) return;
    await setEventFeatured(id, !ev.featured);
    await refreshEvents();
  };
  const toggleArchiveEvent = async (id: string) => {
    const ev = events.find((x) => x.id === id);
    if (!ev) return;
    await setEventStatus(id, ev.status === "Archivado" ? "aprobado" : "archivado");
    await refreshEvents();
  };
  const deleteEventHandler = async (id: string) => {
    await deleteEventApi(id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };
  const saveEventEdit = async (updated: AdminEvent) => {
    setEditingEventId(null);
    await updateEventFromAdmin(updated.id, { name: updated.name, category: updated.category, status: updated.status });
    await refreshEvents();
  };
  const saveNewEvent = async (draft: { name: string; date: string; category: string }) => {
    setShowNewEvent(false);
    if (!currentAccount || !draft.name.trim() || !draft.date) return;
    await createEventAsAdmin(currentAccount.id, draft);
    await refreshEvents();
  };
  const approveEvent = async (id: string) => {
    await setEventStatus(id, "aprobado");
    await refreshEvents();
  };
  const rejectEvent = async (id: string) => {
    await setEventStatus(id, "rechazado");
    await refreshEvents();
  };

  const addClasificadoAdmin = async (draft: { title: string; category: string; price: number }) => {
    setShowAddClasificado(false);
    if (!currentAccount || !draft.title.trim()) return;
    await createClasificadoAsAdmin(currentAccount.id, draft);
    await refreshClasificados();
  };
  const toggleArchiveClasificado = async (id: string) => {
    const it = clasificados.find((x) => x.id === id);
    if (!it) return;
    await setClasificadoStatus(id, it.status === "Archivado" ? "aprobado" : "archivado");
    await refreshClasificados();
  };
  const removeClasificado = async (id: string) => {
    await deleteClasificado(id);
    setClasificados((prev) => prev.filter((it) => it.id !== id));
  };
  const approveClasificado = async (id: string) => {
    await setClasificadoStatus(id, "aprobado");
    await refreshClasificados();
  };
  const rejectClasificado = async (id: string) => {
    await setClasificadoStatus(id, "rechazado");
    await refreshClasificados();
  };

  const uploadPhotoHandler = async (file: File, values: { caption: string; category: string; tall: boolean }) => {
    if (!currentAccount) return;
    const { error } = await uploadPhoto(currentAccount.id, file, values);
    if (!error) {
      await refreshPhotos();
      setShowUploadPhoto(false);
    }
  };
  const deletePhotoHandler = async (id: string) => {
    await deletePhoto(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
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
        pendingCount={stats.pendingCount}
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
        {tab === "aprobaciones" && (
          <AprobacionesTab
            pendingBusinesses={pendingBusinesses}
            pendingEvents={pendingEvents}
            pendingClasificados={pendingClasificados}
            onApprove={approveBusiness}
            onReject={rejectBusiness}
            onDetail={openApprovalDetail}
            onApproveEvent={approveEvent}
            onRejectEvent={rejectEvent}
            onApproveClasificado={approveClasificado}
            onRejectClasificado={rejectClasificado}
          />
        )}
        {tab === "directorio" && (
          <DirectorioAdminTab
            businesses={businesses}
            search={dirSearch}
            onSearchChange={setDirSearch}
            category={dirCategory}
            onCategoryChange={setDirCategory}
            onOpenAdd={() => setShowAddBusiness(true)}
            onToggleFeatured={toggleFeatured}
            onEdit={setEditingBusinessId}
            onArchive={toggleArchiveBusiness}
            onRemove={removeBusiness}
          />
        )}
        {tab === "clasificados" && (
          <ClasificadosAdminTab
            items={clasificados}
            search={clSearch}
            onSearchChange={setClSearch}
            category={clCategory}
            onCategoryChange={setClCategory}
            onOpenAdd={() => setShowAddClasificado(true)}
            onArchive={toggleArchiveClasificado}
            onRemove={removeClasificado}
          />
        )}
        {tab === "blog" && <BlogAdminTab posts={blogPosts} onOpenNewPost={() => setShowNewPost(true)} onTogglePublish={togglePostStatus} onDelete={deletePostHandler} />}
        {tab === "eventos" && (
          <EventosAdminTab events={events} onOpenNewEvent={() => setShowNewEvent(true)} onToggleFeatured={toggleEventFeatured} onEdit={setEditingEventId} onArchive={toggleArchiveEvent} onDelete={deleteEventHandler} />
        )}
        {tab === "galeria" && <GaleriaAdminTab photos={photos} onOpenUpload={() => setShowUploadPhoto(true)} onDelete={deletePhotoHandler} />}
        {tab === "publicidad" && <PublicidadAdminTab ads={ads} adminAdStats={adminAdStats} revenueFmt={stats.revenueFmt} />}
        {tab === "soporte" && <SoporteTab chats={chats} activeChatId={activeChatId} onSelectChat={selectChat} onSendMessage={sendChatMessage} />}
      </main>

      {approvalDetail && <ApprovalDetailModal business={approvalDetail} onClose={closeApprovalDetail} onApprove={approveFromDetail} onReject={rejectFromDetail} />}
      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} onSave={saveNewPost} />}
      {showNewEvent && <NewEventModal onClose={() => setShowNewEvent(false)} onSave={saveNewEvent} />}
      {showAddBusiness && <AddBusinessAdminModal onClose={() => setShowAddBusiness(false)} onSave={addBusinessAdmin} />}
      {showAddClasificado && <AddClasificadoAdminModal onClose={() => setShowAddClasificado(false)} onSave={addClasificadoAdmin} />}
      {showUploadPhoto && <UploadPhotoModal onClose={() => setShowUploadPhoto(false)} onUpload={uploadPhotoHandler} />}
      {showAddAdmin && <AddAdminModal existingEmails={accounts.map((a) => a.email)} onClose={() => setShowAddAdmin(false)} onSave={addAdmin} />}
      {editingBusiness && <EditBusinessAdminModal business={editingBusiness} onClose={() => setEditingBusinessId(null)} onSave={saveBusinessEdit} />}
      {editingEvent && <EditEventAdminModal event={editingEvent} onClose={() => setEditingEventId(null)} onSave={saveEventEdit} />}
    </div>
  );
}
