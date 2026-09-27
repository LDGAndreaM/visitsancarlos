import Image from "next/image";
import ValuesCarousel from "./ValuesCarousel";

export default function MisionVisionValores() {
  return (
    <section style={{ padding: "70px 48px", background: "#F4FAFB" }}>
      <div
        className="vsc-grid-photo-2col"
        style={{
          maxWidth: 1080,
          margin: "0 auto 56px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 14px 28px rgba(0,60,66,0.1)",
          }}
        >
          <Image
            src="/uploads/acerca-de-atardecer.jpg"
            alt="Atardecer en la marina de San Carlos, con el cerro Tetakawi de fondo"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#EB600A" }}>Nuestra misión</h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#3B5C61" }}>
            Promover San Carlos y Guaymas como destinos turísticos únicos, ofreciendo información confiable,
            actualizada y auténtica, mientras apoyamos a los negocios locales y fomentamos experiencias memorables.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "center" }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#EB600A" }}>Nuestra visión</h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#3B5C61" }}>
            Ser la plataforma digital más completa y confiable de San Carlos y Guaymas, reconocida por viajeros,
            empresas y locales como el punto de encuentro entre la comunidad y el turismo.
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
        <h2 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800, color: "#EB600A" }}>Nuestros valores</h2>
        <p style={{ margin: 0, fontSize: 15, color: "#3B5C61" }}>
          Nuestra forma de trabajar y compartir San Carlos está basada en estos valores, que reflejan lo que somos
          y lo que queremos aportar.
        </p>
      </div>
      <ValuesCarousel />
    </section>
  );
}
