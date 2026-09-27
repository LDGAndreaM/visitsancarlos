import Image from "next/image";

export default function QuienesSomos() {
  return (
    <section className="vsc-about-banner">
      <Image
        src="/uploads/acerca-de-atardecer.jpg"
        alt="Atardecer en la marina de San Carlos, con el cerro Tetakawi de fondo"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 45%" }}
      />
      <div className="vsc-about-content">
        <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 16 }}>
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
      </div>
    </section>
  );
}
