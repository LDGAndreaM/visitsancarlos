// Renderiza datos estructurados (schema.org) de forma segura. Los datos
// pueden contener texto real de Supabase (nombre de negocio, descripción de
// un clasificado, etc.), así que escapamos "<" para que nada pueda cerrar el
// <script> e inyectar HTML/JS.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
