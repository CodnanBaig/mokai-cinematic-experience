import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch("https://www.instagram.com/api/v1/users/web_profile_info/?username=mokaiindia", {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        "X-IG-App-ID": "936619743392459",
        Accept: "*/*",
        Referer: "https://www.instagram.com/mokaiindia/",
      },
    });
    const text = await response.text();
    let data: unknown = null;
    try { data = JSON.parse(text); } catch {}
    return NextResponse.json({ status: response.status, ok: response.ok, data, sample: text.slice(0, 2000) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
