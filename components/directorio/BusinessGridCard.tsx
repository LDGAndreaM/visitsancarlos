import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import BizCategoryIcon from "./BizCategoryIcon";
import type { Business } from "@/lib/directorioData";
import { badgeColor, priceChars, starsArr } from "@/lib/directorioUtils";

type BusinessGridCardProps = {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function BusinessGridCard({ business: biz, isFavorite, onToggleFavorite }: BusinessGridCardProps) {
  return (
    <Link
      href={`/directorio/${biz.id}`}
      style={{ display: "block", background: "#ffffff", borderRadius: 18, overflow: "hidden", boxShadow: "0 10px 24px rgba(0,60,66,0.08)", color: "inherit" }}
    >
      <div style={{ position: "relative", height: 180 }}>
        <ImagePlaceholder caption={biz.placeholder} />
        {biz.badge && (
          <span style={{ position: "absolute", top: 10, left: 10, background: badgeColor(biz.badge), color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 999, zIndex: 2 }}>
            {biz.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(biz.id);
          }}
          style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "#ffffff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 18" fill={isFavorite ? "#EB600A" : "#9DB6B8"}>
            <path d="M10 17S1 11.5 1 5.8C1 2.6 3.4 1 5.9 1c1.7 0 3.2 1 4.1 2.4C10.9 2 12.4 1 14.1 1 16.6 1 19 2.6 19 5.8 19 11.5 10 17 10 17z" />
          </svg>
        </button>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#143840" }}>{biz.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "flex" }}>
            {priceChars(biz.price).map((filled, i) => (
              <span key={i} style={{ fontSize: 14, fontWeight: 800, color: filled ? "#143840" : "#D8E2E3" }}>
                $
              </span>
            ))}
          </span>
          <span style={{ display: "flex", gap: 1 }}>
            {starsArr(biz.rating).map((filled, i) => (
              <span key={i} style={{ fontSize: 13, color: filled ? "#F2A93B" : "#E3E9EA" }}>
                ★
              </span>
            ))}
          </span>
          <span style={{ fontSize: 12, color: "#7FA7AA" }}>
            {biz.rating} ({biz.reviewCount})
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5C7679" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <path d="M10 18s6-5.5 6-10a6 6 0 10-12 0c0 4.5 6 10 6 10z" stroke="#5C7679" strokeWidth="1.4" fill="none" />
            <circle cx="10" cy="8" r="2" stroke="#5C7679" strokeWidth="1.4" />
          </svg>
          <span>{biz.location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5C7679" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <rect x="6" y="2" width="8" height="16" rx="2" stroke="#5C7679" strokeWidth="1.4" />
          </svg>
          <span>{biz.phone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5C7679" }}>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#5C7679" strokeWidth="1.4" />
            <path d="M10 6v4l3 2" stroke="#5C7679" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
          <span>{biz.addedLabel}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #EEF3F3", marginTop: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#F4FAFB", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BizCategoryIcon category={biz.category} />
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#3B5C61" }}>{biz.category}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#7FA7AA" }}>
            <svg width="13" height="13" viewBox="0 0 20 14" fill="none">
              <path d="M1 7s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" stroke="#7FA7AA" strokeWidth="1.3" fill="none" />
              <circle cx="10" cy="7" r="2.4" stroke="#7FA7AA" strokeWidth="1.3" />
            </svg>
            <span>{biz.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
