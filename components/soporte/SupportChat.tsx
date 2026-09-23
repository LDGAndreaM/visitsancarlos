"use client";

import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ChatGate from "./ChatGate";
import { CANNED_REPLIES, QUICK_REPLIES } from "@/lib/soporteData";
import { normalize } from "@/lib/soporteUtils";

type ChatMessage = { from: "agent" | "user"; text?: string; img?: string; time: string };

export type SupportChatHandle = { sendMessage: (text: string) => void };

function now(): string {
  return new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

const SupportChat = forwardRef<SupportChatHandle>(function SupportChat(_props, ref) {
  const [stage, setStage] = useState<"gate" | "chat">("gate");
  const [pendingHint, setPendingHint] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [pendingImg, setPendingImg] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const push = (text?: string, img?: string | null) => {
    if (!text && !img) return;
    setMessages((prev) => [...prev, { from: "user", text, img: img ?? undefined, time: now() }]);
    setDraft("");
    setPendingImg(null);
    setTyping(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const t = normalize(text || "");
      const hit = CANNED_REPLIES.find((r) => r.keywords.some((k) => t.includes(normalize(k))));
      const reply =
        img && !text
          ? "Gracias por la captura. Ya la estoy revisando; cuéntame un poco qué estabas intentando hacer."
          : hit
            ? hit.reply
            : "Gracias por escribirnos. Un agente revisará tu caso en un momento. Mientras tanto, ¿me compartes el correo de tu cuenta?";
      setTyping(false);
      setMessages((prev) => [...prev, { from: "agent", text: reply, time: now() }]);
    }, 1400);
  };

  const startChat = (name: string) => {
    setStage("chat");
    setMessages([
      {
        from: "agent",
        text: `¡Hola, ${name}! 👋 Soy parte del equipo de Visit San Carlos. ¿En qué te puedo ayudar hoy? También puedes adjuntar una captura de pantalla de tu problema.`,
        time: now(),
      },
    ]);
    if (pendingHint) {
      push(pendingHint);
      setPendingHint(null);
    }
  };

  useImperativeHandle(ref, () => ({
    sendMessage: (text: string) => {
      if (stage === "chat") push(text);
      else setPendingHint(text);
    },
  }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPendingImg(URL.createObjectURL(file));
    e.target.value = "";
  };

  const showQuick = messages.length < 3;

  return (
    <aside style={{ position: "sticky", top: 100, background: "#ffffff", borderRadius: 22, boxShadow: "0 18px 44px rgba(0,60,66,0.14)", display: "flex", flexDirection: "column", height: 640, overflow: "hidden" }}>
      <div style={{ background: "#009BA4", padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ position: "relative", width: 44, height: 44, borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Image src="/uploads/Recurso 4pin.png" alt="" width={24} height={30} style={{ width: 24, height: "auto" }} />
          <span style={{ position: "absolute", right: 0, bottom: 0, width: 12, height: 12, borderRadius: "50%", background: "#3DDC84", border: "2px solid #009BA4" }} />
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#ffffff" }}>Soporte Visit San Carlos</span>
          <span style={{ fontSize: 12, color: "#E5F6F7" }}>En línea · responde en ~2 min</span>
        </div>
      </div>

      {stage === "gate" ? (
        <ChatGate pendingHint={pendingHint} onStart={startChat} />
      ) : (
        <>
          <div ref={scrollRef} className="vsc-scroll" style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#F4FAFB" }}>
            <span style={{ alignSelf: "center", fontSize: 11, color: "#9DB6B8", fontWeight: 600 }}>Hoy</span>
            {messages.map((m, i) =>
              m.from === "agent" ? (
                <div key={i} style={{ alignSelf: "flex-start", maxWidth: "85%", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ background: "#ffffff", color: "#143840", fontSize: 14, lineHeight: 1.5, padding: "11px 14px", borderRadius: "16px 16px 16px 4px", boxShadow: "0 2px 8px rgba(0,60,66,0.06)" }}>
                    {m.text}
                  </div>
                  <span style={{ fontSize: 11, color: "#9DB6B8" }}>{m.time}</span>
                </div>
              ) : (
                <div key={i} style={{ alignSelf: "flex-end", maxWidth: "85%", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                  {m.img && (
                    // eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob: URL, next/image can't optimize it
                    <img src={m.img} alt="Adjunto" style={{ maxWidth: 220, maxHeight: 180, borderRadius: 12, objectFit: "cover", display: "block" }} />
                  )}
                  {m.text && (
                    <div style={{ background: "#EB600A", color: "#ffffff", fontSize: 14, lineHeight: 1.5, padding: "11px 14px", borderRadius: "16px 16px 4px 16px" }}>{m.text}</div>
                  )}
                  <span style={{ fontSize: 11, color: "#9DB6B8" }}>{m.time}</span>
                </div>
              )
            )}
            {typing && (
              <div style={{ alignSelf: "flex-start", background: "#ffffff", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", display: "flex", gap: 4 }}>
                <span className="vsc-typing-dot" style={{ animationDelay: "0s" }} />
                <span className="vsc-typing-dot" style={{ animationDelay: "0.15s" }} />
                <span className="vsc-typing-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            )}
          </div>

          {showQuick && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "10px 14px 0", background: "#ffffff" }}>
              {QUICK_REPLIES.map((label) => (
                <button
                  key={label}
                  onClick={() => push(label)}
                  style={{ border: "1px solid #009BA4", background: "#ffffff", color: "#009BA4", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer" }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {pendingImg && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px 0", background: "#ffffff" }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL */}
              <img src={pendingImg} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
              <span style={{ fontSize: 12, color: "#5C7679", flex: 1 }}>Imagen lista para enviar</span>
              <button onClick={() => setPendingImg(null)} style={{ border: "none", background: "transparent", color: "#5C7679", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Quitar
              </button>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px 14px", background: "#ffffff" }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
            <button
              onClick={() => fileRef.current?.click()}
              aria-label="Adjuntar captura"
              title="Adjuntar captura de pantalla"
              style={{ flexShrink: 0, width: 40, height: 40, border: "1px solid #E2ECED", background: "#ffffff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M14.5 9.5l-5.2 5.2a3.2 3.2 0 01-4.5-4.5l6-6a2.1 2.1 0 013 3l-6 6a1 1 0 01-1.5-1.5l5.3-5.3" stroke="#5C7679" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") push(draft.trim(), pendingImg);
              }}
              placeholder="Escribe tu mensaje..."
              style={{ flex: 1, minWidth: 0, border: "1px solid #E2ECED", outline: "none", borderRadius: 999, padding: "11px 16px", fontSize: 14, color: "#143840" }}
            />
            <button
              onClick={() => push(draft.trim(), pendingImg)}
              aria-label="Enviar"
              style={{ flexShrink: 0, width: 40, height: 40, border: "none", background: "#EB600A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M3 10l14-7-5 15-2.5-6.5L3 10z" fill="#ffffff" />
              </svg>
            </button>
          </div>
        </>
      )}
    </aside>
  );
});

export default SupportChat;
