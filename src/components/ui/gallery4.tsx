import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  cta?: { label: string; href: string };
}

export function Gallery4({ title, description, items, cta }: Gallery4Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const isExternal = (href: string) => href.startsWith("http");

  const arrowClass =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950/90 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-40 sm:h-10 sm:w-10";

  return (
    <div>
      {(title || description) && (
        <div className="mb-8 flex flex-col items-center text-center md:mb-12">
          <div className="flex max-w-2xl flex-col items-center gap-4">
            {title ? (
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-lg text-base leading-relaxed text-slate-400">{description}</p>
            ) : null}
            {cta ? (
              <a
                href={cta.href}
                target={isExternal(cta.href) ? "_blank" : undefined}
                rel={isExternal(cta.href) ? "noreferrer" : undefined}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
              >
                {cta.label}
              </a>
            ) : null}
          </div>
        </div>
      )}

      <div className="relative">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="-ml-0">
            {items.map((item) => (
              <CarouselItem key={item.id} className="max-w-[min(320px,85vw)] pl-4 sm:pl-5 lg:max-w-[360px]">
                <a
                  href={item.href}
                  target={isExternal(item.href) ? "_blank" : undefined}
                  rel={isExternal(item.href) ? "noreferrer" : undefined}
                  className="group block rounded-xl"
                >
                  <div className="relative h-full min-h-[22rem] max-w-full overflow-hidden rounded-xl border border-line sm:min-h-[27rem] md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-white md:p-8">
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                        {item.description}
                      </p>
                      <div className="mb-2 mt-2 text-xl font-semibold md:mb-3">{item.title}</div>
                      <div className="flex items-center text-sm text-white/90">
                        Ver categoria
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button
          type="button"
          onClick={() => carouselApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={cn(arrowClass, "left-1 sm:left-0 sm:-translate-x-1/2")}
          aria-label="Categoria anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => carouselApi?.scrollNext()}
          disabled={!canScrollNext}
          className={cn(arrowClass, "right-1 sm:right-0 sm:translate-x-1/2")}
          aria-label="Próxima categoria"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`h-2 w-2 rounded-full transition-colors ${
              currentSlide === index ? "bg-brand" : "bg-brand/20"
            }`}
            onClick={() => carouselApi?.scrollTo(index)}
            aria-label={`Ir para a categoria ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
