"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./cinematic-reel-gallery.module.css";

export type CinematicReel = { code: string; kind: "reel" | "post"; label?: string };

function InstagramEntry({ entry, number }: { entry: CinematicReel; number: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(entry.kind === "reel" ? 740 : 600);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Preserve the complete official embed, including its native playback controls.
    const measure = (event: MessageEvent) => {
      if (event.origin !== "https://www.instagram.com" || event.source !== frame.current?.contentWindow) return;
      try {
        const message = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const next = message?.details?.height;
        if (message?.type === "MEASURE" && typeof next === "number" && Number.isFinite(next) && next >= 200 && next <= 3000) setHeight(Math.ceil(next));
      } catch { /* Ignore messages outside the embed protocol. */ }
    };
    window.addEventListener("message", measure);
    return () => window.removeEventListener("message", measure);
  }, []);
  return (
    <article className={styles.card} data-media-kind={entry.kind}>
      <div className={styles.meta}>
        <span>{String(number).padStart(2, "0")} <span className={styles.kind}>{entry.kind === "reel" ? "Reel" : "Post"}</span></span>
        <a href={`https://www.instagram.com/p/${entry.code}/`} target="_blank" rel="noreferrer" aria-label={`Open Mokai ${entry.kind} ${number} on Instagram`}><ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className={styles.embedStage} style={{ minHeight: height }} aria-busy={!loaded}>
        <div className={`${styles.embedSkeleton} ${loaded ? styles.isHidden : ""}`} aria-hidden="true"><span /></div>
        <iframe ref={frame} className={`${styles.embed} ${loaded ? styles.embedReady : ""}`} src={`https://www.instagram.com/p/${entry.code}/embed/`} title={`Mokai ${entry.kind} ${number}`} style={{ height }} loading="lazy" onLoad={() => setLoaded(true)} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      </div>
    </article>
  );
}

function SkeletonCard({ kind }: { kind: CinematicReel["kind"] }) {
  return (
    <article className={`${styles.card} ${styles.skeletonCard}`} data-media-kind={kind} aria-hidden="true">
      <div className={styles.skeletonMeta}><span /><span /></div>
      <div className={styles.skeletonMedia}><span /></div>
    </article>
  );
}

export default function CinematicReelGallery({ reels }: { reels: CinematicReel[] }) {
  const [filter, setFilter] = useState<"all" | "reel" | "post">("all");
  const [limit, setLimit] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const loadTimer = useRef<number | null>(null);
  const entries = reels.filter((entry) => filter === "all" || entry.kind === filter);
  const entryCount = entries.length;
  const visibleEntries = entries.slice(0, limit);
  const hasMore = limit < entryCount;

  const startLoadingMore = () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    loadTimer.current = window.setTimeout(() => {
      setLimit((current) => Math.min(current + 6, entryCount));
      setIsLoadingMore(false);
    }, 420);
  };

  const changeFilter = (value: "all" | "reel" | "post") => {
    if (loadTimer.current) window.clearTimeout(loadTimer.current);
    setFilter(value);
    setLimit(6);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    const target = sentinel.current;
    if (!target || !hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || isLoadingMore) return;
      setIsLoadingMore(true);
      loadTimer.current = window.setTimeout(() => {
        setLimit((current) => Math.min(current + 6, entryCount));
        setIsLoadingMore(false);
      }, 420);
    }, { rootMargin: "480px 0px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [entryCount, hasMore, isLoadingMore]);

  useEffect(() => () => {
    if (loadTimer.current) window.clearTimeout(loadTimer.current);
  }, []);

  return (
    <div className={styles.gallery}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter Instagram archive">
          {([["all", "All stories"], ["reel", "Reels"], ["post", "Posts"]] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={filter === value} onClick={() => changeFilter(value)}>{label}<span>{value === "all" ? reels.length : reels.filter((entry) => entry.kind === value).length}</span></button>
          ))}
        </div>
        <a className={styles.profile} href="https://www.instagram.com/mokaiindia/" target="_blank" rel="noreferrer">@mokaiindia <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <p className={styles.note}>Little scenes from a very Mokai world. Tap a reel to watch; browse posts at your own pace.</p>
      <div className={styles.grid}>
        {visibleEntries.map((entry) => <InstagramEntry key={entry.code} entry={entry} number={reels.indexOf(entry) + 1} />)}
        {isLoadingMore ? entries.slice(visibleEntries.length, visibleEntries.length + 6).map((entry) => <SkeletonCard key={`skeleton-${entry.code}`} kind={entry.kind} />) : null}
      </div>
      <div ref={sentinel} className={styles.sentinel} aria-hidden="true" />
      <div className={styles.more}>
        <p aria-live="polite">{isLoadingMore ? "Loading more stories…" : `${Math.min(limit, entries.length)} of ${entries.length} stories`}</p>
        {hasMore && <button type="button" onClick={startLoadingMore} disabled={isLoadingMore}>{isLoadingMore ? "Loading stories…" : "More from the universe"} <ArrowDown size={17} aria-hidden="true" /></button>}
        <a href="https://www.instagram.com/mokaiindia/" target="_blank" rel="noreferrer">See what’s new on Instagram <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </div>
  );
}
