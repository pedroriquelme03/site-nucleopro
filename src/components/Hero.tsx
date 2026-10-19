import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HERO_VIDEOS } from "@/data/hero-videos";
import { cn } from "@/lib/utils";

const VIDEOS = HERO_VIDEOS;

function LocalVideoCover({
  src,
  poster,
  title,
  active,
  priority,
  onEnded,
}: {
  src: string;
  poster: string;
  title: string;
  active: boolean;
  priority?: boolean;
  onEnded: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const tryPlay = () => {
    const video = ref.current;
    if (!video || !active) return;
    video.muted = true;
    const play = video.play();
    if (play && typeof play.catch === "function") play.catch(() => undefined);
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (active) {
      video.currentTime = 0;
      setReady(video.readyState >= 2);
      if (video.readyState >= 2) tryPlay();
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      <img
        src={poster}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          ready && active ? "opacity-0" : "opacity-100",
        )}
      />
      <video
        ref={ref}
        src={src}
        poster={poster}
        title={title}
        muted
        playsInline
        preload={priority || active ? "auto" : "metadata"}
        tabIndex={-1}
        onLoadedData={() => {
          setReady(true);
          tryPlay();
        }}
        onCanPlay={() => {
          setReady(true);
          tryPlay();
        }}
        onPlaying={() => setReady(true)}
        onEnded={onEnded}
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[125%] w-[177.78vh] min-w-[125%] -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-500",
          ready && active ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);

  const go = (direction: -1 | 1) => {
    setSlide((current) => (current + direction + VIDEOS.length) % VIDEOS.length);
  };

  useEffect(() => {
    // Prefetch the next slide video while the current one plays
    const next = VIDEOS[(slide + 1) % VIDEOS.length];
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = next.src;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [slide]);

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
    const video = document.querySelector<HTMLVideoElement>("#top video");
    if (!video) return;
    if (paused || hidden) {
      video.pause();
      return;
    }
    video.muted = true;
    const play = video.play();
    if (play && typeof play.catch === "function") play.catch(() => undefined);
  }, [paused, hidden, slide]);

  return (
    <section id="top" className="relative mt-16 h-[calc(100svh-4rem)] w-full overflow-hidden bg-black">
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
            {active || index === (slide + 1) % VIDEOS.length ? (
              <LocalVideoCover
                src={video.src}
                poster={video.poster}
                title={video.label}
                active={active}
                priority={index === 0}
                onEnded={() => {
                  if (paused || hidden) return;
                  go(1);
                }}
              />
            ) : null}
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
