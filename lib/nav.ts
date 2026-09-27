export type SocialNetwork = "facebook" | "instagram" | "tiktok" | "twitter" | "linkedin";

export const SOCIAL_LINKS: Record<SocialNetwork, { label: string; href: string }> = {
  facebook: { label: "Facebook", href: "https://www.facebook.com/visit.sancarlos.son" },
  instagram: { label: "Instagram", href: "#" },
  tiktok: { label: "TikTok", href: "#" },
  twitter: { label: "Twitter", href: "#" },
  linkedin: { label: "LinkedIn", href: "#" },
};

export const SOCIAL_SET_MAIN: SocialNetwork[] = ["facebook", "instagram", "tiktok"];

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Acerca de", href: "/acerca-de" },
  { label: "Directorio", href: "/directorio" },
  { label: "Clasificados", href: "/clasificados" },
  { label: "Eventos", href: "/eventos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const FOOTER_LINKS = {
  interes: [
    { label: "Tabla de mareas", href: "https://tablademareas.com/mx/sonora/guaymas" },
    { label: "Agregar mi negocio", href: "/login" },
    { label: "Iniciar sesión", href: "/login" },
    { label: "Publicidad", href: "/publicidad" },
    { label: "Galería", href: "/galeria" },
    { label: "Blog", href: "/blog" },
  ],
  info: [
    { label: "FAQ", href: "/acerca-de#faq" },
    { label: "Políticas de privacidad", href: "/politicas-de-privacidad" },
    { label: "Soporte", href: "/soporte" },
    { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  ],
  emergencias: [
    { label: "Emergencias", href: "tel:911" },
    { label: "Comisaría", href: "tel:+526222261400" },
    { label: "Rescate", href: "tel:+526222260911" },
    { label: "Bomberos", href: "tel:+526226902180" },
    { label: "Green Angels", href: "tel:078" },
    { label: "Agua (CEA)", href: "tel:+526222261310" },
    { label: "Luz (CFE)", href: "tel:071" },
    { label: "Teléfono (Telmex)", href: "tel:+526222260050" },
  ],
} as const;
