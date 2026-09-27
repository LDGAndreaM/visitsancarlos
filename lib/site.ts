// Configuración central de SEO/infraestructura del sitio. Todo lo que dependa
// del dominio o de textos por defecto se lee de aquí para no repetirlo página
// por página.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.visitsancarlos.com.mx").replace(/\/$/, "");

export const SITE_NAME = "Visit San Carlos";

export const SITE_DESCRIPTION = "San Carlos no solo se visita… se vive. Directorio de negocios, clasificados, eventos y guías locales de San Carlos y Guaymas, Sonora.";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";

// Buzones reales del dominio (Hostinger). El formulario de contacto reparte
// el correo según el asunto elegido: ver app/api/contact/route.ts.
export const CONTACT_EMAIL_GENERAL = "hola@visitsancarlos.com.mx";
export const CONTACT_EMAIL_SOPORTE = "soporte@visitsancarlos.com.mx";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Genera un bloque de metadata consistente (title, canonical, Open Graph,
// Twitter) para una página estática. Los layouts de Next solo mezclan
// `openGraph`/`twitter` como objeto completo (no por campo individual), así
// que cada página debe repetir siteName/locale/type — este helper lo hace
// para no tener que repetirlo a mano en cada archivo.
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = absoluteUrl(path);
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website" as const,
      locale: "es_MX",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}
