import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { BLOG_POSTS } from "@/lib/homeData";

export default function BlogPreview() {
  return (
    <section id="blog" style={{ padding: "56px 48px 20px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840" }}>Del blog</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {BLOG_POSTS.map((p) => (
          <div key={p.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ height: 180, borderRadius: 16, overflow: "hidden" }}>
              <ImagePlaceholder caption={p.placeholder} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#EB600A", letterSpacing: "0.04em" }}>{p.category}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: "#143840", lineHeight: 1.3 }}>{p.title}</span>
            <span style={{ fontSize: 13, color: "#3B5C61" }}>{p.excerpt}</span>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        style={{ display: "inline-block", marginTop: 24, background: "#ffffff", color: "#009BA4", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 10, border: "2px solid #009BA4" }}
      >
        Ver más entradas
      </Link>
    </section>
  );
}
