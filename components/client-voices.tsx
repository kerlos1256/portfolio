import { SectionWrapper } from "./section-wrapper";

const quotes = [
  "Your <em>expertise in TypeScript, React.js, and Next.js</em> has been outstanding, and your progress has been impressive. I have truly enjoyed working with you and appreciate your excellent contributions.",
  "Kerlos is a <em>very talented programmer</em>. I really enjoyed working with him. He <em>advanced our project greatly</em> and consistently brought strong technical thinking to every challenge.",
  "Kerlos has been an <em>incredible source of assistance</em>, completing every task with ease. I started giving him increasingly challenging tasks just to test his limits — he delivered every time.",
  "He worked on the project for over <em>a year and a half</em>. A dedicated professional who stays committed throughout the full engagement — not just the early stages.",
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 9,
            height: 9,
            background: "var(--accent)",
            clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          }}
        />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="verified-badge">
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified Client on Upwork
    </div>
  );
}

export function ClientVoices() {
  return (
    <section id="reviews" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <SectionWrapper>
        <div className="section-label">
          <span className="section-label-text">Client Voices</span>
          <span className="section-line" />
        </div>
        <div className="quotes-grid">
          {quotes.map((quote, i) => (
            <div key={i} className="quote-card">
              <span style={{
                position: "absolute",
                top: 14,
                right: 18,
                fontFamily: "Georgia, serif",
                fontSize: 52,
                lineHeight: 1,
                color: "var(--accent)",
                opacity: 0.15,
                pointerEvents: "none",
                userSelect: "none",
              }}>
                &ldquo;
              </span>
              <p
                style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(42,42,37,0.65)", fontStyle: "italic", fontWeight: 300 }}
                dangerouslySetInnerHTML={{
                  __html: quote.replace(/<em>/g, '<em style="color:var(--accent);font-style:normal;font-weight:500">'),
                }}
              />
              <div className="quote-footer">
                <Stars />
                <VerifiedBadge />
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
