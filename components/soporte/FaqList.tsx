import ImagePlaceholder from "@/components/ImagePlaceholder";
import { CAT_LABEL, type Faq } from "@/lib/soporteData";

type FaqListProps = {
  faqs: (Faq & { index: number })[];
  openIndex: number | null;
  onToggle: (index: number) => void;
  voted: Record<number, boolean>;
  onVote: (index: number, faq: Faq, needsHelp: boolean) => void;
};

export default function FaqList({ faqs, openIndex, onToggle, voted, onVote }: FaqListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((f) => {
        const isOpen = openIndex === f.index;
        return (
          <div key={f.index} style={{ background: "#ffffff", border: "1px solid #E2ECED", borderRadius: 16, overflow: "hidden" }}>
            <button
              onClick={() => onToggle(f.index)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, border: "none", background: "transparent", padding: "18px 22px", cursor: "pointer", textAlign: "left" }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "#009BA4" }}>{CAT_LABEL[f.cat]}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{f.q}</span>
              </span>
              <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: "#E5F6F7", color: "#009BA4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600 }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 22px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "#3B5C61" }}>{f.a}</p>
                {f.img && (
                  <div style={{ height: 220, borderRadius: 12, overflow: "hidden", background: "#F4FAFB" }}>
                    <ImagePlaceholder caption={f.imgHint ?? ""} />
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#5C7679", flexWrap: "wrap" }}>
                  <span>¿Te sirvió?</span>
                  <button
                    onClick={() => onVote(f.index, f, false)}
                    style={{ border: "1px solid #E2ECED", background: "#ffffff", fontSize: 12, fontWeight: 600, color: "#143840", padding: "6px 14px", borderRadius: 999, cursor: "pointer" }}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => onVote(f.index, f, true)}
                    style={{ border: "1px solid #E2ECED", background: "#ffffff", fontSize: 12, fontWeight: 600, color: "#143840", padding: "6px 14px", borderRadius: 999, cursor: "pointer" }}
                  >
                    No, necesito ayuda
                  </button>
                  {voted[f.index] && <span style={{ color: "#009BA4", fontWeight: 600 }}>¡Gracias por tu opinión!</span>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
