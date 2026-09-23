"use client";

import { useRef, useState } from "react";
import { GALLERY_FILTERS } from "@/lib/galleryData";

const CATEGORIES = GALLERY_FILTERS.filter((c) => c !== "Todas");

type UploadPhotoModalProps = {
  onClose: () => void;
  onUpload: (file: File, values: { caption: string; category: string; tall: boolean }) => Promise<void>;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function UploadPhotoModal({ onClose, onUpload }: UploadPhotoModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tall, setTall] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Selecciona una foto para subir.");
      return;
    }
    setError("");
    setUploading(true);
    await onUpload(file, { caption, category, tall });
    setUploading(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 440, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Subir foto a la galería</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Foto</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            style={{ fontSize: 13, fontFamily: "inherit" }}
          />
          {fileName && <span style={{ fontSize: 12, color: "#7FA7AA" }}>{fileName}</span>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" placeholder="Ej. Atardecer en bahía San Carlos" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, background: "#ffffff" }}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
          <input type="checkbox" checked={tall} onChange={(e) => setTall(e.target.checked)} />
          Foto vertical (ocupa el doble de alto en la cuadrícula)
        </label>

        {error && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: uploading ? "default" : "pointer", opacity: uploading ? 0.6 : 1 }}
          >
            {uploading ? "Subiendo…" : "Subir foto"}
          </button>
        </div>
      </div>
    </div>
  );
}
