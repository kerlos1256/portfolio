interface Props {
  role: "user" | "assistant" | "system";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: Props) {
  if (role === "system") {
    return (
      <div style={{
        textAlign: "center",
        fontSize: 12,
        color: "var(--muted)",
        padding: "4px 12px",
      }}>
        {content}
      </div>
    );
  }

  const isUser = role === "user";

  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div style={{
        maxWidth: "82%",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        padding: "10px 14px",
        fontSize: 14,
        lineHeight: 1.65,
        background: isUser ? "var(--accent)" : "var(--surface)",
        color: isUser ? "#fff" : "var(--text)",
        border: isUser ? "none" : "0.5px solid var(--border)",
        fontWeight: isUser ? 400 : 300,
      }}>
        {content}
        {isStreaming && role === "assistant" && (
          <span style={{
            display: "inline-block",
            width: 2,
            height: 14,
            background: "var(--accent)",
            marginLeft: 2,
            verticalAlign: "middle",
            animation: "pulse 1s ease-in-out infinite",
          }} />
        )}
      </div>
    </div>
  );
}
