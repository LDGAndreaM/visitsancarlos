import type { CSSProperties } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

type ListingImageProps = {
  src?: string | null;
  caption: string;
  round?: boolean;
  style?: CSSProperties;
};

// Reemplazo directo de <ImagePlaceholder>: si hay una imagen real subida la
// muestra, si no cae de vuelta al recuadro de muestra.
export default function ListingImage({ src, caption, round, style }: ListingImageProps) {
  if (!src) return <ImagePlaceholder caption={caption} round={round} style={style} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={caption}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: round ? "50%" : undefined, ...style }}
    />
  );
}
