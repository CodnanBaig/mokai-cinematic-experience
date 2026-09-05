import type { Metadata } from "next";
import Image from "next/image";
import CinematicReelGallery, { type CinematicReel } from "@/components/CinematicReelGallery";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { defaultSocialImage, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const reels: CinematicReel[] = [
  { code: "DcibxHUIXbS", label: "Mokai reel" },
  { code: "Dbfa2vCCBGK", label: "Mokai reel" },
  { code: "DaFZvXMKxN9", label: "Mokai reel" },
  { code: "DWtESJCCGhS", label: "Mokai reel" },
  { code: "DWijU9wCEYB", label: "Mokai reel" },
  { code: "DVxyrMKCJxt", label: "Mokai reel" },
  { code: "DVu_Q59CDs4", label: "Mokai reel" },
  { code: "DVnRZwXCGxt", label: "Mokai reel" },
  { code: "DUkODQwCL9r", label: "Mokai reel" },
  { code: "DSO9xuFj8hH", label: "Mokai reel" },
  { code: "DRee2rHiDom", label: "Mokai reel" },
  { code: "DROltK6j4nS", label: "Mokai reel" },
  { code: "DQ4Lqi3iI9q", label: "Mokai reel" },
  { code: "DMICpEJoqGk", label: "Mokai reel" },
  { code: "DLSEUAcoBKa", label: "Mokai reel" },
  { code: "DJeM7bBoTcd", label: "Mokai reel" },
  { code: "DDFDMLVIDaT", label: "Mokai reel" },
  { code: "C-nOGLFyr10", label: "Mokai reel" },
  { code: "C9pIhSlSVLj", label: "Mokai reel" },
  { code: "C5lRlngvPDI", label: "Mokai reel" },
];

export const metadata: Metadata = {
  title: "Mokai Cinematic Universe",
  description:
    "Watch the Mokai Cinematic Universe on-site: twenty embedded videos, recurring characters and stories from Mokai in Bandra.",
  alternates: {
    canonical: "/cinematic-universe",
  },
  openGraph: {
    title: "Mokai Cinematic Universe",
    description: "Watch Mokai's reel series and recurring stories from Bandra without leaving the site.",
    url: `${siteUrl}/cinematic-universe`,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokai Cinematic Universe",
    description: "Watch twenty Mokai reels on-site.",
    images: [defaultSocialImage],
  },
};

export default function CinematicUniversePage() {
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
            <p className={styles.intro}>Twenty reels. One universe. Watch them here.</p>
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
              <span>WATCH ALL</span>
              <span>01 — 20</span>
            </div>
          </div>
        </section>

        <section className={styles.library} aria-labelledby="reel-library-title">
          <header className={styles.libraryHeader}>
            <div>
              <p className={styles.eyebrow}>@MOKAIINDIA / REEL ARCHIVE</p>
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
