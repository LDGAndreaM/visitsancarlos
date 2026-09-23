import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CAT_LABEL, type Tutorial } from "@/lib/soporteData";

type TutorialsGridProps = {
  tutorials: (Tutorial & { index: number })[];
  onOpen: (index: number) => void;
};

export default function TutorialsGrid({ tutorials, onOpen }: TutorialsGridProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 18 }}>
      {tutorials.map((t) => (
        <div key={t.index} style={{ background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,60,66,0.08)", display: "flex", flexDirection: "column" }}>
          <div style={{ position: "relative", height: 140, background: "#E5F6F7" }}>
            <ImagePlaceholder caption="Miniatura del tutorial" />
            <span style={{ position: "absolute", right: 10, bottom: 10, background: "rgba(20,56,64,0.85)", color: "#ffffff", fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 6, pointerEvents: "none" }}>{t.duration}</span>
          </div>
          <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#009BA4" }}>{CAT_LABEL[t.cat]}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#143840", lineHeight: 1.35 }}>{t.title}</span>
            <span style={{ fontSize: 13, color: "#5C7679" }}>{t.steps.length} pasos</span>
            <button
              onClick={() => onOpen(t.index)}
              style={{ marginTop: "auto", alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, cursor: "pointer" }}
            >
              <svg width="10" height="12" viewBox="0 0 10 12">
                <path d="M0 0l10 6-10 6z" fill="#ffffff" />
              </svg>
              Ver tutorial
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
