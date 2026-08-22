import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  const baseURL = process.env.PAGE_AGENT_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const apiKey = process.env.PAGE_AGENT_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key not configured on server" }, { status: 500 });
  }

  const targetPath = path ? path.join("/") : "";
  const body = await request.json();

  const response = await fetch(`${baseURL}/${targetPath}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (response.headers.get("content-type")?.includes("text/event-stream")) {
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  const data = await response.json();
  return Response.json(data);
}
