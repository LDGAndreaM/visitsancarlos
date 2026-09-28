"use client";

import { useEffect, useState } from "react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import EventDetailModal from "./EventDetailModal";
import type { EventItem } from "@/lib/eventsData";
import { fetchApprovedEvents } from "@/lib/supabase/events";
import { fmtDateLabel } from "@/lib/eventsUtils";

// Espacio para eventos patrocinados: usa el mismo flag "featured" que ya
// controla el badge "Popular" en Directorio, activable desde Admin > Eventos.
// Si nadie ha pagado por un espacio destacado, la sección simplemente no
// aparece — nada de contenido inventado para llenar el hueco.
export default function FeaturedEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [detail, setDetail] = useState<EventItem | null>(null);

  useEffect(() => {
    fetchApprovedEvents().then((all) => setEvents(all.filter((e) => e.featured).slice(0, 5)));
  }, []);

  if (events.length === 0) return null;

  return (
    <section style={{ padding: "0 48px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: "#143840" }}>Eventos destacados</h2>
        <div className="vsc-scroll" style={{ display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory" }}>
          {events.map((e) => (
            <div
              key={e.id}
              onClick={() => setDetail(e)}
              style={{
                cursor: "pointer",
                scrollSnapAlign: "start",
                flex: "0 0 calc((100% - 36px)/3)",
                minWidth: 260,
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                background: "#ffffff",
                boxShadow: "0 10px 24px rgba(0,60,66,0.1)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 2,
                  background: "#EB600A",
                  color: "#ffffff",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                PATROCINADO
              </span>
              <div style={{ height: 140 }}>
                <ImagePlaceholder caption={`Foto: ${e.name}`} />
              </div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#009BA4" }}>{e.category}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#143840" }}>{e.name}</span>
                <span style={{ fontSize: 12, color: "#5C7679" }}>
                  {fmtDateLabel(e.date)} · {e.place}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {detail && <EventDetailModal event={detail} onClose={() => setDetail(null)} />}
    </section>
  );
}
