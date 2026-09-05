import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function inspect(url: string) {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const html = await response.text();
    const hrefs = Array.from(html.matchAll(/href=["']([^"']+)["']/g)).map((m) => m[1]);
    const interesting = hrefs.filter((href) => /mokai|\/p\/|\/reel\/|page|more|ajax|load/i.test(href));
    const scripts = Array.from(html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)).map((m) => m[1]);
    return {
      url,
      status: response.status,
      length: html.length,
      interesting: Array.from(new Set(interesting)).slice(0, 120),
      scripts: Array.from(new Set(scripts)).slice(0, 40),
      sample: html.slice(0, 8000),
    };
  } catch (error) {
    return { url, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function GET() {
  return NextResponse.json({
    reels: await inspect("https://imginn.com/reels/mokaiindia/"),
    profile: await inspect("https://imginn.com/mokaiindia/"),
  });
}
