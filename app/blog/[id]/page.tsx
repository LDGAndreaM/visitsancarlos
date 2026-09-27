import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostDetail from "@/components/blog/BlogPostDetail";
import JsonLd from "@/components/JsonLd";
import { fetchPublishedPostById, type PublicBlogPost } from "@/lib/supabase/blogPosts";
import { absoluteUrl, pageMetadata, SITE_NAME } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };

// Supabase aún no configurado o inalcanzable: tratamos ese caso igual que
// "no existe" en vez de tumbar la página con un 500.
async function safeFetchPost(id: string) {
  try {
    return await fetchPublishedPostById(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await safeFetchPost(id);
  if (!post) return { title: "Blog" };

  return pageMetadata({
    title: post.title,
    description: post.excerpt || `${post.category} · Visit San Carlos`,
    path: `/blog/${id}`,
  });
}

function postJsonLd(post: PublicBlogPost, id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt,
    url: absoluteUrl(`/blog/${id}`),
    author: { "@type": "Person", name: post.authorName },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}

export default async function BlogDetail({ params }: PageProps) {
  const { id } = await params;
  const post = await safeFetchPost(id);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      {post && <JsonLd data={postJsonLd(post, id)} />}
      <Header />
      <BlogPostDetail id={id} />
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
