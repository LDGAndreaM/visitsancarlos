import type { CSSProperties } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

type ListingImageProps = {
  src?: string | null;
  caption: string;
  round?: boolean;
  // "cover" (default) llena el recuadro recortando los bordes — bien para
  // miniaturas pequeñas (tarjetas, grillas). "contain" muestra la foto
  // completa sin recortarla — úsalo donde esa foto sea la vista principal
  // (la foto grande de la galería, el detalle de un evento).
  fit?: "cover" | "contain";
  style?: CSSProperties;
};

// Reemplazo directo de <ImagePlaceholder>: si hay una imagen real subida la
// muestra, si no cae de vuelta al recuadro de muestra.
export default function ListingImage({ src, caption, round, fit = "cover", style }: ListingImageProps) {
  if (!src) return <ImagePlaceholder caption={caption} round={round} style={style} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={caption}
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit,
        display: "block",
        borderRadius: round ? "50%" : undefined,
        background: fit === "contain" ? "#EAF3F4" : undefined,
        ...style,
      }}
    />
  );
}
