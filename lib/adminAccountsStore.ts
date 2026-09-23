import { INITIAL_ADMIN_ACCOUNTS, type AdminAccount } from "./adminAuth";

const ACCOUNTS_KEY = "vsc_admin_accounts";

export function loadAdminAccounts(): AdminAccount[] {
  if (typeof window === "undefined") return INITIAL_ADMIN_ACCOUNTS;
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return INITIAL_ADMIN_ACCOUNTS;
    const parsed = JSON.parse(raw) as AdminAccount[];
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_ADMIN_ACCOUNTS;
    return parsed;
  } catch {
    return INITIAL_ADMIN_ACCOUNTS;
  }
}

export function saveAdminAccounts(accounts: AdminAccount[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}
