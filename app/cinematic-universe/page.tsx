import type { Metadata } from "next";
import Image from "next/image";
import CinematicReelGallery, { type CinematicReel } from "@/components/CinematicReelGallery";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { defaultSocialImage, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

export const revalidate = 3600;

const fallbackReels: CinematicReel[] = [
  { code: "DROltK6j4nS", label: "Mokai reel" },
  { code: "DVnRZwXCGxt", label: "Mokai reel" },
  { code: "DVxyrMKCJxt", label: "Mokai reel" },
  { code: "DVu_Q59CDs4", label: "Mokai reel" },
  { code: "DcibxHUIXbS", label: "Mokai reel" },
];

function extractShortcodes(html: string) {
  const codes: string[] = [];
  const patterns = [
    /href=["'][^"']*\/p\/([A-Za-z0-9_-]{6,20})\/?["']/g,
    /href=["'][^"']*\/reel\/([A-Za-z0-9_-]{6,20})\/?["']/g,
    /(?:shortcode|code)["'\s:=]+([A-Za-z0-9_-]{6,20})/g,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const code = match[1];
      if (code && !codes.includes(code)) codes.push(code);
    }
  }

  return codes;
}

async function getLatestReels(): Promise<CinematicReel[]> {
  try {
    const response = await fetch("https://imginn.com/reels/mokaiindia/", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);

    const html = await response.text();
    const codes = extractShortcodes(html).slice(0, 20);

    if (codes.length >= 12) {
      return codes.map((code) => ({ code, label: "Mokai reel" }));
    }
  } catch {
    // Public feed mirrors can occasionally throttle requests. The known embeds remain as a safe fallback.
  }

  return fallbackReels;
}

export const metadata: Metadata = {
  title: "Mokai Cinematic Universe",
  description:
    "Watch the latest Mokai reels on-site: episodic videos, recurring characters and stories from Mokai in Bandra.",
  alternates: {
    canonical: "/cinematic-universe",
  },
  openGraph: {
    title: "Mokai Cinematic Universe",
    description: "Watch Mokai's latest reels and recurring stories from Bandra.",
    url: `${siteUrl}/cinematic-universe`,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokai Cinematic Universe",
    description: "Watch the latest Mokai reels on-site.",
    images: [defaultSocialImage],
  },
};

export default async function CinematicUniversePage() {
  const reels = await getLatestReels();

  return (
    <PageMotion className={styles.page} id="top">
      <div className={styles.grain} aria-hidden="true" />
      <SiteNav />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy} data-hero-animate>
            <p className={styles.eyebrow}>MOKAI PRESENTS · BANDRA, MUMBAI</p>
            <h1>
              MOKAI<br />
              <em>CINEMATIC</em><br />
              UNIVERSE
            </h1>
            <p className={styles.intro}>The latest reels. Watch them here.</p>
          </div>

          <div className={styles.heroArt} data-reveal="clip">
            <div className={styles.heroImage} data-parallax-wrap>
              <Image
                src="/images/brand/interiors/frame-03.webp"
                alt="Inside Mokai in Bandra"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 42vw"
                data-parallax
                data-speed="-14"
              />
            </div>
            <Image
              className={styles.hanko}
              src="/brand/mokai-hanko-filled.svg"
              alt=""
              width={180}
              height={180}
              aria-hidden="true"
            />
            <div className={styles.heroStamp} aria-hidden="true">
              <span>LATEST</span>
              <span>01 — {String(reels.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section className={styles.library} aria-labelledby="reel-library-title">
          <header className={styles.libraryHeader}>
            <div>
              <p className={styles.eyebrow}>@MOKAIINDIA / LATEST REELS</p>
              <h2 id="reel-library-title">NOW<br /><em>playing.</em></h2>
            </div>
            <Image
              src="/brand/mokai-with-hanko-filled.svg"
              alt=""
              width={210}
              height={210}
              aria-hidden="true"
              className={styles.libraryMark}
            />
          </header>

          <CinematicReelGallery reels={reels} />
        </section>
      </main>

      <div data-reveal>
        <SiteFooter />
      </div>
    </PageMotion>
  );
}
