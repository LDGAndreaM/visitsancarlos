import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterCta from "@/components/NewsletterCta";
import BlogHero from "@/components/blog/BlogHero";
import BlogFilters from "@/components/blog/BlogFilters";
import FeaturedPost from "@/components/blog/FeaturedPost";
import PostsGrid from "@/components/blog/PostsGrid";

export const metadata: Metadata = {
  title: "Blog | Visit San Carlos",
  description: "Guías, historias y recomendaciones locales de San Carlos y Guaymas.",
};

export default function Blog() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <BlogHero />
      <BlogFilters />
      <FeaturedPost />
      <PostsGrid />
      <NewsletterCta margin="0 48px 56px" body="Recibe las nuevas entradas del blog directo a tu correo." />
      <Footer marginTop={0} padding="0 48px 28px" />
    </div>
  );
}
