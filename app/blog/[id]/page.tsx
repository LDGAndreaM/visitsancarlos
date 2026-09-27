import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import { fetchPublishedPostById } from "@/lib/supabase/blogPosts";
import { pageMetadata } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await fetchPublishedPostById(id);
    if (!post) return { title: "Blog" };

    return pageMetadata({
      title: post.title,
      description: post.excerpt || `${post.category} · Visit San Carlos`,
      path: `/blog/${id}`,
    });
  } catch {
    // Supabase aún no está configurado en este entorno; que la página siga
    // funcionando con metadata genérica en vez de tumbarse.
    return { title: "Blog" };
  }
}

export default async function BlogDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <BlogPostDetail id={id} />
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
