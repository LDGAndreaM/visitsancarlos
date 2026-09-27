"use client";

import { useState } from "react";
import { GALLERY_FILTERS } from "@/lib/galleryData";
import type { GalleryPhotoView } from "@/lib/supabase/gallery";

const CATEGORIES = GALLERY_FILTERS.filter((c) => c !== "Todas");

type EditPhotoModalProps = {
  photo: GalleryPhotoView;
  onClose: () => void;
  onSave: (id: string, values: { caption: string; categories: string[]; tall: boolean }) => Promise<void>;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

function categoryPillStyle(checked: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    cursor: "pointer",
    padding: "7px 12px",
    borderRadius: 999,
    border: `1.5px solid ${checked ? "#009BA4" : "#E2ECED"}`,
    background: checked ? "#E5F6F7" : "#ffffff",
    color: checked ? "#009BA4" : "#3B5C61",
    fontWeight: checked ? 700 : 600,
  };
}

export default function EditPhotoModal({ photo, onClose, onSave }: EditPhotoModalProps) {
  const [caption, setCaption] = useState(photo.caption);
  const [categories, setCategories] = useState<string[]>(photo.categories);
  const [tall, setTall] = useState(photo.tall);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toggleCategory = (c: string) => {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const handleSave = async () => {
    if (categories.length === 0) {
      setError("Elige al menos una categoría.");
      return;
    }
    setError("");
    setSaving(true);
    await onSave(photo.id, { caption, categories, tall });
    setSaving(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 440, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Editar foto</h3>

        <div style={{ position: "relative", width: "100%", height: 160, borderRadius: 14, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.url} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" placeholder="Ej. Atardecer en bahía San Carlos" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categorías (elige una o varias)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((c) => {
              const checked = categories.includes(c);
              return (
                <label key={c} style={categoryPillStyle(checked)}>
                  <input type="checkbox" checked={checked} onChange={() => toggleCategory(c)} style={{ display: "none" }} />
                  {c}
                </label>
              );
            })}
          </div>
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
            onClick={handleSave}
            disabled={saving}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
