export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand--compact" : "brand"} aria-label="Mokai">
      <span>M</span>
      <span>O</span>
      <span>K</span>
      <span>A</span>
      <span>I</span>
    </div>
  );
}
