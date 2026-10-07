import ElegantCarousel, { type SlideData } from "@/components/ui/elegant-carousel";

const featuredSlides: SlideData[] = [
  {
    title: "Thump15v4",
    subtitle: "Caixa ativa 15\" · 1400W",
    description:
      "SoundCheck DSP, Bluetooth e app Thump Connect 2. A Thump mais potente da linha, pronta para DJ, banda e eventos.",
    accent: "#a97c50",
    imageUrl: "/produtos/thump15v4.webp",
  },
  {
    title: "SRM215 V-Class",
    subtitle: "Caixa ativa 15\" · 2000W",
    description:
      "Advanced Impulse DSP, mixer digital de 4 canais e controle pelo app SRM Connect. O topo da linha SRM portátil.",
    accent: "#c9a06e",
    imageUrl: "/produtos/srm215v.webp",
  },
  {
    title: "DRM12A",
    subtitle: "Line array 12\" · 2000W",
    description:
      "Módulo de array da série DRM, com DSP Advanced Impulse, presets e ferragens de fly para touring e casas de show.",
    accent: "#c4956a",
    imageUrl: "/produtos/drm12a.webp",
  },
  {
    title: "Thump18Sv4",
    subtitle: "Subwoofer ativo 18\" · 1400W",
    description:
      "O grave mais profundo da linha Thump v4, com modos de passa-alta para casar com as caixas satélite.",
    accent: "#8d643c",
    imageUrl: "/produtos/thump18sv4.webp",
  },
];

export function FeaturedProduct() {
  return (
    <section id="destaque" className="border-t border-line bg-ink-950 pt-16 sm:pt-20">
      <ElegantCarousel slides={featuredSlides} />
    </section>
  );
}
