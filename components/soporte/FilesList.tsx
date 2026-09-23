import { CAT_LABEL, type SupportFile } from "@/lib/soporteData";

export default function FilesList({ files }: { files: SupportFile[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {files.map((d) => {
        const catLabel = CAT_LABEL[d.cat];
        const catLabelDisplay = catLabel.charAt(0) + catLabel.slice(1).toLowerCase();
        return (
          <div key={d.title} style={{ display: "flex", alignItems: "center", gap: 16, background: "#ffffff", border: "1px solid #E2ECED", borderRadius: 16, padding: "16px 20px" }}>
            <span style={{ flexShrink: 0, width: 48, height: 56, borderRadius: 8, background: "#FDEEE4", color: "#EB600A", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8, fontSize: 11, fontWeight: 800 }}>
              {d.ext}
            </span>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{d.title}</span>
              <span style={{ fontSize: 13, color: "#5C7679" }}>{d.desc}</span>
              <span style={{ fontSize: 12, color: "#9DB6B8" }}>
                {catLabelDisplay} · {d.size} · Actualizado {d.date}
              </span>
            </div>
            <button style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8, border: "1px solid #009BA4", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="#009BA4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Descargar
            </button>
          </div>
        );
      })}
    </div>
  );
}
