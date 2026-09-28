"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchActiveAds, type AdPlacement } from "@/lib/supabase/adPlacements";

export default function RestaurantAdCard() {
  const [ad, setAd] = useState<AdPlacement | null | undefined>(undefined);

  useEffect(() => {
    fetchActiveAds("restaurantes").then((ads) => setAd(ads[0] ?? null));
  }, []);

  if (!ad) return null;

  const isExternal = ad.linkUrl.startsWith("http");
  const card = (
    <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 240, height: "100%", boxShadow: "0 10px 24px rgba(0,60,66,0.1)" }}>
      <Image src={ad.imageUrl} alt={ad.title} fill style={{ objectFit: "cover" }} />
      <span
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "rgba(0,0,0,0.55)",
          color: "#ffffff",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
          padding: "5px 10px",
          borderRadius: 999,
        }}
      >
        PATROCINADO
      </span>
      {(ad.title || ad.subtitle) && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 18px 16px", background: "linear-gradient(0deg, rgba(0,0,0,0.6), transparent)" }}>
          <span style={{ display: "block", fontSize: 16, fontWeight: 700, color: "#ffffff" }}>{ad.title}</span>
          {ad.subtitle && <span style={{ fontSize: 13, color: "#ffffff" }}>{ad.subtitle}</span>}
        </div>
      )}
    </div>
  );

  if (!ad.linkUrl) return card;

  return isExternal ? (
    <a href={ad.linkUrl} target="_blank" rel="noreferrer" style={{ display: "block", height: "100%" }}>
      {card}
    </a>
  ) : (
    <Link href={ad.linkUrl} style={{ display: "block", height: "100%" }}>
      {card}
    </Link>
  );
}
