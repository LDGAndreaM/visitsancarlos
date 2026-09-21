import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function QuienesSomos() {
  return (
    <section
      style={{
        background: "#6AC7E2",
        padding: "19px 48px 0",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 48,
        alignItems: "center",
        height: 474,
        marginTop: 3,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800, color: "#ffffff" }}>Acerca de Visit San Carlos</h1>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#ffffff" }}>
          Somos un grupo de personas amantes de la playa, los atardeceres naranjas de San Carlos y los tacos de
          marlin bien servidos. Creemos que San Carlos y Guaymas son destinos increíbles, pero hacía falta una
          plataforma clara, bonita y fácil de usar donde turistas y locales pudieran encontrar TODO en un solo
          lugar.
        </p>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#ffffff" }}>
          Así nació Visit San Carlos: una guía digital que reúne los mejores lugares para comer, dormir, explorar,
          disfrutar y vivir la experiencia del mar de Cortés… sin perderte en cien páginas de Facebook o
          recomendaciones incompletas.
        </p>
      </div>
      <div style={{ position: "relative", height: 340 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "64%",
            height: 210,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 16px 32px rgba(0,60,66,0.2)",
            border: "4px solid #ffffff",
          }}
        >
          <ImagePlaceholder caption="Foto: equipo Visit San Carlos" />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "58%",
            height: 190,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 16px 32px rgba(0,60,66,0.2)",
            border: "4px solid #ffffff",
          }}
        >
          <ImagePlaceholder caption="Foto: atardecer en San Carlos" />
        </div>
      </div>
    </section>
  );
}
