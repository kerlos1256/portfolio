import { SectionWrapper } from "./section-wrapper";

const SYNE = "var(--font-syne), sans-serif";

const cards = [
  {
    title: "Performance",
    desc: "Slow MVP? I optimize load times and database queries until your app is fast under real load.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    desc: "Adding LLMs and AI features into your existing TypeScript stack cleanly and reliably.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Scale",
    desc: "NestJS/Node backend struggling? I architect systems designed to handle real user growth.",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

export function WhatISolve() {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 72 }}>
      <SectionWrapper>
        <div className="section-label">
          <span className="section-label-text">What I solve</span>
          <span className="section-line" />
        </div>
        <div className="what-i-solve-grid">
          {cards.map((card) => (
            <div key={card.title} className="do-card">
              <div className="do-icon-box">{card.icon}</div>
              <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 15, marginBottom: 8, color: "var(--text)" }}>
                {card.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, fontWeight: 300 }}>
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
