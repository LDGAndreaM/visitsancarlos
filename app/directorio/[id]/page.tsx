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
import { BUSINESSES } from "@/lib/directorioData";
import { getEstablishmentDetail } from "@/lib/establishmentDetails";

const DIRECTORIO_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const business = BUSINESSES.find((b) => b.id === id);
  if (!business) return {};
  return {
    title: `${business.name} | Visit San Carlos`,
    description: getEstablishmentDetail(business).description,
  };
}

export default async function Establecimiento({ params }: PageProps) {
  const { id } = await params;
  const business = BUSINESSES.find((b) => b.id === id);
  if (!business) notFound();
  const detail = getEstablishmentDetail(business);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <TopActions shareTitle={business.name} backHref="/directorio" />
      <EstablishmentHeader business={business} tags={detail.tags} />
      <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto" }}>
        <Gallery images={detail.images} />
      </section>
      <DescriptionSection description={detail.description} />
      <FeaturesSection features={detail.features} />
      <LocationSection location={business.location} />
      <ReviewsSection initialReviews={detail.reviews} />
      <Footer marginTop={0} padding="0 48px 28px" socials={DIRECTORIO_SOCIALS} />
    </div>
  );
}
