import type { BusinessCategory } from "@/lib/directorioData";

export default function BizCategoryIcon({ category }: { category: BusinessCategory }) {
  const common = { width: 13, height: 13, viewBox: "0 0 18 18", fill: "none" } as const;
  switch (category) {
    case "HOTELES":
      return (
        <svg {...common}>
          <rect x="2" y="10" width="14" height="4" stroke="#009BA4" strokeWidth="1.4" />
          <rect x="3" y="6" width="4" height="4" stroke="#009BA4" strokeWidth="1.4" />
        </svg>
      );
    case "RESTAURANTES":
      return (
        <svg {...common}>
          <line x1="6" y1="3" x2="6" y2="15" stroke="#009BA4" strokeWidth="1.4" />
          <line x1="12" y1="3" x2="12" y2="15" stroke="#009BA4" strokeWidth="1.4" />
        </svg>
      );
    case "DOCTORES":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="7" stroke="#009BA4" strokeWidth="1.4" />
          <line x1="9" y1="6" x2="9" y2="12" stroke="#009BA4" strokeWidth="1.4" />
          <line x1="6" y1="9" x2="12" y2="9" stroke="#009BA4" strokeWidth="1.4" />
        </svg>
      );
    case "NEGOCIOS":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="12" height="8" rx="1" stroke="#009BA4" strokeWidth="1.4" />
          <path d="M6 6V4h6v2" stroke="#009BA4" strokeWidth="1.4" fill="none" />
        </svg>
      );
    case "CLASIFICADOS":
      return (
        <svg {...common}>
          <path d="M3 9l6-6h6v6l-6 6z" stroke="#009BA4" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        </svg>
      );
  }
}
