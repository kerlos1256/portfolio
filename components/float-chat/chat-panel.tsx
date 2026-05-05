import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface Props {
  messages: Message[];
  isStreaming: boolean;
}

export function ChatPanel({ messages, isStreaming }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: "16px 16px 8px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      {messages.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 16px" }}>
          <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 300, lineHeight: 1.6 }}>
            Ask me anything about Kerlos — his skills, experience, availability, or rates.
          </p>
        </div>
      )}
      {messages.map((msg, i) => (
        <ChatMessage
          key={i}
          role={msg.role}
          content={msg.content}
          isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
