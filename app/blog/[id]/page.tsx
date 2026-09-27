import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostDetail from "@/components/blog/BlogPostDetail";

export const metadata: Metadata = {
  title: "Blog | Visit San Carlos",
};

type PageProps = { params: Promise<{ id: string }> };

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
