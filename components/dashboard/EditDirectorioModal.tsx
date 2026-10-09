"use client";

import { useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ListingImage from "@/components/ListingImage";
import ImageCropModal from "./ImageCropModal";
import { deleteListingImage, uploadListingImage } from "@/lib/supabase/listingUploads";
import { ALL_FEATURES, DIRECTORIO_CATEGORIES, type DirectorioListing } from "@/lib/dashboardData";

type CropField = "logo" | "photo" | "gallery";
type CropTarget = { field: CropField; file: File; previewUrl: string };

type EditDirectorioModalProps = {
  listing: DirectorioListing;
  ownerId: string;
  onClose: () => void;
  onSave: (listing: DirectorioListing) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditDirectorioModal({ listing, ownerId, onClose, onSave }: EditDirectorioModalProps) {
  const [form, setForm] = useState({
    name: listing.name,
    category: listing.category,
    location: listing.location,
    hours: listing.hours,
    phone: listing.phone,
    description: listing.description,
    priceRange: listing.priceRange,
    visibility: listing.visibility,
    features: listing.features,
  });
  const [logoUrl, setLogoUrl] = useState(listing.logoUrl);
  const [photoUrl, setPhotoUrl] = useState(listing.photoUrl);
  const [galleryUrls, setGalleryUrls] = useState(listing.galleryUrls);
  const [logoUploading, setLogoUploading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [cropTarget, setCropTarget] = useState<CropTarget | null>(null);

  const toggleFeature = (name: string) => {
    setForm((f) => ({ ...f, features: f.features.includes(name) ? f.features.filter((x) => x !== name) : [...f.features, name] }));
  };

  const pickFile = (field: CropField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (field === "gallery" && galleryUrls.length >= 10) return;
    setCropTarget({ field, file, previewUrl: URL.createObjectURL(file) });
  };

  const closeCrop = () => {
    if (cropTarget) URL.revokeObjectURL(cropTarget.previewUrl);
    setCropTarget(null);
  };

  const confirmCrop = async (blob: Blob) => {
    if (!cropTarget) return;
    const { field, file } = cropTarget;
    const croppedFile = new File([blob], file.name, { type: blob.type });
    closeCrop();

    if (field === "logo") {
      setLogoUploading(true);
      const { url } = await uploadListingImage(ownerId, "businesses", croppedFile);
      setLogoUploading(false);
      if (!url) return;
      if (logoUrl) deleteListingImage(logoUrl);
      setLogoUrl(url);
    } else if (field === "photo") {
      setPhotoUploading(true);
      const { url } = await uploadListingImage(ownerId, "businesses", croppedFile);
      setPhotoUploading(false);
      if (!url) return;
      if (photoUrl) deleteListingImage(photoUrl);
      setPhotoUrl(url);
    } else {
      setGalleryUploading(true);
      const { url } = await uploadListingImage(ownerId, "businesses", croppedFile);
      setGalleryUploading(false);
      if (!url) return;
      setGalleryUrls((prev) => [...prev, url]);
    }
  };

  const removeGalleryImage = (index: number) => {
    const url = galleryUrls[index];
    if (url) deleteListingImage(url);
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ ...listing, ...form, logoUrl, photoUrl, galleryUrls });
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 480, width: "100%", maxHeight: "88vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Establecimiento — {listing.name}</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Nombre</label>
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Categoría</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            {DIRECTORIO_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Ubicación</label>
          <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Horario</label>
          <input value={form.hours} onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))} type="text" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Teléfono</label>
          <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} type="tel" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Descripción</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Rango de precios</label>
          <select value={form.priceRange} onChange={(e) => setForm((f) => ({ ...f, priceRange: e.target.value }))} style={{ ...inputStyle, background: "#ffffff" }}>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Características</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ALL_FEATURES.map((name) => (
              <label key={name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
                <input type="checkbox" checked={form.features.includes(name)} onChange={() => toggleFeature(name)} />
                {name}
              </label>
            ))}
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Logo</label>
          <label style={{ width: 80, height: 80, borderRadius: 14, overflow: "hidden", cursor: logoUploading ? "default" : "pointer", display: "block" }}>
            <input type="file" accept="image/*" disabled={logoUploading} style={{ display: "none" }} onChange={pickFile("logo")} />
            <ListingImage src={logoUrl} caption={logoUploading ? "Subiendo…" : "Logo"} round />
          </label>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Foto principal</label>
          <label style={{ height: 120, borderRadius: 12, overflow: "hidden", cursor: photoUploading ? "default" : "pointer", display: "block" }}>
            <input type="file" accept="image/*" disabled={photoUploading} style={{ display: "none" }} onChange={pickFile("photo")} />
            <ListingImage src={photoUrl} caption={photoUploading ? "Subiendo…" : "Foto del negocio"} />
          </label>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Galería ({galleryUrls.length}/10 fotos)</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {Array.from({ length: 10 }, (_, i) => {
              const url = galleryUrls[i];
              const isNext = i === galleryUrls.length;
              return (
                <div key={i} style={{ position: "relative", height: 56, borderRadius: 8, overflow: "hidden" }}>
                  {url ? (
                    <>
                      <ListingImage src={url} caption="" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(i)}
                        style={{ position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%", border: "none", background: "rgba(20,56,64,0.75)", color: "#ffffff", fontSize: 11, lineHeight: 1, cursor: "pointer", padding: 0 }}
                      >
                        ×
                      </button>
                    </>
                  ) : isNext ? (
                    <label style={{ display: "block", width: "100%", height: "100%", cursor: galleryUploading ? "default" : "pointer" }}>
                      <input type="file" accept="image/*" disabled={galleryUploading} style={{ display: "none" }} onChange={pickFile("gallery")} />
                      <ImagePlaceholder caption={galleryUploading ? "…" : "+"} />
                    </label>
                  ) : (
                    <ImagePlaceholder caption="" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #EEF3F3", paddingTop: 14 }}>
          <label style={labelStyle}>Visibilidad</label>
          <div style={{ display: "flex", gap: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility" checked={form.visibility === "Publicado"} onChange={() => setForm((f) => ({ ...f, visibility: "Publicado" }))} />
              Publicado
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#3B5C61", cursor: "pointer" }}>
              <input type="radio" name="visibility" checked={form.visibility === "Invisible"} onChange={() => setForm((f) => ({ ...f, visibility: "Invisible" }))} />
              Invisible
            </label>
          </div>
          {listing.pendingApproval && (
            <p style={{ margin: 0, fontSize: 12, color: "#EB600A", background: "#FDEEE4", padding: "8px 12px", borderRadius: 8 }}>
              Este negocio está pendiente de aprobación por el equipo de Visit San Carlos. Una vez aprobado podrás publicarlo.
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #009BA4", background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Guardar cambios
          </button>
        </div>
      </div>
      {cropTarget && (
        <ImageCropModal
          imageSrc={cropTarget.previewUrl}
          aspect={cropTarget.field === "logo" ? 1 : 4 / 3}
          round={cropTarget.field === "logo"}
          onCancel={closeCrop}
          onConfirm={confirmCrop}
        />
      )}
    </div>
  );
}
