"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export function ContactModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  function handleClose() {
    if (status === "loading") return;
    setStatus("idle");
    setErrorMsg("");
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(42, 42, 37, 0.4)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
            }}
          />

          {/* Modal — outer div handles centering, motion.div handles animation */}
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(520px, calc(100vw - 32px))",
            zIndex: 101,
          }}>
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "var(--bg)",
              border: "0.5px solid var(--border)",
              borderRadius: 16,
              padding: "36px 32px 32px",
              boxShadow: "0 24px 64px rgba(42, 42, 37, 0.12)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "-0.3px",
                  color: "var(--text)",
                  marginBottom: 4,
                }}>
                  Start a Project
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300 }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: 4,
                  lineHeight: 1,
                  fontSize: 20,
                }}
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <div style={{
                textAlign: "center",
                padding: "32px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--accent-dim)",
                  border: "0.5px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: 16, color: "var(--text)" }}>
                  Message sent!
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300 }}>
                  Thanks {name || ""}. I&apos;ll be in touch soon.
                </p>
                <button className="btn-ghost" onClick={handleClose} style={{ marginTop: 8 }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Message
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project — what you're building, timeline, and budget if you have one."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ fontSize: 13, color: "#c0392b", background: "rgba(192,57,43,0.06)", border: "0.5px solid rgba(192,57,43,0.2)", borderRadius: 8, padding: "10px 14px" }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary"
                  style={{ marginTop: 4, justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "0.5px solid var(--border)",
  borderRadius: 8,
  padding: "10px 14px",
  fontSize: 14,
  color: "var(--text)",
  outline: "none",
  width: "100%",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};
