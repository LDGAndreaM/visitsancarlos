export type AdminRole = "super" | "limitado";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  addedAt: string;
  pending: boolean;
};

export const SUPER_ADMIN_EMAIL = "visit.sancarlos.son@gmail.com";

export type AdminTab = "resumen" | "administradores" | "usuarios" | "aprobaciones" | "directorio" | "blog" | "eventos" | "publicidad" | "soporte";

const ALL_TABS: AdminTab[] = ["resumen", "administradores", "usuarios", "aprobaciones", "directorio", "blog", "eventos", "publicidad", "soporte"];

const LIMITED_TABS: AdminTab[] = ["resumen", "aprobaciones", "blog", "soporte"];

export function tabsForRole(role: AdminRole): AdminTab[] {
  return role === "super" ? ALL_TABS : LIMITED_TABS;
}
