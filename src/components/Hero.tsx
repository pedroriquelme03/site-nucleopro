import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const VIDEOS = [
  { id: "6tzq0mbnFww", label: "Mackie ThumpSub GO" },
  { id: "bzP9--xFRnU", label: "Mackie Thump v4" },
  { id: "oNEWCcsTgIs", label: "Mackie ProFX10 GO" },
] as const;

function YouTubeCover({ videoId, title }: { videoId: string; title: string }) {
  const src = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  src.search = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
  }).toString();

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      <iframe
        src={src.toString()}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
        tabIndex={-1}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[125%] w-[177.78vh] min-w-[125%] -translate-x-1/2 -translate-y-1/2 border-0"
      />
    </div>
  );
}

const SLIDE_MS = 12_000;

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  const go = (direction: -1 | 1) => {
    setSlide((current) => (current + direction + VIDEOS.length) % VIDEOS.length);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        go(-1);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        go(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || hidden || reduced) return;

    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % VIDEOS.length);
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, [slide, paused, hidden]);

  return (
    <section id="top" className="relative h-svh w-full overflow-hidden bg-black">
      <h1 className="sr-only">Qualidade em cada som, do estúdio ao palco.</h1>

      {VIDEOS.map((video, index) => {
        const active = slide === index;
        return (
          <div
            key={video.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {active ? <YouTubeCover videoId={video.id} title={video.label} /> : null}
          </div>
        );
      })}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black/55 to-transparent"
      />

      <nav
        aria-label="Vídeos do destaque"
        className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-6 lg:right-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          aria-label="Vídeo anterior"
          onClick={() => go(-1)}
          className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ChevronUp className="h-6 w-6" strokeWidth={2.25} />
        </button>

        <div className="flex flex-col items-center gap-3.5">
          {VIDEOS.map((video, index) => {
            const active = slide === index;
            return (
              <button
                key={video.id}
                type="button"
                aria-label={video.label}
                aria-current={active ? "true" : undefined}
                onClick={() => setSlide(index)}
                className={cn(
                  "rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  active
                    ? "h-3.5 w-3.5 bg-brand shadow-glow-sm"
                    : "h-3 w-3 bg-white/40 hover:bg-white/80",
                )}
              />
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Próximo vídeo"
          onClick={() => go(1)}
          className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={2.25} />
        </button>
      </nav>
    </section>
  );
}
