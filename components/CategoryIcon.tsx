export type CategoryKey =
  | "bares"
  | "arte"
  | "belleza"
  | "comida"
  | "entretenimiento"
  | "farmacias"
  | "gimnasios"
  | "hospedaje"
  | "salud"
  | "tienda";

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "bares", label: "Antros y bares" },
  { key: "arte", label: "Arte e Historia" },
  { key: "belleza", label: "Belleza" },
  { key: "comida", label: "Comida y bebida" },
  { key: "entretenimiento", label: "Entretenimiento" },
  { key: "farmacias", label: "Farmacias" },
  { key: "gimnasios", label: "Gimnasios" },
  { key: "hospedaje", label: "Hospedaje" },
  { key: "salud", label: "Salud" },
  { key: "tienda", label: "Tienda" },
];

export default function CategoryIcon({ category }: { category: CategoryKey }) {
  const common = { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none", style: { flexShrink: 0, color: "#009BA4" } } as const;
  switch (category) {
    case "bares":
      return (
        <svg {...common}>
          <polygon points="4,3 14,3 10,10 8,10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <line x1="9" y1="10" x2="9" y2="15" stroke="currentColor" strokeWidth="1.6" />
          <line x1="6" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "arte":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="12" height="2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="3" y="14" width="12" height="2" stroke="currentColor" strokeWidth="1.4" />
          <line x1="5" y1="7" x2="5" y2="13" stroke="currentColor" strokeWidth="1.4" />
          <line x1="9" y1="7" x2="9" y2="13" stroke="currentColor" strokeWidth="1.4" />
          <line x1="13" y1="7" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "belleza":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="4" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="14" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="4" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="14" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "comida":
      return (
        <svg {...common}>
          <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" strokeWidth="1.4" />
          <line x1="4.5" y1="3" x2="4.5" y2="7" stroke="currentColor" strokeWidth="1.4" />
          <line x1="7.5" y1="3" x2="7.5" y2="7" stroke="currentColor" strokeWidth="1.4" />
          <path d="M12 3c-1.5 1.5-1.5 4.5 0 6v6" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "entretenimiento":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <line x1="9" y1="5" x2="9" y2="13" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" />
        </svg>
      );
    case "farmacias":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <line x1="9" y1="6" x2="9" y2="12" stroke="currentColor" strokeWidth="1.4" />
          <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "gimnasios":
      return (
        <svg {...common}>
          <line x1="4" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.6" />
          <rect x="2" y="6" width="3" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="13" y="6" width="3" height="6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "hospedaje":
      return (
        <svg {...common}>
          <rect x="2" y="10" width="14" height="4" stroke="currentColor" strokeWidth="1.4" />
          <rect x="3" y="6" width="4" height="4" stroke="currentColor" strokeWidth="1.4" />
          <line x1="2" y1="14" x2="2" y2="16" stroke="currentColor" strokeWidth="1.4" />
          <line x1="16" y1="14" x2="16" y2="16" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "salud":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
          <line x1="9" y1="6" x2="9" y2="12" stroke="currentColor" strokeWidth="1.4" />
          <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "tienda":
      return (
        <svg {...common}>
          <path d="M6 6a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <rect x="3" y="6" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}
