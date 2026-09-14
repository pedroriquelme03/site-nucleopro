import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { CatalogCard } from "./CatalogCard";
import {
  catalogCategories,
  catalogProducts,
  productMatchesQuery,
  type CatalogCategoryId,
} from "@/data/catalog";
import { cn } from "@/lib/utils";

type Filter = "todos" | CatalogCategoryId;

const PAGE_SIZE = 9;
const DEFAULT_FILTER: Filter = "mixers-digitais";

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...catalogCategories.map((c) => ({ id: c.id as Filter, label: c.short })),
];

function filterFromUrl(): Filter {
  const categoria = new URLSearchParams(window.location.search).get("categoria");
  if (categoria === "todos") return "todos";
  if (categoria && catalogCategories.some((item) => item.id === categoria)) {
    return categoria as CatalogCategoryId;
  }
  if (new URLSearchParams(window.location.search).get("por") === "tudo") return "todos";
  return DEFAULT_FILTER;
}

function queryFromUrl() {
  return new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
}

function scopeFromUrl(): "name" | "any" {
  return new URLSearchParams(window.location.search).get("por") === "tudo" ? "any" : "name";
}

export function CatalogPage() {
  const [active, setActive] = useState<Filter>(filterFromUrl);
  const [query, setQuery] = useState(queryFromUrl);
  const [scope, setScope] = useState<"name" | "any">(scopeFromUrl);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Catálogo Mackie | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  const visible = useMemo(() => {
    const inCategory =
      active === "todos" ? catalogProducts : catalogProducts.filter((p) => p.category === active);
    return inCategory.filter((product) => productMatchesQuery(product, query.trim(), scope));
  }, [active, query, scope]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = visible.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, visible.length);

  function syncUrl(nextFilter: Filter, nextQuery: string, nextScope: "name" | "any") {
    const url = new URL(window.location.href);
    if (nextFilter === DEFAULT_FILTER) url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", nextFilter);
    const trimmed = nextQuery.trim();
    if (trimmed) url.searchParams.set("q", trimmed);
    else url.searchParams.delete("q");
    if (nextScope === "any" && trimmed) url.searchParams.set("por", "tudo");
    else url.searchParams.delete("por");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }

  function selectFilter(next: Filter) {
    setActive(next);
    setPage(1);
    syncUrl(next, query, scope);
  }

  function updateQuery(next: string) {
    setQuery(next);
    setScope("name");
    setPage(1);
    syncUrl(active, next, "name");
  }

  function goToPage(next: number) {
    const clamped = Math.min(Math.max(1, next), pageCount);
    setPage(clamped);
    document.getElementById("catalogo-grade")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="scroll-mt-20 border-b border-line py-16 pt-28 sm:py-20 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Catálogo Mackie"
            description="A linha Mackie completa distribuída pela Núcleo ProAudio no Brasil — mixers, caixas ativas, monitores, microfones, fones e mais. Consulte disponibilidade e valores pelo WhatsApp."
          />

          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Buscar pelo nome do produto..."
              aria-label="Buscar no catálogo"
              className="h-12 w-full rounded-2xl border border-line bg-ink-800/60 pl-11 pr-11 text-base text-white outline-none placeholder:text-slate-500 focus:border-brand/50 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => updateQuery("")}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => selectFilter(f.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active === f.id
                    ? "border-brand/50 bg-brand/15 text-brand"
                    : "border-line bg-ink-800/40 text-slate-400 hover:text-white",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p id="catalogo-grade" className="mt-6 scroll-mt-24 text-sm text-slate-500">
            {visible.length} {visible.length === 1 ? "produto" : "produtos"}
            {query.trim() ? ` para “${query.trim()}”` : null}
            {visible.length > PAGE_SIZE ? ` · ${from}–${to}` : null}
          </p>

          {visible.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-line bg-ink-800/40 px-6 py-12 text-center">
              <p className="text-sm text-slate-400">Nenhum produto encontrado com esses filtros.</p>
              {active !== "todos" ? (
                <button
                  type="button"
                  onClick={() => selectFilter("todos")}
                  className="mt-4 text-sm font-semibold text-brand hover:text-white"
                >
                  Buscar em todo o catálogo
                </button>
              ) : query ? (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  className="mt-4 text-sm font-semibold text-brand hover:text-white"
                >
                  Limpar busca
                </button>
              ) : null}
            </div>
          ) : (
            <motion.div layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {paged.map((product) => (
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
          )}

          {pageCount > 1 ? (
            <nav className="mb-16 mt-10 flex flex-wrap items-center justify-center gap-2 sm:mb-0" aria-label="Paginação do catálogo">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex h-10 min-w-0 items-center gap-1 rounded-full border border-line bg-ink-800/40 px-3 text-sm text-slate-300 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <span className="px-2 text-sm text-slate-400 sm:hidden">
                {currentPage} / {pageCount}
              </span>

              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => goToPage(number)}
                  aria-current={number === currentPage ? "page" : undefined}
                  className={cn(
                    "hidden h-10 w-10 place-items-center rounded-full border text-sm font-medium transition-colors sm:grid",
                    number === currentPage
                      ? "border-brand/50 bg-brand/15 text-white"
                      : "border-line bg-ink-800/40 text-slate-400 hover:text-white",
                  )}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="inline-flex h-10 min-w-0 items-center gap-1 rounded-full border border-line bg-ink-800/40 px-3 text-sm text-slate-300 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          ) : null}
        </div>
      </section>
    </main>
  );
}
