import Image from "next/image";

export default function BrandMark({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""} ${light ? "brand--light" : ""}`} aria-label="Mokai">
      <Image
        src="/brand/mokai-horizontal.svg"
        alt="Mokai"
        width={300}
        height={300}
        priority={compact}
      />
    </span>
  );
}
