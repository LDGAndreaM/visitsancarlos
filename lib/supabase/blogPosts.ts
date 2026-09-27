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
  author_name: string | null;
  author_role: string | null;
  author_photo_url: string | null;
  author_facebook: string | null;
  author_instagram: string | null;
  author_website: string | null;
  created_at: string;
};

type ProfileJoin = { full_name: string | null; email: string; avatar_url: string | null };
type BlogPostRowWithAuthor = BlogPostRow & { profiles: ProfileJoin | null };

export type PublicBlogPost = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  publishedAt: string;
  placeholder: string;
  authorName: string;
  authorRole: string;
  authorPhotoUrl: string;
  authorFacebook: string;
  authorInstagram: string;
  authorWebsite: string;
};

export type PostAuthorFields = {
  authorName: string;
  authorRole: string;
  authorPhotoUrl: string;
  authorFacebook: string;
  authorInstagram: string;
  authorWebsite: string;
};

const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });

export function toPublicBlogPost(row: BlogPostRowWithAuthor): PublicBlogPost {
  return {
    id: row.id,
    category: (row.category || "Guía").toUpperCase(),
    title: row.title,
    excerpt: row.excerpt ?? "",
    body: row.body ?? "",
    date: fmtDateShort(row.created_at),
    publishedAt: row.created_at,
    placeholder: row.photo_placeholder ?? `Foto: ${row.title}`,
    authorName: row.author_name || row.profiles?.full_name || row.profiles?.email || "Equipo Visit San Carlos",
    authorRole: row.author_role ?? "",
    authorPhotoUrl: row.author_photo_url || row.profiles?.avatar_url || "",
    authorFacebook: row.author_facebook ?? "",
    authorInstagram: row.author_instagram ?? "",
    authorWebsite: row.author_website ?? "",
  };
}

export function toAdminBlogPost(row: BlogPostRowWithAuthor): AdminBlogPost {
  return {
    id: row.id,
    title: row.title,
    author: row.profiles?.full_name || row.profiles?.email || "—",
    date: fmtDateShort(row.created_at),
    status: row.published ? "Publicado" : "Borrador",
    category: row.category ?? "Guía",
    excerpt: row.excerpt ?? "",
    body: row.body ?? "",
    authorName: row.author_name ?? "",
    authorRole: row.author_role ?? "",
    authorPhotoUrl: row.author_photo_url ?? "",
    authorFacebook: row.author_facebook ?? "",
    authorInstagram: row.author_instagram ?? "",
    authorWebsite: row.author_website ?? "",
  };
}

const SELECT_WITH_AUTHOR = "*, profiles(full_name, email, avatar_url)";

export async function fetchPublishedPosts(): Promise<PublicBlogPost[]> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select(SELECT_WITH_AUTHOR).eq("published", true).order("created_at", { ascending: false });
  return (data ?? []).map((row) => toPublicBlogPost(row as BlogPostRowWithAuthor));
}

export async function fetchPublishedPostById(id: string): Promise<PublicBlogPost | null> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select(SELECT_WITH_AUTHOR).eq("id", id).eq("published", true).single();
  return data ? toPublicBlogPost(data as BlogPostRowWithAuthor) : null;
}

export async function fetchAllPostsAdmin(): Promise<AdminBlogPost[]> {
  const supabase = createClient();
  const { data } = await supabase.from("blog_posts").select(SELECT_WITH_AUTHOR).order("created_at", { ascending: false });
  return (data ?? []).map((row) => toAdminBlogPost(row as BlogPostRowWithAuthor));
}

export async function createPost(authorId: string, values: { title: string; excerpt?: string; body?: string; category?: string } & Partial<PostAuthorFields>) {
  const supabase = createClient();
  await supabase.from("blog_posts").insert({
    author_id: authorId,
    title: values.title,
    excerpt: values.excerpt ?? "",
    body: values.body ?? "",
    category: values.category ?? "Guía",
    author_name: values.authorName || null,
    author_role: values.authorRole || null,
    author_photo_url: values.authorPhotoUrl || null,
    author_facebook: values.authorFacebook || null,
    author_instagram: values.authorInstagram || null,
    author_website: values.authorWebsite || null,
  });
}

export async function updatePost(id: string, values: { title: string; excerpt: string; body: string; category: string } & Partial<PostAuthorFields>) {
  const supabase = createClient();
  await supabase
    .from("blog_posts")
    .update({
      title: values.title,
      excerpt: values.excerpt,
      body: values.body,
      category: values.category,
      author_name: values.authorName || null,
      author_role: values.authorRole || null,
      author_photo_url: values.authorPhotoUrl || null,
      author_facebook: values.authorFacebook || null,
      author_instagram: values.authorInstagram || null,
      author_website: values.authorWebsite || null,
    })
    .eq("id", id);
}

export async function uploadBlogImage(file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
  if (uploadError) return { url: null, error: uploadError.message };

  const { data } = supabase.storage.from("gallery").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

export async function setPostPublished(id: string, published: boolean) {
  const supabase = createClient();
  await supabase.from("blog_posts").update({ published }).eq("id", id);
}

export async function deletePost(id: string) {
  const supabase = createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
}
