import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { CatalogCard } from "./CatalogCard";
import { catalogCategories, catalogProducts, type CatalogCategoryId } from "@/data/catalog";
import { cn, WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Filter = "todos" | CatalogCategoryId;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...catalogCategories.map((c) => ({ id: c.id as Filter, label: c.short })),
];

export function CatalogPage() {
  const [active, setActive] = useState<Filter>("todos");

  useEffect(() => {
    document.title = "Catálogo Mackie | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  const visible = useMemo(
    () =>
      active === "todos"
        ? catalogProducts
        : catalogProducts.filter((p) => p.category === active),
    [active]
  );

  return (
    <main>
      <section className="scroll-mt-20 border-b border-line py-16 pt-28 sm:py-20 sm:pt-32">
        <div className="container-x">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              title="Catálogo Mackie"
              description="A linha Mackie completa distribuída pela Núcleo ProAudio no Brasil — mixers, caixas ativas, monitores, microfones, fones e mais. Consulte disponibilidade e valores pelo WhatsApp."
            />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.03] active:scale-95 lg:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Fale com um especialista
            </a>
          </div>

          {/* Filtro por categoria */}
          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active === f.id
                    ? "border-brand/50 bg-brand/15 text-brand"
                    : "border-line bg-ink-800/40 text-slate-400 hover:text-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            {visible.length} {visible.length === 1 ? "produto" : "produtos"}
          </p>

          {/* Grade */}
          <motion.div
            layout
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CatalogCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
