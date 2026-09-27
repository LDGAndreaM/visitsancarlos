"use client";

import { useState } from "react";
import { BLOG_FILTERS } from "@/lib/blogData";
import type { AdminBlogPost } from "@/lib/adminData";
import RichTextEditor from "./RichTextEditor";
import { uploadBlogImage } from "@/lib/supabase/blogPosts";

const CATEGORIES = BLOG_FILTERS.filter((c) => c !== "Todos");

type PostValues = { title: string; category: string; excerpt: string; body: string; authorName: string; authorRole: string; authorPhotoUrl: string; authorFacebook: string; authorInstagram: string; authorWebsite: string };

type EditPostModalProps = {
  post: AdminBlogPost;
  onClose: () => void;
  onSave: (values: PostValues) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function EditPostModal({ post, onClose, onSave }: EditPostModalProps) {
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [body, setBody] = useState(post.body);
  const [authorName, setAuthorName] = useState(post.authorName);
  const [authorRole, setAuthorRole] = useState(post.authorRole);
  const [authorPhotoUrl, setAuthorPhotoUrl] = useState(post.authorPhotoUrl);
  const [authorFacebook, setAuthorFacebook] = useState(post.authorFacebook);
  const [authorInstagram, setAuthorInstagram] = useState(post.authorInstagram);
  const [authorWebsite, setAuthorWebsite] = useState(post.authorWebsite);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const handleAuthorPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingPhoto(true);
    const { url } = await uploadBlogImage(file);
    setUploadingPhoto(false);
    if (url) setAuthorPhotoUrl(url);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 680, width: "100%", maxHeight: "90vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Editar entrada — {post.title}</h3>

        <div style={fieldStyle}>
          <label style={labelStyle}>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" style={inputStyle} />
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

        <div style={fieldStyle}>
          <label style={labelStyle}>Resumen breve</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Contenido del artículo</label>
          <RichTextEditor value={body} onChange={setBody} onUploadImage={async (file) => (await uploadBlogImage(file)).url} />
        </div>

        <div style={{ borderTop: "1px solid #EEF3F3", paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#143840" }}>Datos de quien redactó el artículo</span>
          <p style={{ margin: 0, fontSize: 12, color: "#7FA7AA" }}>Déjalo vacío para usar tu nombre de cuenta. Llénalo si alguien más escribió este artículo.</p>

          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", background: "#F4FAFB", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {authorPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={authorPhotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 11, color: "#9DB6B8" }}>Foto</span>
              )}
            </div>
            <label style={{ border: "2px solid #009BA4", color: "#009BA4", fontWeight: 700, fontSize: 12, padding: "9px 14px", borderRadius: 8, cursor: "pointer" }}>
              {uploadingPhoto ? "Subiendo…" : "Subir foto"}
              <input type="file" accept="image/*" onChange={handleAuthorPhoto} style={{ display: "none" }} />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre</label>
              <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} type="text" placeholder="Equipo Visit San Carlos" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Puesto</label>
              <input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} type="text" placeholder="Ej. Redactora de contenido" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Facebook</label>
              <input value={authorFacebook} onChange={(e) => setAuthorFacebook(e.target.value)} type="url" placeholder="https://facebook.com/..." style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Instagram</label>
              <input value={authorInstagram} onChange={(e) => setAuthorInstagram(e.target.value)} type="url" placeholder="https://instagram.com/..." style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Sitio web</label>
              <input value={authorWebsite} onChange={(e) => setAuthorWebsite(e.target.value)} type="url" placeholder="https://..." style={inputStyle} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onSave({ title: title.trim(), category, excerpt: excerpt.trim(), body, authorName, authorRole, authorPhotoUrl, authorFacebook, authorInstagram, authorWebsite })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
