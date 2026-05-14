"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Reviews", href: "#reviews" },
];

const UPWORK_URL = "https://www.upwork.com/freelancers/carlosworks?mp_source=share";

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "0.5px solid var(--border)",
        background: "rgba(247,244,238,0.88)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="nav-inner">
        <div style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: "-0.5px",
          color: "var(--text)",
        }}>
          K<span style={{ color: "var(--accent)" }}>.</span>G
        </div>
        <ul className="nav-links" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a
          href={UPWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ fontSize: 13 }}
        >
          Hire me on Upwork
        </a>
      </div>
    </motion.nav>
  );
}
