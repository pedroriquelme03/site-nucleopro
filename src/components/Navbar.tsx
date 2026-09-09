import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn, WHATSAPP_URL } from "@/lib/utils";

const links = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Marcas", href: "/marcas" },
  { label: "Onde comprar", href: "/#onde-comprar" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Assistência técnica", href: "/#sobre" },
];

export function Navbar() {
  const onMarcas = window.location.pathname.replace(/\/$/, "") === "/marcas";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-line" : "bg-transparent"
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
                l.href === "/marcas" && onMarcas ? "text-white" : "text-slate-300",
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
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {searchOpen && (
            <form
              ref={searchFormRef}
              className="hidden lg:block"
              onSubmit={(e) => {
                e.preventDefault();
                setSearchOpen(false);
                const produtos = document.getElementById("produtos");
                if (produtos) produtos.scrollIntoView({ behavior: "smooth" });
                else window.location.assign("/#produtos");
              }}
            >
              <input
                ref={searchRef}
                type="search"
                placeholder="Buscar produtos..."
                className="h-9 w-48 rounded-lg border border-line bg-ink-800/70 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-brand/50"
              />
            </form>
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Fale com um especialista
          </a>
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
        <div className="glass border-t border-line lg:hidden">
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
            <a
              href="/#produtos"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-ink-700"
            >
              <Search className="h-4 w-4" />
              Buscar
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-3 text-sm font-semibold text-ink-950 hover:to-[#a97c50]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Fale com um especialista
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
