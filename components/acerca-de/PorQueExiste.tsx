import { POR_QUE_EXISTE_ITEMS } from "@/lib/acercaDeData";

export default function PorQueExiste() {
  return (
    <section style={{ background: "#ffffff", padding: "64px 48px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18, textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#143840" }}>¿Por qué existe este sitio?</h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#3B5C61" }}>
          Porque todos hemos escuchado: &quot;¿y qué se hace en San Carlos?&quot;, &quot;¿dónde puedo quedarme?&quot;,
          &quot;¿hay tours o eventos este fin de semana?&quot; Queríamos resolver eso. Queríamos:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          {POR_QUE_EXISTE_ITEMS.map((item) => (
            <span key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#143840", fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8" fill="#009BA4" />
                <path d="M5 9l3 3 5-6" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
        <p style={{ margin: "16px 0 0", fontFamily: "var(--font-caveat), cursive", fontWeight: 700, fontSize: 28, color: "#EB600A" }}>
          Somos ese amigo local que te dice a dónde ir, qué pedir y dónde ver el atardecer perfecto.
        </p>
      </div>
    </section>
  );
}
