export const QUICK_SUGGESTIONS = ["Restaurantes en San Carlos", "¿Cómo está el clima?", "Eventos esta semana", "¿Cómo publico un clasificado?"];

export type CannedReply = { keywords: string[]; reply: string };

// Preguntas frecuentes preestablecidas (independientes de la base de datos).
// Las de "cómo agrego/publico un negocio, clasificado o evento" viven en
// intents.ts (matchHowToPublish), donde se detectan de forma más flexible
// combinando un verbo de acción con el tema, en vez de frases exactas.
export const CANNED_REPLIES: CannedReply[] = [
  { keywords: ["sesion", "contrasena", "login"], reply: 'Intenta restablecer tu contraseña desde "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión. Si el problema sigue, escríbenos desde la página de Contacto.' },
  { keywords: ["negocio no aparece", "aprobar mi negocio", "cuanto tarda mi negocio"], reply: "Las fichas nuevas del Directorio tardan de 24 a 48 horas en aprobarse. Si ya pasó ese tiempo, escríbenos desde Contacto con el nombre de tu negocio." },
  { keywords: ["factura", "cfdi"], reply: "Para tu factura escríbenos a hola@visitsancarlos.com.mx con tu RFC, razón social, uso de CFDI y el número de contrato." },
  { keywords: ["que es visit san carlos", "quienes son"], reply: "Visit San Carlos es una guía digital de San Carlos y Guaymas: directorio de negocios, clasificados, eventos, blog y galería, todo en un solo lugar. Puedes leer más en la página Acerca de." },
];

export const FALLBACK_REPLY =
  "No estoy seguro de haber entendido eso. Puedo ayudarte con negocios del directorio (restaurantes, hoteles, doctores...), clasificados, eventos, el clima, o dudas sobre el sitio. También puedes escribirnos desde la página de Contacto.";

export const GREETING =
  "¡Hola! 👋 Soy el asistente de Visit San Carlos. Puedo recomendarte negocios, avisarte del clima o los próximos eventos, ayudarte con clasificados, o resolver dudas del sitio. ¿En qué te ayudo?";
