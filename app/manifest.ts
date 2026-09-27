import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "San Carlos",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#009BA4",
    icons: [
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/apple-180.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
