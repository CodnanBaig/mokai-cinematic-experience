"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import styles from "./loader.module.css";

export default function Loader({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 420 : 1680;
    const exitHold = prefersReducedMotion ? 80 : 620;
    const started = performance.now();
    let frame = 0;
    let exitTimer = 0;

    const tick = (time: number) => {
      const next = Math.min(100, Math.round(((time - started) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setExiting(true);
      exitTimer = window.setTimeout(done, exitHold);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [done]);

  return (
    <div
      className={`${styles.loader} ${exiting ? styles.isDone : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label={exiting ? "Mokai ready" : `Loading Mokai, ${progress} percent`}
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.stage}>
        <div className={styles.seal} aria-hidden="true">
          <Image
            src="/brand/mokai-hanko-filled.svg"
            alt=""
            width={120}
            height={120}
            priority
          />
        </div>
        <BrandMark light />
        <p className={styles.place}>Pali Hill, Bandra</p>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
