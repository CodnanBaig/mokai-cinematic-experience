"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import styles from "./cinematic-reel-gallery.module.css";

export type CinematicReel = {
  code: string;
  kind: "reel" | "post";
  label?: string;
};

function embedUrl(entry: CinematicReel) {
  const type = entry.kind === "reel" ? "reel" : "p";
  return `https://www.instagram.com/${type}/${entry.code}/embed/`;
}

function serialise(value: number) {
  return String(value).padStart(2, "0");
}

function ReelCard({
  entry,
  index,
  onOpen,
}: {
  entry: CinematicReel;
  index: number;
  onOpen: () => void;
}) {
  const number = serialise(index + 1);

  return (
    <article className={styles.card} data-reveal data-media-kind={entry.kind}>
      <div className={styles.posterFrame}>
        <div className={styles.previewViewport} aria-hidden="true">
          <iframe
            className={styles.previewEmbed}
            src={embedUrl(entry)}
            title=""
            tabIndex={-1}
            loading="lazy"
            allow="encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <span className={styles.previewShade} />
        </div>

        <button
          type="button"
          className={styles.openButton}
          onClick={onOpen}
          aria-label={`Watch Mokai story ${index + 1}`}
        >
          <span className={styles.cardNumber}>{number}</span>
          <span className={styles.playButton} aria-hidden="true">
            <Play size={16} fill="currentColor" />
          </span>
        </button>
      </div>

      <div className={styles.cardMeta} aria-hidden="true">
        <span>{number}</span>
        <span>{entry.kind === "reel" ? "REEL" : "POST"}</span>
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
          <ReelCard
            key={entry.code}
            entry={entry}
            index={index}
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
            className={styles.playerShell}
            role="dialog"
            aria-modal="true"
            aria-label={`Mokai story ${activeIndex + 1}`}
          >
            <header className={styles.playerHeader}>
              <Image
                src="/brand/mokai-horizontal.svg"
                alt="Mokai"
                width={116}
                height={32}
                className={styles.playerLogo}
                priority
              />
              <span className={styles.playerCount} aria-live="polite">
                {serialise(activeIndex + 1)} / {serialise(reels.length)}
              </span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setActiveIndex(null)}
                aria-label="Close player"
                autoFocus
              >
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className={styles.playerStage}>
              <button
                type="button"
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={() => move(-1)}
                aria-label="Previous story"
              >
                <ArrowLeft size={20} aria-hidden="true" />
                <span>PREV</span>
              </button>

              <div className={styles.playerFrame}>
                <div className={styles.playerViewport} data-media-kind={activeEntry.kind}>
                  <iframe
                    key={activeEntry.code}
                    className={styles.playerEmbed}
                    src={embedUrl(activeEntry)}
                    title={activeEntry.label ?? `Mokai story ${activeIndex + 1}`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <div className={styles.topCrop} aria-hidden="true" />
                  <div className={styles.bottomCrop} aria-hidden="true" />
                </div>
              </div>

              <button
                type="button"
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={() => move(1)}
                aria-label="Next story"
              >
                <span>NEXT</span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>

            <footer className={styles.playerFooter}>
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
                    {serialise(index + 1)}
                  </button>
                ))}
              </div>
            </footer>
          </section>
        </div>
      ) : null}
    </div>
  );
}
