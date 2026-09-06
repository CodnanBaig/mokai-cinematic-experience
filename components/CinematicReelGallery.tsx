"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./cinematic-reel-gallery.module.css";

export type CinematicReel = {
  code: string;
  kind: "reel" | "post";
  label?: string;
};

function embedUrl(entry: CinematicReel) {
  return `https://www.instagram.com/p/${entry.code}/embed/`;
}

function serialise(value: number) {
  return String(value).padStart(2, "0");
}

function posterImage(index: number) {
  const number = (index % 10) + 1;
  return `/images/brand/backdrop-${String(number).padStart(2, "0")}.webp`;
}

export default function CinematicReelGallery({ reels }: { reels: CinematicReel[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [entered, setEntered] = useState(false);
  const screeningRef = useRef<HTMLElement | null>(null);
  const activeEntry = reels[activeIndex];

  const focusScreening = useCallback(() => {
    requestAnimationFrame(() => {
      screeningRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const selectStory = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setEntered(true);
      focusScreening();
    },
    [focusScreening],
  );

  const move = useCallback(
    (delta: number) => {
      setActiveIndex((current) => (current + delta + reels.length) % reels.length);
      setEntered(true);
    },
    [reels.length],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!entered) return;
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [entered, move]);

  return (
    <div className={styles.gallery}>
      <section className={styles.screeningRoom} ref={screeningRef} aria-label="Mokai screening room">
        <header className={styles.screeningHeader}>
          <div className={styles.screeningIdentity}>
            <Image
              src="/brand/mokai-horizontal.svg"
              alt="Mokai"
              width={126}
              height={36}
              className={styles.screeningLogo}
            />
            <span>CINEMATIC UNIVERSE</span>
          </div>

          <div className={styles.screeningCounter} aria-live="polite">
            <span>NOW SCREENING</span>
            <strong>{serialise(activeIndex + 1)}</strong>
            <span>/ {serialise(reels.length)}</span>
          </div>
        </header>

        <div className={styles.screeningBody}>
          <aside className={styles.screeningNotes} aria-hidden="true">
            <span>MOKAI PICTURES</span>
            <strong>MCU</strong>
            <span>BANDRA · MUMBAI</span>
          </aside>

          <div className={styles.playerWrap}>
            <span className={styles.ghostNumber} aria-hidden="true">
              {serialise(activeIndex + 1)}
            </span>

            <div className={styles.playerFrame}>
              <div className={styles.playerViewport} data-media-kind={activeEntry.kind}>
                {entered ? (
                  <iframe
                    key={activeEntry.code}
                    className={styles.playerEmbed}
                    src={embedUrl(activeEntry)}
                    title={`Mokai story ${activeIndex + 1}`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <button
                    type="button"
                    className={styles.enterGate}
                    onClick={() => setEntered(true)}
                    aria-label="Enter the Mokai screening room"
                  >
                    <Image
                      src="/images/mokai-window.webp"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 760px) 86vw, 420px"
                      className={styles.gateImage}
                    />
                    <span className={styles.gateVeil} />
                    <span className={styles.gateCopy}>
                      <span className={styles.gatePlay}><Play size={18} fill="currentColor" /></span>
                      <strong>ENTER SCREENING</strong>
                      <small>STORY 01 / MOKAI ORIGINAL</small>
                    </span>
                  </button>
                )}

                <div className={styles.playerTopMask} aria-hidden="true">
                  <span>MOKAI ORIGINAL</span>
                  <span>{activeEntry.kind === "reel" ? "MOVING IMAGE" : "FRAME / CAROUSEL"}</span>
                </div>
                <div className={styles.playerBottomMask} aria-hidden="true">
                  <span>MCU / {serialise(activeIndex + 1)}</span>
                  <span>@MOKAIINDIA</span>
                </div>
              </div>
            </div>
          </div>

          <nav className={styles.screeningControls} aria-label="Screening controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous story">
              <ArrowLeft size={18} aria-hidden="true" />
              <span>PREV</span>
            </button>
            <div className={styles.screeningRule} aria-hidden="true" />
            <button type="button" onClick={() => move(1)} aria-label="Next story">
              <span>NEXT</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </nav>
        </div>

        <footer className={styles.screeningFooter}>
          <span>ONE PLAYER / ZERO OVERLAP</span>
          <div className={styles.storyRail} aria-label="Choose a story">
            {reels.map((entry, index) => (
              <button
                type="button"
                key={entry.code}
                className={index === activeIndex ? styles.activeRailItem : ""}
                onClick={() => selectStory(index)}
                aria-label={`Screen story ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                {serialise(index + 1)}
              </button>
            ))}
          </div>
          <span>← → TO NAVIGATE</span>
        </footer>
      </section>

      <header className={styles.archiveHeader}>
        <div>
          <span>THE CONTACT SHEET</span>
          <strong>20 STORIES</strong>
        </div>
        <p>Select a frame. The screening room above swaps to that story; the previous Instagram player is destroyed immediately.</p>
      </header>

      <div className={styles.grid}>
        {reels.map((entry, index) => {
          const active = index === activeIndex;
          return (
            <article
              key={entry.code}
              className={`${styles.card} ${active ? styles.activeCard : ""}`}
              data-media-kind={entry.kind}
              data-reveal
            >
              <button
                type="button"
                className={styles.posterButton}
                onClick={() => selectStory(index)}
                aria-label={`Watch Mokai story ${index + 1}`}
              >
                <span className={styles.posterFrame} aria-hidden="true">
                  <Image
                    src={posterImage(index)}
                    alt=""
                    fill
                    sizes="(max-width: 650px) 48vw, (max-width: 1000px) 30vw, 22vw"
                    className={styles.posterImage}
                  />
                  <span className={styles.posterWash} />
                  <span className={styles.posterTopline}>
                    <span>MOKAI / MCU</span>
                    <span>{entry.kind === "reel" ? "MOTION" : "FRAME"}</span>
                  </span>
                  <span className={styles.posterNumber}>{serialise(index + 1)}</span>
                  <span className={styles.posterPlay}>
                    <Play size={14} fill="currentColor" />
                  </span>
                  <span className={styles.posterCaption}>ENTER STORY</span>
                </span>
              </button>
              <div className={styles.cardFooter} aria-hidden="true">
                <span>STORY {serialise(index + 1)}</span>
                <span>{active ? "NOW SCREENING" : "ARCHIVE"}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
