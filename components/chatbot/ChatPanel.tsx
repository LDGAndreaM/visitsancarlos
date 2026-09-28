"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resolveChatReply, type ChatReply } from "@/lib/chatbot/intents";
import { GREETING, QUICK_SUGGESTIONS } from "@/lib/chatbot/chatbotData";

type ChatMessage = { from: "bot" | "user"; text: string; links?: { label: string; href: string }[]; time: string };

function now(): string {
  return new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPanel({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  // Arranca vacío en el servidor y en la hidratación (misma marca) para
  // evitar un mismatch de hidratación por la hora del saludo; el saludo se
  // agrega justo después de montar, ya en el cliente.
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: GREETING, time: now() }]);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, visible]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((prev) => [...prev, { from: "user", text: trimmed, time: now() }]);
    setDraft("");
    setTyping(true);
    let reply: ChatReply;
    try {
      reply = await resolveChatReply(trimmed);
    } catch {
      reply = { text: "Tuve un problema para buscar esa información. Intenta de nuevo en un momento." };
    }
    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply.text, links: reply.links, time: now() }]);
  };

  const showQuick = messages.length < 2;

  return (
    <div className="vsc-chat-panel" style={{ display: visible ? "flex" : "none" }}>
      <div style={{ background: "#009BA4", padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>Asistente Visit San Carlos</span>
          <span style={{ fontSize: 11, color: "#E5F6F7" }}>Respuestas automáticas</span>
        </div>
        <button onClick={onClose} aria-label="Cerrar chat" style={{ border: "none", background: "transparent", color: "#ffffff", cursor: "pointer", fontSize: 22, lineHeight: 1, padding: 4, flexShrink: 0 }}>
          ×
        </button>
      </div>

      <div ref={scrollRef} className="vsc-scroll" style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, background: "#F4FAFB", minHeight: 0 }}>
        {messages.map((m, i) =>
          m.from === "bot" ? (
            <div key={i} style={{ alignSelf: "flex-start", maxWidth: "88%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ background: "#ffffff", color: "#143840", fontSize: 13.5, lineHeight: 1.5, padding: "10px 13px", borderRadius: "14px 14px 14px 4px", boxShadow: "0 2px 8px rgba(0,60,66,0.06)" }}>
                {m.text}
              </div>
              {m.links && m.links.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {m.links.map((l) => (
                    <Link
                      key={l.href + l.label}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                      style={{ fontSize: 12.5, fontWeight: 700, color: "#009BA4", background: "#ffffff", border: "1px solid #E2ECED", borderRadius: 10, padding: "8px 12px" }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
              <span style={{ fontSize: 10.5, color: "#9DB6B8" }}>{m.time}</span>
            </div>
          ) : (
            <div key={i} style={{ alignSelf: "flex-end", maxWidth: "88%", display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
              <div style={{ background: "#EB600A", color: "#ffffff", fontSize: 13.5, lineHeight: 1.5, padding: "10px 13px", borderRadius: "14px 14px 4px 14px" }}>{m.text}</div>
              <span style={{ fontSize: 10.5, color: "#9DB6B8" }}>{m.time}</span>
            </div>
          )
        )}
        {typing && (
          <div style={{ alignSelf: "flex-start", background: "#ffffff", padding: "11px 14px", borderRadius: "14px 14px 14px 4px", display: "flex", gap: 4 }}>
            <span className="vsc-typing-dot" style={{ animationDelay: "0s" }} />
            <span className="vsc-typing-dot" style={{ animationDelay: "0.15s" }} />
            <span className="vsc-typing-dot" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      {showQuick && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "10px 14px 0", background: "#ffffff", flexShrink: 0 }}>
          {QUICK_SUGGESTIONS.map((label) => (
            <button
              key={label}
              onClick={() => send(label)}
              style={{ border: "1px solid #009BA4", background: "#ffffff", color: "#009BA4", fontSize: 11.5, fontWeight: 600, padding: "6px 11px", borderRadius: 999, cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px 14px", background: "#ffffff", flexShrink: 0 }}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send(draft);
          }}
          placeholder="Escribe tu pregunta..."
          style={{ flex: 1, minWidth: 0, border: "1px solid #E2ECED", outline: "none", borderRadius: 999, padding: "10px 15px", fontSize: 13.5, color: "#143840" }}
        />
        <button
          onClick={() => send(draft)}
          aria-label="Enviar"
          style={{ flexShrink: 0, width: 38, height: 38, border: "none", background: "#EB600A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M3 10l14-7-5 15-2.5-6.5L3 10z" fill="#ffffff" />
          </svg>
        </button>
      </div>
    </div>
  );
}
