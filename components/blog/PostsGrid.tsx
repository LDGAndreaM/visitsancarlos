"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { fetchPublishedPosts, type PublicBlogPost } from "@/lib/supabase/blogPosts";

export default function PostsGrid() {
  const [posts, setPosts] = useState<PublicBlogPost[]>([]);
  useEffect(() => {
    fetchPublishedPosts().then((all) => setPosts(all.slice(1)));
  }, []);

  return (
    <section style={{ padding: "0 48px 60px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, maxWidth: 1180, margin: "0 auto" }}>
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/blog/${p.id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "#ffffff",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,60,66,0.08)",
            }}
          >
            <div style={{ height: 190 }}>
              <ImagePlaceholder caption={p.placeholder} />
            </div>
            <div style={{ padding: "0 18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#EB600A", letterSpacing: "0.04em" }}>{p.category}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#143840", lineHeight: 1.35 }}>{p.title}</span>
              <span style={{ fontSize: 13, color: "#3B5C61", lineHeight: 1.5 }}>{p.excerpt}</span>
              <span style={{ fontSize: 12, color: "#7FA7AA", marginTop: 4 }}>{p.date}</span>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <button
          style={{
            background: "#ffffff",
            color: "#009BA4",
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 28px",
            borderRadius: 10,
            border: "2px solid #009BA4",
            cursor: "pointer",
          }}
        >
          Cargar más entradas
        </button>
      </div>
    </section>
  );
}
