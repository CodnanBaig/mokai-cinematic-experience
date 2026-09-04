# Changelog

## v2026.09.04-2220-nav-menu-removed
- Removed Menu from the shared SiteNav; links are Story, Spaces, Join our team, Contact, plus Visit.

## v2026.09.04-2132-shared-nav
- Unified navbar into `SiteNav` used on Home, Join, and Contact (path-aware links, mobile menu, Visit CTA, active states). Moved footer to `SiteFooter` and removed `SubpageChrome`.

## v2026.09.04-2129-subpage-nav-fix
- Fixed unresponsive Join/Contact nav: GSAP was transforming a wrapper around the fixed header (breaking viewport positioning under `overflow: hidden`). Animate the header itself, clear the transform after entrance, and use `overflow-x: clip` on subpages instead.

## v2026.09.04-2127-shared-footer
- Home now uses the same `SubpageFooter` as Join / Contact; removed the duplicate home footer styles and the extra “More from Mokai” strip under it.

## v2026.09.04-2122-scroll-motion
- Added shared `useScrollMotion` + `PageMotion` so Home, Join, and Contact all get Lenis smooth scroll, parallax, and scroll-triggered choreography (respects `prefers-reduced-motion`).
- Expanded motion vocabulary: reveal variants (up/left/right/scale/clip), stagger lists, scrub drift/fade-scale, and image parallax with configurable speed.
- Home extras: room-card + menu-list + footer entrances; stronger parallax on hero, rooms, menu preview, interlude, and map.

## v2026.09.04-2115-asset-variety
- Spread all 10 brand backdrops across home sections (hero→01, manifesto→09, ritual→02/08, rooms→05, menu→04, interlude→10, visit→07, map→03, footer→06) so sections no longer reuse the same few textures.
- Pulled unused public assets into the experience: interiors frames + jute bag, restroom posters, and collateral (takeaway bag, dessert box, cup sticker) on home rooms/menu/interlude and on Join / Contact pages.
- Join page: poster strip + distinct backdrops per section; Contact: poster/collateral strip and fresher hero/detail imagery.

## v2026.09.04-2045-nav-links
- Added Join our team and Contact to the primary home nav and footer so those pages are reachable from the main experience (not only the bottom “More from Mokai” strip / subpage chrome).
