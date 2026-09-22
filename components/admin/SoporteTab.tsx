"use client";

import { useState } from "react";
import type { Chat } from "@/lib/adminData";

type SoporteTabProps = {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onSendMessage: (text: string) => void;
};

export default function SoporteTab({ chats, activeChatId, onSelectChat, onSendMessage }: SoporteTabProps) {
  const [draft, setDraft] = useState("");
  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];

  const handleSend = () => {
    if (!draft.trim()) return;
    onSendMessage(draft);
    setDraft("");
  };

  return (
    <div style={{ background: "#ffffff", borderRadius: 18, boxShadow: "0 8px 20px rgba(0,60,66,0.06)", display: "grid", gridTemplateColumns: "280px 1fr", minHeight: 520, overflow: "hidden" }}>
      <div style={{ borderRight: "1px solid #EEF3F3", display: "flex", flexDirection: "column" }}>
        {chats.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectChat(c.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "none",
              borderBottom: "1px solid #EEF3F3",
              background: c.id === activeChatId ? "#F4FAFB" : "transparent",
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#009BA4", color: "#ffffff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {c.userName.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#143840", display: "block" }}>{c.userName}</span>
              <span style={{ fontSize: 12, color: "#5C7679", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.messages[c.messages.length - 1]?.text}</span>
            </div>
            {c.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EB600A", flexShrink: 0 }} />}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEF3F3", fontSize: 14, fontWeight: 800, color: "#143840" }}>{activeChat?.userName}</div>
        <div style={{ flex: 1, padding: 20, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
          {activeChat?.messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: "70%",
                alignSelf: m.from === "admin" ? "flex-end" : "flex-start",
                background: m.from === "admin" ? "#EB600A" : "#F4FAFB",
                color: m.from === "admin" ? "#ffffff" : "#143840",
                padding: "10px 14px",
                borderRadius: 14,
                fontSize: 13.5,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, padding: "16px 20px", borderTop: "1px solid #EEF3F3" }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            type="text"
            placeholder="Escribe una respuesta..."
            style={{ flex: 1, border: "1px solid #E2ECED", outline: "none", borderRadius: 999, padding: "11px 16px", fontSize: 13.5, fontFamily: "inherit" }}
          />
          <button onClick={handleSend} style={{ border: "none", background: "#EB600A", color: "#ffffff", fontWeight: 700, fontSize: 13, padding: "11px 20px", borderRadius: 999, cursor: "pointer" }}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
