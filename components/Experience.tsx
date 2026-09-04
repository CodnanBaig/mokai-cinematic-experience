"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin, Phone, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import BrandMark from "./BrandMark";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import { useScrollMotion } from "@/hooks/useScrollMotion";

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
    image: "/images/brand/interiors/frame-01.webp"
  },
  {
    eyebrow: "03 / STAY",
    title: "Breakfast in bed",
    body: "Soft pillows, playful notes and old-school telephones. Comfort becomes the experience.",
    image: "/images/brand/interiors/frame-02.webp"
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
      "/images/brand/collateral/dessert-box-artwork.webp",
      "/images/mokai-origami-detail.webp",
      "/images/brand/collateral/takeaway-bag-mockup.webp",
      "/images/brand/collateral/bottom-cup-sticker-mockup.webp"
    ],
    []
  );

  const extras = useCallback((scope: HTMLElement) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const track = scope.querySelector<HTMLElement>(".rooms-track");
    const roomsPin = scope.querySelector<HTMLElement>(".rooms-pin");
    if (track && roomsPin && window.innerWidth > 900) {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: roomsPin,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });
    }

    const ritualRing = scope.querySelector(".ritual-ring");
    if (ritualRing) {
      gsap.to(ritualRing, {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none"
      });
    }

    const roomsHeading = scope.querySelector<HTMLElement>(".rooms-heading");
    if (roomsHeading) {
      gsap.from(roomsHeading.children, {
        y: 48,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: roomsHeading, start: "top 80%", once: true }
      });
    }

    gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(".room-card")).forEach((card, index) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: index * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", once: true }
      });
    });

    const menuList = scope.querySelector(".menu-list");
    const menuButtons = scope.querySelectorAll<HTMLElement>(".menu-list button");
    if (menuList && menuButtons.length) {
      gsap.from(menuButtons, {
        x: -36,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: menuList, start: "top 82%", once: true }
      });
    }

    const footer = scope.querySelector("footer");
    if (footer) {
      gsap.from(footer.children, {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 88%", once: true }
      });
    }
  }, []);

  useScrollMotion(root, { enabled: loaded, extras });

  return (
    <div ref={root} className="site" id="top">
      {!loaded ? <Loader done={() => setLoaded(true)} /> : null}
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <SiteNav />

      <main id="main">
        <section className="hero section-pad">
          <div className="hero-copy" data-hero-animate>
            <p className="eyebrow">INDIAN-MADE · ASIAN-INSPIRED · BANDRA</p>
            <h1><span>COFFEE</span><span className="hero-love">LOVE.</span></h1>
            <p className="hero-intro">A slower version of your day, hidden inside Pali Hill.</p>
            <a href="#story" className="round-link" aria-label="Discover Mokai"><ArrowDownRight /></a>
          </div>
          <div className="hero-photo frame" data-parallax-wrap>
            <Image
              src="/images/mokai-exterior.webp"
              alt="Mokai's illustrated Bandra facade"
              fill
              priority
              loading="eager"
              sizes="(max-width: 900px) 88vw, 34vw"
              data-parallax
              data-speed="-18"
            />
            <div className="image-label"><span>THE ORIGINAL WAVE</span><span>CHAPEL ROAD / 2024</span></div>
          </div>
        </section>

        <Marquee />

        <section className="manifesto section-pad" id="story">
          <div className="manifesto-stamp" data-reveal="scale" data-parallax-wrap>
            <Image src="/brand/mokai-hanko-filled.svg" width={160} height={160} alt="Mokai hanko mark" data-parallax data-speed="-8" data-scale="1" />
          </div>
          <div className="manifesto-copy">
            <p className="eyebrow" data-reveal="left">NOT A QUICK COFFEE</p>
            <h2 data-reveal="left">Come for the cup.<br /><em>Stay for the feeling.</em></h2>
            <div className="manifesto-grid" data-reveal-stagger>
              <p>Mokai lives between wabi-sabi calm and the bright interruptions of Tokyo street culture—then lets Bandra loosen the rules.</p>
              <p>The result is food, design and well-being moving at one pace: slow enough to notice.</p>
            </div>
          </div>
        </section>

        <section className="ritual section-pad">
          <div className="ritual-visual" data-reveal="scale" aria-label="Matcha ritual: whisk, watch, wait, sip">
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
            <p className="eyebrow" data-reveal="right">THE PARTICIPATION MENU</p>
            <h2 data-reveal="right">Your drink begins before the first sip.</h2>
            <p data-reveal="right">Traditional tools, ceremonial matcha and enough time to make the ritual your own. No rush. That is the point.</p>
            <a className="text-link" href="#menu" data-reveal="right">Explore the mood <ArrowUpRight size={18} /></a>
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
                <div className="room-card__image frame" data-parallax-wrap>
                  <Image src={room.image} alt={room.title} fill sizes="(max-width: 900px) 86vw, 42vw" data-parallax data-speed="-10" />
                </div>
                <div className="room-card__meta"><span>{room.eyebrow}</span><h3>{room.title}</h3><p>{room.body}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="menu-experience section-pad" id="menu">
          <div className="menu-header">
            <div>
              <p className="eyebrow" data-reveal>TASTE THE STORY</p>
              <h2 data-reveal>Signatures,<br /><em>not standards.</em></h2>
            </div>
            <p data-reveal="right">Asian memories, French technique and a Mumbai appetite. This is a compact preview—not a substitute for the living menu.</p>
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
            <div className="menu-preview frame" data-reveal="clip" data-parallax-wrap>
              <div className="menu-preview__media" data-parallax data-speed="-12">
                {menuImages.map((image, index) => (
                  <Image key={`${image}-${index}`} src={image} alt="Mokai menu atmosphere" fill className={activeMenu === index ? "is-visible" : ""} sizes="(max-width: 900px) 90vw, 38vw" />
                ))}
              </div>
              <div className="menu-preview__badge"><Sparkles size={16} /> MENU MOOD</div>
            </div>
          </div>
        </section>

        <section className="interlude">
          <div className="interlude-image" data-parallax-wrap>
            <Image src="/images/brand/interiors/frame-03.webp" alt="Mokai interior framed artwork" fill sizes="100vw" data-parallax data-speed="-22" data-scale="1.2" />
          </div>
          <div className="interlude-copy" data-scrub="drift">
            <span>STAY A LITTLE</span>
            <strong>LONGER</strong>
          </div>
        </section>

        <section className="visit section-pad" id="visit">
          <div className="visit-top">
            <p className="eyebrow" data-reveal>PALI HILL, BANDRA WEST</p>
            <h2 data-scrub="fade-scale">Meet us<br />between plans.</h2>
          </div>
          <div className="visit-grid">
            <div className="visit-map" data-reveal="left">
              <div className="map-grid" aria-hidden="true" data-parallax-x data-speed="-8" />
              <div className="map-pin"><span>M</span></div>
              <p>PALI NAKA</p>
            </div>
            <div className="visit-details" data-reveal="right">
              <div><MapPin /><p>600, 601, 602, Hill Crest Building,<br />Dr Ambedkar Road, Pali Hill,<br />Bandra West, Mumbai.</p></div>
              <div><Phone /><p><a href="tel:+919820062166">+91 98200 62166</a><br /><a href="tel:+919820983607">+91 98209 83607</a></p></div>
              <div className="visit-hours"><span>MON — SUN</span><strong>8:00 AM — 11:30 PM</strong></div>
              <a className="pill pill--dark" href="https://www.google.com/maps/search/?api=1&query=Mokai+Pali+Hill+Bandra" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
