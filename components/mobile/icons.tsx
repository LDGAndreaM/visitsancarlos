const PATHS: Record<string, string> = {
  todo: "M3 3h5v5H3zM10 3h5v5h-5zM3 10h5v5H3zM10 10h5v5h-5z",
  hospedaje: "M2 12h14v4M2 16v-4M3 12V8h5v4",
  comida: "M6 3v12M4.5 3v4M7.5 3v4M4.5 7h3M12 3c-1.5 1.5-1.5 4.5 0 6v6",
  salud: "M9 2a7 7 0 110 14A7 7 0 019 2zM9 6v6M6 9h6",
  tienda: "M6 6a3 3 0 016 0M3 6h12v9H3z",
  home: "M3 8l6-5 6 5v7.5H11V11H7v4.5H3z",
  pin: "M9 16s-5-4.6-5-8.5a5 5 0 0110 0C14 11.4 9 16 9 16zM9 5.5a2 2 0 110 4 2 2 0 010-4z",
  tag: "M2.5 9.5V3h6.5l6.5 6.5-6.5 6.5zM6 6.5h.01",
  calendar: "M3 4.5h12V15H3zM3 8h12M6 2.5v3M12 2.5v3",
  galeria: "M2.5 4h13v10h-13zM2.5 11.5l4-3.5 3 2.5 2.5-2 3.5 3M11.5 6.5h.01",
  blog: "M3.5 2.5h8l3 3v10h-11zM6 8h6M6 11h6M6 5h3",
  wave: "M2 7c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0M2 11.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0",
  info: "M9 2a7 7 0 110 14A7 7 0 019 2zM9 8v4.5M9 5.5h.01",
  megafono: "M3 7h3l7-3.5v11L6 11H3zM6 11l1 4",
  chat: "M3 3.5h12v8.5H8l-4 3v-3H3z",
  mail: "M2.5 4.5h13v9h-13zM2.5 5l6.5 5 6.5-5",
  sos: "M9 2.5L16 15H2zM9 7v3.5M9 12.8h.01",
  map: "M2 4.5l4.5-2 5 2 4.5-2v11l-4.5 2-5-2-4.5 2zM6.5 2.5v11M11.5 4.5v11",
  list: "M6 4.5h9.5M6 9h9.5M6 13.5h9.5M2.5 4.5h.01M2.5 9h.01M2.5 13.5h.01",
  heart: "M9 15.5S2.5 11.5 2.5 6.8A3.3 3.3 0 019 5.2a3.3 3.3 0 016.5 1.6c0 4.7-6.5 8.7-6.5 8.7z",
  close: "M4 4l10 10M14 4L4 14",
  burger: "M3 5h12M3 9h12M3 13h8",
  search: "M9.5 9.5L14 14M2 7.3a5.3 5.3 0 1010.6 0 5.3 5.3 0 00-10.6 0z",
  filter: "M2 4h12M4.5 8h7M7 12h2",
  chevron: "M6 3l6 6-6 6",
};

export type MobileIconKey = keyof typeof PATHS;

export function MobileIcon({ name, color = "currentColor", size = 18, fill }: { name: string; color?: string; size?: number; fill?: string }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={{ color, flexShrink: 0 }}>
      <path d={d} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill={fill || "none"} />
    </svg>
  );
}
