import { CLASIFICADOS_CATEGORIES } from "@/lib/clasificadosData";
import { CLASIFICADO_STATUS_COLORS, type AdminClasificado } from "@/lib/adminData";

const gridCols = "1.6fr 1.3fr 1.1fr 0.8fr 0.9fr 1.6fr";

type ClasificadosAdminTabProps = {
  items: AdminClasificado[];
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  onOpenAdd: () => void;
  onArchive: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function ClasificadosAdminTab({ items, search, onSearchChange, category, onCategoryChange, onOpenAdd, onArchive, onRemove }: ClasificadosAdminTabProps) {
  const filtered = items.filter((it) => (category === "Todas" || it.category === category) && it.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flex: 1 }}>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            placeholder="Buscar artículo..."
            style={{ flex: 1, minWidth: 200, border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 13, fontFamily: "inherit" }}
          />
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)} style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 13, background: "#ffffff", fontFamily: "inherit" }}>
            <option value="Todas">Todas las categorías</option>
            {CLASIFICADOS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button onClick={onOpenAdd} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}>
          + Nuevo clasificado
        </button>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Artículo</span>
          <span>Dueño</span>
          <span>Categoría</span>
          <span>Precio</span>
          <span>Estado</span>
          <span />
        </div>
        {filtered.map((it) => {
          const [statusColor, statusBg] = CLASIFICADO_STATUS_COLORS[it.status];
          return (
            <div key={it.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{it.title}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{it.owner}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{it.category}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>${it.price.toLocaleString("es-MX")}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: statusBg, padding: "5px 12px", borderRadius: 999, width: "fit-content" }}>{it.status}</span>
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button onClick={() => onArchive(it.id)} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 12, padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
                  {it.status === "Archivado" ? "Reactivar" : "Archivar"}
                </button>
                <button onClick={() => onRemove(it.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p style={{ margin: 0, padding: 24, textAlign: "center", fontSize: 13, color: "#7FA7AA" }}>No hay clasificados que coincidan.</p>}
      </div>
    </div>
  );
}
