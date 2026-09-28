import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Renombrado desde /publicidad: esa palabra en la URL hacía que
      // varios bloqueadores de anuncios bloquearan el JS de la página.
      {
        source: "/publicidad",
        destination: "/paquetes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
