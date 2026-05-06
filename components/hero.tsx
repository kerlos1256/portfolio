"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SYNE = "var(--font-syne), sans-serif";

export function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="about" style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="hero-grid">
        {/* Left */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Avatar — mobile only */}
          <div className="hero-avatar">
            <button
              onClick={() => setLightboxOpen(true)}
              style={{ background: "none", border: "none", padding: 0, cursor: "zoom-in" }}
            >
              <div style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "2px solid var(--accent-border)",
                background: "var(--surface2)",
                position: "relative",
                transition: "border-color 0.2s, transform 0.2s",
              }}>
                <Image
                  src="/photo.png"
                  alt="Kerlos G."
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </button>
            <div>
              <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 3 }}>
                Kerlos G.
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Cairo, Egypt</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div className="badge-pill">
              <span className="badge-dot" />
              Top Rated Plus · Upwork
            </div>
            <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>Cairo, Egypt</span>
          </div>

          <h1 style={{
            fontFamily: SYNE,
            fontWeight: 800,
            fontSize: "clamp(40px, 7vw, 70px)",
            lineHeight: 1.03,
            letterSpacing: "-2px",
            marginBottom: 8,
            color: "var(--text)",
          }}>
            Kerlos<br />
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>G.</em>
          </h1>

          <p style={{
            fontFamily: SYNE,
            fontWeight: 500,
            fontSize: "clamp(13px, 2vw, 16px)",
            color: "var(--muted)",
            letterSpacing: "0.02em",
            marginBottom: 28,
          }}>
            Senior Full Stack Architect · Next.js · SaaS · AI
          </p>

          <p style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "rgba(42,42,37,0.6)",
            maxWidth: 480,
            fontWeight: 300,
            marginBottom: 40,
          }}>
            I build high-performance, scalable applications that hold up under real pressure —
            from FinTech APIs to AI-integrated SaaS platforms, turning complex requirements into
            clean production code.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Photo — hidden on mobile via .hero-photo-col */}
        <motion.div
          className="hero-photo-col"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          <div style={{
            width: 260,
            height: 340,
            borderRadius: 16,
            background: "var(--surface2)",
            border: "0.5px solid var(--border)",
            overflow: "hidden",
            position: "relative",
          }}>
            <Image
              src="/photo.png"
              alt="Kerlos G."
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div style={{ position: "absolute", left: -4, top: 24, bottom: 24, width: 2, background: "var(--accent)", borderRadius: 2, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: -4, left: 24, right: 24, height: 2, background: "var(--accent)", borderRadius: 2, opacity: 0.5 }} />
          <div style={{ position: "absolute", bottom: -8, left: -8, width: 10, height: 10, borderRadius: "50%", background: "var(--accent)", opacity: 0.7 }} />
        </motion.div>
      </div>

      {/* Score row */}
      <motion.div
        className="score-row"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {[
          { num: "100", sup: "%", label: "Job Success" },
          { num: "5", sup: "+", label: "Years Experience" },
          { num: "5.0", sup: "★", label: "Average Rating" },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 28, letterSpacing: "-1px", color: "var(--text)" }}>
              {s.num}<span style={{ color: "var(--accent)", fontSize: 18 }}>{s.sup}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(42, 42, 37, 0.85)",
              backdropFilter: "blur(8px)",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "zoom-out",
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ position: "relative", width: "min(340px, 80vw)", aspectRatio: "3/4" }}
            >
              <Image
                src="/photo.png"
                alt="Kerlos G."
                fill
                style={{ objectFit: "cover", objectPosition: "center top", borderRadius: 16 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoPlaceholder() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <svg style={{ opacity: 0.18 }} width="90" height="110" viewBox="0 0 90 110" fill="none">
        <ellipse cx="45" cy="35" rx="24" ry="26" fill="#6B7C5C" />
        <path d="M4 108 C4 78 86 78 86 108" fill="#6B7C5C" />
      </svg>
      <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--accent)", opacity: 0.7, textTransform: "uppercase", fontWeight: 500, position: "relative", zIndex: 2 }}>
        Your photo here
      </span>
    </div>
  );
}
