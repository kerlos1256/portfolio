"use client";

import { useState, useEffect } from "react";

const sections = [
  {
    id: "about",
    label: "About",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "stack",
    label: "Stack",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export function SectionNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const visibility: Record<string, number> = {};

    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibility[id] = entry.intersectionRatio;
          const top = Object.entries(visibility).sort((a, b) => b[1] - a[1])[0];
          if (top && top[1] > 0) setActive(top[0]);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -15% 0px" }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="section-nav-pill" role="navigation" aria-label="Section navigation">
      {sections.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`section-nav-btn${active === id ? " active" : ""}`}
          aria-label={label}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
