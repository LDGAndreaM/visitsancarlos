import ImagePlaceholder from "@/components/ImagePlaceholder";
import { GALLERY_PHOTOS } from "@/lib/galleryData";

export default function GalleryGrid() {
  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: 160, gap: 16 }}>
        {GALLERY_PHOTOS.map((photo) => (
          <div key={photo.id} style={{ gridRow: photo.tall ? "span 2" : undefined, borderRadius: 16, overflow: "hidden" }}>
            <ImagePlaceholder caption={photo.placeholder} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <button
          style={{
            background: "#ffffff",
            color: "#009BA4",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 28px",
            borderRadius: 10,
            border: "2px solid #009BA4",
            cursor: "pointer",
          }}
        >
          Cargar más fotos
        </button>
      </div>
    </section>
  );
}
