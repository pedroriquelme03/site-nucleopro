import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { newsItems } from "@/data/news";
import { normalizeSearch } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const PAGE_SIZE = 4;

function queryFromUrl() {
  return new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
}

export function BlogPage() {
  const [query, setQuery] = useState(queryFromUrl);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "Blog | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  const visible = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return newsItems;
    const terms = trimmed.split(/\s+/).filter(Boolean).map(normalizeSearch);
    return newsItems.filter((item) => {
      const haystack = normalizeSearch(`${item.title} ${item.text} ${item.date}`);
      return terms.every((term) => haystack.includes(term));
    });
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = visible.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, visible.length);

  function updateQuery(next: string) {
    setQuery(next);
    setPage(1);
    const url = new URL(window.location.href);
    const trimmed = next.trim();
    if (trimmed) url.searchParams.set("q", trimmed);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  }

  function goToPage(next: number) {
    const clamped = Math.min(Math.max(1, next), pageCount);
    setPage(clamped);
    document.getElementById("blog-grade")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="scroll-mt-20 border-b border-line py-16 pt-28 sm:py-20 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Blog"
            description="Todas as notícias e tutoriais Mackie reunidos pela Núcleo ProAudio — lançamentos e guias oficiais até 2025."
          />

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  placeholder="Buscar matérias..."
                  aria-label="Buscar no blog"
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

              <p id="blog-grade" className="mt-6 scroll-mt-24 text-sm text-slate-500">
                {visible.length} {visible.length === 1 ? "matéria" : "matérias"}
                {query.trim() ? ` para “${query.trim()}”` : null}
                {visible.length > PAGE_SIZE ? ` · ${from}–${to}` : null}
              </p>

              {visible.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-line bg-ink-800/40 px-6 py-12 text-center">
                  <p className="text-sm text-slate-400">Nenhuma matéria encontrada.</p>
                  <button
                    type="button"
                    onClick={() => updateQuery("")}
                    className="mt-4 text-sm font-semibold text-brand hover:text-white"
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {paged.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/40 transition-colors hover:border-brand/40"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-ink-900">
                        <img
                          src={item.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-medium uppercase tracking-wider text-brand">{item.date}</p>
                        <h3 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-brand">
                          {item.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.text}</p>
                        <span className="mt-4 text-sm font-semibold text-white transition-colors group-hover:text-brand">
                          Ler matéria
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {pageCount > 1 ? (
                <nav
                  className="mb-16 mt-10 flex flex-wrap items-center justify-center gap-2 sm:mb-0"
                  aria-label="Paginação do blog"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex h-10 items-center gap-1 rounded-full border border-line bg-ink-800/40 px-3 text-sm text-slate-300 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
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
                    className="inline-flex h-10 items-center gap-1 rounded-full border border-line bg-ink-800/40 px-3 text-sm text-slate-300 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">Próxima</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              ) : null}
            </div>

            <aside>
              <a
                href="/catalogo"
                className="group relative block overflow-hidden rounded-2xl border border-line lg:sticky lg:top-24"
              >
                <img
                  src="/intlscimageheader.jpg"
                  alt="Catálogo Mackie na Núcleo ProAudio"
                  className="h-44 w-full object-cover sm:h-72 lg:h-[min(70vh,640px)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Mackie</p>
                  <p className="mt-2 font-display text-xl font-bold text-white">Catálogo oficial no Brasil</p>
                  <p className="mt-2 text-sm text-white/70">Mixers, caixas e monitores com garantia Núcleo.</p>
                  <span className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink-950 transition-colors group-hover:bg-brand">
                    Ver catálogo
                  </span>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
