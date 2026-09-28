"use client";

import { useRef, useState } from "react";
import { AD_SLOTS, AD_SLOT_LABELS, uploadAdImage, type AdPlacement, type AdPlacementInput, type AdSlot } from "@/lib/supabase/adPlacements";

type AdPlacementModalProps = {
  ad: AdPlacement | null;
  defaultSlot?: AdSlot;
  prefill?: Partial<AdPlacementInput>;
  onClose: () => void;
  onSave: (values: AdPlacementInput) => Promise<void>;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit", background: "#ffffff" };

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function AdPlacementModal({ ad, defaultSlot, prefill, onClose, onSave }: AdPlacementModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [slot, setSlot] = useState<AdSlot>(ad?.slot ?? defaultSlot ?? prefill?.slot ?? AD_SLOTS[0]);
  const [title, setTitle] = useState(ad?.title ?? prefill?.title ?? "");
  const [subtitle, setSubtitle] = useState(ad?.subtitle ?? prefill?.subtitle ?? "");
  const [imageUrl, setImageUrl] = useState(ad?.imageUrl ?? "");
  const [fileName, setFileName] = useState("");
  const [linkUrl, setLinkUrl] = useState(ad?.linkUrl ?? prefill?.linkUrl ?? "");
  const [startsAt, setStartsAt] = useState(ad?.startsAt || prefill?.startsAt || todayIso());
  const [endsAt, setEndsAt] = useState(ad?.endsAt ?? prefill?.endsAt ?? "");
  const [active, setActive] = useState(ad?.active ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    const { url, error: uploadError } = await uploadAdImage(file);
    setUploading(false);
    if (uploadError) {
      setError(uploadError);
      return;
    }
    if (url) setImageUrl(url);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Ponle un título al anuncio.");
      return;
    }
    if (!imageUrl) {
      setError("Sube una imagen para el anuncio.");
      return;
    }
    setError("");
    setSaving(true);
    await onSave({ slot, title: title.trim(), subtitle: subtitle.trim(), imageUrl, linkUrl: linkUrl.trim(), startsAt, endsAt, active, sortOrder: ad?.sortOrder ?? 0 });
    setSaving(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 460, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>{ad ? "Editar anuncio" : "Nuevo anuncio"}</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Espacio</label>
          <select value={slot} onChange={(e) => setSlot(e.target.value as AdSlot)} style={{ ...inputStyle, color: "#143840" }}>
            {AD_SLOTS.map((s) => (
              <option key={s} value={s}>
                {AD_SLOT_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Imagen</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ fontSize: 13, fontFamily: "inherit" }} />
          {uploading && <span style={{ fontSize: 12, color: "#7FA7AA" }}>Subiendo…</span>}
          {!uploading && (fileName || imageUrl) && <span style={{ fontSize: 12, color: "#7FA7AA" }}>{fileName || "Imagen actual conservada"}</span>}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Ej. Restaurante El Marlin" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción corta (opcional)</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} type="text" placeholder="Ej. Mariscos frente al mar · $$" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Enlace al hacer clic (opcional)</label>
          <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} type="text" placeholder="/directorio/... o https://..." style={inputStyle} />
        </div>

        <div className="vsc-split-grid" style={{ gap: 14 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Empieza</label>
            <input value={startsAt} onChange={(e) => setStartsAt(e.target.value)} type="date" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Termina (opcional)</label>
            <input value={endsAt} onChange={(e) => setEndsAt(e.target.value)} type="date" style={inputStyle} />
          </div>
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Activo (visible en el sitio mientras esté dentro de las fechas)
        </label>

        {error && <p style={{ margin: 0, fontSize: 12, color: "#E23E7E", fontWeight: 600 }}>{error}</p>}

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
