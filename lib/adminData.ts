export type AdminUser = {
  id: string;
  name: string;
  email: string;
  businessCount: number;
  joined: string;
  status: "Activo" | "Suspendido";
};

export const INITIAL_USERS: AdminUser[] = [
  { id: "u1", name: "Andrea Solís", email: "andrea@correo.com", businessCount: 2, joined: "12 ene 2026", status: "Activo" },
  { id: "u2", name: "Marco Valdez", email: "marco.valdez@correo.com", businessCount: 1, joined: "3 mar 2026", status: "Activo" },
  { id: "u3", name: "Lupita Rentería", email: "lupita.r@correo.com", businessCount: 1, joined: "20 abr 2026", status: "Activo" },
  { id: "u4", name: "Carlos Beltrán", email: "cbeltran@correo.com", businessCount: 1, joined: "2 jun 2026", status: "Suspendido" },
  { id: "u5", name: "Fernanda Ibarra", email: "fer.ibarra@correo.com", businessCount: 3, joined: "18 ago 2026", status: "Activo" },
];

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

export const INITIAL_ADMIN_ADS: AdminAd[] = [
  { id: "ad-1", name: "Vistas Doradas — Carrusel Home", businessId: "b1", businessName: "Hotel Playa Bonita", price: 1500, period: "1 sep – 30 sep 2026", status: "Activo" },
  { id: "ad-2", name: "Directorio Premium", businessId: "b3", businessName: "Mariscos El Zarpe", price: 1900, period: "1 jul – 1 ago 2026", status: "Vencido" },
  { id: "ad-3", name: "Eventos Destacados", businessId: "b7", businessName: "Ferretería San Carlos", price: 4320, period: "15 sep – 15 dic 2026", status: "Activo" },
  { id: "ad-4", name: "Sabor local", businessId: "b6", businessName: "Casa Vacacional Vista Mar", price: 1000, period: "20 sep – 20 oct 2026", status: "Pendiente de pago" },
];

export type ChatMessage = { from: "user" | "admin"; text: string };
export type Chat = { id: string; userName: string; unread: boolean; messages: ChatMessage[] };

export const INITIAL_CHATS: Chat[] = [
  {
    id: "chat-1",
    userName: "Marco Valdez",
    unread: true,
    messages: [
      { from: "user", text: "Hola, ¿por qué mi negocio sigue en revisión?" },
      { from: "admin", text: "Hola Marco, lo estamos revisando, te confirmamos hoy mismo." },
      { from: "user", text: "¡Gracias! Quedo al pendiente." },
    ],
  },
  {
    id: "chat-2",
    userName: "Fernanda Ibarra",
    unread: true,
    messages: [{ from: "user", text: "¿Puedo pagar el paquete trimestral por transferencia?" }],
  },
  {
    id: "chat-3",
    userName: "Lupita Rentería",
    unread: false,
    messages: [
      { from: "user", text: "¿Cómo agrego más fotos a mi galería?" },
      { from: "admin", text: 'Desde tu panel, en "Mis negocios" > Editar > Galería, puedes subir hasta 10 fotos.' },
      { from: "user", text: "Perfecto, ¡gracias!" },
    ],
  },
];

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
