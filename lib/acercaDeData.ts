export type FaqItem = { id: string; q: string; a: string };

export const FAQ_SOBRE: FaqItem[] = [
  { id: "s1", q: "¿Qué es Visit San Carlos?", a: "Es una plataforma digital que reúne negocios, eventos, blog y toda la información útil de San Carlos y Guaymas en un solo lugar." },
  { id: "s2", q: "¿Visit San Carlos es una agencia de viajes?", a: "No. Somos una guía y directorio digital: te conectamos directamente con los negocios y servicios locales." },
  { id: "s3", q: "¿La información del sitio es confiable?", a: "Sí, trabajamos directamente con los negocios y verificamos la información antes de publicarla." },
  { id: "s4", q: "¿Cómo funciona la plataforma?", a: "Navega por categorías o usa el buscador para encontrar negocios, eventos y contenido del blog de San Carlos y Guaymas." },
  { id: "s5", q: "¿Qué tipo de contenido puedo encontrar en Visit San Carlos?", a: "Directorio de negocios, calendario de eventos, blog con guías locales, galería y tabla de mareas." },
  { id: "s6", q: "¿Puedo sugerir mejoras o reportar información incorrecta?", a: "Claro, puedes escribirnos desde la página de Contacto o por redes sociales." },
];

export const FAQ_DIRECTORIO: FaqItem[] = [
  { id: "d1", q: "¿Cómo puedo agregar mi negocio al directorio?", a: 'Desde el botón "Agregar negocio" llenas un formulario breve y tu perfil queda publicado sin costo.' },
  { id: "d2", q: "¿Mi negocio necesita estar en San Carlos para aparecer en el sitio?", a: "No, también incluimos negocios de Guaymas y alrededores." },
  { id: "d3", q: "¿Cuánto cuesta aparecer en el sitio?", a: "Aparecer en el directorio es gratis; solo los espacios publicitarios destacados tienen costo." },
  { id: "d4", q: "¿Qué incluye un perfil de negocio?", a: "Fotos, descripción, ubicación, horarios, contacto, redes sociales y rango de precios." },
  { id: "d5", q: "¿Puedo actualizar mi información cuando quiera?", a: "Sí, desde tu panel de negocio puedes editar tu perfil en cualquier momento." },
  { id: "d6", q: "¿Qué opciones de publicidad tienen?", a: "Banners en Home, carruseles patrocinados y paquetes combinados con redes sociales." },
];

export const FAQ_EVENTOS: FaqItem[] = [
  { id: "e1", q: "¿Cómo puedo agregar un evento al calendario?", a: "Desde tu panel de negocio o escribiéndonos directamente con los detalles del evento." },
  { id: "e2", q: "¿Tiene costo publicar un evento?", a: "Publicar un evento comunitario básico es gratuito; promociones destacadas tienen costo." },
  { id: "e3", q: "¿Qué tipo de eventos aceptan?", a: "Festivales, deportivos, culturales, ferias y actividades comunitarias de la región." },
  { id: "e4", q: "¿Puedo reservar directamente desde Visit San Carlos?", a: "Por ahora te conectamos con el negocio vía teléfono, web o redes para reservar." },
  { id: "e5", q: "¿Los precios mostrados en hoteles o restaurantes son exactos?", a: "Son de referencia; siempre confirma el precio final directamente con el negocio." },
  { id: "e6", q: "¿Cómo se calcula el ranking de estrellas?", a: "Con base en reseñas y calificaciones de visitantes en la plataforma." },
];

export const FAQ_SUSCRIPCIONES: FaqItem[] = [
  { id: "n1", q: "¿Cómo me suscribo al newsletter?", a: "Ingresa tu correo en el banner de suscripción al final del sitio." },
  { id: "n2", q: "¿Necesito crear una cuenta para usar el sitio?", a: "No, solo los negocios necesitan cuenta para gestionar su perfil y publicidad." },
  { id: "n3", q: "¿Cómo puedo contactarlos?", a: "Por correo, teléfono o el formulario de la página de Contacto." },
  { id: "n4", q: "¿Tienen redes sociales?", a: "Sí, síguenos en Facebook, Instagram, Twitter y LinkedIn." },
  { id: "n5", q: "¿Cómo reporto un error, una foto incorrecta o un link roto?", a: "Escríbenos por Contacto o Soporte con el detalle y lo corregimos lo antes posible." },
];

export const FAQ_COLUMNS = [
  { title: "SOBRE VISIT SAN CARLOS", items: FAQ_SOBRE },
  { title: "DIRECTORIO, NEGOCIOS Y PUBLICIDAD", items: FAQ_DIRECTORIO },
  { title: "EVENTOS, RESTAURANTES Y HOSPEDAJE", items: FAQ_EVENTOS },
  { title: "SUSCRIPCIONES, USABILIDAD Y CONTACTO", items: FAQ_SUSCRIPCIONES },
];

export const VALUES = [
  {
    icon: "/uploads/heart-partner-handshake.svg",
    title: "Honestidad",
    desc: "Recomendamos lo que conocemos, lo que vale la pena y lo que realmente disfrutarías.",
  },
  {
    icon: "/uploads/hr-group.svg",
    title: "Amor por lo local",
    desc: "Apoyamos a pequeños negocios, emprendedores y talento regional.",
  },
  {
    icon: "/uploads/people-roof.svg",
    title: "Hospitalidad",
    desc: "Queremos que todos se sientan como en casa… con mar, ceviche y buena vibra.",
  },
  {
    icon: "/uploads/task-checklist.svg",
    title: "Responsabilidad",
    desc: "Cuidamos la naturaleza, respetamos el mar y promovemos el turismo consciente.",
  },
  {
    icon: "/uploads/Recurso-1.svg",
    title: "Calidad & autenticidad",
    desc: "Nada de contenido genérico: todo es local, real y hecho con cariño.",
  },
];

export const OFRECEMOS_ITEMS = [
  "Directorio de negocios: restaurantes, cafés, bares, hoteles, rentas vacacionales, tours, salones de eventos, servicios médicos y más.",
  "Blog y guías locales: qué hacer, qué comer, qué llevar, mejores playas, miradores y rutas.",
  "Calendario de eventos: festivales, conciertos, eventos deportivos, ferias y actividades comunitarias.",
  "Publicidad local: espacios para que negocios se den a conocer (desde planes básicos hasta apariciones destacadas).",
  "Colaboraciones con influencers, fotógrafos y viajeros.",
];

export const POR_QUE_EXISTE_ITEMS = [
  "Ser la guía para el turista.",
  "Dar visibilidad a los negocios locales.",
  "Promover el turismo responsable y el amor por nuestra comunidad.",
];
