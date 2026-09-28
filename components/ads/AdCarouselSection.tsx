"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchActiveAds, type AdPlacement, type AdSlot } from "@/lib/supabase/adPlacements";

type AdCarouselSectionProps = {
  slot: AdSlot;
  title?: string;
  viewAllHref?: string;
  cardHeight?: number;
  sectionId?: string;
};

export default function AdCarouselSection({ slot, title, viewAllHref, cardHeight = 180, sectionId }: AdCarouselSectionProps) {
  const [ads, setAds] = useState<AdPlacement[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchActiveAds(slot).then(setAds);
  }, [slot]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth || 600), behavior: "smooth" });
  };

  // Sin cargar aún, o sin anuncios activos: no se inventa contenido, la
  // sección simplemente no aparece.
  if (!ads || ads.length === 0) return null;

  return (
    <section id={sectionId} style={{ padding: "56px 48px 20px", maxWidth: 1280, margin: "0 auto" }}>
      {title && (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#143840" }}>{title}</h2>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {ads.length > 1 && (
              <>
                <button
                  onClick={() => scroll(-1)}
                  style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
                >
                  ‹
                </button>
                <button
                  onClick={() => scroll(1)}
                  style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #DCEEEF", background: "#ffffff", cursor: "pointer", fontSize: 16, color: "#009BA4" }}
                >
                  ›
                </button>
              </>
            )}
            {viewAllHref && (
              <Link href={viewAllHref} style={{ fontWeight: 700, fontSize: 14 }}>
                Ver todos →
              </Link>
            )}
          </div>
        </div>
      )}
      <div ref={ref} className="vsc-scroll" style={{ display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory" }}>
        {ads.map((ad) => {
          const isExternal = ad.linkUrl.startsWith("http");
          const card = (
            <div
              style={{
                scrollSnapAlign: "start",
                flex: "0 0 calc((100% - 40px)/3)",
                minWidth: 260,
                background: "#ffffff",
                borderRadius: 18,
                boxShadow: "0 10px 24px rgba(0,60,66,0.1)",
                border: "1px solid #EAF3F4",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", height: cardHeight }}>
                <Image src={ad.imageUrl} alt={ad.title} fill style={{ objectFit: "cover" }} />
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    background: "rgba(0,0,0,0.55)",
                    color: "#ffffff",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  PATROCINADO
                </span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{ad.title}</span>
                {ad.subtitle && <span style={{ fontSize: 13, color: "#3B5C61" }}>{ad.subtitle}</span>}
              </div>
            </div>
          );

          if (!ad.linkUrl) return <div key={ad.id}>{card}</div>;

          return isExternal ? (
            <a key={ad.id} href={ad.linkUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              {card}
            </a>
          ) : (
            <Link key={ad.id} href={ad.linkUrl} style={{ textDecoration: "none", color: "inherit" }}>
              {card}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
