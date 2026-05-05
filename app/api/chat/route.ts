import Anthropic from "@anthropic-ai/sdk";
import { freelancerData } from "@/lib/freelancer-data";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { getPerMinuteLimit, getPerDayLimit, getIp } from "@/lib/rate-limit";

const anthropic = new Anthropic();

const MAX_INPUT_LENGTH = 500;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const ip = getIp(request);

  const [perMin, perDay] = await Promise.all([
    getPerMinuteLimit().limit(ip),
    getPerDayLimit().limit(ip),
  ]);

  if (!perMin.success) {
    const retryAfter = Math.ceil((perMin.reset - Date.now()) / 1000);
    return Response.json(
      { error: "Too many requests. Please wait before asking another question.", retryAfter },
      { status: 429 }
    );
  }

  if (!perDay.success) {
    return Response.json(
      { error: "Daily limit reached. Please come back tomorrow.", retryAfter: 86400 },
      { status: 429 }
    );
  }

  let messages: Message[];
  try {
    const body = await request.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages." }, { status: 400 });
    }
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content || lastMessage.content.length > MAX_INPUT_LENGTH) {
    return Response.json(
      { error: `Message too long. Please keep it under ${MAX_INPUT_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const systemPrompt = buildSystemPrompt(freelancerData);

  const stream = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
        }
        if (event.type === "message_stop") controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
