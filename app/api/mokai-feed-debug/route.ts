import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const codes = [
  "Dbfa2vCCBGK",
  "DcibxHUIXbS",
  "DaFZvXMKxN9",
  "DWtESJCCGhS",
  "DWijU9wCEYB",
  "DVxyrMKCJxt",
  "DVu_Q59CDs4",
  "DVnRZwXCGxt",
  "DUkODQwCL9r",
  "DSO9xuFj8hH",
  "DRee2rHiDom",
  "DROltK6j4nS",
  "DQ4Lqi3iI9q",
  "DMICpEJoqGk",
  "DLSEUAcoBKa",
  "DJeM7bBoTcd",
  "DDFDMLVIDaT",
  "C-nOGLFyr10",
  "C9pIhSlSVLj",
  "C5lRlngvPDI",
];

async function inspect(code: string) {
  try {
    const response = await fetch(`https://www.instagram.com/p/${code}/embed/`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        Referer: "https://www.instagram.com/",
      },
    });
    const text = await response.text();
    const lower = text.toLowerCase();
    const needles = [
      "video_url",
      "video_versions",
      "video_duration",
      "clips_metadata",
      "product_type\\\":\\\"clips",
      "product_type\":\"clips",
      "is_video\\\":true",
      "is_video\":true",
      "graphvideo",
      "video_default_cover_frame",
    ];
    const hits = needles.filter((needle) => lower.includes(needle.toLowerCase()));
    const mokai = lower.includes("mokaiindia") || lower.includes("mokai");
    return { code, status: response.status, length: text.length, hits, mokai };
  } catch (error) {
    return { code, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function GET() {
  const results = [];
  for (const code of codes) {
    results.push(await inspect(code));
  }
  return NextResponse.json({ results });
}
