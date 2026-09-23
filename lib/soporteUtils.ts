export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;
  return normalize(haystack).includes(q);
}
