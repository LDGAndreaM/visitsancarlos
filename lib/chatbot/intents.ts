import { normalize } from "@/lib/soporteUtils";
import { fetchApprovedBusinesses } from "@/lib/supabase/businesses";
import { fetchApprovedClasificados } from "@/lib/supabase/classifieds";
import { fetchApprovedEvents } from "@/lib/supabase/events";
import { fetchWeatherSummary } from "@/lib/chatbot/weather";
import { CANNED_REPLIES, FALLBACK_REPLY } from "@/lib/chatbot/chatbotData";
import type { BusinessCategory } from "@/lib/directorioData";
import type { ClasificadoCategory } from "@/lib/clasificadosData";

export type ChatReply = { text: string; links?: { label: string; href: string }[] };

const WEATHER_WORDS = ["clima", "temperatura", "pronostico", "hace calor", "hace frio", "va a llover", "lluvia", "esta nublado"];
const TIDE_WORDS = ["marea", "mareas"];
const EVENT_WORDS = ["evento", "eventos", "que hacer", "actividades", "concierto", "festival"];
const CLASIFICADOS_WORDS = ["clasificado", "clasificados", "se vende", "empleo", "vacante", "trabajo"];

const DIRECTORIO_CATEGORY_WORDS: Record<BusinessCategory, string[]> = {
  RESTAURANTES: ["restaurante", "restaurantes", "donde comer", "comida", "antojo", "cenar", "desayunar", "almorzar"],
  HOTELES: ["hotel", "hoteles", "hospedaje", "donde quedarme", "donde dormir", "airbnb", "cabanas"],
  DOCTORES: ["doctor", "doctores", "medico", "clinica", "hospital", "dentista", "farmacia"],
  NEGOCIOS: ["negocio", "negocios", "tienda", "tiendas", "servicio", "servicios"],
  CLASIFICADOS: [],
};

// Tipos de comida frecuentes: si aparecen, se busca en Restaurantes aunque no
// se haya dicho la palabra "restaurante".
const CUISINE_WORDS = [
  "china",
  "mexicana",
  "italiana",
  "mariscos",
  "pizza",
  "tacos",
  "sushi",
  "japonesa",
  "hamburguesas",
  "cafe",
  "cafeteria",
  "postres",
  "panaderia",
  "vegana",
  "vegetariana",
  "pollo",
  "birria",
  "mariscos",
  "parrilla",
  "buffet",
];

const CLASIFICADOS_CATEGORY_WORDS: Record<ClasificadoCategory, string[]> = {
  Autos: ["auto", "autos", "carro", "carros", "coche"],
  "Renta de casas": ["renta de casa", "renta de depa", "renta de departamento", "casa en renta", "departamento en renta"],
  "Venta de propiedades": ["casa en venta", "venta de casa", "propiedad", "terreno"],
  Empleos: ["empleo", "empleos", "vacante", "trabajo"],
  "Ropa y accesorios": ["ropa", "accesorios", "zapatos"],
  "Servicio comunitario": ["servicio comunitario", "voluntariado", "donacion"],
  "Otros productos": ["producto", "productos", "se vende"],
};

function includesAny(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(normalize(w)));
}

function findDirectorioCategory(text: string): BusinessCategory | null {
  for (const [category, words] of Object.entries(DIRECTORIO_CATEGORY_WORDS)) {
    if (words.length && includesAny(text, words)) return category as BusinessCategory;
  }
  if (includesAny(text, CUISINE_WORDS)) return "RESTAURANTES";
  return null;
}

function findCuisineWord(text: string): string | null {
  return CUISINE_WORDS.find((w) => text.includes(normalize(w))) ?? null;
}

function findClasificadoCategory(text: string): ClasificadoCategory | null {
  for (const [category, words] of Object.entries(CLASIFICADOS_CATEGORY_WORDS)) {
    if (includesAny(text, words)) return category as ClasificadoCategory;
  }
  return null;
}

async function replyDirectorio(text: string): Promise<ChatReply> {
  const category = findDirectorioCategory(text);
  const cuisine = findCuisineWord(text);

  let all;
  try {
    all = await fetchApprovedBusinesses();
  } catch {
    return { text: "No pude consultar el directorio en este momento. Puedes revisarlo directamente aquí:", links: [{ label: "Ir al Directorio", href: "/directorio" }] };
  }

  let matches = category ? all.filter((b) => b.category === category) : all;
  if (cuisine) {
    const k = normalize(cuisine);
    matches = matches.filter((b) => normalize(b.name).includes(k) || normalize(b.description ?? "").includes(k) || (b.features ?? []).some((f) => normalize(f).includes(k)));
  }

  const label = category ? category.charAt(0) + category.slice(1).toLowerCase() : "negocios";
  if (matches.length === 0) {
    return {
      text: cuisine
        ? `No encontré negocios con "${cuisine}" en el directorio todavía. Puedes ver todo el directorio de ${label.toLowerCase()} aquí:`
        : `No encontré resultados para eso en el directorio. Échale un vistazo completo aquí:`,
      links: [{ label: "Ir al Directorio", href: "/directorio" }],
    };
  }

  const top = matches.slice(0, 5);
  return {
    text: `Esto encontré en ${label}${cuisine ? ` (${cuisine})` : ""}:`,
    links: top.map((b) => ({ label: `${b.name} — ${b.location || "San Carlos"}`, href: `/directorio/${b.id}` })),
  };
}

async function replyClasificados(text: string): Promise<ChatReply> {
  const category = findClasificadoCategory(text);

  let all;
  try {
    all = await fetchApprovedClasificados();
  } catch {
    return { text: "No pude consultar los clasificados en este momento. Puedes revisarlos directamente aquí:", links: [{ label: "Ver Clasificados", href: "/clasificados" }] };
  }

  const matches = category ? all.filter((c) => c.category === category) : all;

  if (matches.length === 0) {
    return { text: "No encontré clasificados en esa categoría por ahora. Puedes ver todos aquí:", links: [{ label: "Ver Clasificados", href: "/clasificados" }] };
  }

  const top = matches.slice(0, 5);
  return {
    text: `Esto encontré en Clasificados${category ? ` (${category})` : ""}:`,
    links: top.map((c) => ({ label: `${c.title} — $${c.price.toLocaleString("es-MX")}`, href: `/clasificados/${c.id}` })),
  };
}

async function replyEventos(text: string): Promise<ChatReply> {
  let all;
  try {
    all = await fetchApprovedEvents();
  } catch {
    return { text: "No pude consultar los eventos en este momento. Puedes revisar el calendario directamente aquí:", links: [{ label: "Ver Eventos", href: "/eventos" }] };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSoon = includesAny(text, ["esta semana", "finde", "fin de semana", "hoy"]);
  const horizonDays = includesAny(text, ["hoy"]) ? 1 : isSoon ? 7 : 30;
  const limitDate = new Date(today);
  limitDate.setDate(limitDate.getDate() + horizonDays);

  const upcoming = all
    .filter((e) => {
      const d = new Date(e.date);
      return !Number.isNaN(d.getTime()) && d >= today && d <= limitDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) {
    return { text: "No encontré eventos próximos en ese rango. Puedes ver el calendario completo aquí:", links: [{ label: "Ver Eventos", href: "/eventos" }] };
  }

  const top = upcoming.slice(0, 5);
  return {
    text: "Estos son los próximos eventos:",
    links: top.map((e) => ({ label: `${e.name} — ${new Date(e.date).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}`, href: "/eventos" })),
  };
}

function replyFaq(text: string): ChatReply | null {
  const hit = CANNED_REPLIES.find((r) => r.keywords.some((k) => text.includes(normalize(k))));
  return hit ? { text: hit.reply } : null;
}

export async function resolveChatReply(rawMessage: string): Promise<ChatReply> {
  const text = normalize(rawMessage);

  if (includesAny(text, WEATHER_WORDS)) {
    return { text: await fetchWeatherSummary() };
  }

  if (includesAny(text, TIDE_WORDS)) {
    return { text: "Aquí puedes ver la tabla de mareas completa para Guaymas / San Carlos:", links: [{ label: "Tabla de mareas", href: "https://tablademareas.com/mx/sonora/guaymas" }] };
  }

  // Preguntas de "cómo hago X" (procedimiento) van antes que las búsquedas
  // en base de datos, para que "cómo publico un clasificado" no se confunda
  // con "quiero ver clasificados de autos".
  const faq = replyFaq(text);
  if (faq) return faq;

  if (includesAny(text, EVENT_WORDS)) {
    return replyEventos(text);
  }

  if (includesAny(text, CLASIFICADOS_WORDS)) {
    return replyClasificados(text);
  }

  if (findDirectorioCategory(text)) {
    return replyDirectorio(text);
  }

  return { text: FALLBACK_REPLY };
}
