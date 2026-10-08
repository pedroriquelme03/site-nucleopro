import { useEffect, useState } from "react";
import { FileText, ImageIcon, ListChecks, Video } from "lucide-react";
import {
  catalogCategoryById,
  catalogProductBySlug,
  catalogProducts,
  productImageSrc,
  productPagePath,
} from "@/data/catalog";
import {
  productBanner,
  productGallery,
  productHighlights,
  productManuals,
  productSpecs,
  productVideos,
} from "@/data/product-details";
import { cn, WHATSAPP_NUMBER } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Tab = "specs" | "images" | "manuals" | "videos";

const tabs: { id: Tab; label: string; icon: typeof ListChecks }[] = [
  { id: "specs", label: "Especificações técnicas", icon: ListChecks },
  { id: "images", label: "Imagens", icon: ImageIcon },
  { id: "manuals", label: "Manuais", icon: FileText },
  { id: "videos", label: "Vídeos", icon: Video },
];

export function ProductPage({ slug }: { slug: string }) {
  const product = catalogProductBySlug(slug);
  const [tab, setTab] = useState<Tab>("specs");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      document.title = "Produto não encontrado | Núcleo ProAudio";
      return;
    }
    document.title = `${product.name} | Núcleo ProAudio`;
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, [slug, product]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!product) {
    return (
      <main className="container-x py-28">
        <h1 className="font-display text-3xl font-bold text-white">Produto não encontrado</h1>
        <p className="mt-3 text-slate-400">Esse modelo não está no catálogo atual.</p>
        <a href="/catalogo" className="mt-6 inline-flex text-sm font-semibold text-brand">
          Voltar ao catálogo
        </a>
      </main>
    );
  }

  const category = catalogCategoryById(product.category);
  const highlights = productHighlights(product);
  const specs = productSpecs(product);
  const gallery = productGallery(product);
  const manuals = productManuals(product);
  const videos = productVideos(product);
  const quoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${product.name} (Mackie). Poderiam me passar mais informações?`,
  )}`;
  const related = catalogProducts.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 4);

  return (
    <main>
      <section className="relative isolate min-h-[280px] overflow-hidden border-b border-line pt-16 sm:min-h-[340px]">
        <img src={productBanner(product)} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/35" />
        <div className="container-x relative z-10 flex min-h-[280px] flex-col justify-end py-10 sm:min-h-[340px] sm:py-14">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <a href="/catalogo" className="hover:text-white">
              Catálogo
            </a>
            <span>/</span>
            <a href={`/catalogo?categoria=${product.category}`} className="hover:text-white">
              {category?.name ?? "Mackie"}
            </a>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {category?.name ?? "Mackie"}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">{product.tagline}</p>
        </div>
      </section>

      <section className="border-b border-line py-12 sm:py-16">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="overflow-hidden rounded-3xl border border-line bg-[#ececec]">
            <img
              src={productImageSrc(product.slug)}
              alt={`Mackie ${product.name}`}
              className="h-auto w-full max-w-lg object-contain p-5 sm:p-12"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Mackie</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{product.name}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-400">{product.description}</p>
            <ul className="mt-6 space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-200">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={quoteUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Entre em contato
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 border-b border-line">
            {tabs.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors sm:px-4",
                    active
                      ? "border-brand/50 bg-brand/15 text-white"
                      : "border-line bg-ink-800/40 text-slate-400 hover:text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {tab === "specs" ? (
              <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-800/40">
                {specs.map((row) => (
                  <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                    <dt className="text-sm font-medium text-slate-500">{row.label}</dt>
                    <dd className="text-sm text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {tab === "images" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightbox(src)}
                    className="overflow-hidden rounded-2xl border border-line bg-[#ececec]"
                  >
                    <img src={src} alt={`Mackie ${product.name}`} className="h-64 w-full object-contain p-6" />
                  </button>
                ))}
              </div>
            ) : null}

            {tab === "manuals" ? (
              <ul className="space-y-3">
                {manuals.map((manual) => (
                  <li key={manual.title}>
                    <a
                      href={manual.href}
                      target={manual.external ? "_blank" : undefined}
                      rel={manual.external ? "noreferrer" : undefined}
                      className="flex items-center justify-between rounded-2xl border border-line bg-ink-800/40 px-5 py-4 text-sm text-white transition-colors hover:border-brand/40"
                    >
                      {manual.title}
                      <FileText className="h-4 w-4 text-brand" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === "videos" ? (
              videos.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {videos.map((video) => (
                    <div key={video.src ?? video.id} className="overflow-hidden rounded-2xl border border-line bg-black">
                      <div className="aspect-video">
                        {video.src ? (
                          <video
                            src={video.src}
                            title={video.title}
                            controls
                            preload="none"
                            poster={productImageSrc(product.slug)}
                            className="h-full w-full bg-[#ececec] object-contain"
                          />
                        ) : (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="h-full w-full border-0"
                          />
                        )}
                      </div>
                      <p className="bg-ink-800/80 px-4 py-3 text-sm text-white">{video.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  Vídeo em breve. Se quiser uma demonstração, fale com a Núcleo pelo WhatsApp.
                </p>
              )
            ) : null}
          </div>

          {related.length > 0 ? (
            <div className="mt-16 pb-16 sm:pb-0">
              <h3 className="font-display text-xl font-bold text-white">Na mesma linha</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <a
                    key={item.slug}
                    href={productPagePath(item.slug)}
                    className="overflow-hidden rounded-2xl border border-line bg-ink-800/40 transition-colors hover:border-brand/40"
                  >
                    <div className="bg-[#ececec]">
                      <img
                        src={productImageSrc(item.slug)}
                        alt={`Mackie ${item.name}`}
                        className="h-36 w-full object-contain p-4"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-display text-sm font-bold text-white">{item.name}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">{item.tagline}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {lightbox ? (
        <button
          type="button"
          className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-3 sm:p-6"
          onClick={() => setLightbox(null)}
          aria-label="Fechar imagem"
        >
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full object-contain" />
        </button>
      ) : null}
    </main>
  );
}
