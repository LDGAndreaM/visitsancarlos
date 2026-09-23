export type SupportCategory = "cuenta" | "directorio" | "clasificados" | "publicidad" | "pagos";

export const CATS: { id: "all" | SupportCategory; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "cuenta", label: "Cuenta" },
  { id: "directorio", label: "Directorio" },
  { id: "clasificados", label: "Clasificados" },
  { id: "publicidad", label: "Publicidad" },
  { id: "pagos", label: "Pagos" },
];

export const CAT_LABEL: Record<SupportCategory, string> = {
  cuenta: "CUENTA",
  directorio: "DIRECTORIO",
  clasificados: "CLASIFICADOS",
  publicidad: "PUBLICIDAD",
  pagos: "PAGOS",
};

export type Faq = { cat: SupportCategory; q: string; a: string; img?: boolean; imgHint?: string };

export const FAQS: Faq[] = [
  { cat: "cuenta", q: "¿Cómo creo mi cuenta?", a: 'Da clic en "Agregar negocio" o "Iniciar sesión" y elige "Crear cuenta". Puedes registrarte con tu correo o con Google. Te enviaremos un correo para confirmar tu cuenta.' },
  { cat: "cuenta", q: "Olvidé mi contraseña, ¿qué hago?", a: 'En la pantalla de inicio de sesión da clic en "¿Olvidaste tu contraseña?". Recibirás un enlace para crear una nueva. Revisa también tu carpeta de spam.' },
  { cat: "directorio", q: "¿Cómo agrego mi negocio al directorio?", a: 'Entra a tu panel, ve a "Mis publicaciones" y da clic en "Agregar publicación". Elige "Directorio", llena los datos de tu negocio y sube tus fotos. Nuestro equipo lo revisa antes de publicarlo.', img: true, imgHint: 'Captura: botón "Agregar publicación"' },
  { cat: "directorio", q: "¿Cuánto tarda en aprobarse mi negocio?", a: "Normalmente entre 24 y 48 horas hábiles. Te avisaremos por correo cuando esté publicado o si necesitamos más información." },
  { cat: "clasificados", q: "¿Cómo publico un clasificado?", a: 'Desde la página de Clasificados da clic en "Agregar artículo", o desde tu panel en "Mis publicaciones". Agrega título, precio, estado, fotos y cómo te pueden contactar.', img: true, imgHint: "Captura: formulario de clasificado" },
  { cat: "clasificados", q: "¿Cuánto tiempo dura activo mi clasificado?", a: "Los clasificados permanecen activos 30 días. Antes de que venzan puedes renovarlos desde tu panel. Si ya vendiste el artículo, puedes archivarlo." },
  { cat: "clasificados", q: "¿Cuál es la diferencia entre archivar y eliminar?", a: "Archivar oculta tu publicación del sitio pero la guarda en tu panel para reactivarla después. Eliminar la borra de forma permanente." },
  { cat: "publicidad", q: "¿Cómo me anuncio en Visit San Carlos?", a: "Visita la página de Publicidad para ver los espacios disponibles y sus precios. Puedes solicitar una cotización y un asesor te contactará." },
  { cat: "publicidad", q: "¿Dónde veo cómo va mi anuncio?", a: 'En tu panel, en la pestaña "Publicidad", puedes ver tus contratos activos, fechas de vigencia, vistas y clics de cada anuncio.', img: true, imgHint: "Captura: pestaña Publicidad del panel" },
  { cat: "pagos", q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjeta de crédito o débito, transferencia bancaria y pago en OXXO. Emitimos factura si la solicitas al momento del pago." },
  { cat: "pagos", q: "¿Cómo solicito mi factura?", a: "Escríbenos por el chat o por correo con tu RFC, razón social, uso de CFDI y el número de tu contrato. La enviamos en un máximo de 72 horas." },
];

export type Tutorial = { cat: SupportCategory; title: string; duration: string; steps: string[] };

export const TUTORIALS: Tutorial[] = [
  { cat: "cuenta", title: "Crea tu cuenta y configura tu perfil", duration: "2:10", steps: ['Da clic en "Iniciar sesión" en la parte superior.', 'Elige "Crear cuenta" y llena tus datos.', "Confirma tu correo desde el enlace que te enviamos.", "Completa tu perfil con foto y teléfono."] },
  { cat: "directorio", title: "Publica tu negocio en el directorio", duration: "4:35", steps: ['Entra a tu panel y abre "Mis publicaciones".', 'Da clic en "Agregar publicación" y elige "Directorio".', "Llena nombre, categoría, horario y ubicación.", "Sube al menos 3 fotos de buena calidad.", "Envía a revisión y espera la confirmación."] },
  { cat: "clasificados", title: "Vende un artículo en clasificados", duration: "3:20", steps: ['Ve a Clasificados y da clic en "Agregar artículo".', "Escribe un título claro y el precio.", "Indica el estado del artículo y sube fotos.", "Elige si te contactan por llamada o WhatsApp."] },
  { cat: "clasificados", title: "Edita, renueva o archiva tus publicaciones", duration: "2:45", steps: ['Abre "Mis publicaciones" en tu panel.', "Filtra por tipo: directorio o clasificados.", "Usa el menú de cada publicación para editar, renovar o archivar."] },
  { cat: "publicidad", title: "Contrata un espacio publicitario", duration: "3:50", steps: ["Visita la página de Publicidad.", "Elige el espacio y la duración.", "Envía tu solicitud de cotización.", "Sube tu arte cuando un asesor lo apruebe."] },
  { cat: "publicidad", title: "Lee las estadísticas de tu anuncio", duration: "2:30", steps: ['Abre la pestaña "Publicidad" en tu panel.', "Selecciona el contrato que quieres revisar.", "Revisa vistas, clics y fechas de vigencia."] },
];

export type SupportFile = { cat: SupportCategory; ext: string; title: string; desc: string; size: string; date: string };

export const FILES: SupportFile[] = [
  { cat: "cuenta", ext: "PDF", title: "Guía de inicio rápido", desc: "Todo lo básico para empezar a usar la plataforma.", size: "1.2 MB", date: "ago 2026" },
  { cat: "directorio", ext: "PDF", title: "Manual para negocios del directorio", desc: "Cómo crear una ficha atractiva, fotos recomendadas y horarios.", size: "3.4 MB", date: "sep 2026" },
  { cat: "clasificados", ext: "PDF", title: "Guía visual de clasificados", desc: "Paso a paso con capturas de pantalla para publicar y administrar.", size: "2.1 MB", date: "sep 2026" },
  { cat: "publicidad", ext: "PDF", title: "Medidas y formatos publicitarios", desc: "Tamaños, formatos y especificaciones de cada espacio.", size: "860 KB", date: "jul 2026" },
  { cat: "publicidad", ext: "ZIP", title: "Plantillas de banners", desc: "Archivos editables para preparar tu anuncio.", size: "14 MB", date: "jul 2026" },
  { cat: "pagos", ext: "PDF", title: "Métodos de pago y facturación", desc: "Formas de pago aceptadas y cómo solicitar factura.", size: "640 KB", date: "jun 2026" },
];

export const QUICK_REPLIES = ["No puedo iniciar sesión", "Mi negocio no aparece", "Necesito mi factura"];

export type CannedReply = { keywords: string[]; reply: string };

export const CANNED_REPLIES: CannedReply[] = [
  { keywords: ["sesion", "contrasena", "login"], reply: 'Entiendo. Intenta restablecer tu contraseña desde "¿Olvidaste tu contraseña?". Si no te llega el correo, compárteme el correo con el que te registraste y lo reviso.' },
  { keywords: ["negocio", "aparece", "directorio"], reply: "Las fichas nuevas tardan de 24 a 48 horas en aprobarse. ¿Me compartes el nombre del negocio para revisar su estado?" },
  { keywords: ["factura", "pago", "cfdi"], reply: "Con gusto. Envíame tu RFC, razón social, uso de CFDI y el número de contrato, y te la mandamos en máximo 72 horas." },
  { keywords: ["clasificado", "vender", "articulo"], reply: 'Puedes publicar desde Clasificados → "Agregar artículo". En la pestaña Tutoriales hay un video paso a paso. ¿Te ayudo con algo en específico?' },
];
