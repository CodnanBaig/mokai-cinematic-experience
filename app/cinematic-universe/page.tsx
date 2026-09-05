import type { Metadata } from "next";
import Image from "next/image";
import CinematicReelGallery, { type CinematicReel } from "@/components/CinematicReelGallery";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { defaultSocialImage, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const reels: CinematicReel[] = [
  { code: "DcibxHUIXbS", kind: "reel" },
  { code: "Dbfa2vCCBGK", kind: "reel" },
  { code: "DaFZvXMKxN9", kind: "reel" },
  { code: "DWtESJCCGhS", kind: "post" },
  { code: "DWijU9wCEYB", kind: "post" },
  { code: "DVxyrMKCJxt", kind: "post" },
  { code: "DVu_Q59CDs4", kind: "reel" },
  { code: "DVnRZwXCGxt", kind: "reel" },
  { code: "DUkODQwCL9r", kind: "post" },
  { code: "DSO9xuFj8hH", kind: "reel" },
  { code: "DRee2rHiDom", kind: "post" },
  { code: "DROltK6j4nS", kind: "reel" },
  { code: "DQ4Lqi3iI9q", kind: "reel" },
  { code: "DMICpEJoqGk", kind: "reel" },
  { code: "DLSEUAcoBKa", kind: "post" },
  { code: "DJeM7bBoTcd", kind: "post" },
  { code: "DDFDMLVIDaT", kind: "post" },
  { code: "C-nOGLFyr10", kind: "post" },
  { code: "C9pIhSlSVLj", kind: "reel" },
  { code: "C5lRlngvPDI", kind: "reel" },
];

export const metadata: Metadata = {
  title: "Mokai Cinematic Universe",
  description:
    "Enter the Mokai Cinematic Universe: twenty stories from Mokai in Bandra, presented in an on-site cinematic archive.",
  alternates: {
    canonical: "/cinematic-universe",
  },
  openGraph: {
    title: "Mokai Cinematic Universe",
    description: "Watch the Mokai Cinematic Universe without leaving the site.",
    url: `${siteUrl}/cinematic-universe`,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokai Cinematic Universe",
    description: "Twenty stories. One Mokai universe.",
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
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              src="/images/mokai-window.webp"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroOverlay} aria-hidden="true" />

          <div className={styles.heroChrome}>
            <div className={styles.heroTopline} data-hero-animate>
              <span>MOKAI PRESENTS</span>
              <span>MCU / VOL. 01</span>
              <span>BANDRA · MUMBAI</span>
            </div>

            <div className={styles.heroTitle} data-hero-animate>
              <p>20 STORIES / ONE UNIVERSE</p>
              <h1>
                <span>MOKAI</span>
                <em>CINEMATIC</em>
                <span>UNIVERSE</span>
              </h1>
            </div>

            <div className={styles.heroBottom} data-reveal>
              <a href="#stories">
                <span>WATCH THE ARCHIVE</span>
                <strong aria-hidden="true">↘</strong>
              </a>
              <Image
                src="/brand/mokai-hanko-filled.svg"
                alt=""
                width={124}
                height={124}
                aria-hidden="true"
                className={styles.hanko}
              />
            </div>
          </div>
        </section>

        <section id="stories" className={styles.library} aria-labelledby="archive-title">
          <header className={styles.libraryHeader}>
            <p className={styles.eyebrow}>NOW SHOWING / 01—20</p>
            <div className={styles.libraryTitleRow}>
              <h2 id="archive-title">THE ARCHIVE</h2>
              <span>SELECT A STORY TO ENTER THE PLAYER</span>
            </div>
          </header>

          <CinematicReelGallery reels={reels} />
        </section>
      </main>

      <SiteFooter />
    </PageMotion>
  );
}
