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
            className="btn-primary"
            
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <a target='_blank' href="https://www.upwork.com/freelancers/carlosworks?mp_source=share">
            Hire me on Upwork
            </a>
          </button>
        </div>
      </SectionWrapper>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
