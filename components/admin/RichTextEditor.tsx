"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

const FONTS = [
  { label: "Predeterminada", value: "" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Sans-serif", value: "Arial, Helvetica, sans-serif" },
  { label: "Monoespaciada", value: "'Courier New', monospace" },
];

const btnStyle = (active: boolean): React.CSSProperties => ({
  border: "1px solid " + (active ? "#009BA4" : "#E2ECED"),
  background: active ? "#E5F6F7" : "#ffffff",
  color: active ? "#009BA4" : "#3B5C61",
  borderRadius: 8,
  padding: "6px 10px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: 1,
});

const selectStyle: React.CSSProperties = {
  border: "1px solid #E2ECED",
  borderRadius: 8,
  padding: "6px 8px",
  fontSize: 13,
  fontFamily: "inherit",
  background: "#ffffff",
  color: "#3B5C61",
};

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string | null>;
};

export default function RichTextEditor({ value, onChange, onUploadImage }: RichTextEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      Image.configure({ HTMLAttributes: { style: "max-width:100%;border-radius:10px;" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: "min-height:260px; padding:14px; outline:none; font-size:14px; line-height:1.6; color:#143840;",
      },
    },
  });

  if (!editor) return null;

  const handlePickImage = () => fileRef.current?.click();

  const handleImageSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const url = await onUploadImage(file);
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div style={{ border: "1px solid #E2ECED", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: 8, background: "#F4FAFB", borderBottom: "1px solid #E2ECED" }}>
        <select
          value={editor.getAttributes("textStyle").fontFamily || ""}
          onChange={(e) => (e.target.value ? editor.chain().focus().setFontFamily(e.target.value).run() : editor.chain().focus().unsetFontFamily().run())}
          style={selectStyle}
        >
          {FONTS.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          value={editor.isActive("heading", { level: 1 }) ? "1" : editor.isActive("heading", { level: 2 }) ? "2" : editor.isActive("heading", { level: 3 }) ? "3" : "p"}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: Number(v) as 1 | 2 | 3 }).run();
          }}
          style={selectStyle}
        >
          <option value="p">Párrafo</option>
          <option value="1">Título 1</option>
          <option value="2">Título 2</option>
          <option value="3">Título 3</option>
        </select>

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive("bold"))}>
          <b>B</b>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive("italic"))}>
          <i>I</i>
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive("underline"))}>
          <u>U</u>
        </button>

        <span style={{ width: 1, background: "#E2ECED", margin: "2px 2px" }} />

        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} style={btnStyle(editor.isActive({ textAlign: "left" }))} title="Alinear a la izquierda">
          ⟸
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} style={btnStyle(editor.isActive({ textAlign: "center" }))} title="Centrar">
          ⟺
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} style={btnStyle(editor.isActive({ textAlign: "right" }))} title="Alinear a la derecha">
          ⟹
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()} style={btnStyle(editor.isActive({ textAlign: "justify" }))} title="Justificar">
          ☰
        </button>

        <span style={{ width: 1, background: "#E2ECED", margin: "2px 2px" }} />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive("bulletList"))} title="Lista con viñetas">
          • Lista
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive("orderedList"))} title="Lista numerada">
          1. Lista
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} style={btnStyle(false)} title="Línea divisoria">
          ─ Línea
        </button>
        <button type="button" onClick={handlePickImage} style={btnStyle(false)} title="Insertar foto">
          🖼 Foto
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageSelected} style={{ display: "none" }} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
