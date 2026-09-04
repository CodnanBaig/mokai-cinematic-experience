from __future__ import annotations

import json
import shutil
from pathlib import Path

import gdown
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / ".asset-import-tmp"

# Google Drive file IDs -> repo destinations.
DIRECT = {
    # Fonts missing from the existing repo.
    "1V9Mb4VjvzUasED15GgjQOUIKrVgb-xmJ": "public/fonts/Cy-Thin.ttf",
    "1EcPKBd40QULYh3FNbb2lS69jHeK8En3M": "public/fonts/Cy-ExtraLight.ttf",
    "1U3YOcWovHLykgYulLbwm5r1rHODViogK": "public/fonts/Cy-Light.ttf",
    "1fYDkcF-8TtsXqCTAbzKwZD3XeiC6btWE": "public/fonts/Cy-SemiLight.ttf",
    "1wqxvUZEYGr26sd4h7msJl6ClyNT1O601": "public/fonts/Cy-Bold.ttf",
    "1uoFmXrV6jSWYyEQHsFWdIkW6uF0J5Rf0": "public/fonts/Cy-ExtraBold.ttf",
    "1tvq7HKDuXwVTMui3mK9d6R7lgMwPEw-A": "public/fonts/Kobe.otf",

    # Official identity variants.
    "1vdhAJx73GSd9tQDLEUkRCllhSM8qrQkb": "public/brand/mokai-hanko.svg",
    "1JMjLkZHWSaKZNOfN5e1_WqMIpc7Gmjso": "public/brand/mokai-with-hanko-filled.svg",
    "1sWiJ9hYYJjnhQ1_uMa8wIflcgtIX7EBT": "public/brand/raster/mokai-horizontal.png",
    "1ru12FFSyiJud6_otWHN9Mu2Cl4RKEB7n": "public/brand/raster/mokai-hanko.png",
    "1pfgrE63lqrdNyrpaqpefoimwBctBr5AF": "public/brand/raster/mokai-hanko-filled.png",
    "1B3vFRIeW3gY9592pTutwXP2vFcgYWijT": "public/brand/raster/mokai-with-hanko.png",
    "1gnax9TZzNO9DKBodRJLcJxdMl76cGYfP": "public/brand/raster/mokai-with-hanko-filled.png",

    # Original 3D logo files.
    "1jiVsT3WqoqUR8cBiThiupE9qqNxjfotv": "public/models/mokai-logo.obj",
    "1AEATqjniQwSgb83WhD6RtCSYWexXGKpR": "public/models/mokai-logo.mtl",
    "16x4iJL0HW9HGQhUQTvNUONO83QlWRPP6": "public/models/mokai-logo.stl",
}

BACKDROPS = {
    4: "1Zik3OGQJWvpR-uQdytfmZfq_kmAH8ION",
    5: "1C6HgiM7350AbH3TxBzeRJEu_6U6o16BT",
    7: "1y1xwBnbpoOHGBNbP3cjbEJ89UZfMMpz6",
    8: "1dpNfrM1jyF7886CruaMiT2QwWKaM0lPe",
    9: "1SXOL0U8dvcXgpNmX1M3yWGJ3veRs0V1i",
    10: "1pz5FWtR3cR5q4PiMu7nBZGixrl4k1Sdu",
}

RESTROOM = {
    1: "1ErY8VXgkoUF9CwrFDPE8Kxjw8YsItGBR",
    2: "18zDn_lOYRiMzR0OjnUd3eyxbCVhEm3N6",
    3: "1bb7YdJZBMBZtbMHA4pD6P1xCrlyIY9Bx",
    4: "1WJf9t7CcOxZTbqD5fGWEssAf4exhZOWD",
    5: "1j10tfKUgVeOYm5W8KDIbDYaXe0j7OOo6",
    6: "1rtdrY49n5GlgG0OqKHKwa6hOa9uHsEOW",
    7: "1CsmDB6DeCaNspBm1ga0Jq5qDj4UBqIH8",
    8: "1Pw2JxP8Q2odohPl5BqWyT6sA8A8E6qYG",
    9: "1564Iunl-W29vjiWy_RO6qOe32RAMDw9p",
    10: "1mjBA-TP6geN6EhKw2_eJXJMIe4UIl7Ov",
}

INTERIORS = {
    "frame-01": "1lICnJrQ4W80uTFEyYygbCA6E_scNox3s",
    "frame-02": "16MmSsgKAmBWDnEF3Pm2ejNb4u1AfRRyk",
    "frame-03": "1h90Ja55KRYbqW50cDCPOZpjRaPbMidaU",
    "jute-bag-display": "1cegGNiPwXfItXKSxNgz0kthbQZtQvydK",
}


def download(file_id: str, output: Path) -> Path:
    output.parent.mkdir(parents=True, exist_ok=True)
    result = gdown.download(id=file_id, output=str(output), quiet=False)
    if not result or not output.exists() or output.stat().st_size == 0:
        raise RuntimeError(f"Failed to download Google Drive file {file_id}")
    return output


def webp(source: Path, destination: Path, max_dim: int, quality: int = 80) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        original = image.size

        # Let the JPEG decoder downsample huge print files before the full decode.
        if image.format == "JPEG":
            ratio = max(original) / max_dim
            factor = next((f for f in (8, 4, 2) if ratio >= f), 1)
            if factor > 1:
                image.draft("RGB", (original[0] // factor, original[1] // factor))

        image.load()
        if image.mode == "CMYK":
            image = image.convert("RGB")
        elif image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")

        image.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=4)


def write_index() -> None:
    index = {
        "brand": {
            "svg": [
                "/brand/mokai-horizontal.svg",
                "/brand/mokai-with-hanko.svg",
                "/brand/mokai-with-hanko-filled.svg",
                "/brand/mokai-hanko.svg",
                "/brand/mokai-hanko-filled.svg",
            ],
            "png": [
                "/brand/raster/mokai-horizontal.png",
                "/brand/raster/mokai-with-hanko.png",
                "/brand/raster/mokai-with-hanko-filled.png",
                "/brand/raster/mokai-hanko.png",
                "/brand/raster/mokai-hanko-filled.png",
            ],
        },
        "fonts": {
            "cy": [
                {"path": "/fonts/Cy-Thin.ttf", "weight": 100},
                {"path": "/fonts/Cy-ExtraLight.ttf", "weight": 200},
                {"path": "/fonts/Cy-Light.ttf", "weight": 300},
                {"path": "/fonts/Cy-Regular.ttf", "weight": 400},
                {"path": "/fonts/Cy-SemiLight.ttf", "weight": 500},
                {"path": "/fonts/Cy-SemiBold.ttf", "weight": 600},
                {"path": "/fonts/Cy-Bold.ttf", "weight": 700},
                {"path": "/fonts/Cy-ExtraBold.ttf", "weight": 800},
                {"path": "/fonts/Cy-Black.ttf", "weight": 900},
            ],
            "kobe": [
                {"path": "/fonts/Kobe-Regular.ttf", "format": "truetype"},
                {"path": "/fonts/Kobe.otf", "format": "opentype"},
            ],
        },
        "backdrops": [f"/images/brand/backdrop-{n:02d}.webp" for n in range(1, 11)],
        "restroomPosters": [f"/images/brand/restroom/poster-{n:02d}.webp" for n in range(1, 11)],
        "interiors": [
            "/images/brand/interiors/frame-01.webp",
            "/images/brand/interiors/frame-02.webp",
            "/images/brand/interiors/frame-03.webp",
            "/images/brand/interiors/jute-bag-display.webp",
        ],
        "models": {
            "obj": "/models/mokai-logo.obj",
            "mtl": "/models/mokai-logo.mtl",
            "stl": "/models/mokai-logo.stl",
        },
    }
    path = ROOT / "public/assets/mokai-assets.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(index, indent=2) + "\n")


def write_manifest() -> None:
    text = """# Mokai Frontend Asset Manifest

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
"""
    (ROOT / "ASSET-MANIFEST.md").write_text(text)


def main() -> None:
    if TMP.exists():
        shutil.rmtree(TMP)
    TMP.mkdir(parents=True)

    try:
        for file_id, relative in DIRECT.items():
            dest = ROOT / relative
            download(file_id, dest)

        # Fix the material filename reference after normalizing the OBJ filename.
        obj = ROOT / "public/models/mokai-logo.obj"
        obj.write_text(obj.read_text(errors="ignore").replace("mtllib Mokai Logo.mtl", "mtllib mokai-logo.mtl", 1))

        for number, file_id in BACKDROPS.items():
            source = download(file_id, TMP / f"backdrop-{number:02d}.jpg")
            webp(source, ROOT / f"public/images/brand/backdrop-{number:02d}.webp", 2400)

        for number, file_id in RESTROOM.items():
            source = download(file_id, TMP / f"poster-{number:02d}.jpg")
            webp(source, ROOT / f"public/images/brand/restroom/poster-{number:02d}.webp", 2000)

        for name, file_id in INTERIORS.items():
            source = download(file_id, TMP / f"{name}.tiff")
            webp(source, ROOT / f"public/images/brand/interiors/{name}.webp", 2200)

        write_index()
        write_manifest()
    finally:
        shutil.rmtree(TMP, ignore_errors=True)


if __name__ == "__main__":
    main()
