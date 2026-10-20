import { NextResponse } from "next/server";
import { search } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const query = (new URL(request.url).searchParams.get("q") || "").trim().slice(0, 100);
  if (query.length < 2) {
    return NextResponse.json({ results: [] });
  }
  return NextResponse.json({ results: search(query).slice(0, 20) });
}
