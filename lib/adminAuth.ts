export type AdminRole = "super" | "limitado";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  addedAt: string;
};

export const SUPER_ADMIN_EMAIL = "visit.sancarlos.son@gmail.com";

export const INITIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  { id: "adm-1", name: "Equipo Visit San Carlos", email: SUPER_ADMIN_EMAIL, role: "super", addedAt: "1 ene 2026" },
];

export type AdminTab = "resumen" | "administradores" | "usuarios" | "aprobaciones" | "directorio" | "blog" | "eventos" | "publicidad" | "soporte";

const ALL_TABS: AdminTab[] = ["resumen", "administradores", "usuarios", "aprobaciones", "directorio", "blog", "eventos", "publicidad", "soporte"];

const LIMITED_TABS: AdminTab[] = ["resumen", "aprobaciones", "blog", "soporte"];

export function tabsForRole(role: AdminRole): AdminTab[] {
  return role === "super" ? ALL_TABS : LIMITED_TABS;
}

export function findAdminAccount(accounts: AdminAccount[], email: string): AdminAccount | null {
  const normalized = email.trim().toLowerCase();
  return accounts.find((a) => a.email.toLowerCase() === normalized) ?? null;
}
