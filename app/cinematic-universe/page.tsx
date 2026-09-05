import type { Metadata } from "next";
import Image from "next/image";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { defaultSocialImage, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

type Reel = {
  code: string;
  path: "p" | "reel";
  label: string;
  series: string;
};

const reels: Reel[] = [
  {
    code: "DROltK6j4nS",
    path: "reel",
    label: "The Office with Team Mokai",
    series: "THE OFFICE",
  },
  {
    code: "DVxyrMKCJxt",
    path: "p",
    label: "How Mokai Started",
    series: "HOW MOKAI STARTED",
  },
  {
    code: "DVu_Q59CDs4",
    path: "reel",
    label: "How Mokai Started",
    series: "HOW MOKAI STARTED",
  },
  {
    code: "DcibxHUIXbS",
    path: "p",
    label: "Every Corner Has a Story",
    series: "MOKAI STORIES",
  },
];

export const metadata: Metadata = {
  title: "Mokai Cinematic Universe",
  description:
    "Watch the Mokai Cinematic Universe on-site: episodic reels, recurring characters and stories from Mokai in Bandra.",
  alternates: {
    canonical: "/cinematic-universe",
  },
  openGraph: {
    title: "Mokai Cinematic Universe",
    description: "Watch Mokai's reel series and recurring stories from Bandra.",
    url: `${siteUrl}/cinematic-universe`,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokai Cinematic Universe",
    description: "Watch the Mokai Cinematic Universe on-site.",
    images: [defaultSocialImage],
  },
};

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const embed = `https://www.instagram.com/${reel.path}/${reel.code}/embed/`;

  return (
    <article className={styles.reelCard} data-reveal="clip">
      <div className={styles.reelMeta}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{reel.series}</span>
      </div>
      <div className={styles.reelViewport}>
        <iframe
          className={styles.reelEmbed}
          src={embed}
          title={`Mokai reel ${index + 1}: ${reel.label}`}
          loading={index < 2 ? "eager" : "lazy"}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          scrolling="no"
        />
      </div>
    </article>
  );
}

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
            <p className={styles.intro}>Watch the story unfold without leaving Mokai.</p>
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
              <span>PLAY ALL</span>
              <span>01 — {String(reels.length).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section className={styles.library} aria-labelledby="reel-library-title">
          <header className={styles.libraryHeader}>
            <div>
              <p className={styles.eyebrow}>MOKAI / REEL ARCHIVE</p>
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

          <div className={styles.reelGrid}>
            {reels.map((reel, index) => (
              <ReelCard key={reel.code} reel={reel} index={index} />
            ))}
          </div>
        </section>
      </main>

      <div data-reveal>
        <SiteFooter />
      </div>
    </PageMotion>
  );
}
