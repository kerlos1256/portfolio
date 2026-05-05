"use client";

import { useState } from "react";
import { SectionWrapper } from "./section-wrapper";
import { ContactModal } from "./contact-modal";

export function ContactBand() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SectionWrapper>
        <div id="contact" className="contact-band-inner">
          <div>
            <h3 style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: "-0.5px",
              marginBottom: 6,
              color: "var(--text)",
            }}>
              Let&apos;s build something.
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>
              Available for new projects and long-term engagements.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              <span className="lang-badge">EN — Fluent</span>
              <span className="lang-badge">AR — Native</span>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary"
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Start a Project
          </button>
        </div>
      </SectionWrapper>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
