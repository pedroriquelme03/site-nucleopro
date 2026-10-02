import {
  catalogCategoryById,
  productImageSrc,
  type CatalogProduct,
} from "@/data/catalog";
import { productGallery as GALLERY_MAP } from "@/data/product-gallery";
import { productMaterials } from "@/data/product-materials";

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

// Vídeos oficiais do canal MackieTV (youtube.com/user/mackietv), por produto/série.
const VIDEO_BY_SLUG: Record<string, ProductVideo[]> = {
  "dlz-creator": [{ id: "rYHWCjJN1aY", title: "Mackie DLZ Creator — Visão geral" }],
  dl16se: [{ id: "KDEhSG_X2LA", title: "Mackie DL Series — Quick Look" }],
  dl32se: [{ id: "KDEhSG_X2LA", title: "Mackie DL Series — Quick Look" }],
  mix5: [{ id: "xLPNJP9gz9Y", title: "Mackie Mix Series — Visão geral" }],
  mix8: [{ id: "xLPNJP9gz9Y", title: "Mackie Mix Series — Visão geral" }],
  mix12fx: [{ id: "xLPNJP9gz9Y", title: "Mackie Mix Series — Visão geral" }],
  profx10v3: [{ id: "tL76cl0fSOk", title: "Mackie ProFXv3+ Series" }],
  profx12v3: [{ id: "tL76cl0fSOk", title: "Mackie ProFXv3+ Series" }],
  profx22v3: [{ id: "tL76cl0fSOk", title: "Mackie ProFXv3+ Series" }],
  profx10go: [{ id: "oNEWCcsTgIs", title: "Mackie ProFX10 GO" }],
  onyx8: [{ id: "10nJ3TEVrrg", title: "Onyx Premium Analog Mixers — Overview" }],
  thrash212: [{ id: "cESrBvBZVmk", title: "Mackie Thrash Loudspeakers" }],
  thrash215: [{ id: "cESrBvBZVmk", title: "Mackie Thrash Loudspeakers" }],
  thrash212go: [{ id: "CBly5JAsyJc", title: "Mackie Thrash212 GO" }],
  thump212: [{ id: "bzP9--xFRnU", title: "Mackie Thumpv4 — Visão geral" }],
  thump215: [{ id: "bzP9--xFRnU", title: "Mackie Thumpv4 — Visão geral" }],
  thump115s: [{ id: "bzP9--xFRnU", title: "Mackie Thumpv4 — Visão geral" }],
  thump118s: [{ id: "bzP9--xFRnU", title: "Mackie Thumpv4 — Visão geral" }],
  thump210xt: [{ id: "uyImAnp4Ot8", title: "Mackie ThumpXT Loudspeakers" }],
  thump212xt: [{ id: "uyImAnp4Ot8", title: "Mackie ThumpXT Loudspeakers" }],
  thump215xt: [{ id: "uyImAnp4Ot8", title: "Mackie ThumpXT Loudspeakers" }],
  thumpgo: [{ id: "M2-1PNfLXbU", title: "Mackie Thump GO" }],
  thumpsupgo: [{ id: "_Olyt97gncg", title: "Mackie ThumpSub GO" }],
  showbox: [{ id: "wotayvABKcw", title: "Mackie ShowBox — Visão geral" }],
  "cr3-5": [{ id: "vpsWV2GvSdY", title: "Mackie CR Series — Overview" }],
  "cr3-5bt": [{ id: "vpsWV2GvSdY", title: "Mackie CR Series — Overview" }],
  "cr4-5": [{ id: "vpsWV2GvSdY", title: "Mackie CR Series — Overview" }],
  "cr4-5bt": [{ id: "vpsWV2GvSdY", title: "Mackie CR Series — Overview" }],
  cr5bt: [{ id: "vpsWV2GvSdY", title: "Mackie CR Series — Overview" }],
  "em-89d": [{ id: "LzaT7x9jMQw", title: "Mackie EM Series — Microfones" }],
  "em-91c": [{ id: "LzaT7x9jMQw", title: "Mackie EM Series — Microfones" }],
  "mc-100": [{ id: "0PKeJm99EAo", title: "Mackie MC Series — Overview" }],
  "mc-250": [{ id: "0PKeJm99EAo", title: "Mackie MC Series — Overview" }],
  "mc-350": [{ id: "0PKeJm99EAo", title: "Mackie MC Series — Overview" }],
  "hm-4": [{ id: "3_aDLiBAfb8", title: "Mackie HM Series — Amplificadores de fone" }],
  "hm-400": [{ id: "3_aDLiBAfb8", title: "Mackie HM Series — Amplificadores de fone" }],
  "hm-800": [{ id: "3_aDLiBAfb8", title: "Mackie HM Series — Amplificadores de fone" }],
  "srm-flex": [{ id: "zjaIdq9EUrU", title: "Mackie SRM-Flex Portable Column PA" }],
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
  const gallery = GALLERY_MAP[product.slug];
  return gallery && gallery.length ? gallery : [productImageSrc(product.slug)];
}

export function productManuals(product: CatalogProduct): ManualLink[] {
  const materials = productMaterials[product.slug] ?? [];
  const links: ManualLink[] = materials.map((m) => ({ title: m.title, href: m.href }));
  links.push({
    title: "Suporte e downloads Mackie",
    href: `https://mackie.com/en/support.html`,
    external: true,
  });
  return links;
}

export function productVideos(product: CatalogProduct): ProductVideo[] {
  return VIDEO_BY_SLUG[product.slug] ?? [];
}
