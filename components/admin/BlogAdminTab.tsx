import type { AdminBlogPost } from "@/lib/adminData";

const gridCols = "2fr 1.2fr 1fr 1fr 1.2fr";

type BlogAdminTabProps = {
  posts: AdminBlogPost[];
  onOpenNewPost: () => void;
  onTogglePublish: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function BlogAdminTab({ posts, onOpenNewPost, onTogglePublish, onDelete }: BlogAdminTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onOpenNewPost} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Nueva entrada
        </button>
      </div>
      <div style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: gridCols, padding: "14px 20px", background: "#F4FAFB", fontSize: 12, fontWeight: 700, color: "#5C7679" }}>
          <span>Título</span>
          <span>Autor</span>
          <span>Fecha</span>
          <span>Estado</span>
          <span />
        </div>
        {posts.map((p) => {
          const published = p.status === "Publicado";
          return (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: gridCols, alignItems: "center", padding: "14px 20px", borderTop: "1px solid #EEF3F3" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#143840" }}>{p.title}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{p.author}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{p.date}</span>
              <span
                style={{ fontSize: 12, fontWeight: 700, color: published ? "#009BA4" : "#5C7679", background: published ? "#E5F6F7" : "#EEF3F3", padding: "5px 12px", borderRadius: 999, width: "fit-content" }}
              >
                {p.status}
              </span>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button
                  onClick={() => onTogglePublish(p.id)}
                  style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 12, padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
                >
                  {published ? "Despublicar" : "Publicar"}
                </button>
                <button onClick={() => onDelete(p.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
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
