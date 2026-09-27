import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterCta from "@/components/NewsletterCta";
import FilterPills from "@/components/FilterPills";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GALLERY_FILTERS } from "@/lib/galleryData";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Galería",
  description: "Un vistazo visual a las playas, la gastronomía, los eventos y la comunidad de San Carlos.",
  path: "/galeria",
});

export default function Galeria() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <GalleryHero />
      <FilterPills filters={GALLERY_FILTERS} />
      <GalleryGrid />
      <NewsletterCta margin="0 auto 56px" />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} activeHref="/galeria" />
    </div>
  );
}
