import { ADMIN_BUSINESS_CATEGORIES, BUSINESS_STATUS_COLORS, type AdminBusiness } from "@/lib/adminData";

const gridCols = "1.6fr 1.1fr 0.9fr 0.9fr 0.6fr 1.8fr";

type DirectorioAdminTabProps = {
  businesses: AdminBusiness[];
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  onToggleFeatured: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function DirectorioAdminTab({ businesses, search, onSearchChange, category, onCategoryChange, onToggleFeatured, onEdit, onArchive, onRemove }: DirectorioAdminTabProps) {
  const filtered = businesses.filter((b) => (category === "Todas" || b.category === category) && b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          placeholder="Buscar negocio..."
          style={{ flex: 1, minWidth: 200, border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 13, fontFamily: "inherit" }}
        />
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)} style={{ border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 13, background: "#ffffff", fontFamily: "inherit" }}>
          {ADMIN_BUSINESS_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "Todas" ? "Todas las categorías" : c}
            </option>
          ))}
        </select>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Negocio</span>
          <span>Dueño</span>
          <span>Categoría</span>
          <span>Estado</span>
          <span>⭐</span>
          <span />
        </div>
        {filtered.map((biz) => {
          const [statusColor, statusBg] = BUSINESS_STATUS_COLORS[biz.status];
          return (
            <div key={biz.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{biz.owner}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{biz.category}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: statusBg, padding: "5px 12px", borderRadius: 999, width: "fit-content" }}>{biz.status}</span>
              <button onClick={() => onToggleFeatured(biz.id)} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", width: "fit-content" }}>
                {biz.featured ? "⭐" : "☆"}
              </button>
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button onClick={() => onEdit(biz.id)} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 12, padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
                  Editar
                </button>
                <button onClick={() => onArchive(biz.id)} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 12, padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}>
                  {biz.status === "Archivado" ? "Reactivar" : "Archivar"}
                </button>
                <button onClick={() => onRemove(biz.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
