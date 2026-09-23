"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { fetchPublishedPosts, type PublicBlogPost } from "@/lib/supabase/blogPosts";

export default function FeaturedPost() {
  const [post, setPost] = useState<PublicBlogPost | null>(null);
  useEffect(() => {
    fetchPublishedPosts().then((posts) => setPost(posts[0] ?? null));
  }, []);

  if (!post) return null;

  return (
    <section style={{ padding: "0 48px 56px" }}>
      <Link
        href={`/blog/${post.id}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 0,
          background: "#F4FAFB",
          borderRadius: 24,
          overflow: "hidden",
          maxWidth: 1180,
          margin: "0 auto",
          boxShadow: "0 16px 36px rgba(0,60,66,0.08)",
        }}
      >
        <div style={{ height: 340 }}>
          <ImagePlaceholder caption={post.placeholder} />
        </div>
        <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#EB600A", letterSpacing: "0.04em" }}>DESTACADO · {post.category}</span>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840", lineHeight: 1.3 }}>{post.title}</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#3B5C61", lineHeight: 1.6 }}>{post.excerpt}</p>
          <span style={{ fontSize: 13, color: "#7FA7AA" }}>{post.date}</span>
        </div>
      </Link>
    </section>
  );
}
