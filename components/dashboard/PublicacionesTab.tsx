import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ListingRow } from "./DashboardApp";

type ListingFilter = "todos" | "directorio" | "clasificado";

type PublicacionesTabProps = {
  listings: ListingRow[];
  filter: ListingFilter;
  onFilterChange: (filter: ListingFilter) => void;
  onAddListing: () => void;
};

const FILTERS: { key: ListingFilter; label: string }[] = [
  { key: "todos", label: "Todas" },
  { key: "directorio", label: "Directorio" },
  { key: "clasificado", label: "Clasificados" },
];

export default function PublicacionesTab({ listings, filter, onFilterChange, onAddListing }: PublicacionesTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#143840" }}>Mis publicaciones</h2>
        <button onClick={onAddListing} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Agregar publicación
        </button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              style={{
                border: `1px solid ${active ? "#009BA4" : "#E2ECED"}`,
                background: active ? "#E5F6F7" : "#ffffff",
                color: active ? "#009BA4" : "#5C7679",
                fontWeight: 700,
                fontSize: 13,
                padding: "9px 16px",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {listings.map((l) => (
        <div key={l.id} style={{ background: "#ffffff", borderRadius: 18, padding: 20, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 72, height: 72, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
            <ImagePlaceholder caption="Foto" />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{l.displayName}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: l.typeColor, background: l.typeBg, padding: "3px 10px", borderRadius: 999 }}>{l.typeLabel}</span>
            </div>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{l.subtitle}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{l.extraLine}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: l.statusColor, background: l.statusBg, padding: "5px 12px", borderRadius: 999, flexShrink: 0 }}>{l.status}</span>
          <button
            onClick={l.onEdit}
            style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}
          >
            Editar
          </button>
        </div>
      ))}
      {listings.length === 0 && (
        <div style={{ padding: "32px 20px", textAlign: "center", fontSize: 13, color: "#7FA7AA", background: "#ffffff", borderRadius: 18 }}>
          No tienes publicaciones en esta categoría todavía.
        </div>
      )}
    </div>
  );
}
