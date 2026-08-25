import { NextRequest } from "next/server";

export const runtime = "nodejs";

const ALLOWED_PATH = "chat/completions";
const MAX_BODY_CHARS = 32 * 1024;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const MAX_BUCKET_SIZE = 10_000;

const buckets = new Map<string, { count: number; resetAt: number }>();

function sweepBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (buckets.size > MAX_BUCKET_SIZE) sweepBuckets(now);
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isValidMessage(message: unknown): boolean {
  if (typeof message !== "object" || message === null) return false;
  const m = message as { role?: unknown; content?: unknown };
  if (typeof m.role !== "string") return false;
  if (typeof m.content === "string") return true;
  if (Array.isArray(m.content)) {
    return m.content.every(
      (part) => typeof part === "object" && part !== null && typeof (part as { type?: unknown }).type === "string"
    );
  }
  return false;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const apiKey = process.env.PAGE_AGENT_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key not configured on server" }, { status: 500 });
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const { path } = await params;
  const targetPath = path ? path.join("/") : "";
  if (targetPath !== ALLOWED_PATH) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (!text || text.length > MAX_BODY_CHARS) {
      return Response.json({ error: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = body as {
    model?: unknown;
    messages?: unknown;
    stream?: unknown;
    temperature?: unknown;
    max_tokens?: unknown;
  };

  const valid =
    typeof parsed.model === "string" &&
    parsed.model.length <= 128 &&
    Array.isArray(parsed.messages) &&
    parsed.messages.length > 0 &&
    parsed.messages.length <= 30 &&
    parsed.messages.every(isValidMessage) &&
    (parsed.stream === undefined || typeof parsed.stream === "boolean") &&
    (parsed.temperature === undefined || typeof parsed.temperature === "number") &&
    (parsed.max_tokens === undefined || typeof parsed.max_tokens === "number");

  if (!valid) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const baseURL =
    process.env.PAGE_AGENT_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";

  let response: globalThis.Response;
  try {
    response = await fetch(`${baseURL}/${ALLOWED_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(parsed),
    });
  } catch {
    return Response.json({ error: "Upstream service unavailable" }, { status: 502 });
  }

  if (response.headers.get("content-type")?.includes("text/event-stream")) {
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  try {
    const data = await response.json();
    return Response.json(data, { status: response.status });
  } catch {
    return Response.json({ error: "Upstream error" }, { status: 502 });
  }
}
