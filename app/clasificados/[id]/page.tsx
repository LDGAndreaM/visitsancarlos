import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopActions from "@/components/TopActions";
import DescriptionSection from "@/components/DescriptionSection";
import LocationSection from "@/components/LocationSection";
import ClasificadoDetailHeader from "@/components/clasificados/ClasificadoDetailHeader";
import GalleryWithSeller from "@/components/clasificados/GalleryWithSeller";
import SpecsSection from "@/components/clasificados/SpecsSection";
import RelatedClasificados from "@/components/clasificados/RelatedClasificados";
import { ITEMS } from "@/lib/clasificadosData";
import { relatedItems } from "@/lib/clasificadosUtils";
import { getClasificadoDetail } from "@/lib/clasificadoDetails";

const CLASIFICADOS_SOCIALS = [
  { label: "f", name: "Facebook" },
  { label: "ig", name: "Instagram" },
  { label: "tt", name: "TikTok", fontSize: 11 },
];

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ITEMS.map((it) => ({ id: it.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = ITEMS.find((it) => it.id === id);
  if (!item) return {};
  return {
    title: `${item.title} | Visit San Carlos`,
    description: getClasificadoDetail(item).description,
  };
}

export default async function ClasificadoDetail({ params }: PageProps) {
  const { id } = await params;
  const item = ITEMS.find((it) => it.id === id);
  if (!item) notFound();
  const detail = getClasificadoDetail(item);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <TopActions shareTitle={item.title} backHref="/clasificados" backLabel="← Volver a clasificados" />
      <ClasificadoDetailHeader item={item} />
      <GalleryWithSeller images={detail.images} seller={detail.seller} phone={item.phone} />
      <DescriptionSection description={detail.description} />
      <SpecsSection specs={detail.specs} />
      <LocationSection location={item.location} title="Zona del artículo" showDirections={false} />
      <RelatedClasificados items={relatedItems(ITEMS, item)} />
      <Footer marginTop={0} padding="0 48px 28px" socials={CLASIFICADOS_SOCIALS} />
    </div>
  );
}
