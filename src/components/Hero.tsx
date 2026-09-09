import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { ShaderBackground } from "@/components/ui/mesh-drift-shader";
import { cn, WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

const SPEAKER_SRC = "/products/Mackie-Thump15v4-3Q-Hero-Left-US.webp";
const YOUTUBE_ID = "6tzq0mbnFww";

const SLIDES = [
  { id: "hero", label: "Destaque Núcleo ProAudio" },
  { id: "video", label: "Vídeo em tela cheia" },
] as const;

function ScrollScaleSpeaker({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      if (reduced) {
        img.style.transform = "scale(1)";
        return;
      }
      const max = section.offsetHeight - window.innerHeight;
      const progress = max <= 0 ? 0 : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / max));
      img.style.transform = `scale(${1 + progress * 0.2})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  return (
    <img
      ref={imgRef}
      src={SPEAKER_SRC}
      alt="Mackie Thump 15"
      className="mx-auto h-[280px] w-auto origin-center object-contain will-change-transform sm:h-[320px] lg:mx-0 lg:h-[420px] xl:h-[460px]"
    />
  );
}

function YouTubeCover({ videoId }: { videoId: string }) {
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
        title="Vídeo Núcleo ProAudio"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen={false}
        tabIndex={-1}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-[125%] w-[177.78vh] min-w-[125%] -translate-x-1/2 -translate-y-1/2 border-0"
      />
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const isVideo = slide === 1;

  return (
    <section id="top" ref={sectionRef} className="relative h-[180vh] w-full">
      <div className="sticky top-0 isolate h-svh overflow-hidden bg-black">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isVideo ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <ShaderBackground className="pointer-events-none absolute inset-0 h-full w-full" />
          <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] bg-black/25" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/15 to-transparent"
          />
        </div>

        {isVideo ? <YouTubeCover videoId={YOUTUBE_ID} /> : null}

        <div
          className={cn(
            "relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pt-28 pb-16 pr-14 transition-opacity duration-700 sm:px-10 sm:pr-16 md:pt-32 lg:px-20 lg:pr-24 lg:pt-36",
            isVideo ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <div className="grid w-full items-center gap-10 pt-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:pt-6 xl:grid-cols-[minmax(0,1fr)_460px]">
            <div className="max-w-[34rem]">
              <h1 className="bg-gradient-to-br from-white via-[#f3e6d2] via-[58%] to-[#a97c50] bg-clip-text font-display text-[2.5rem] font-light leading-[1.05] tracking-[-0.03em] text-transparent sm:text-6xl lg:text-[4.25rem]">
                Qualidade em cada som,
                <br />
                do estúdio ao palco.
              </h1>

              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/60 md:mt-7">
                A Núcleo ProAudio é a distribuidora oficial Mackie no Brasil.
                Equipamentos de áudio high-end com suporte técnico especializado,
                assistência pós-venda e entrega em todo o território nacional.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isVideo ? -1 : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-white to-white px-6 py-3 text-sm font-medium text-ink-950 transition-all hover:to-[#a97c50]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Fale com um especialista
                </a>
                <a
                  href="#produtos"
                  tabIndex={isVideo ? -1 : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Ver produtos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            <ScrollScaleSpeaker sectionRef={sectionRef} />
          </div>
        </div>

        <nav
          aria-label="Slides do destaque"
          className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-6 lg:right-8"
        >
          {SLIDES.map((item, index) => {
            const active = slide === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={active ? "true" : undefined}
                onClick={() => setSlide(index)}
                className={cn(
                  "rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  active
                    ? "h-2.5 w-2.5 bg-brand shadow-glow-sm"
                    : "h-2 w-2 bg-white/35 hover:bg-white/70",
                )}
              />
            );
          })}
        </nav>
      </div>
    </section>
  );
}
