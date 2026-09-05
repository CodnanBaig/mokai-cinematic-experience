import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clapperboard, Play } from "lucide-react";
import PageMotion from "@/components/PageMotion";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { defaultSocialImage, siteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const featuredReel = {
  title: "The washroom class",
  eyebrow: "NOW SHOWING · MOKAI CINEMATIC UNIVERSE",
  permalink: "https://www.instagram.com/p/DcibxHUIXbS/",
  embed: "https://www.instagram.com/p/DcibxHUIXbS/embed/captioned/",
};

export const metadata: Metadata = {
  title: "Mokai Cinematic Universe",
  description:
    "Enter the Mokai Cinematic Universe: the people, chaos, coffee and recurring stories from Mokai's Instagram series in Bandra.",
  alternates: {
    canonical: "/cinematic-universe",
  },
  openGraph: {
    title: "Mokai Cinematic Universe",
    description:
      "The café is the set. The people are the cast. Watch the Mokai Cinematic Universe from Bandra.",
    url: `${siteUrl}/cinematic-universe`,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mokai Cinematic Universe",
    description: "Watch the stories, characters and chaos behind Mokai in Bandra.",
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
            <p className={styles.kicker}>A VERY SERIOUS PRODUCTION ABOUT A VERY UNSERIOUS CAFÉ.</p>
            <h1>
              MOKAI<br />
              <em>CINEMATIC</em><br />
              UNIVERSE
            </h1>
            <p className={styles.intro}>
              Coffee gets poured. Plans go sideways. People become characters. Somewhere between service and closing time, another episode happens.
            </p>
            <a
              className={styles.heroCta}
              href="#now-showing"
              aria-label="Watch the Mokai Cinematic Universe"
            >
              <Play size={15} fill="currentColor" aria-hidden="true" />
              Watch now
            </a>
          </div>

          <div className={styles.heroVisual} data-reveal="clip">
            <div className={styles.heroFrame} data-parallax-wrap>
              <Image
                src="/images/brand/interiors/frame-03.webp"
                alt="Inside Mokai in Bandra"
                fill
                priority
                sizes="(max-width: 900px) 92vw, 44vw"
                data-parallax
                data-speed="-16"
              />
            </div>
            <div className={styles.poster} data-parallax-wrap>
              <Image
                src="/images/brand/restroom/poster-09.webp"
                alt="Mokai graphic poster artwork"
                fill
                sizes="(max-width: 900px) 34vw, 13vw"
                data-parallax
                data-speed="-8"
              />
            </div>
            <Image
              className={styles.hanko}
              src="/brand/mokai-hanko-filled.svg"
              alt=""
              width={180}
              height={180}
              aria-hidden="true"
              data-reveal="scale"
            />
            <div className={styles.frameMeta} aria-hidden="true">
              <span>MCU / 001</span>
              <span>ROLL CAMERA</span>
            </div>
          </div>
        </section>

        <section className={styles.manifesto}>
          <div className={styles.manifestoMark} data-reveal="scale">
            <Clapperboard aria-hidden="true" />
          </div>
          <div className={styles.manifestoCopy}>
            <p className={styles.eyebrow} data-reveal="right">NOT JUST ANOTHER CONTENT SERIES</p>
            <h2 data-scrub="fade-scale">
              THE CAFÉ IS<br /><em>the set.</em>
            </h2>
            <p data-reveal="right">
              The Mokai Cinematic Universe lives somewhere between a reel, a sitcom and whatever happened during the last shift. Recurring faces, running jokes and the kind of moments you could never plan properly anyway.
            </p>
          </div>
        </section>

        <section className={styles.nowShowing} id="now-showing">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow} data-reveal="left">{featuredReel.eyebrow}</p>
              <h2 data-reveal="left">NOW<br /><em>showing.</em></h2>
            </div>
            <div className={styles.sectionNote} data-reveal="right">
              <span>EPISODE / FEATURED</span>
              <p>Watch inside the Mokai frame, then keep going on Instagram when the rabbit hole gets you.</p>
            </div>
          </div>

          <div className={styles.featureGrid}>
            <article className={styles.reelStage} data-reveal="clip">
              <div className={styles.reelTopline}>
                <span>PLAYING</span>
                <span>@MOKAIINDIA</span>
              </div>
              <div className={styles.reelShell}>
                <iframe
                  className={styles.reelEmbed}
                  src={featuredReel.embed}
                  title={`Mokai Instagram reel: ${featuredReel.title}`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className={styles.reelCaption}>
                <span>001</span>
                <div>
                  <p>{featuredReel.title}</p>
                  <a href={featuredReel.permalink} target="_blank" rel="noreferrer">
                    Open on Instagram <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            <aside className={styles.sideStory}>
              <div className={styles.sideArt} data-reveal="clip" data-parallax-wrap>
                <Image
                  src="/images/brand/restroom/poster-06.webp"
                  alt="Mokai poster artwork"
                  fill
                  sizes="(max-width: 900px) 90vw, 32vw"
                  data-parallax
                  data-speed="-13"
                />
              </div>
              <div className={styles.sideCopy} data-reveal="right">
                <p className={styles.eyebrow}>BEHIND THE SCENES</p>
                <h3>EVERY CORNER<br />HAS A STORY.</h3>
                <p>
                  The universe works because the room is part of the cast too: mirrors, posters, coffee bars, odd conversations and the people who keep showing up in the next episode.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.archive}>
          <div className={styles.archiveCopy}>
            <p className={styles.eyebrow} data-reveal="left">THE UNIVERSE KEEPS EXPANDING</p>
            <h2 data-reveal="left">FOLLOW THE<br /><em>whole plot.</em></h2>
            <p data-reveal="left">
              New reels, recurring characters and side quests continue on @mokaiindia. The profile below stays connected to the source, so Mokai's own Instagram remains the canonical home of the series.
            </p>
            <a
              className={styles.instagramCta}
              href="https://www.instagram.com/mokaiindia/reels/"
              target="_blank"
              rel="noreferrer"
              data-reveal="left"
            >
              Enter @mokaiindia <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.profileStage} data-reveal="clip">
            <div className={styles.profileTopline}>
              <span>LIVE FEED</span>
              <span>MOKAI / INSTAGRAM</span>
            </div>
            <iframe
              className={styles.profileEmbed}
              src="https://www.instagram.com/mokaiindia/embed/"
              title="Mokai Instagram profile"
              loading="lazy"
              allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </main>

      <div data-reveal>
        <SiteFooter />
      </div>
    </PageMotion>
  );
}
