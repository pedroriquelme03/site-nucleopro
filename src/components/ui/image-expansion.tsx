import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlideItem {
  id: number;
  badge: string;
  title: string;
  buttonText: string;
  image: string;
  href?: string;
}

interface ImageExpansionSliderProps {
  slides: SlideItem[];
  tabs?: string[];
  exploreHref?: string;
  exploreLabel?: string;
}

export function ImageExpansionSlider({
  slides,
  tabs,
  exploreHref,
  exploreLabel = "Ver todos",
}: ImageExpansionSliderProps) {
  const tabList = tabs ?? [];
  const showTabs = tabList.length > 0;
  const [activeTab, setActiveTab] = useState(tabList[0] ?? "");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredSlides =
    showTabs && activeTab && activeTab !== tabList[0]
      ? slides.filter((slide) => slide.badge === activeTab)
      : slides;

  const totalDots = filteredSlides.length;

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < totalDots - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : totalDots - 1));
  };

  useEffect(() => {
    if (sliderRef.current) {
      const card = sliderRef.current.children[0] as HTMLElement | undefined;
      if (card) {
        const cardWidth = card.clientWidth + 24;
        sliderRef.current.scrollTo({
          left: currentIdx * cardWidth,
          behavior: "smooth",
        });
      }
    }
  }, [currentIdx]);

  useEffect(() => {
    setCurrentIdx(0);
  }, [activeTab]);

  useEffect(() => {
    if (selectedImageIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImageIndex(null);
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev !== null && prev < totalDots - 1 ? prev + 1 : 0,
        );
      }
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : totalDots - 1,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedImageIndex, totalDots]);

  const arrowClass =
    "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95";

  return (
    <div className="relative w-full overflow-visible rounded-2xl border border-line bg-ink-800/40 p-6 font-sans shadow-card select-none md:p-10">
      {(showTabs || exploreHref) && (
      <div className="mb-8 flex flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {showTabs
            ? tabList.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 md:text-sm",
                    activeTab === tab
                      ? "bg-ink-950 text-white"
                      : "text-slate-400 hover:text-white",
                  )}
                >
                  {tab}
                </button>
              ))
            : null}
        </div>
        {exploreHref ? (
          <a
            href={exploreHref}
            target={exploreHref.startsWith("http") ? "_blank" : undefined}
            rel={exploreHref.startsWith("http") ? "noreferrer" : undefined}
            className="group ml-auto flex items-center gap-1 text-xs font-semibold text-slate-400 transition-colors duration-200 hover:text-white md:text-sm"
          >
            {exploreLabel}
            <span className="transform transition-transform duration-200 group-hover:translate-x-0.5">
              &gt;
            </span>
          </a>
        ) : null}
      </div>
      )}

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-12 pb-2 md:px-14"
          style={{ scrollbarWidth: "none" }}
        >
        {filteredSlides.map((slide, idx) => (
          <div
            key={slide.id}
            onClick={() => setSelectedImageIndex(idx)}
            className="group relative aspect-[1.5/1] min-w-[100%] cursor-pointer snap-start overflow-hidden rounded-2xl border border-line bg-ink-950/40 transition-all duration-500 hover:border-brand/40 sm:min-w-[48%] lg:min-w-[31.8%]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
              <h3
                className="mb-4 max-w-[95%] truncate text-sm font-bold leading-tight tracking-tight text-white sm:text-base lg:text-lg"
                title={slide.title}
              >
                {slide.title}
              </h3>
              {slide.href ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-fit rounded-[5px] bg-white px-3.5 py-1.5 text-[10px] font-bold tracking-tight text-black shadow-md shadow-black/20 transition-all duration-300 hover:bg-[#a97c50] hover:text-ink-950 active:scale-95"
                >
                  {slide.buttonText}
                </a>
              ) : (
                <button
                  type="button"
                  className="w-fit rounded-[5px] bg-white px-3.5 py-1.5 text-[10px] font-bold tracking-tight text-black shadow-md shadow-black/20 transition-all duration-300 hover:bg-[#a97c50] hover:text-ink-950 active:scale-95"
                >
                  {slide.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className={cn(arrowClass, "left-0 -translate-x-1/2")}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className={cn(arrowClass, "right-0 translate-x-1/2")}
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIdx(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              currentIdx === idx ? "w-8 bg-white" : "w-2 bg-zinc-700 hover:bg-zinc-500",
            )}
            aria-label={`Ir para o slide ${idx + 1}`}
          />
        ))}
      </div>

      {selectedImageIndex !== null && filteredSlides[selectedImageIndex] ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/50 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex(null);
            }}
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 active:scale-95 md:left-12"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : totalDots - 1,
              );
            }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="relative flex max-h-full max-w-full flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredSlides[selectedImageIndex].image}
              alt={filteredSlides[selectedImageIndex].title}
              className="max-h-[85vh] max-w-full rounded-lg border border-zinc-800 object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="mb-2 text-xl font-bold text-white">
                {filteredSlides[selectedImageIndex].title}
              </h3>
              <p className="text-sm text-zinc-400">
                {selectedImageIndex + 1} de {totalDots}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/80 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 active:scale-95 md:right-12"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev !== null && prev < totalDots - 1 ? prev + 1 : 0,
              );
            }}
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
