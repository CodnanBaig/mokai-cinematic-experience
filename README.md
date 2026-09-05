# Mokai — Cinematic Next.js Concept

An immersive, editorial website concept for Mokai, Bandra. The experience is built around Mokai 2.0's public-facing themes: slower living, participation, matcha ritual, playful comfort, Japanese restraint and Bandra energy.

## Experience

- Full-screen branded loader
- Lenis smooth scrolling
- GSAP reveal, parallax and pinned horizontal storytelling
- Layered archive photography and independently drifting brand artwork
- Scroll-linked matcha orbit with interactive Whisk / Watch / Wait / Sip steps
- Pinned desktop room gallery with progress and a native mobile/reduced-motion scroller
- Interactive menu preview
- Responsive mobile layout
- Reduced-motion accessibility fallback
- Current Pali Hill address, timings and phone details

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Production

```bash
pnpm build
pnpm start
```

## Stack

Next.js App Router, TypeScript, GSAP ScrollTrigger, Lenis and Lucide React.

## Art direction

The implementation uses the supplied Mokai visual-language system: Kobe for display, Cy for supporting typography, the Graphite/Coffee/Kraft/Sakura/Ube palette, the official wordmark and hanko lockups, and optimized versions of the supplied backdrop artwork. The local font files and identity artwork should still be cleared for web distribution with the brand before launch.

## Public research references

- [Time Out: Mokai, April 2026](https://www.timeout.com/mumbai/restaurants/mokai) informed the Pali Hill story: coffee downstairs, matcha upstairs, Japanese restraint and playful details.
- [Free Press Journal: Mokai 2.0, April 2026](https://www.freepressjournal.in/lifestyle/experience-a-slice-of-japan-in-mumbai-step-inside-mokai-bandras-aesthetic-viral-matcha-cafe-with-a-floating-bar) informed the hands-on matcha sequence. Archive photographs are labelled separately from the current location.
- Mokai Instagram: `https://www.instagram.com/mokaiindia/`
- Architectural Digest India feature: `https://www.architecturaldigest.in/story/this-charming-new-coffee-house-in-bandra-will-whisk-you-off-to-japan-mokai-studio-6158-minimalism-asia-chapel-road-cafe-karreena-bulchandani/`
- Mokai 2.0 interview: `https://wp-admin.firstlook.fashion/exclusive-mokai-2-0-brings-a-slower-softer-rhythm-to-mumbai/`
- Current listing and public details: `https://www.district.in/dining/mumbai/mokai-pali-hill-bandra-west`

## Image note

Editorial images in `public/images` are included only for this private design prototype and retain their respective owners' rights. Before a commercial launch, obtain written usage approval or replace them with Mokai-owned originals. Photo credits referenced by the source feature include Assad Dadan / Architectural Digest India.

## Recommended production handoff

Replace the prototype copy and imagery with approved brand assets, connect the CTA to Mokai's preferred reservation/order system, add analytics and consent controls, then run a full Lighthouse/accessibility pass after final media is loaded.
