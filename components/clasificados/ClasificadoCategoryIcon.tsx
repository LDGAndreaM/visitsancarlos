import type { ClasificadoCategory } from "@/lib/clasificadosData";

export default function ClasificadoCategoryIcon({ category }: { category: ClasificadoCategory }) {
  const common = { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none", style: { flexShrink: 0, color: "#009BA4" } } as const;
  switch (category) {
    case "Autos":
      return (
        <svg {...common}>
          <path d="M2 11l1.5-5h11L16 11" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
          <rect x="1.5" y="11" width="15" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="5" cy="14.5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="13" cy="14.5" r="1.3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "Renta de casas":
      return (
        <svg {...common}>
          <path d="M2 9l7-6 7 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
          <path d="M4 8v7h10V8" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <rect x="7.5" y="11" width="3" height="4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "Venta de propiedades":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="14" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 8h14" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 4v-2h6v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "Empleos":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6.5 6V4.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V6" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M2 10.5h14" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "Ropa y accesorios":
      return (
        <svg {...common}>
          <path d="M6.5 2.5L9 4.5l2.5-2 3 2.5-2 2.5v9H5.5v-9l-2-2.5 3-2.5z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        </svg>
      );
    case "Servicio comunitario":
      return (
        <svg {...common}>
          <path
            d="M9 15.5s-6-3.7-6-8.2C3 4.8 4.8 3 7 3c1.2 0 2.3.6 3 1.5C10.7 3.6 11.8 3 13 3c2.2 0 4 1.8 4 4.3 0 4.5-6 8.2-6 8.2z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Otros productos":
      return (
        <svg {...common}>
          <rect x="2.5" y="2.5" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9.5" y="2.5" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2.5" y="9.5" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9.5" y="9.5" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}
