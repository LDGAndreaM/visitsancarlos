import Gallery from "@/components/Gallery";
import SellerCard from "./SellerCard";
import type { ClasificadoSeller } from "@/lib/clasificadoDetails";

type GalleryWithSellerProps = {
  images: { id: string; placeholder: string }[];
  seller: ClasificadoSeller;
  phone: string;
};

export default function GalleryWithSeller({ images, seller, phone }: GalleryWithSellerProps) {
  return (
    <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
      <Gallery images={images} />
      <SellerCard name={seller.name} kind={seller.kind} phone={phone} />
    </section>
  );
}
