import { SOCIAL_LINKS } from "@/lib/nav";

type FacebookPagePluginProps = {
  width?: number;
  height?: number;
};

// Embed oficial de Facebook ("Page Plugin") vía iframe — no requiere SDK ni
// App ID, solo la URL pública de la página. Muestra los posts reales tal
// como los ve cualquier visitante en Facebook.
export default function FacebookPagePlugin({ width = 340, height = 500 }: FacebookPagePluginProps) {
  const pageUrl = encodeURIComponent(SOCIAL_LINKS.facebook.href);
  const src = `https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <iframe
      title="Facebook - Visit San Carlos"
      src={src}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
      scrolling="no"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  );
}
