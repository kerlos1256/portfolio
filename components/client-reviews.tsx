import { SectionWrapper } from "./section-wrapper";

const SYNE = "var(--font-syne), sans-serif";

const qualities = [
  {
    title: "Committed to Quality",
    desc: "Clean, production-ready code that holds up long after delivery.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: "Collaborative",
    desc: "I work with your team, not just for it — clear communication throughout.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Reliable",
    desc: "Deadlines respected. No surprises. Consistent delivery on every project.",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export function ClientReviews() {
  return (
    <section style={{ paddingTop: 72, paddingBottom: 72 }}>
      <SectionWrapper>
        <div className="section-label">
          <span className="section-label-text">Client Reviews</span>
          <span className="section-line" />
        </div>
        <div className="qualities-grid">
          {qualities.map((q) => (
            <div key={q.title} className="quality-card">
              <div className="quality-icon-box">{q.icon}</div>
              <div style={{ fontFamily: SYNE, fontWeight: 700, fontSize: 14, marginBottom: 6, color: "var(--text)" }}>
                {q.title}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                {q.desc}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
