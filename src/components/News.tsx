import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { newsItems } from "@/data/news";
import { SectionHeading } from "./SectionHeading";

const arrowClass =
  "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950/90 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95 sm:h-10 sm:w-10";

function getCardStep(el: HTMLElement) {
  const card = el.children[0] as HTMLElement | undefined;
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 20;
  return card.offsetWidth + gap;
}

export function News() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollByCard = (direction: -1 | 1) => {
    const el = sliderRef.current;
    if (!el) return;

    const step = getCardStep(el);
    if (!step) return;

    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + direction * step;

    if (direction === 1 && next > max - 8) next = 0;
    if (direction === -1 && next < 0) next = max;

    el.scrollTo({ left: next, behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = getCardStep(el);
    if (!step) return;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const update = () => {
      const step = getCardStep(el);
      if (!step) return;
      const index = Math.round(el.scrollLeft / step);
      setCurrent(Math.min(Math.max(index, 0), newsItems.length - 1));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="noticias" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          title="Notícias e Tutoriais"
          description="Atualizações da linha Mackie no Brasil — lançamentos e guias oficiais até 2025."
        />
        <a
          href="/blog"
          className="mt-6 inline-flex w-fit items-center rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
        >
          Ver mais
        </a>

        <div className="relative mt-10">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pt-2 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {newsItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-ink-800/40 transition-colors hover:border-brand/40 md:w-[calc((100%-40px)/3)]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-ink-900">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-brand">{item.date}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
              </a>
            ))}
          </div>

          {newsItems.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className={cn(arrowClass, "left-1 sm:left-0 sm:-translate-x-1/2")}
                aria-label="Notícias anteriores"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className={cn(arrowClass, "right-1 sm:right-0 sm:translate-x-1/2")}
                aria-label="Próximas notícias"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>

        {newsItems.length > 1 ? (
          <div className="mt-8 flex justify-center gap-2">
            {newsItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                className={`h-2 w-2 rounded-full transition-colors ${
                  current === index ? "bg-brand" : "bg-brand/20"
                }`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Ir para a notícia ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
