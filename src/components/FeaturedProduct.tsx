import ElegantCarousel, { type SlideData } from "@/components/ui/elegant-carousel";
import { SectionHeading } from "./SectionHeading";

const featuredSlides: SlideData[] = [
  {
    title: "Thump15BST",
    subtitle: "Caixa ativa 15\" · 1400W",
    description:
      "Woofer de 15\", driver de compressão e Bluetooth. DSP com voicings para DJ, palco e fala — a caixa Mackie que abre o sistema no Brasil.",
    accent: "#a97c50",
    imageUrl:
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "SRM210 V-Class",
    subtitle: "Caixa ativa 10\" · 2000W",
    description:
      "Processamento Advanced Impulse DSP e cobertura precisa. Referência da linha SRM para palco profissional e igrejas.",
    accent: "#c9a06e",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "DRM12A",
    subtitle: "Line array 12\"",
    description:
      "Elemento de array da série DRM, com DSP integrado e rigging para montagem vertical em touring e casas de espetáculo.",
    accent: "#c4956a",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Thump18S",
    subtitle: "Subwoofer ativo 18\"",
    description:
      "Grave de impacto para completar o sistema Thump. Filtro passa-alta para as caixas satélite e pressão que o público sente.",
    accent: "#8d643c",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
];

export function FeaturedProduct() {
  return (
    <section id="destaque" className="border-t border-line bg-ink-950 pt-16 sm:pt-20">
      <div className="container-x">
        <SectionHeading
          title="Produto em destaque"
          description="Os equipamentos Mackie que mais saem para palco, igreja e instalação — com garantia oficial no Brasil."
        />
      </div>
      <div className="mt-10">
        <ElegantCarousel slides={featuredSlides} />
      </div>
    </section>
  );
}
