import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CAT_LABEL, type Tutorial } from "@/lib/soporteData";

type TutorialModalProps = {
  tutorial: Tutorial;
  onClose: () => void;
};

export default function TutorialModal({ tutorial, onClose }: TutorialModalProps) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,56,64,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: 760, maxHeight: "90vh", overflowY: "auto", background: "#ffffff", borderRadius: 22, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}
      >
        <div style={{ height: 400, background: "#143840" }}>
          <ImagePlaceholder caption="Video del tutorial" />
        </div>
        <div style={{ padding: "26px 30px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#009BA4" }}>
                {CAT_LABEL[tutorial.cat]} · {tutorial.duration}
              </span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#143840" }}>{tutorial.title}</h2>
            </div>
            <button onClick={onClose} aria-label="Cerrar" style={{ flexShrink: 0, width: 36, height: 36, border: "none", background: "#EEF3F3", borderRadius: "50%", fontSize: 18, color: "#143840", cursor: "pointer" }}>
              ×
            </button>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {tutorial.steps.map((step, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: "#E5F6F7", color: "#009BA4", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: "#3B5C61", paddingTop: 2 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
