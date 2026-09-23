import type { GalleryPhotoView } from "@/lib/supabase/gallery";

type GaleriaAdminTabProps = {
  photos: GalleryPhotoView[];
  onOpenUpload: () => void;
  onDelete: (id: string) => void;
};

export default function GaleriaAdminTab({ photos, onOpenUpload, onDelete }: GaleriaAdminTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onOpenUpload} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "10px 18px", borderRadius: 10, cursor: "pointer" }}>
          + Subir foto
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ background: "#ffffff", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,60,66,0.06)" }}>
            <div style={{ height: 140 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#143840" }}>{photo.caption || "Sin descripción"}</span>
              <span style={{ fontSize: 11, color: "#7FA7AA" }}>{photo.category}</span>
              <button onClick={() => onDelete(photo.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer", alignSelf: "flex-start", padding: 0 }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {photos.length === 0 && <p style={{ margin: 0, gridColumn: "1 / -1", padding: 24, textAlign: "center", fontSize: 13, color: "#7FA7AA" }}>Aún no hay fotos en la galería.</p>}
      </div>
    </div>
  );
}
