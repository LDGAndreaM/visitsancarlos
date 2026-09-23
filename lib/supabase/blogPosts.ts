import { createClient } from "@/lib/supabase/client";
import type { AdminBlogPost } from "@/lib/adminData";

type BlogPostRow = {
  id: string;
  author_id: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  photo_placeholder: string | null;
  published: boolean;
  created_at: string;
};

type BlogPostRowWithAuthor = BlogPostRow & { profiles: { full_name: string | null; email: string } | null };

export type PublicBlogPost = { id: string; category: string; title: string; excerpt: string; date: string; placeholder: string };

const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

export function toPublicBlogPost(row: BlogPostRow): PublicBlogPost {
  return {
    id: row.id,
    category: (row.category || "Guía").toUpperCase(),
    title: row.title,
    excerpt: row.excerpt ?? "",
    date: fmtDateShort(row.created_at),
    placeholder: row.photo_placeholder ?? `Foto: ${row.title}`,
  };
}

export function toAdminBlogPost(row: BlogPostRowWithAuthor): AdminBlogPost {
  return {
    id: row.id,
    title: row.title,
    author: row.profiles?.full_name || row.profiles?.email || "—",
    date: fmtDateShort(row.created_at),
    status: row.published ? "Publicado" : "Borrador",
  };
}

export async function fetchPublishedPosts(): Promise<PublicBlogPost[]> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false });
  return (data ?? []).map(toPublicBlogPost);
}

export async function fetchAllPostsAdmin(): Promise<AdminBlogPost[]> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select("*, profiles(full_name, email)").order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdminBlogPost(row as BlogPostRowWithAuthor));
}

export async function createPost(authorId: string, values: { title: string; excerpt?: string; body?: string; category?: string }) {
  const supabase = createClient();
  await supabase.from("blog_posts").insert({ author_id: authorId, title: values.title, excerpt: values.excerpt ?? "", body: values.body ?? "", category: values.category ?? "Guía" });
}

export async function setPostPublished(id: string, published: boolean) {
  const supabase = createClient();
  await supabase.from("blog_posts").update({ published }).eq("id", id);
}

export async function deletePost(id: string) {
  const supabase = createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
}
