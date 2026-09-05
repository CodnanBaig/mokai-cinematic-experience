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
    const patterns = [
      /"shortcode"\s*:\s*"([A-Za-z0-9_-]{6,20})"/g,
      /\\"shortcode\\"\s*:\s*\\"([A-Za-z0-9_-]{6,20})\\"/g,
      /"code"\s*:\s*"([A-Za-z0-9_-]{6,20})"/g,
      /\\"code\\"\s*:\s*\\"([A-Za-z0-9_-]{6,20})\\"/g,
      /(?:\/p\/|\/reel\/)([A-Za-z0-9_-]{6,20})/g,
    ];
    const codes: string[] = [];
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) {
        if (match[1] && !codes.includes(match[1])) codes.push(match[1]);
      }
    }
    const keywordSnippets = ["shortcode", "xdt_api__v1__feed", "mokaiindia"].flatMap((keyword) => {
      const snippets: string[] = [];
      let from = 0;
      while (snippets.length < 8) {
        const index = text.indexOf(keyword, from);
        if (index < 0) break;
        snippets.push(text.slice(Math.max(0, index - 180), index + 380));
        from = index + keyword.length;
      }
      return snippets;
    });
    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      length: text.length,
      codes: codes.slice(0, 80),
      keywordSnippets,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
