import AdCarouselSection from "@/components/ads/AdCarouselSection";

export default function HotelsCarousel() {
  return <AdCarouselSection slot="carrusel_hospedaje" title="Hospedajes" viewAllHref="/directorio?categoria=hospedaje" cardHeight={180} sectionId="directorio" />;
}
