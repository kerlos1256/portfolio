export function Footer() {
  return (
    <footer style={{ borderTop: "0.5px solid var(--border)", padding: "20px 0" }}>
      <div className="nav-inner">
        <div style={{ fontSize: 12, color: "var(--muted)" }}>© 2025 Kerlos G. · Cairo, Egypt</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--accent)" }}>
          <span className="avail-dot" />
          Open to work
        </div>
      </div>
    </footer>
  );
}
