import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { catalogCategoryById, productImageSrc, productPagePath, searchCatalog } from "@/data/catalog";

const links = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Marcas", href: "/marcas" },
  { label: "Onde comprar", href: "/#onde-comprar" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Assistência técnica", href: "/#sobre" },
];

function catalogSearchUrl(query: string) {
  const params = new URLSearchParams({ categoria: "todos", por: "tudo" });
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  return `/catalogo?${params.toString()}`;
}

export function Navbar() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const onMarcas = path === "/marcas";
  const onCatalogo = path === "/catalogo" || path.startsWith("/produto/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const results = useMemo(() => (query.trim() ? searchCatalog(query, "any").slice(0, 6) : []), [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!searchOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (searchFormRef.current?.contains(target)) return;
      if (searchButtonRef.current?.contains(target)) return;
      setSearchOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  function goToCatalog(event?: React.FormEvent) {
    event?.preventDefault();
    window.location.assign(catalogSearchUrl(query));
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-line" : "bg-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="/" className="shrink-0" aria-label="Núcleo ProAudio — início">
          <Logo />
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-white",
                l.href === "/marcas" && onMarcas
                  ? "text-white"
                  : l.href === "/catalogo" && onCatalogo
                    ? "text-white"
                    : "text-slate-300",
              )}
            >
              {l.label}
            </a>
          ))}
          <button
            ref={searchButtonRef}
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setTimeout(() => searchRef.current?.focus(), 0);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <Search className="h-4 w-4" />
            Buscar
          </button>
          {searchOpen && (
            <form ref={searchFormRef} onSubmit={goToCatalog} className="relative">
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar produtos..."
                className="h-10 w-44 rounded-lg border border-line bg-ink-800/70 px-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-brand/50 sm:h-9 sm:w-56 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
              />
              {query.trim() ? (
                <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-line bg-ink-900 shadow-card">
                  {results.length > 0 ? (
                    <ul>
                      {results.map((product) => (
                        <li key={product.slug}>
                          <a
                            href={productPagePath(product.slug)}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/5"
                          >
                            <img
                              src={productImageSrc(product.slug)}
                              alt=""
                              className="h-10 w-10 rounded-lg bg-[#ececec] object-contain p-1"
                            />
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-white">{product.name}</span>
                              <span className="block truncate text-xs text-slate-500">
                                {catalogCategoryById(product.category)?.short ?? product.tagline}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-3 text-sm text-slate-400">Nenhum produto encontrado.</p>
                  )}
                  <a
                    href={catalogSearchUrl(query)}
                    className="block border-t border-line px-3 py-2.5 text-xs font-semibold text-brand hover:bg-white/5"
                  >
                    Ver todos os resultados no catálogo
                  </a>
                </div>
              ) : null}
            </form>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-white lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-ink-700"
              >
                {l.label}
              </a>
            ))}
            <form onSubmit={goToCatalog} className="px-3 py-2">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar produtos..."
                  className="h-11 w-full rounded-xl border border-line bg-ink-800/70 pl-10 pr-3 text-base text-white outline-none placeholder:text-slate-500 focus:border-brand/50 [&::-webkit-search-cancel-button]:hidden"
                />
              </label>
              {query.trim() && results.length > 0 ? (
                <ul className="mt-2 overflow-hidden rounded-xl border border-line bg-ink-900">
                  {results.map((product) => (
                    <li key={product.slug}>
                      <a
                        href={productPagePath(product.slug)}
                        className="block px-3 py-2 text-sm text-white hover:bg-white/5"
                      >
                        {product.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
