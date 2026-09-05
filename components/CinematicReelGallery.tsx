"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import styles from "./cinematic-reel-gallery.module.css";

export type CinematicReel = {
  code: string;
  label?: string;
};

export default function CinematicReelGallery({ reels }: { reels: CinematicReel[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.grid}>
      {reels.map((reel, index) => {
        const active = activeIndex === index;
        const number = String(index + 1).padStart(2, "0");

        return (
          <article className={`${styles.card} ${active ? styles.active : ""}`} key={reel.code}>
            <div className={styles.meta}>
              <span>{number}</span>
              <span>{active ? "NOW PLAYING" : "MOKAI REEL"}</span>
            </div>

            <div className={styles.viewport}>
              <iframe
                key={`${reel.code}-${active ? "active" : "idle"}`}
                className={styles.embed}
                src={`https://www.instagram.com/p/${reel.code}/embed/`}
                title={reel.label ?? `Mokai reel ${index + 1}`}
                loading={index < 4 ? "eager" : "lazy"}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                scrolling="no"
              />

              {!active ? (
                <button
                  type="button"
                  className={styles.playGate}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Play Mokai reel ${index + 1}`}
                >
                  <span className={styles.playIcon}><Play size={18} fill="currentColor" aria-hidden="true" /></span>
                  <span>Play reel</span>
                </button>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
