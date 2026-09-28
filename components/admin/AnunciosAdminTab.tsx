import { AD_SLOTS, AD_SLOT_LABELS, AD_SLOT_LIMITS, type AdPlacement, type AdSlot } from "@/lib/supabase/adPlacements";

type AnunciosAdminTabProps = {
  ads: AdPlacement[];
  onOpenNew: (slot: AdSlot) => void;
  onEdit: (ad: AdPlacement) => void;
  onToggleActive: (ad: AdPlacement) => void;
  onDelete: (id: string) => void;
};

function fmtDate(iso: string): string {
  if (!iso) return "Sin fecha límite";
  return new Date(iso + "T00:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
}

export default function AnunciosAdminTab({ ads, onOpenNew, onEdit, onToggleActive, onDelete }: AnunciosAdminTabProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {AD_SLOTS.map((slot) => {
        const slotAds = ads.filter((a) => a.slot === slot);
        return (
          <div key={slot} style={{ background: "#ffffff", borderRadius: 18, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>{AD_SLOT_LABELS[slot]}</span>
                <span style={{ marginLeft: 10, fontSize: 12, color: "#7FA7AA" }}>
                  {slotAds.length} / {AD_SLOT_LIMITS[slot]} espacios
                </span>
              </div>
              <button
                onClick={() => onOpenNew(slot)}
                style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 10, cursor: "pointer" }}
              >
                + Nuevo anuncio
              </button>
            </div>

            {slotAds.length === 0 ? (
              <p style={{ margin: 0, fontSize: 13, color: "#7FA7AA" }}>Sin anuncios en este espacio todavía.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                {slotAds.map((ad) => (
                  <div key={ad.id} style={{ border: "1px solid #EEF3F3", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: 100 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ad.imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#143840" }}>{ad.title}</span>
                      <span style={{ fontSize: 11.5, color: "#7FA7AA" }}>
                        {fmtDate(ad.startsAt)} → {fmtDate(ad.endsAt)}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          width: "fit-content",
                          padding: "3px 9px",
                          borderRadius: 999,
                          color: ad.active ? "#009BA4" : "#B94A2E",
                          background: ad.active ? "#E5F6F7" : "#FBEAE6",
                        }}
                      >
                        {ad.active ? "Activo" : "Pausado"}
                      </span>
                      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                        <button onClick={() => onEdit(ad)} style={{ border: "none", background: "none", color: "#009BA4", fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0 }}>
                          Editar
                        </button>
                        <button onClick={() => onToggleActive(ad)} style={{ border: "none", background: "none", color: "#5C7679", fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0 }}>
                          {ad.active ? "Pausar" : "Activar"}
                        </button>
                        <button onClick={() => onDelete(ad.id)} style={{ border: "none", background: "none", color: "#B94A2E", fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0 }}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
