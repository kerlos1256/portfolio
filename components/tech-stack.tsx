import { SectionWrapper } from "./section-wrapper";

const SYNE = "var(--font-syne), sans-serif";

const stackGroups = [
  {
    col: "left",
    groups: [
      { title: "Frontend", tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux / Zustand"] },
      { title: "Backend", tags: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "GraphQL", "WebSockets"] },
    ],
  },
  {
    col: "right",
    groups: [
      { title: "Infrastructure", tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"] },
      { title: "AI & Integrations", tags: ["LLM / AI Apps", "AI Chatbots", "Twilio API", "REST / GraphQL APIs"] },
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <SectionWrapper>
        <div className="section-label">
          <span className="section-label-text">Tech Stack</span>
          <span className="section-line" />
        </div>
        <div className="stack-grid">
          {stackGroups.map((col) => (
            <div key={col.col}>
              {col.groups.map((group, i) => (
                <div key={group.title} style={{ marginBottom: i < col.groups.length - 1 ? 24 : 0 }}>
                  <div style={{
                    fontFamily: SYNE,
                    fontWeight: 600,
                    fontSize: 12,
                    color: "var(--accent)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}>
                    {group.title}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
