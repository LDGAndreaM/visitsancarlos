"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchActiveAds, type AdPlacement, type AdSlot } from "@/lib/supabase/adPlacements";

export default function AdBannerSlot({ slot, height = 150 }: { slot: AdSlot; height?: number }) {
  const [ad, setAd] = useState<AdPlacement | null | undefined>(undefined);

  useEffect(() => {
    fetchActiveAds(slot).then((ads) => setAd(ads[0] ?? null));
  }, [slot]);

  if (!ad) return null;

  const isExternal = ad.linkUrl.startsWith("http");
  const banner = (
    <div style={{ borderRadius: 18, overflow: "hidden", height, position: "relative", boxShadow: "0 10px 24px rgba(0,60,66,0.1)" }}>
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
        PUBLICIDAD
      </span>
    </div>
  );

  return (
    <section style={{ padding: "20px 48px", maxWidth: 1280, margin: "0 auto" }}>
      {ad.linkUrl ? (
        isExternal ? (
          <a href={ad.linkUrl} target="_blank" rel="noreferrer">
            {banner}
          </a>
        ) : (
          <Link href={ad.linkUrl}>{banner}</Link>
        )
      ) : (
        banner
      )}
    </section>
  );
}
