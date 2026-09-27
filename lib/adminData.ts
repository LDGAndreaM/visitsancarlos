export type AdminUser = {
  id: string;
  name: string;
  email: string;
  businessCount: number;
  joined: string;
  status: "Activo" | "Suspendido";
};

export const INITIAL_USERS: AdminUser[] = [];

export type AdminBusinessStatus = "Publicado" | "Pendiente" | "Invisible" | "Archivado";

export type AdminBusiness = {
  id: string;
  name: string;
  owner: string;
  category: string;
  location: string;
  status: AdminBusinessStatus;
  featured: boolean;
  phone: string;
  submitted: string;
  description: string;
};

export const ADMIN_BUSINESS_CATEGORIES = ["Todas", "Hoteles", "Restaurantes", "Doctores", "Negocios", "Clasificados"];

export type AdminBlogPost = {
  id: string;
  title: string;
  author: string;
  date: string;
  status: "Publicado" | "Borrador";
  category: string;
  excerpt: string;
  body: string;
  authorName: string;
  authorRole: string;
  authorPhotoUrl: string;
  authorFacebook: string;
  authorInstagram: string;
  authorWebsite: string;
};

export type AdminEventStatus = "Publicado" | "Pendiente" | "Rechazado" | "Archivado";

export type AdminEvent = {
  id: string;
  name: string;
  date: string;
  category: string;
  status: AdminEventStatus;
  featured: boolean;
};

export type AdminAd = {
  id: string;
  name: string;
  businessId: string;
  businessName: string;
  price: number;
  period: string;
  status: "Activo" | "Vencido" | "Pendiente de pago";
};

export const INITIAL_ADMIN_ADS: AdminAd[] = [];

export type ChatMessage = { from: "user" | "admin"; text: string };
export type Chat = { id: string; userName: string; unread: boolean; messages: ChatMessage[] };

export const INITIAL_CHATS: Chat[] = [];

export function fmtMoneyMXN(n: number): string {
  return "$" + n.toLocaleString("es-MX") + " MXN";
}

export const BUSINESS_STATUS_COLORS: Record<AdminBusinessStatus, [string, string]> = {
  Publicado: ["#009BA4", "#E5F6F7"],
  Pendiente: ["#EB600A", "#FDEEE4"],
  Invisible: ["#5C7679", "#EEF3F3"],
  Archivado: ["#9DB6B8", "#F4FAFB"],
};

export const EVENT_STATUS_COLORS: Record<AdminEventStatus, [string, string]> = {
  Publicado: ["#009BA4", "#E5F6F7"],
  Pendiente: ["#EB600A", "#FDEEE4"],
  Rechazado: ["#B94A2E", "#FBEAE6"],
  Archivado: ["#9DB6B8", "#F4FAFB"],
};

export type AdminClasificadoStatus = "Publicado" | "Pendiente" | "Rechazado" | "Archivado";

export type AdminClasificado = {
  id: string;
  title: string;
  owner: string;
  category: string;
  price: number;
  location: string;
  status: AdminClasificadoStatus;
  submitted: string;
};

export const CLASIFICADO_STATUS_COLORS: Record<AdminClasificadoStatus, [string, string]> = {
  Publicado: ["#009BA4", "#E5F6F7"],
  Pendiente: ["#EB600A", "#FDEEE4"],
  Rechazado: ["#B94A2E", "#FBEAE6"],
  Archivado: ["#9DB6B8", "#F4FAFB"],
};

export const AD_STATUS_COLORS: Record<AdminAd["status"], [string, string]> = {
  Activo: ["#009BA4", "#E5F6F7"],
  Vencido: ["#B94A2E", "#FBEAE6"],
  "Pendiente de pago": ["#EB600A", "#FDEEE4"],
};
