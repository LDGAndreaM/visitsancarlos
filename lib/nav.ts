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
    { label: "Bomberos", href: "tel:+526222241573" },
    { label: "Cruz roja", href: "tel:+526222241234" },
    { label: "Rescate San Carlos", href: "tel:+526622260911" },
    { label: "Policía y transito Guaymas", href: "tel:+526222210911" },
  ],
} as const;
