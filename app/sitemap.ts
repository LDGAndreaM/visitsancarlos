import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Rutas públicas reales que ya existen en el sitio. Cuando el directorio,
// clasificados y eventos tengan su propia página de detalle conectada a
// Supabase (hoy siguen usando datos de ejemplo), agrega aquí el mismo patrón
// que ya usamos abajo para el blog: consulta las filas aprobadas/publicadas
// y mapea cada una a `${SITE_URL}/seccion/${id}`. No agregues esas URLs antes
// de que la página de detalle lea datos reales — mientras tanto quedarían
// fuera del sitemap a propósito.
const STATIC_ROUTES = [
  "",
  "/acerca-de",
  "/directorio",
  "/clasificados",
  "/eventos",
  "/blog",
  "/galeria",
  "/contacto",
  "/publicidad",
  "/soporte",
  "/login",
  "/politicas-de-privacidad",
  "/terminos-y-condiciones",
];

async function fetchPublishedBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from("blog_posts").select("id, created_at").eq("published", true);
    return (data ?? []).map((row: { id: string; created_at: string }) => ({
      url: `${SITE_URL}/blog/${row.id}`,
      lastModified: new Date(row.created_at),
      changeFrequency: "monthly" as const,
    }));
  } catch {
    // Supabase no disponible en este entorno de build; el sitemap sigue
    // funcionando solo con las rutas estáticas.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries = await fetchPublishedBlogEntries();

  return [...staticEntries, ...blogEntries];
}
