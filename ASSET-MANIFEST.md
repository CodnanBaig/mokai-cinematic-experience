# Mokai Frontend Asset Manifest

Source: the shared Mokai Google Drive frontend-design handoff.

## Frontend-ready assets

- `public/brand/*.svg` — official vector logo/lockup variants.
- `public/brand/raster/*.png` — transparent PNG logo fallbacks.
- `public/models/mokai-logo.{obj,mtl,stl}` — original 3D logo files.
- `public/fonts/Cy-*.ttf` — complete CY family from Thin (100) through Black (900).
- `public/fonts/Kobe-Regular.ttf` and `public/fonts/Kobe.otf` — Kobe display-font sources.
- `public/images/brand/backdrop-01.webp` … `backdrop-10.webp` — full photography-backdrop set.
- `public/images/brand/restroom/poster-01.webp` … `poster-10.webp` — full restroom-poster artwork set.
- `public/images/brand/interiors/*.webp` — reusable interior-frame and jute-bag artwork.
- `public/images/brand/collateral/*.webp` — reusable takeaway-bag, cup-sticker and dessert-box collateral artwork/mockups.
- `public/assets/mokai-assets.json` — canonical public URLs for frontend consumption.

## Web extraction / optimization

- Missing backdrop masters were 10800×7200 CMYK JPEGs and were converted to RGB WebP at up to 2400px, quality 80.
- Restroom artwork masters were 3600×4800 JPEGs and were converted to WebP at up to 2000px, quality 80.
- Interior artwork was supplied as large CMYK TIFF print masters and was converted to RGB WebP at up to 2200px, quality 80.
- Existing optimized assets already in the repo were preserved rather than duplicated.
- The OBJ's internal material reference was normalized to `mokai-logo.mtl`.

## Intentionally excluded from `public`

The Drive also contains production/source files that should not ship with a frontend:
- Illustrator (`.ai`), Photoshop (`.psd`) and EPS source masters.
- Print-production PDFs, including very large multi-hundred-MB files.
- Printer instruction / “How To Print” screenshots.
- `.DS_Store` metadata.

Where a usable visual export existed (SVG/PNG/JPEG/TIFF), the web format or a web-optimized derivative was kept instead. The source masters remain in Google Drive.

## Licensing note

Confirm final commercial/webfont licensing before public launch.
