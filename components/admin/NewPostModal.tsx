"use client";

import { useState } from "react";

type NewPostModalProps = {
  onClose: () => void;
  onSave: (draft: { title: string; author: string }) => void;
};

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };
const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "#143840" };
const inputStyle: React.CSSProperties = { border: "1px solid #E2ECED", outline: "none", borderRadius: 10, padding: "11px 14px", fontSize: 14, fontFamily: "inherit" };

export default function NewPostModal({ onClose, onSave }: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Equipo Visit San Carlos");

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,56,64,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#ffffff", borderRadius: 20, padding: 32, maxWidth: 440, width: "100%", display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 50px rgba(0,0,0,0.25)" }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#143840" }}>Nueva entrada de blog</h3>
        <div style={fieldStyle}>
          <label style={labelStyle}>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Ej. 5 playas imperdibles en San Carlos" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Autor</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" style={inputStyle} />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button onClick={onClose} style={{ border: "2px solid #E2ECED", background: "#ffffff", color: "#5C7679", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}>
            Cancelar
          </button>
          <button
            onClick={() => onSave({ title, author })}
            style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 10, cursor: "pointer" }}
          >
            Guardar borrador
          </button>
        </div>
      </div>
    </div>
  );
}
