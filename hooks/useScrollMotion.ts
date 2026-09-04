"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type RevealKind = "up" | "left" | "right" | "scale" | "clip";

type UseScrollMotionOptions = {
  /** When false, skip setup (e.g. home loader still running). Default true. */
  enabled?: boolean;
  /** Extra animations inside the same gsap context / Lenis session. */
  extras?: (scope: HTMLElement) => void;
};

function revealFrom(kind: RevealKind) {
  switch (kind) {
    case "left":
      return { x: -52, opacity: 0 };
    case "right":
      return { x: 52, opacity: 0 };
    case "scale":
      return { scale: 0.9, opacity: 0 };
    case "clip":
      return { clipPath: "inset(14% 8% 14% 8%)", opacity: 0.35 };
    case "up":
    default:
      return { y: 56, opacity: 0 };
  }
}

export function useScrollMotion(
  root: RefObject<HTMLElement | null>,
  { enabled = true, extras }: UseScrollMotionOptions = {}
) {
  const extrasRef = useRef(extras);

  useEffect(() => {
    extrasRef.current = extras;
  }, [extras]);

  useEffect(() => {
    if (!enabled || !root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const scope = root.current;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const useSmoothScroll = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;

    let lenis: Lenis | null = null;
    let frame = 0;

    if (useSmoothScroll) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.85 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
    }

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        extrasRef.current?.(scope);
        return;
      }

      const heroRoot = scope.querySelector("[data-hero-animate]");
      if (heroRoot) {
        gsap.from(heroRoot.children, {
          y: 64,
          opacity: 0,
          stagger: 0.1,
          duration: 1.05,
          ease: "power4.out",
          delay: 0.08,
        });
      }

      const nav = scope.querySelector<HTMLElement>("[data-nav-animate]");
      if (nav) {
        gsap.from(nav, {
          y: -28,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "transform",
        });
      }

      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-reveal]")).forEach((node) => {
        const kind = (node.dataset.reveal || "up") as RevealKind;
        gsap.from(node, {
          ...revealFrom(kind),
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-reveal-stagger]")).forEach((parent) => {
        const kids = Array.from(parent.children) as HTMLElement[];
        if (!kids.length) return;
        gsap.from(kids, {
          y: 42,
          opacity: 0,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: parent, start: "top 84%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-parallax]")).forEach((node) => {
        const speed = Number(node.dataset.speed ?? "-14");
        const trigger = node.closest("[data-parallax-wrap]") ?? node.parentElement ?? node;
        gsap.set(node, { scale: Number(node.dataset.scale ?? "1.14"), transformOrigin: "50% 50%" });
        gsap.to(node, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-parallax-x]")).forEach((node) => {
        const speed = Number(node.dataset.speed ?? "10");
        const trigger = node.closest("[data-parallax-wrap]") ?? node.parentElement ?? node;
        gsap.to(node, {
          xPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll("[data-scrub]")).forEach((node) => {
        const mode = node.dataset.scrub || "rise";
        const trigger = node.closest("section") ?? node.parentElement ?? node;
        if (mode === "fade-scale") {
          gsap.fromTo(
            node,
            { opacity: 0.25, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger, start: "top 75%", end: "center 40%", scrub: true },
            }
          );
        } else if (mode === "drift") {
          gsap.fromTo(
            node,
            { y: 48, opacity: 0.35 },
            {
              y: -36,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        } else {
          gsap.fromTo(
            node,
            { y: 40, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger, start: "top 85%", end: "top 35%", scrub: true },
            }
          );
        }
      });

      extrasRef.current?.(scope);
    }, scope);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
      context.revert();
    };
  }, [enabled, root]);
}
