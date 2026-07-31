# Mokai — Cinematic Next.js Concept

An immersive, editorial website concept for Mokai, Bandra. The experience is built around Mokai 2.0's public-facing themes: slower living, participation, matcha ritual, playful comfort, Japanese restraint and Bandra energy.

## Experience

- Full-screen branded loader
- Lenis smooth scrolling
- GSAP reveal, parallax and pinned horizontal storytelling
- React Three Fiber matcha sculpture
- Interactive menu preview
- Responsive mobile layout
- Reduced-motion accessibility fallback
- Current Pali Hill address, timings and phone details

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Stack

Next.js App Router, TypeScript, GSAP, Lenis, Three.js, React Three Fiber, Drei and Lucide React.

## Art direction

The palette was sampled visually from Mokai's public spaces and editorial photography: warm paper, matcha green, ube pink, oxidised rust and aqua. The typography uses high-contrast system serif/sans fallbacks so the build remains self-contained. Replace these with Mokai's licensed production fonts when supplied by the brand.

The included abstract hanko is an original concept mark for this prototype, inspired by the public description of Mokai's moka-pot seal. It is not presented as the official logo artwork.

## Public research references

- Mokai Instagram: `https://www.instagram.com/mokaiindia/`
- Architectural Digest India feature: `https://www.architecturaldigest.in/story/this-charming-new-coffee-house-in-bandra-will-whisk-you-off-to-japan-mokai-studio-6158-minimalism-asia-chapel-road-cafe-karreena-bulchandani/`
- Mokai 2.0 interview: `https://wp-admin.firstlook.fashion/exclusive-mokai-2-0-brings-a-slower-softer-rhythm-to-mumbai/`
- Current listing and public details: `https://www.district.in/dining/mumbai/mokai-pali-hill-bandra-west`

## Image note

Editorial images in `public/images` are included only for this private design prototype and retain their respective owners' rights. Before a commercial launch, obtain written usage approval or replace them with Mokai-owned originals. Photo credits referenced by the source feature include Assad Dadan / Architectural Digest India.

## Recommended production handoff

Replace the prototype copy and imagery with approved brand assets, connect the CTA to Mokai's preferred reservation/order system, add analytics and consent controls, then run a full Lighthouse/accessibility pass after final media is loaded.
