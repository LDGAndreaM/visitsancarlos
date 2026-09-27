import Gallery from "@/components/Gallery";
import SellerCard from "./SellerCard";

type GalleryWithSellerProps = {
  images: { id: string; placeholder: string }[];
  sellerName: string;
  phone: string;
};

export default function GalleryWithSeller({ images, sellerName, phone }: GalleryWithSellerProps) {
  return (
    <section style={{ padding: "24px 48px 0", maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, alignItems: "start" }}>
      <Gallery images={images} />
      <SellerCard name={sellerName} phone={phone} />
    </section>
  );
}
