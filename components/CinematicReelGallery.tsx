"use client";

import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./cinematic-reel-gallery.module.css";

export type CinematicReel = { code: string; kind: "reel" | "post"; label?: string };

function embedUrl(entry: CinematicReel) {
  const route = entry.kind === "reel" ? "reel" : "p";
  return `https://www.instagram.com/${route}/${entry.code}/embed/`;
}

function PosterCard({
  entry,
  number,
  onOpen,
}: {
  entry: CinematicReel;
  number: number;
  onOpen: () => void;
}) {
  const serial = String(number).padStart(2, "0");

  return (
    <article className={styles.card} data-media-kind={entry.kind}>
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
        <span className={styles.previewVeil} />
        <span className={styles.posterTopline}>
          <span>MOKAI ORIGINAL</span>
          <span>{entry.kind === "reel" ? "REEL" : "STORY"}</span>
        </span>
        <span className={styles.posterSerial}>{serial}</span>
        <span className={styles.watchLabel}>WATCH STORY</span>
      </div>

      <button
        type="button"
        className={styles.posterButton}
        onClick={onOpen}
        aria-label={`Watch Mokai story ${number}`}
      >
        <span className={styles.playMark} aria-hidden="true">
          <Play size={22} fill="currentColor" />
        </span>
      </button>

      <div className={styles.cardFooter} aria-hidden="true">
        <span>MCU / {serial}</span>
        <span>{entry.kind === "reel" ? "MOVING IMAGE" : "FRAME"}</span>
      </div>
    </article>
  );
}

export default function CinematicReelGallery({ reels }: { reels: CinematicReel[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeEntry = activeIndex === null ? null : reels[activeIndex];

  const move = (delta: number) => {
    setActiveIndex((current) => {
      if (current === null) return 0;
      return (current + delta + reels.length) % reels.length;
    });
  };

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
  }, [activeIndex, reels.length]);

  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {reels.map((entry, index) => (
          <PosterCard
            key={entry.code}
            entry={entry}
            number={index + 1}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeEntry && activeIndex !== null ? (
        <div
          className={styles.playerBackdrop}
          role="presentation"
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
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setActiveIndex(null)}
              aria-label="Close player"
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className={styles.playerColumn}>
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
                  <span>MOKAI CINEMATIC UNIVERSE</span>
                  <span>PLAYING {String(activeIndex + 1).padStart(2, "0")} / {String(reels.length).padStart(2, "0")}</span>
                </div>
                <div className={styles.playerBottomMask} aria-hidden="true">
                  <span>MCU / BANDRA</span>
                  <span>OFFICIAL ARCHIVE</span>
                </div>
              </div>
            </div>

            <aside className={styles.playerPanel}>
              <div className={styles.panelHeader}>
                <span>NOW PLAYING</span>
                <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              </div>

              <div className={styles.panelTitle}>
                <span>MOKAI</span>
                <em>CINEMATIC</em>
                <span>UNIVERSE</span>
              </div>

              <div className={styles.panelNav}>
                <button type="button" onClick={() => move(-1)} aria-label="Previous story">
                  <ChevronLeft size={20} aria-hidden="true" />
                  <span>PREV</span>
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Next story">
                  <span>NEXT</span>
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>

              <p className={styles.panelHint}>Use ← → to move through the archive. Opening another story replaces the current player, so only one can play at a time.</p>
            </aside>
          </section>
        </div>
      ) : null}
    </div>
  );
}
