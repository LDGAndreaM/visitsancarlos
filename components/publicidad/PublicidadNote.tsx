import Link from "next/link";

export default function PublicidadNote() {
  return (
    <section style={{ padding: "6px 48px 20px", textAlign: "center" }}>
      <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA" }}>
        ¿Buscas un paquete a tu medida? <Link href="/contacto">Contáctanos</Link>.
      </p>
    </section>
  );
}
