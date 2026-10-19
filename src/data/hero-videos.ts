const RELEASE_BASE =
  "https://github.com/pedroriquelme03/site-nucleopro/releases/download/hero-videos";

/** In local dev, serve from /public/hero (gitignored). In production, GitHub Release. */
function heroSrc(file: string) {
  if (import.meta.env.DEV) return `/hero/${file}`;
  return `${RELEASE_BASE}/${file}`;
}

/** Banner videos — MP4s are not in git; hosted on GitHub Release `hero-videos`. */
export const HERO_VIDEOS = [
  {
    id: "cr-series",
    src: heroSrc("cr-series.mp4"),
    label: "Mackie CR Series",
  },
  {
    id: "mc-series",
    src: heroSrc("mc-series.mp4"),
    label: "Mackie MC Series",
  },
  {
    id: "profx",
    src: heroSrc("profx.mp4"),
    label: "Mackie ProFX",
  },
] as const;
