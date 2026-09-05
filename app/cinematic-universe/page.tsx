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
    "Watch the Mokai Cinematic Universe on-site: reels and photo posts, recurring characters and stories from Mokai in Bandra.",
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
    description: "Explore Mokai's reels and photo stories.",
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
            <p className={styles.intro}>Familiar faces. Unscripted moments. A little Bandra drama.</p>
            <a className={styles.heroLink} href="#stories">Explore the stories <span aria-hidden="true">↘</span></a>
          </div>

          <div className={styles.heroArt} data-reveal="clip">
            <div className={styles.heroImage} data-parallax-wrap>
              <Image
                src="/images/mokai-window.webp"
                alt="Sunlit windows and patterned cushions from the Mokai archive"
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
              <span>THE MOKAI EDIT</span>
              <span>20 STORIES</span>
            </div>
          </div>
        </section>

        <section id="stories" className={styles.library} aria-labelledby="reel-library-title">
          <header className={styles.libraryHeader}>
            <div>
              <p className={styles.eyebrow}>THE SOCIAL SIDE OF MOKAI</p>
              <h2 id="reel-library-title">Off the clock.<br /><em>On your feed.</em></h2>
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

      <SiteFooter />
    </PageMotion>
  );
}
