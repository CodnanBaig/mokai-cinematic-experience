"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin, Menu, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import BrandMark from "./BrandMark";

const menu = [
  ["Katsu chicken sando", "Panko chicken · katsu sauce"],
  ["Jasmine coconut matcha", "Floral · mellow · ceremonial"],
  ["Gula Melaka iced latte", "Palm sugar · espresso · milk"],
  ["Mokai khao suey", "Coconut curry · noodles · crunch"],
  ["Miso mushroom curry", "Earthy · silky · comforting"]
] as const;

const rooms = [
  {
    eyebrow: "01 / ARRIVE",
    title: "The coffee room",
    body: "Warm timber, arched windows and a brass glow. A room that feels composed, not decorated.",
    image: "/images/mokai-ground-floor.webp"
  },
  {
    eyebrow: "02 / PAUSE",
    title: "The matcha ritual",
    body: "A deliberate invitation to whisk, watch and wait. The drink begins before the first sip.",
    image: "/images/mokai-first-floor.webp"
  },
  {
    eyebrow: "03 / STAY",
    title: "Breakfast in bed",
    body: "Soft pillows, playful notes and old-school telephones. Comfort becomes the experience.",
    image: "/images/mokai-window.webp"
  }
] as const;

function Loader({ done }: { done: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const started = performance.now();
    const tick = (time: number) => {
      const progress = Math.min(100, Math.round(((time - started) / 1300) * 100));
      setCount(progress);
      if (progress < 100) requestAnimationFrame(tick);
      else window.setTimeout(done, 180);
    };
    requestAnimationFrame(tick);
  }, [done]);

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__mark"><BrandMark light /></div>
      <div className="loader__line"><span style={{ width: `${count}%` }} /></div>
      <div className="loader__meta"><span>Bandra / Mumbai</span><span>{count.toString().padStart(3, "0")}</span></div>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <header className="nav-shell">
      <a className="nav-logo" href="#top" aria-label="Mokai home"><BrandMark compact /></a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <nav id="site-nav" className={open ? "is-open" : ""} aria-label="Primary navigation">
        <a href="#story" onClick={() => setOpen(false)}>Story</a>
        <a href="#spaces" onClick={() => setOpen(false)}>Spaces</a>
        <a href="#menu" onClick={() => setOpen(false)}>Menu</a>
      </nav>
      <a className="pill nav-visit" href="#visit" onClick={() => setOpen(false)}>Visit <ArrowUpRight size={16} /></a>
    </header>
  );
}

function Marquee() {
  const words = ["COFFEE LOVE", "MATCHA RITUAL", "BANDRA ENERGY", "SLOWER LIVING"];
  return (
    <div className="marquee" aria-label="Mokai values">
      <div className="marquee__track">
        {[...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>
            {word}
            <span className="marquee-mark" aria-hidden="true">
              <Image className="marquee-mark__image" src="/brand/mokai-hanko-filled.svg" alt="" width={300} height={300} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const [activeMenu, setActiveMenu] = useState(0);
  const menuImages = useMemo(
    () => [
      "/images/mokai-wave-detail.webp",
      "/images/mokai-origami-detail.webp",
      "/images/mokai-brass-detail.webp",
      "/images/mokai-exterior.webp",
      "/images/mokai-window.webp"
    ],
    []
  );

  useEffect(() => {
    if (!loaded || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);

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
      gsap.from(".nav-shell", { y: -30, opacity: 0, duration: 0.9, ease: "power3.out" });
      gsap.from(".hero-copy > *", {
        y: 70,
        opacity: 0,
        stagger: 0.11,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.1
      });

      (gsap.utils.toArray("[data-reveal]") as HTMLElement[]).forEach((node) => {
        gsap.from(node, {
          y: 64,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%", once: true }
        });
      });

      (gsap.utils.toArray("[data-parallax]") as HTMLElement[]).forEach((node) => {
        gsap.to(node, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: node.parentElement, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      });

      const track = document.querySelector<HTMLElement>(".rooms-track");
      if (track && window.innerWidth > 900) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".rooms-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
      }

      if (!prefersReducedMotion) {
        gsap.to(".ritual-ring", {
          rotate: 360,
          duration: 18,
          repeat: -1,
          ease: "none"
        });
      }
    }, root);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
      context.revert();
    };
  }, [loaded]);

  return (
    <div ref={root} className="site" id="top">
      {!loaded ? <Loader done={() => setLoaded(true)} /> : null}
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Navigation />

      <main id="main">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">INDIAN-MADE · ASIAN-INSPIRED · BANDRA</p>
            <h1><span>COFFEE</span><span className="hero-love">LOVE.</span></h1>
            <p className="hero-intro">A slower version of your day, hidden inside Pali Hill.</p>
            <a href="#story" className="round-link" aria-label="Discover Mokai"><ArrowDownRight /></a>
          </div>
          <div className="hero-photo frame">
            <Image src="/images/mokai-exterior.webp" alt="Mokai's illustrated Bandra facade" fill priority loading="eager" sizes="(max-width: 900px) 88vw, 34vw" />
            <div className="image-label"><span>THE ORIGINAL WAVE</span><span>CHAPEL ROAD / 2024</span></div>
          </div>
          {/* <div className="hero-sidecopy">MOKA = COFFEE<br />AI = LOVE</div> */}
        </section>

        <Marquee />

        <section className="manifesto section-pad" id="story">
          <div className="manifesto-stamp" data-reveal>
            <Image src="/brand/mokai-hanko-filled.svg" width={160} height={160} alt="Mokai hanko mark" />
          </div>
          <div className="manifesto-copy">
            <p className="eyebrow" data-reveal>NOT A QUICK COFFEE</p>
            <h2 data-reveal>Come for the cup.<br /><em>Stay for the feeling.</em></h2>
            <div className="manifesto-grid">
              <p data-reveal>Mokai lives between wabi-sabi calm and the bright interruptions of Tokyo street culture—then lets Bandra loosen the rules.</p>
              <p data-reveal>The result is food, design and well-being moving at one pace: slow enough to notice.</p>
            </div>
          </div>
        </section>

        <section className="ritual section-pad">
          <div className="ritual-visual" data-reveal aria-label="Matcha ritual: whisk, watch, wait, sip">
            <svg className="ritual-ring" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="ritual-orbit-path" d="M 50,7 a 43,43 0 1,1 0,86 a 43,43 0 1,1 0,-86" />
              </defs>
              <circle className="ritual-ring__line" cx="50" cy="50" r="43" />
              <text className="ritual-ring__text">
                <textPath href="#ritual-orbit-path" startOffset="70%">WHISK · WATCH · WAIT · SIP ·</textPath>
              </text>
              <circle className="ritual-ring__dot" cx="50" cy="7" r="1.35" />
              <circle className="ritual-ring__dot" cx="50" cy="93" r="1.35" />
            </svg>
            <div className="ritual-core"><span>抹茶</span><small>MATCHA</small></div>
          </div>
          <div className="ritual-copy">
            <p className="eyebrow" data-reveal>THE PARTICIPATION MENU</p>
            <h2 data-reveal>Your drink begins before the first sip.</h2>
            <p data-reveal>Traditional tools, ceremonial matcha and enough time to make the ritual your own. No rush. That is the point.</p>
            <a className="text-link" href="#menu" data-reveal>Explore the mood <ArrowUpRight size={18} /></a>
          </div>
        </section>

        <section className="rooms-pin" id="spaces">
          <div className="rooms-heading section-pad">
            <p className="eyebrow">A SERIES OF MOMENTS</p>
            <h2>Discover it<br />slowly.</h2>
          </div>
          <div className="rooms-track" data-scroll-hint="Swipe through the rooms">
            {rooms.map((room) => (
              <article className="room-card" key={room.title}>
                <div className="room-card__image frame"><Image src={room.image} alt={room.title} fill sizes="(max-width: 900px) 86vw, 42vw" /></div>
                <div className="room-card__meta"><span>{room.eyebrow}</span><h3>{room.title}</h3><p>{room.body}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-experience section-pad" id="menu">
          <div className="menu-header">
            <div><p className="eyebrow" data-reveal>TASTE THE STORY</p><h2 data-reveal>Signatures,<br /><em>not standards.</em></h2></div>
            <p data-reveal>Asian memories, French technique and a Mumbai appetite. This is a compact preview—not a substitute for the living menu.</p>
          </div>
          <div className="menu-grid">
            <div className="menu-list">
              {menu.map(([title, description], index) => (
                <button
                  key={title}
                  type="button"
                  aria-pressed={activeMenu === index}
                  onMouseEnter={() => setActiveMenu(index)}
                  onFocus={() => setActiveMenu(index)}
                  onClick={() => setActiveMenu(index)}
                  className={activeMenu === index ? "is-active" : ""}
                >
                  <span className="menu-index">0{index + 1}</span>
                  <span><strong>{title}</strong><small>{description}</small></span>
                  <ArrowUpRight size={22} />
                </button>
              ))}
            </div>
            <div className="menu-preview frame" data-reveal>
              <div className="menu-preview__media">
                {menuImages.map((image, index) => (
                  <Image key={`${image}-${index}`} src={image} alt="Mokai menu atmosphere" fill className={activeMenu === index ? "is-visible" : ""} sizes="(max-width: 900px) 90vw, 38vw" />
                ))}
              </div>
              <div className="menu-preview__badge"><Sparkles size={16} /> MENU MOOD</div>
            </div>
          </div>
        </section>

        <section className="interlude">
          <div className="interlude-image"><Image src="/images/mokai-first-floor.webp" alt="Mokai's warm interior details" fill sizes="100vw" data-parallax /></div>
          <div className="interlude-copy"><span>STAY A LITTLE</span><strong>LONGER</strong></div>
        </section>

        <section className="visit section-pad" id="visit">
          <div className="visit-top">
            <p className="eyebrow" data-reveal>PALI HILL, BANDRA WEST</p>
            <h2 data-reveal>Meet us<br />between plans.</h2>
          </div>
          <div className="visit-grid">
            <div className="visit-map" data-reveal>
              <div className="map-grid" aria-hidden="true" />
              <div className="map-pin"><span>M</span></div>
              <p>PALI NAKA</p>
            </div>
            <div className="visit-details" data-reveal>
              <div><MapPin /><p>600, 601, 602, Hill Crest Building,<br />Dr Ambedkar Road, Pali Hill,<br />Bandra West, Mumbai.</p></div>
              <div><Phone /><p><a href="tel:+919820062166">+91 98200 62166</a><br /><a href="tel:+919820983607">+91 98209 83607</a></p></div>
              <div className="visit-hours"><span>MON — SUN</span><strong>8:00 AM — 11:30 PM</strong></div>
              <a className="pill pill--dark" href="https://www.google.com/maps/search/?api=1&query=Mokai+Pali+Hill+Bandra" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-pad">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-lockup" aria-hidden="true">
              <Image className="footer-lockup__image" src="/brand/mokai-with-hanko.svg" width={300} height={300} alt="" />
            </div>
            <BrandMark light />
          </div>
          <p>Indian-made. Asian-inspired.<br />Experienced in Bandra.</p>
        </div>
        <div className="footer-bottom">
          <div className="footer-links"><a href="https://www.instagram.com/mokaiindia/" target="_blank" rel="noreferrer">Instagram</a><a href="#top">Back to top</a></div>
          <small>Independent concept website · Public information and editorial imagery used for demonstration.</small>
        </div>
      </footer>
    </div>
  );
}
