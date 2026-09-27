import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopActions from "@/components/TopActions";
import EstablishmentHeader from "@/components/establecimiento/EstablishmentHeader";
import Gallery from "@/components/Gallery";
import DescriptionSection from "@/components/DescriptionSection";
import FeaturesSection from "@/components/establecimiento/FeaturesSection";
import LocationSection from "@/components/LocationSection";
import ReviewsSection from "@/components/establecimiento/ReviewsSection";
import JsonLd from "@/components/JsonLd";
import { getEstablishmentDetail } from "@/lib/establishmentDetails";
import { fetchApprovedBusinessById } from "@/lib/supabase/businesses";
import type { Business, BusinessCategory } from "@/lib/directorioData";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { absoluteUrl, pageMetadata } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };

const SCHEMA_TYPE_BY_CATEGORY: Record<BusinessCategory, string> = {
  HOTELES: "Hotel",
  RESTAURANTES: "Restaurant",
  DOCTORES: "MedicalBusiness",
  NEGOCIOS: "LocalBusiness",
  CLASIFICADOS: "LocalBusiness",
};

function businessJsonLd(business: Business, id: string) {
  return {
    "@context": "https://schema.org",
    "@type": SCHEMA_TYPE_BY_CATEGORY[business.category],
    name: business.name,
    description: business.description || undefined,
    url: absoluteUrl(`/directorio/${id}`),
    telephone: business.phone || undefined,
    priceRange: business.price,
    address: business.location
      ? { "@type": "PostalAddress", addressLocality: business.location, addressRegion: "Sonora", addressCountry: "MX" }
      : undefined,
    aggregateRating:
      business.reviewCount > 0
        ? { "@type": "AggregateRating", ratingValue: business.rating, reviewCount: business.reviewCount }
        : undefined,
  };
}

// Supabase aún no configurado o inalcanzable: tratamos ese caso igual que
// "no existe" en vez de tumbar la página con un 500.
async function safeFetchBusiness(id: string) {
  try {
    return await fetchApprovedBusinessById(id);
  } catch {
    return null;
  }
}

// Sin generateStaticParams: los negocios reales viven en Supabase y cambian
// todo el tiempo, así que esta página se renderiza dinámicamente por
// petición (mismo patrón que app/blog/[id]/page.tsx).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const business = await safeFetchBusiness(id);
  if (!business) return { title: "Directorio" };

  return pageMetadata({
    title: business.name,
    description: business.description || `${business.category} en ${business.location || "San Carlos y Guaymas"}.`,
    path: `/directorio/${id}`,
  });
}

export default async function Establecimiento({ params }: PageProps) {
  const { id } = await params;
  const business = await safeFetchBusiness(id);
  if (!business) notFound();
  const detail = getEstablishmentDetail(business);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <JsonLd data={businessJsonLd(business, id)} />
      <Header />
      <TopActions shareTitle={business.name} backHref="/directorio" />
      <EstablishmentHeader business={business} tags={detail.tags} />
      <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
        <Gallery images={detail.images} />
      </section>
      <DescriptionSection description={detail.description} />
      <FeaturesSection features={detail.features} />
      <LocationSection location={business.location} />
      <ReviewsSection businessId={business.id} ownerId={business.ownerId} rating={business.rating} reviewCount={business.reviewCount} />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
