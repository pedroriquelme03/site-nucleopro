import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  catalogCategories,
  catalogProducts,
  type CatalogCategoryId,
} from "@/data/catalog";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";
import PillMorphTabs from "@/components/ui/pill-morph-tabs";

type Filter = "todos" | CatalogCategoryId;

const FEATURED_BADGES: Record<string, string> = {
  "thump15v4": "Destaque",
  "thumpgo": "GO",
  "dlz-creator": "Novo",
  "srm-flex": "PA",
  "profx12v3": "Mix",
};

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...catalogCategories.slice(0, 6).map((c) => ({ id: c.id as Filter, label: c.short })),
];

const arrowClass =
  "absolute top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950/90 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95 sm:flex sm:h-10 sm:w-10";

function getCardStep(el: HTMLElement) {
  const card = el.children[0] as HTMLElement | undefined;
  if (!card) return 0;
  const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 20;
  return card.offsetWidth + gap;
}

export function ProductShowcase() {
  const [active, setActive] = useState<Filter>("todos");
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const byFeatured = (a: (typeof catalogProducts)[number], b: (typeof catalogProducts)[number]) =>
      Number(Boolean(FEATURED_BADGES[b.slug])) - Number(Boolean(FEATURED_BADGES[a.slug]));

    if (active !== "todos") {
      return catalogProducts.filter((p) => p.category === active).sort(byFeatured);
    }

    const limited: typeof catalogProducts = [];
    for (const category of catalogCategories) {
      limited.push(
        ...catalogProducts
          .filter((p) => p.category === category.id)
          .sort(byFeatured)
          .slice(0, 2),
      );
    }
    return limited;
  }, [active]);

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
    sliderRef.current?.scrollTo({ left: 0 });
    setCurrent(0);
  }, [active]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const update = () => {
      const step = getCardStep(el);
      if (!step) return;
      const index = Math.round(el.scrollLeft / step);
      setCurrent(Math.min(Math.max(index, 0), Math.max(visible.length - 1, 0)));
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [visible.length]);

  return (
    <section id="produtos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            title="Linha de produtos"
            description="Do estúdio ao palco, conte com a Mackie — linha completa, qualidade profissional e pronta entrega no Brasil."
          />
        </div>

        <PillMorphTabs
          className="mt-8"
          defaultValue="todos"
          onValueChange={(value) => setActive(value as Filter)}
          items={filters.map((f) => ({ value: f.id, label: f.label }))}
        />

        <div className="relative mt-10">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[7.5%] pb-2 pt-2 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-0"
          >
            {visible.map((product) => (
              <div
                key={product.slug}
                className="w-[85%] shrink-0 snap-center sm:w-[calc(50%-10px)] sm:snap-start lg:w-[calc(33.333%-13.34px)] xl:w-[calc(25%-15px)]"
              >
                <ProductCard product={product} badge={FEATURED_BADGES[product.slug]} />
              </div>
            ))}
          </div>

          {visible.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className={cn(arrowClass, "left-1 sm:left-0 sm:-translate-x-1/2")}
                aria-label="Produtos anteriores"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className={cn(arrowClass, "right-1 sm:right-0 sm:translate-x-1/2")}
                aria-label="Próximos produtos"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>

        {visible.length > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:hidden">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-brand"
              aria-label="Produtos anteriores"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {visible.length <= 7 ? (
              <div className="flex items-center gap-1.5">
                {visible.map((product, index) => (
                  <button
                    key={product.slug}
                    type="button"
                    className={`h-2 w-2 rounded-full transition-colors ${
                      current === index ? "bg-brand" : "bg-brand/20"
                    }`}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Ir para o produto ${index + 1}`}
                  />
                ))}
              </div>
            ) : (
              <p className="min-w-[4.5rem] text-center text-sm tabular-nums text-slate-400">
                <span className="font-medium text-white">{current + 1}</span>
                <span className="mx-1 text-slate-600">/</span>
                {visible.length}
              </p>
            )}
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-brand"
              aria-label="Próximos produtos"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
