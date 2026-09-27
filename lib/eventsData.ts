export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const WEEKDAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export type EventItem = {
  id: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  name: string;
  place: string;
  category: string;
  description: string;
  cost: string;
  organizers: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  website: string;
  featured: boolean;
};

export const EVENT_CATEGORIES = ["Cultural", "Deportivo", "Gastronomía", "Comunidad", "Entretenimiento"];
