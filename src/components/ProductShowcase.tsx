import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories, products, type CategoryId } from "@/data/products";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { ProductCard } from "./ProductCard";
import PillMorphTabs from "@/components/ui/pill-morph-tabs";

type Filter = "todos" | CategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.short })),
];

const arrowClass =
  "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95";

export function ProductShowcase() {
  const [active, setActive] = useState<Filter>("todos");
  const sliderRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const list =
      active === "todos" ? products : products.filter((p) => p.category === active);
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
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
            title="Produtos em destaque"
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
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((product) => (
              <div
                key={product.slug}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)] xl:w-[calc(25%-15px)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {visible.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className={cn(arrowClass, "left-0 -translate-x-1/2")}
                aria-label="Produtos anteriores"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className={cn(arrowClass, "right-0 translate-x-1/2")}
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
