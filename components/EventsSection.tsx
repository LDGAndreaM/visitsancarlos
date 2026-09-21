import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { EVENTS } from "@/lib/homeData";

export default function EventsSection() {
  return (
    <section id="eventos" style={{ padding: "56px 48px 20px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840" }}>Próximos eventos</h2>
        <Link href="/eventos" style={{ fontWeight: 700, fontSize: 14 }}>
          Ver calendario completo →
        </Link>
      </div>
      <div className="vsc-scroll" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory" }}>
        {EVENTS.map((e) => (
          <div key={e.id} style={{ scrollSnapAlign: "start", flex: "0 0 280px", background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,60,66,0.1)" }}>
            <div style={{ height: 130 }}>
              <ImagePlaceholder caption={e.placeholder} />
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#009BA4" }}>{e.date}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#143840" }}>{e.name}</span>
              <span style={{ fontSize: 13, color: "#3B5C61" }}>{e.place}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
