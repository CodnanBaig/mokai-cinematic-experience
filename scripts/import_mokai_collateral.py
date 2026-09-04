from __future__ import annotations

import json
import shutil
from pathlib import Path

import gdown
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / ".asset-collateral-tmp"

COLLATERAL = {
    "bottom-cup-sticker-mockup": "1DQvj2kHcnSifW8nyqWg3iq-jN_FgQhSK",
    "takeaway-bag-mockup": "1YuptGa138ugh7HnkqkqhG20qBIrLiXT1",
    "dessert-box-artwork": "1VSbw47KZqfz4XMxB4Eea3yKmELQBb_V8",
}


def download(file_id: str, output: Path) -> Path:
    output.parent.mkdir(parents=True, exist_ok=True)
    result = gdown.download(id=file_id, output=str(output), quiet=False)
    if not result or not output.exists() or output.stat().st_size == 0:
        raise RuntimeError(f"Failed to download Google Drive file {file_id}")
    return output


def webp(source: Path, destination: Path, max_dim: int = 2200, quality: int = 80) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image.load()
        if image.mode == "CMYK":
            image = image.convert("RGB")
        elif image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        image.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=4)


def update_index(paths: list[str]) -> None:
    index_path = ROOT / "public/assets/mokai-assets.json"
    data = json.loads(index_path.read_text())
    data["collateral"] = paths
    index_path.write_text(json.dumps(data, indent=2) + "\n")


def update_manifest() -> None:
    path = ROOT / "ASSET-MANIFEST.md"
    text = path.read_text()
    line = "- `public/images/brand/collateral/*.webp` — reusable takeaway-bag, cup-sticker and dessert-box collateral artwork/mockups.\n"
    marker = "- `public/images/brand/interiors/*.webp` — reusable interior-frame and jute-bag artwork.\n"
    if line not in text:
        text = text.replace(marker, marker + line)
        path.write_text(text)


def main() -> None:
    shutil.rmtree(TMP, ignore_errors=True)
    TMP.mkdir(parents=True)
    public_paths: list[str] = []

    try:
        for name, file_id in COLLATERAL.items():
            source = download(file_id, TMP / f"{name}.png")
            destination = ROOT / f"public/images/brand/collateral/{name}.webp"
            webp(source, destination)
            public_paths.append(f"/images/brand/collateral/{name}.webp")

        update_index(public_paths)
        update_manifest()
    finally:
        shutil.rmtree(TMP, ignore_errors=True)


if __name__ == "__main__":
    main()
