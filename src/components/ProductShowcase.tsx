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
  "thump215xt": "Destaque",
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
  "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950/90 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95 sm:h-10 sm:w-10";

export function ProductShowcase() {
  const [active, setActive] = useState<Filter>("todos");
  const sliderRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const list =
      active === "todos"
        ? catalogProducts
        : catalogProducts.filter((p) => p.category === active);
    return [...list].sort(
      (a, b) => Number(Boolean(FEATURED_BADGES[b.slug])) - Number(Boolean(FEATURED_BADGES[a.slug])),
    );
  }, [active]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = sliderRef.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;

    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 20;
    const step = card.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + direction * step;

    if (direction === 1 && next > max - 8) next = 0;
    if (direction === -1 && next < 0) next = max;

    el.scrollTo({ left: next, behavior: "smooth" });
  };

  useEffect(() => {
    sliderRef.current?.scrollTo({ left: 0 });
  }, [active]);

  return (
    <section id="produtos" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            title="Linha de produtos"
            description="Do controlador de estúdio ao mixer digital de palco — a linha Mackie completa, pronta para entrega no Brasil."
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
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pt-2 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((product) => (
              <div
                key={product.slug}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)] xl:w-[calc(25%-15px)]"
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
      </div>
    </section>
  );
}
