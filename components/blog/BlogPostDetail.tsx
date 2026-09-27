"use client";

import { useEffect, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SocialIcon from "@/components/SocialIcon";
import { fetchPublishedPostById, type PublicBlogPost } from "@/lib/supabase/blogPosts";

export default function BlogPostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<PublicBlogPost | null | undefined>(undefined);

  useEffect(() => {
    fetchPublishedPostById(id).then(setPost);
  }, [id]);

  if (post === undefined) {
    return <div style={{ padding: "80px 48px", textAlign: "center", color: "#7FA7AA" }}>Cargando…</div>;
  }

  if (post === null) {
    return (
      <div style={{ padding: "80px 48px", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: "#5C7679" }}>No encontramos esta entrada del blog.</p>
      </div>
    );
  }

  const hasAuthorSocials = post.authorFacebook || post.authorInstagram || post.authorWebsite;

  return (
    <article style={{ maxWidth: 780, margin: "0 auto", padding: "40px 48px 80px" }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#EB600A", letterSpacing: "0.04em" }}>{post.category}</span>
      <h1 style={{ margin: "10px 0 8px", fontSize: 34, fontWeight: 800, color: "#143840", lineHeight: 1.25 }}>{post.title}</h1>
      <span style={{ fontSize: 13, color: "#7FA7AA" }}>{post.date}</span>

      <div style={{ height: 340, borderRadius: 18, overflow: "hidden", margin: "24px 0" }}>
        <ImagePlaceholder caption={post.placeholder} />
      </div>

      <div
        className="vsc-blog-body"
        style={{ fontSize: 16, lineHeight: 1.75, color: "#284246" }}
        dangerouslySetInnerHTML={{ __html: post.body || `<p>${post.excerpt}</p>` }}
      />

      <div style={{ marginTop: 48, padding: 24, background: "#F4FAFB", borderRadius: 18, display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#E2ECED" }}>
          {post.authorPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.authorPhotoUrl} alt={post.authorName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#009BA4" }}>
              {post.authorName.charAt(0)}
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>{post.authorName}</span>
          {post.authorRole && <span style={{ fontSize: 13, color: "#5C7679" }}>{post.authorRole}</span>}
        </div>
        {hasAuthorSocials && (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {post.authorFacebook && (
              <a
                href={post.authorFacebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{ width: 34, height: 34, borderRadius: "50%", background: "#009BA4", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <SocialIcon network="facebook" size={15} />
              </a>
            )}
            {post.authorInstagram && (
              <a
                href={post.authorInstagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{ width: 34, height: 34, borderRadius: "50%", background: "#009BA4", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <SocialIcon network="instagram" size={15} />
              </a>
            )}
            {post.authorWebsite && (
              <a
                href={post.authorWebsite}
                target="_blank"
                rel="noreferrer"
                aria-label="Sitio web"
                style={{ width: 34, height: 34, borderRadius: "50%", background: "#009BA4", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
