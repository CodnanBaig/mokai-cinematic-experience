"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin, Pause, Phone, Play, Sparkles } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Loader from "./Loader";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import "./experience-motion.css";

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
    title: "A little wonder",
    body: "Paper cranes overhead. A flash of pink around the corner. There is always another detail to find.",
    image: "/images/mokai-first-floor.webp"
  },
  {
    eyebrow: "03 / STAY",
    title: "Take the window seat",
    body: "Warm light, patterned cushions and a table for two. Settle in. The city can wait a little.",
    image: "/images/mokai-window.webp"
  }
] as const;

const ritualSteps = [
  ["Whisk", "A little movement.", "Bamboo meets matcha. Find your rhythm."],
  ["Watch", "A little wonder.", "Watch the colour deepen and the surface turn to foam."],
  ["Wait", "A little stillness.", "Let the moment settle. There is no next thing to get to."],
  ["Sip", "All yours.", "Take that first sip. Stay for another."],
] as const;

function Marquee() {
  const [paused, setPaused] = useState(false);
  const words = ["COFFEE LOVE", "MATCHA RITUAL", "BANDRA ENERGY", "SLOWER LIVING"];
  return (
    <div className="marquee" aria-label="Mokai values">
      <div className="marquee__track" style={{ animationPlayState: paused ? "paused" : undefined }}>
        {[...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`} aria-hidden={index >= words.length ? true : undefined}>
            {word}
            <span className="marquee-mark" aria-hidden="true">
              <Image className="marquee-mark__image" src="/brand/mokai-hanko-filled.svg" alt="" width={300} height={300} />
            </span>
          </span>
        ))}
      </div>
      <button className="marquee-pause" type="button" aria-label={paused ? "Resume moving text" : "Pause moving text"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
    </div>
  );
}

export default function Experience() {
  const [loaded, setLoaded] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeRitual, setActiveRitual] = useState(0);
  const finishLoading = useCallback(() => setLoaded(true), []);
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
    const roomsWindow = scope.querySelector<HTMLElement>(".rooms-window");
    if (track && roomsPin && roomsWindow && window.innerWidth > 900) {
      const distance = () => Math.max(0, track.scrollWidth - roomsWindow.clientWidth);
      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: roomsPin, start: "top top", end: () => `+=${distance()}`,
          scrub: 0.8, pin: true, invalidateOnRefresh: true,
        },
      });
      journey.to(track, {
        x: () => -distance(),
        ease: "none",
      }, 0).fromTo(".rooms-progress span", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(".room-card__image img")).forEach((photo) => {
        gsap.fromTo(photo, { xPercent: -4, scale: 1.12 }, {
          xPercent: 4, ease: "none",
          scrollTrigger: { trigger: photo.parentElement, containerAnimation: journey, start: "left right", end: "right left", scrub: true },
        });
      });
    }

    const ritualRing = scope.querySelector(".ritual-ring");
    if (ritualRing) {
      gsap.to(ritualRing, {
        rotate: 210,
        ease: "none",
        scrollTrigger: { trigger: ".ritual", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }

    gsap.to(".ritual-core", {
      rotate: -10,
      scrollTrigger: {
        trigger: ".ritual", start: "top 65%", end: "bottom 60%", scrub: 0.7,
        onUpdate: ({ progress }) => setActiveRitual(Math.min(3, Math.floor(progress * 4))),
      },
    });
    gsap.fromTo(".hero-postcard", { y: 0, rotation: -8 }, {
      y: -85, rotation: -3, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to(".hero-artwork", {
      yPercent: 12, rotate: 7, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.4 },
    });
    gsap.fromTo(".story-detail", { y: 35, rotate: 7 }, {
      y: -45, rotate: -2, ease: "none",
      scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.fromTo(".interlude-copy strong", { letterSpacing: "0.08em", y: 50 }, {
      letterSpacing: "-0.03em", y: -20, ease: "none",
      scrollTrigger: { trigger: ".interlude", start: "top bottom", end: "bottom top", scrub: 1 },
    });

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
    <div ref={root} className="site site--home" id="top">
      {!loaded ? <Loader done={finishLoading} /> : null}
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <SiteNav />

      <main id="main">
        <section className="hero section-pad">
          <div className="hero-artwork" aria-hidden="true" />
          <div className="hero-copy" data-hero-animate>
            <p className="eyebrow">INDIAN-MADE · ASIAN-INSPIRED · BANDRA</p>
            <h1><span>COFFEE</span><span className="hero-love">LOVE.</span></h1>
            <p className="hero-intro">A slower version of your day, hidden inside Pali Hill.</p>
            <div className="hero-actions"><a href="#story" className="round-link" aria-label="Discover Mokai"><ArrowDownRight /></a><span>Step inside.<br />Take your time.</span></div>
          </div>
          <div className="hero-composition">
          <div className="hero-photo frame" data-parallax-wrap>
            <Image
              src="/images/mokai-exterior.webp"
              alt="Mokai's illustrated Bandra facade"
              fill
              priority
              loading="eager"
              sizes="(max-width: 900px) 88vw, 48vw"
              data-parallax
              data-speed="-18"
            />
            <div className="image-label"><span>THE ORIGINAL WAVE</span><span>CHAPEL ROAD / 2024</span></div>
          </div>
          <figure className="hero-postcard">
            <div className="hero-postcard__photo"><Image src="/images/mokai-window.webp" alt="Sunlit windows and Mokai's patterned cushions" fill sizes="(max-width: 900px) 28vw, 15vw" /></div>
            <figcaption>A seat worth staying for.</figcaption>
          </figure>
          <div className="hero-seal" aria-hidden="true"><Image src="/brand/mokai-hanko-filled.svg" alt="" width={180} height={180} /></div>
          </div>
          <div className="hero-footnote"><span>Coffee house & matcha rituals</span><a href="#visit">Now at Pali Hill, Bandra <ArrowUpRight size={14} /></a></div>
        </section>

        <Marquee />

        <section className="manifesto section-pad" id="story">
          <div className="story-composition">
          <div className="manifesto-stamp" data-reveal="clip" data-parallax-wrap>
            <Image src="/images/mokai-window.webp" fill sizes="(max-width: 900px) 85vw, 40vw" alt="Patterned cushions below Mokai's arched windows" data-parallax data-speed="-10" />
          </div>
          <div className="story-detail"><Image src="/images/brand/interiors/frame-01.webp" alt="" width={220} height={220} /><span>A little unexpected.</span></div>
          <span className="story-caption">A glimpse of where it began. Chapel Road, 2024.</span>
          </div>
          <div className="manifesto-copy">
            <p className="eyebrow" data-reveal="left">NOT A QUICK COFFEE</p>
            <h2 data-reveal="left">Come for the cup.<br /><em>Stay for the feeling.</em></h2>
            <div className="manifesto-grid" data-reveal-stagger>
              <p>Japanese calm, a little Harajuku colour, and a very Bandra kind of warmth. From our first painted façade to our home in Pali Hill, curiosity has always had a seat.</p>
              <p>Coffee downstairs. A matcha ritual upstairs. Sunlight, conversations, and all the little reasons to linger.</p>
            </div>
          </div>
        </section>

        <section className="ritual section-pad">
          <div className="ritual-visual" data-reveal="scale" aria-label="Matcha ritual: whisk, watch, wait, sip">
            <div className="ritual-artwork" aria-hidden="true" />
            <svg className="ritual-ring" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="ritual-orbit-path" d="M 50,7 a 43,43 0 1,1 0,86 a 43,43 0 1,1 0,-86" />
              </defs>
              <circle className="ritual-ring__line" cx="50" cy="50" r="43" />
              <text className="ritual-ring__text">
                {ritualSteps.map(([name], index) => <textPath key={name} href="#ritual-orbit-path" startOffset={`${index * 25 + 10}%`} textAnchor="middle">{name.toUpperCase()}</textPath>)}
              </text>
              <circle className="ritual-ring__dot" cx="50" cy="7" r="1.35" />
              <circle className="ritual-ring__dot" cx="50" cy="93" r="1.35" />
            </svg>
            <div className="ritual-core"><span lang="ja">抹茶</span><small>MATCHA</small></div>
            <div className="ritual-caption" aria-hidden="true"><span>0{activeRitual + 1} / 04</span><strong key={activeRitual}>{ritualSteps[activeRitual][0]}</strong></div>
          </div>
          <div className="ritual-copy">
            <p className="eyebrow" data-reveal="right">UPSTAIRS, A DIFFERENT PACE</p>
            <h2 data-reveal="right">Make a little<br /><em>time for tea.</em></h2>
            <p data-reveal="right">Ceremonial matcha, traditional tools, and an invitation to join in. Your drink begins before the first sip.</p>
            <div className="ritual-steps" aria-label="Explore the matcha ritual">
              {ritualSteps.map(([name, title, detail], index) => <button key={name} type="button" className={activeRitual === index ? "is-active" : ""} aria-pressed={activeRitual === index} onClick={() => setActiveRitual(index)}><span className="ritual-step-number">0{index + 1}</span><span className="ritual-step-name">{name}</span><span className="ritual-step-detail"><strong>{title}</strong>{detail}</span></button>)}
            </div>
            <a className="text-link" href="#menu" data-reveal="right">Explore the mood <ArrowUpRight size={18} /></a>
          </div>
        </section>

        <section className="rooms-pin" id="spaces">
          <div className="rooms-layout">
          <div className="rooms-heading section-pad">
            <p className="eyebrow">THE MOKAI ARCHIVE</p>
            <h2>Every corner,<br /><em>a feeling.</em></h2>
            <p className="rooms-intro">The windows, the warmth, the small surprises. A few favourite moments from our first home.</p>
            <div className="rooms-progress" aria-hidden="true"><span /></div>
            <span className="rooms-direction">Scroll to wander <ArrowUpRight size={16} /></span>
          </div>
          <div className="rooms-window" role="region" aria-label="Mokai spaces photo gallery" tabIndex={0}>
          <div className="rooms-track">
            {rooms.map((room) => (
              <article className="room-card" key={room.title}>
                <div className="room-card__image frame">
                  <Image src={room.image} alt={room.title} fill sizes="(max-width: 900px) 86vw, 48vw" />
                </div>
                <div className="room-card__meta"><span>{room.eyebrow}</span><h3>{room.title}</h3><p>{room.body}</p></div>
              </article>
            ))}
          </div>
          </div>
          </div>
        </section>

        <section className="menu-experience section-pad" id="menu">
          <div className="menu-header">
            <div>
              <p className="eyebrow" data-reveal>TASTE THE STORY</p>
              <h2 data-reveal>Signatures,<br /><em>not standards.</em></h2>
            </div>
            <p data-reveal="right">Asian flavours, French technique and a Mumbai appetite. A few favourites to start the conversation.</p>
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
            <Image src="/images/brand/interiors/frame-03.webp" alt="Illustrated artwork from Mokai's brand collection" fill sizes="100vw" data-parallax data-speed="-22" data-scale="1.2" />
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
              <div className="map-pin"><Image src="/brand/mokai-hanko-filled.svg" width={100} height={100} alt="Mokai" /></div>
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
