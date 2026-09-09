import type { IconType } from "@/data/products";

/**
 * Clean line-art glyphs representing each product family.
 * Used as the "product image" placeholder inside a gradient stage so the
 * catalog reads as intentional design even before real product photos are added.
 */
export function ProductGlyph({ type, className = "" }: { type: IconType; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "monitor":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <rect x="12" y="5" width="24" height="38" rx="3" />
          <circle cx="24" cy="30" r="7" />
          <circle cx="24" cy="30" r="2.4" />
          <circle cx="24" cy="13" r="3" />
          <line x1="16" y1="38" x2="16" y2="38.4" />
        </svg>
      );
    case "mixer":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <rect x="6" y="8" width="36" height="32" rx="3" />
          <line x1="14" y1="14" x2="14" y2="34" />
          <line x1="22" y1="14" x2="22" y2="34" />
          <line x1="30" y1="14" x2="30" y2="34" />
          <line x1="38" y1="14" x2="38" y2="34" />
          <rect x="11.5" y="18" width="5" height="4" rx="1.4" fill="currentColor" stroke="none" />
          <rect x="19.5" y="26" width="5" height="4" rx="1.4" fill="currentColor" stroke="none" />
          <rect x="27.5" y="16" width="5" height="4" rx="1.4" fill="currentColor" stroke="none" />
          <rect x="35.5" y="24" width="5" height="4" rx="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <rect x="18" y="6" width="12" height="22" rx="6" />
          <line x1="21" y1="12" x2="27" y2="12" />
          <line x1="21" y1="16" x2="27" y2="16" />
          <line x1="21" y1="20" x2="27" y2="20" />
          <path d="M13 24a11 11 0 0 0 22 0" />
          <line x1="24" y1="35" x2="24" y2="42" />
          <line x1="18" y1="42" x2="30" y2="42" />
        </svg>
      );
    case "headphone":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <path d="M10 28v-4a14 14 0 0 1 28 0v4" />
          <rect x="7" y="27" width="8" height="13" rx="3" />
          <rect x="33" y="27" width="8" height="13" rx="3" />
        </svg>
      );
    case "amp":
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <rect x="6" y="12" width="36" height="24" rx="3" />
          <circle cx="15" cy="24" r="4.5" />
          <circle cx="26" cy="24" r="4.5" />
          <line x1="35" y1="19" x2="39" y2="19" />
          <line x1="35" y1="24" x2="39" y2="24" />
          <line x1="35" y1="29" x2="39" y2="29" />
        </svg>
      );
    case "utility":
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} {...common}>
          <circle cx="24" cy="24" r="11" />
          <line x1="24" y1="10" x2="24" y2="15" />
          <line x1="24" y1="33" x2="24" y2="38" />
          <line x1="38" y1="24" x2="33" y2="24" />
          <line x1="15" y1="24" x2="10" y2="24" />
          <line x1="24" y1="24" x2="30" y2="20" />
        </svg>
      );
  }
}
