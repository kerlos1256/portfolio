"use client";

import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
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
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
