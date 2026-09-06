"use client";

import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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

function PosterCard({
  entry,
  number,
  featured,
  onOpen,
}: {
  entry: CinematicReel;
  number: number;
  featured: boolean;
  onOpen: () => void;
}) {
  const serial = serialise(number);

  return (
    <article
      className={`${styles.card} ${featured ? styles.featuredCard : ""}`}
      data-media-kind={entry.kind}
    >
      <button
        type="button"
        className={styles.posterButton}
        onClick={onOpen}
        aria-label={`Watch Mokai story ${number}`}
      >
        <span className={styles.posterFrame} aria-hidden="true">
          <span className={styles.previewViewport}>
            <iframe
              className={styles.previewEmbed}
              src={embedUrl(entry)}
              title=""
              tabIndex={-1}
              loading="lazy"
              allow="encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <span className={styles.previewVeil} />
            <span className={styles.previewGrain} />
          </span>

          <span className={styles.posterChrome}>
            <span className={styles.posterTopline}>
              <span>MOKAI PICTURES</span>
              <span>{entry.kind === "reel" ? "MOTION" : "FRAME"}</span>
            </span>

            <span className={styles.posterSerial}>{serial}</span>

            <span className={styles.posterAction}>
              <span className={styles.playMark}>
                <Play size={18} fill="currentColor" />
              </span>
              <span>ENTER STORY</span>
            </span>
          </span>
        </span>
      </button>

      <div className={styles.cardFooter} aria-hidden="true">
        <span>MCU / {serial}</span>
        <span>{featured ? "FEATURED SCREENING" : "ARCHIVE STORY"}</span>
      </div>
    </article>
  );
}

export default function CinematicReelGallery({ reels }: { reels: CinematicReel[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeEntry = activeIndex === null ? null : reels[activeIndex];

  const move = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null) return 0;
        return (current + delta + reels.length) % reels.length;
      });
    },
    [reels.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, move]);

  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {reels.map((entry, index) => (
          <PosterCard
            key={entry.code}
            entry={entry}
            number={index + 1}
            featured={index % 7 === 0}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeEntry && activeIndex !== null ? (
        <div
          className={styles.playerBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <section
            className={styles.screeningRoom}
            role="dialog"
            aria-modal="true"
            aria-label={`Mokai story ${activeIndex + 1}`}
          >
            <header className={styles.screeningHeader}>
              <span>MOKAI CINEMATIC UNIVERSE</span>
              <span>SCREENING {serialise(activeIndex + 1)} / {serialise(reels.length)}</span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setActiveIndex(null)}
                aria-label="Close player"
                autoFocus
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className={styles.screeningStage}>
              <button
                type="button"
                className={`${styles.stageNav} ${styles.stageNavPrevious}`}
                onClick={() => move(-1)}
                aria-label="Previous story"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span>PREV</span>
              </button>

              <div className={styles.playerComposition}>
                <span className={styles.playerGhostNumber} aria-hidden="true">
                  {serialise(activeIndex + 1)}
                </span>

                <div className={styles.playerFrame}>
                  <div className={styles.playerViewport} data-media-kind={activeEntry.kind}>
                    <iframe
                      key={activeEntry.code}
                      className={styles.playerEmbed}
                      src={embedUrl(activeEntry)}
                      title={`Mokai story ${activeIndex + 1}`}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />

                    <div className={styles.playerTopMask} aria-hidden="true">
                      <span>MOKAI ORIGINAL</span>
                      <span>{activeEntry.kind === "reel" ? "MOVING IMAGE" : "STILL / CAROUSEL"}</span>
                    </div>
                    <div className={styles.playerBottomMask} aria-hidden="true">
                      <span>MCU / {serialise(activeIndex + 1)}</span>
                      <span>@MOKAIINDIA</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={`${styles.stageNav} ${styles.stageNavNext}`}
                onClick={() => move(1)}
                aria-label="Next story"
              >
                <span>NEXT</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>

            <footer className={styles.screeningFooter}>
              <div className={styles.nowPlaying}>
                <span>NOW SCREENING</span>
                <strong>STORY {serialise(activeIndex + 1)}</strong>
              </div>

              <div className={styles.storyRail} aria-label="Choose a story">
                {reels.map((entry, index) => (
                  <button
                    type="button"
                    key={entry.code}
                    className={index === activeIndex ? styles.activeRailItem : ""}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Open story ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  >
                    <span>{serialise(index + 1)}</span>
                  </button>
                ))}
              </div>

              <div className={styles.screeningHint}>
                <span>ESC TO EXIT</span>
                <span>← → TO NAVIGATE</span>
              </div>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
