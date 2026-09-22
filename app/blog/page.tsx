import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterCta from "@/components/NewsletterCta";
import FilterPills from "@/components/FilterPills";
import BlogHero from "@/components/blog/BlogHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostsGrid from "@/components/blog/PostsGrid";
import { BLOG_FILTERS } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog | Visit San Carlos",
  description: "Guías, historias y recomendaciones locales de San Carlos y Guaymas.",
};

export default function Blog() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <BlogHero />
      <FilterPills filters={BLOG_FILTERS} />
      <FeaturedPost />
      <PostsGrid />
      <NewsletterCta margin="0 48px 56px" body="Recibe las nuevas entradas del blog directo a tu correo." />
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
