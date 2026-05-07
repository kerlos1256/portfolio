"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatPanel } from "./chat-panel";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

function SparkleIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
      <path d="M12 2C12.5 5.5 15.5 9 20.5 10C15.5 11 12.5 14.5 12 18C11.5 14.5 8.5 11 3.5 10C8.5 9 11.5 5.5 12 2Z" />
      <path d="M19.5 1C19.8 2.8 21.2 4.2 23 4.5C21.2 4.8 19.8 6.2 19.5 8C19.2 6.2 17.8 4.8 16 4.5C17.8 4.2 19.2 2.8 19.5 1Z" />
    </svg>
  );
}

export function FloatChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const mobileInputRef = useRef<HTMLTextAreaElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const show = setTimeout(() => setShowNotif(true), 2500);
    const hide = setTimeout(() => setShowNotif(false), 8000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) setTimeout(() => mobileInputRef.current?.focus(), 300);
  }, [isOpen, isMobile]);

  async function handleSubmit() {
    const text = input.trim();
    if (!text || isStreaming) return;

    if (!isOpen) setIsOpen(true);
    setShowNotif(false);

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (res.status === 429) {
        const data = await res.json();
        const retryAfter = data.retryAfter ?? 60;
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "system", content: `Too many questions! Please wait ${retryAfter} seconds.` },
        ]);
        setIsStreaming(false);
        return;
      }

      if (!res.ok || !res.body) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "system", content: "Something went wrong. Please try again." },
        ]);
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "system", content: "Connection error. Please try again." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  }

  function handleMobileKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleDesktopKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <>
      {/* ── Mobile FAB (hidden on desktop via CSS) ── */}
      <motion.button
        className="chat-fab"
        onClick={() => { setIsOpen((v) => !v); setShowNotif(false); }}
        initial={{ scale: 0, opacity: 0, bottom: 24 }}
        animate={{ scale: 1, opacity: 1, bottom: isMobile && isOpen ? 64 : 24 }}
        transition={{
          scale: { duration: 0.4, delay: 1, ease: "easeOut" },
          opacity: { duration: 0.4, delay: 1, ease: "easeOut" },
          bottom: { duration: 0.3, ease: "easeOut" },
        }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              viewBox="0 0 24 24" width="20" height="20" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.div
              key="sparkle"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <SparkleIcon size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Desktop: always-visible input bar (hidden on mobile via CSS) ── */}
      <motion.div
        className="chat-desktop-bar"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
      >
        <div className="chat-desktop-icon">
          <SparkleIcon size={15} color="var(--accent)" />
        </div>
        <input
          ref={desktopInputRef}
          className="chat-desktop-input-field"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 500))}
          onKeyDown={handleDesktopKeyDown}
          onFocus={() => { if (messages.length > 0 && !isOpen) setIsOpen(true); }}
          placeholder="Ask AI about Kerlos…"
          disabled={isStreaming}
          autoComplete="off"
        />
        {isStreaming ? (
          <div style={{ flexShrink: 0, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              width: 14, height: 14,
              border: "1.5px solid var(--accent-border)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }} />
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="chat-desktop-send"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        )}
      </motion.div>

      {/* ── Notification callout ── */}
      <AnimatePresence>
        {showNotif && !isOpen && (
          <motion.div
            className="chat-notif"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => { setShowNotif(false); desktopInputRef.current?.focus(); }}
          >
            <SparkleIcon size={13} color="var(--accent)" />
            <span>Curious about Kerlos? Ask his AI.</span>
            <button
              onClick={(e) => { e.stopPropagation(); setShowNotif(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "0 0 0 2px", fontSize: 16, lineHeight: 1, display: "flex", alignItems: "center" }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Drawer (mobile: full-width, desktop: floating panel above bar) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-drawer"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: "0.5px solid var(--border)",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="badge-dot" />
                <span style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}>
                  Ask AI
                </span>
                <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 2 }}>
                  about Kerlos
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <ChatPanel messages={messages} isStreaming={isStreaming} />

            {/* Input — mobile only; desktop bar handles input on desktop */}
            <div className="chat-drawer-input" style={{
              padding: "12px 16px",
              borderTop: "0.5px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              flexShrink: 0,
              background: "var(--bg)",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <textarea
                  ref={mobileInputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 500))}
                  onKeyDown={handleMobileKeyDown}
                  placeholder="Ask anything about Kerlos…"
                  disabled={isStreaming}
                  rows={1}
                  maxLength={500}
                  style={{
                    flex: 1,
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 14,
                    color: "var(--text)",
                    outline: "none",
                    resize: "none",
                    fontFamily: "inherit",
                    lineHeight: 1.5,
                    maxHeight: 120,
                    overflowY: "auto",
                    caretColor: "var(--accent)",
                    opacity: isStreaming ? 0.5 : 1,
                  }}
                />
                <button
                  onClick={handleSubmit}
                  disabled={isStreaming || !input.trim()}
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.2s, opacity 0.2s",
                    opacity: isStreaming || !input.trim() ? 0.45 : 1,
                  }}
                >
                  {isStreaming ? (
                    <div style={{
                      width: 14, height: 14,
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }} />
                  ) : (
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </div>
              {input.length > 400 && (
                <div style={{ fontSize: 11, color: input.length >= 500 ? "#c0392b" : "var(--muted)", textAlign: "right" }}>
                  {input.length} / 500
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
