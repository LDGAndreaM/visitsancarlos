import ImagePlaceholder from "@/components/ImagePlaceholder";
import { VALUES } from "@/lib/acercaDeData";

export default function MisionVisionValores() {
  return (
    <section style={{ padding: "70px 48px", background: "#F4FAFB" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.9fr 1fr 1fr",
          gap: 40,
          marginBottom: 56,
        }}
      >
        <div style={{ height: 210, borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 28px rgba(0,60,66,0.1)" }}>
          <ImagePlaceholder caption="Foto: negocio local" />
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
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, maxWidth: 1000, margin: "0 auto" }}>
        {VALUES.map((v) => (
          <div key={v.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", width: 270 }}>
            <span style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#D4A017",
                  WebkitMaskImage: `url(${v.icon})`,
                  maskImage: `url(${v.icon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  display: "inline-block",
                }}
              />
            </span>
            <h3 style={{ margin: 0, fontFamily: "var(--font-caveat), cursive", fontSize: 19, fontWeight: 700, color: "#EB600A" }}>{v.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#3B5C61", lineHeight: 1.5 }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
