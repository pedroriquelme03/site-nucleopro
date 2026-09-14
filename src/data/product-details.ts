import {
  catalogCategoryById,
  productImageSrc,
  type CatalogProduct,
} from "@/data/catalog";

export type SpecRow = { label: string; value: string };
export type ManualLink = { title: string; href: string; external?: boolean };
export type ProductVideo = { id: string; title: string };

const BANNER_BY_CATEGORY: Record<string, string> = {
  "mixers-digitais":
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  "mixers-analogicos":
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  "caixas-ativas":
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80",
  portateis:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  monitores:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  controle:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  microfones:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
  fones:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  "amp-fone":
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
  "direct-box":
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80",
};

const VIDEO_BY_SLUG: Record<string, ProductVideo[]> = {
  thumpgo: [{ id: "6tzq0mbnFww", title: "Mackie ThumpSub GO" }],
  thumpsupgo: [{ id: "6tzq0mbnFww", title: "Mackie ThumpSub GO" }],
  thrash212go: [{ id: "6tzq0mbnFww", title: "Mackie GO Series" }],
  showbox: [{ id: "6tzq0mbnFww", title: "Mackie GO Series" }],
  profx10go: [{ id: "oNEWCcsTgIs", title: "Mackie ProFX10 GO" }],
  thump212: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump215: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump210xt: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump212xt: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump215xt: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump115s: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
  thump118s: [{ id: "bzP9--xFRnU", title: "Mackie Thump v4" }],
};

export function productBanner(product: CatalogProduct) {
  return BANNER_BY_CATEGORY[product.category] ?? BANNER_BY_CATEGORY["caixas-ativas"];
}

export function productHighlights(product: CatalogProduct): string[] {
  const highlights = [product.tagline];
  const rf = product.description.match(/RF:\s*([^.,]+)/i);
  const spl = product.description.match(/SPL máximo\s*([^.,]+)/i);
  const power = product.description.match(/(\d+\s*W(?:\s*RMS)?)/i);
  if (power) highlights.push(power[1].replace(/\s+/g, " "));
  if (rf) highlights.push(`Resposta: ${rf[1].trim()}`);
  if (spl) highlights.push(`SPL máx.: ${spl[1].trim()}`);
  return highlights.slice(0, 4);
}

export function productSpecs(product: CatalogProduct): SpecRow[] {
  const category = catalogCategoryById(product.category);
  const rows: SpecRow[] = [
    { label: "Marca", value: "Mackie" },
    { label: "Modelo", value: product.name },
    { label: "Categoria", value: category?.name ?? product.category },
  ];

  const power = product.description.match(/(\d[\d.]*\s*W(?:\s*RMS)?)/i);
  const rf = product.description.match(/RF:\s*([^.,]+)/i);
  const spl = product.description.match(/SPL máximo\s*([^.,]+)/i);
  const woofer = product.description.match(/woofer de\s+([\d.,]+(?:\s*")?)/i);
  const driver = product.description.match(/driver(?: de compressão)?(?: de titânio)? de\s+([\d.,]+")/i);
  const battery = product.description.match(/até\s+(\d+\s*horas)/i);
  const size = product.description.match(/(\d+\s*×\s*\d+\s*×\s*\d+\s*mm)/i);

  if (power) rows.push({ label: "Potência", value: power[1] });
  if (woofer) rows.push({ label: "Woofer", value: woofer[1] });
  if (driver) rows.push({ label: "Driver", value: driver[1] });
  if (rf) rows.push({ label: "Resposta de frequência", value: rf[1].trim() });
  if (spl) rows.push({ label: "SPL máximo", value: spl[1].trim() });
  if (battery) rows.push({ label: "Autonomia", value: battery[1] });
  if (size) rows.push({ label: "Dimensões", value: size[1] });
  rows.push({ label: "Distribuição", value: "Núcleo ProAudio — Brasil" });
  return rows;
}

export function productGallery(product: CatalogProduct): string[] {
  return [productImageSrc(product.slug)];
}

export function productManuals(product: CatalogProduct): ManualLink[] {
  return [
    { title: "Solicitar manual", href: `/manuais?produto=${product.slug}` },
    {
      title: "Suporte e downloads Mackie",
      href: `https://mackie.com/en/support.html`,
      external: true,
    },
  ];
}

export function productVideos(product: CatalogProduct): ProductVideo[] {
  return VIDEO_BY_SLUG[product.slug] ?? [];
}
