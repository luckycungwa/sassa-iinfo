const publisherId = (process.env.NEXT_PUBLIC_ADSENSE_ID || "").trim();

function normalizePublisherId(id: string): string {
  const base = id.replace(/^ca-/, "");
  return base.startsWith("pub-") ? base : base ? `pub-${base}` : "";
}

export function GET() {
  const pub = normalizePublisherId(publisherId);
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Google AdSense publisher ID not configured yet.\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
