import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://www.instagram.com/mokaiindia/embed/", {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        Referer: "https://www.instagram.com/",
      },
    });
    const text = await response.text();
    const matches = Array.from(text.matchAll(/(?:\/p\/|\/reel\/)([A-Za-z0-9_-]{6,20})/g)).map((m) => m[1]);
    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      length: text.length,
      codes: Array.from(new Set(matches)).slice(0, 50),
      sample: text.slice(0, 5000),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
