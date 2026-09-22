import BusinessMapCard from "./BusinessMapCard";
import type { Business } from "@/lib/directorioData";

export default function ResultsMap({ businesses }: { businesses: Business[] }) {
  return (
    <section style={{ padding: "24px 48px 60px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }}>
        <div style={{ borderRadius: 18, overflow: "hidden", height: 520, border: "1px solid #EEF3F3" }}>
          <iframe src="https://maps.google.com/maps?q=San+Carlos,+Sonora&z=12&output=embed" style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 520, overflowY: "auto" }}>
          {businesses.map((biz) => (
            <BusinessMapCard key={biz.id} business={biz} />
          ))}
        </div>
      </div>
    </section>
  );
}
