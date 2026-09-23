const SESSION_KEY = "vsc_admin_session_email";

export function getAdminSessionEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function setAdminSessionEmail(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, email);
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
