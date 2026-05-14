"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";

const SYNE = "var(--font-syne), sans-serif";

interface Project {
  title: string;
  description: string;
  details?: string;
  impact?: string;
  tags: string[];
  images?: string[];
  url?: string;
  github?: string;
  year: number;
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (projects.length === 0) return null;

  return (
    <section id="work" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <SectionWrapper>
        <div className="section-label">
          <span className="section-label-text">Things I&apos;ve Built</span>
          <span className="section-line" />
        </div>
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} onClick={() => setSelected(project)} />
          ))}
        </div>
      </SectionWrapper>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const firstImage = project.images?.[0] ?? null;

  return (
    <button className="project-card" onClick={onClick} aria-label={`View ${project.title}`}>
      {project.impact && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: "rgba(196, 149, 42, 0.1)",
          borderRadius: "100px",
          padding: "3px 10px 3px 8px",
          margin: "12px 0 12px 12px",
          fontFamily: SYNE,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.07em",
          color: "#B8891E",
          textTransform: "uppercase",
          alignSelf: "flex-start",
        }}>
          <svg viewBox="0 0 24 24" width="11" height="11" fill="#B8891E">
            <path d="M12 2C12.5 5.5 15.5 9 20.5 10C15.5 11 12.5 14.5 12 18C11.5 14.5 8.5 11 3.5 10C8.5 9 11.5 5.5 12 2Z" />
            <path d="M19.5 1C19.8 2.8 21.2 4.2 23 4.5C21.2 4.8 19.8 6.2 19.5 8C19.2 6.2 17.8 4.8 16 4.5C17.8 4.2 19.2 2.8 19.5 1Z" />
          </svg>
          <span>{project.impact}</span>
        </div>
      )}
      <div className="project-card-image">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={project.title}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <div className="project-card-placeholder">
            <svg viewBox="0 0 80 54" width="72" height="48" fill="none">
              <rect x="3" y="3" width="74" height="48" rx="6" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.25" />
              <rect x="11" y="11" width="22" height="15" rx="3" fill="var(--accent)" fillOpacity="0.1" />
              <circle cx="55" cy="18" r="9" fill="var(--accent)" fillOpacity="0.08" />
              <rect x="11" y="32" width="58" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.08" />
              <rect x="11" y="39" width="38" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.08" />
            </svg>
          </div>
        )}
      </div>

      <div className="project-card-info">
        <div style={{
          fontFamily: SYNE,
          fontWeight: 700,
          fontSize: 15,
          color: "var(--text)",
          marginBottom: 10,
          lineHeight: 1.3,
          textAlign: "left",
        }}>
          {project.title}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, textAlign: "left" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag" style={{ cursor: "default", fontSize: 11, padding: "3px 9px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 1) {
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--surface2)", flexShrink: 0 }}>
        <Image src={images[0]} alt="Screenshot" fill style={{ objectFit: "cover", objectPosition: "top" }} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--surface2)", flexShrink: 0 }}>
      <Image
        src={images[index]}
        alt={`Screenshot ${index + 1} of ${images.length}`}
        fill
        style={{ objectFit: "cover", objectPosition: "top" }}
      />

      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length); }}
        aria-label="Previous image"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % images.length); }}
        aria-label="Next image"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === index ? 18 : 6,
              height: 6,
              borderRadius: 3,
              background: i === index ? "white" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.2s, background 0.2s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const images = project.images?.filter(Boolean) ?? [];
  const hasUrl = Boolean(project.url);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(42, 42, 37, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        paddingTop: "calc(57px + 24px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          border: "0.5px solid var(--accent-border)",
          borderRadius: 20,
          width: "100%",
          maxWidth: 580,
          maxHeight: "85vh",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Close — sits above the carousel, outside scroll */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: images.length > 0 ? "rgba(42,42,37,0.55)" : "var(--surface2)",
            backdropFilter: images.length > 0 ? "blur(4px)" : "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: images.length > 0 ? "white" : "var(--muted)",
            zIndex: 2,
          }}
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1, display: "flex", flexDirection: "column" }}>
          {images.length > 0 && <Carousel images={images} />}

          <div style={{ padding: "24px 24px 28px" }}>
            <div style={{
              fontFamily: SYNE,
              fontWeight: 800,
              fontSize: 20,
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: 14,
              paddingRight: 20,
            }}>
              {project.title}
            </div>

            <div style={{
              fontSize: 14,
              color: "rgba(42,42,37,0.65)",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: 20,
            }}>
              {project.details ?? project.description}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag" style={{ cursor: "default" }}>{tag}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {/* Visit Site — always rendered, disabled with tooltip when no URL */}
              <div className="project-visit-wrapper">
                {hasUrl ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: 13 }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit Site
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-primary"
                    style={{ fontSize: 13, opacity: 0.4, cursor: "not-allowed" }}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit Site
                  </button>
                )}
                {!hasUrl && <div className="project-visit-tooltip">Preview unavailable</div>}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: 13 }}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
