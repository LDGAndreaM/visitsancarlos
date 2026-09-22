import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function LoginPanel() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ImagePlaceholder caption="Foto: bahía de San Carlos" />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(0,155,164,0.82), rgba(0,118,126,0.88))" }} />
      <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 44 }}>
        <Link href="/">
          <Image
            src="/uploads/Recurso 1visitsancarlos.png"
            alt="Visit San Carlos"
            width={140}
            height={44}
            style={{ height: 44, width: "auto", filter: "brightness(0) invert(1) opacity(0.95)" }}
          />
        </Link>
        <div />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-caveat), cursive", fontWeight: 700, fontSize: 28, color: "#ffffff" }}>
            &quot;San Carlos no solo se visita… se vive.&quot;
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#ffffff", maxWidth: 420 }}>
            Da visibilidad a tu negocio ante miles de visitantes y residentes de San Carlos y Guaymas.
          </p>
        </div>
      </div>
    </div>
  );
}
