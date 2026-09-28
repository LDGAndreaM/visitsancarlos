import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Sin esto, Next.js genera el sitemap una sola vez en el build y lo sirve
// congelado — los negocios/clasificados/posts que se aprueben después no
// aparecerían hasta el próximo deploy. Con esto se recalcula como máximo
// cada hora.
export const revalidate = 3600;

// Rutas públicas reales que ya existen en el sitio. Eventos no tiene página
// de detalle individual (es un calendario), así que no aplica aquí.
const STATIC_ROUTES = [
  "",
  "/acerca-de",
  "/directorio",
  "/clasificados",
  "/eventos",
  "/blog",
  "/galeria",
  "/contacto",
  "/paquetes",
  "/soporte",
  "/login",
  "/politicas-de-privacidad",
  "/terminos-y-condiciones",
];

async function fetchDynamicEntries(
  table: string,
  statusFilter: { column: string; value: string | boolean },
  pathPrefix: string
): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data } = await supabase.from(table).select("id, created_at").eq(statusFilter.column, statusFilter.value);
    return (data ?? []).map((row: { id: string; created_at: string }) => ({
      url: `${SITE_URL}${pathPrefix}/${row.id}`,
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

  const [blogEntries, businessEntries, clasificadoEntries] = await Promise.all([
    fetchDynamicEntries("blog_posts", { column: "published", value: true }, "/blog"),
    fetchDynamicEntries("businesses", { column: "status", value: "aprobado" }, "/directorio"),
    fetchDynamicEntries("classifieds", { column: "status", value: "aprobado" }, "/clasificados"),
  ]);

  return [...staticEntries, ...blogEntries, ...businessEntries, ...clasificadoEntries];
}
