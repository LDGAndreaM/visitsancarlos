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
import { relatedItems } from "@/lib/clasificadosUtils";
import { getClasificadoDetail } from "@/lib/clasificadoDetails";
import { fetchApprovedClasificadoById, fetchApprovedClasificados } from "@/lib/supabase/classifieds";
import { SOCIAL_SET_MAIN } from "@/lib/nav";
import { pageMetadata } from "@/lib/site";

type PageProps = { params: Promise<{ id: string }> };

// Supabase aún no configurado o inalcanzable: tratamos ese caso igual que
// "no existe" en vez de tumbar la página con un 500.
async function safeFetchClasificado(id: string) {
  try {
    return await fetchApprovedClasificadoById(id);
  } catch {
    return null;
  }
}

// Sin generateStaticParams: los clasificados reales viven en Supabase y
// cambian todo el tiempo, así que esta página se renderiza dinámicamente por
// petición (mismo patrón que app/blog/[id]/page.tsx).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await safeFetchClasificado(id);
  if (!item) return { title: "Clasificados" };

  return pageMetadata({
    title: item.title,
    description: item.description || `${item.category} en ${item.location || "San Carlos y Guaymas"}.`,
    path: `/clasificados/${id}`,
  });
}

export default async function ClasificadoDetail({ params }: PageProps) {
  const { id } = await params;
  const item = await safeFetchClasificado(id);
  if (!item) notFound();
  const detail = getClasificadoDetail(item);
  const others = await fetchApprovedClasificados().catch(() => []);

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <TopActions shareTitle={item.title} backHref="/clasificados" backLabel="← Volver a clasificados" />
      <ClasificadoDetailHeader item={item} />
      <GalleryWithSeller images={detail.images} sellerName={detail.sellerName} phone={item.phone} />
      <DescriptionSection description={detail.description} />
      <SpecsSection specs={detail.specs} />
      <LocationSection location={item.location} title="Zona del artículo" showDirections={false} />
      <RelatedClasificados items={relatedItems(others, item)} />
      <Footer marginTop={0} padding="0 48px 28px" socials={SOCIAL_SET_MAIN} />
    </div>
  );
}
