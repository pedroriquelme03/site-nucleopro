import { ImageExpansionSlider, type SlideItem } from "@/components/ui/image-expansion";
import { SectionHeading } from "./SectionHeading";
import { WHATSAPP_URL } from "@/lib/utils";

const projectSlides: SlideItem[] = [
  {
    id: 1,
    badge: "Igrejas",
    title: "Culto com voz nítida do púlpito ao mezanino",
    buttonText: "Ver projeto",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: 2,
    badge: "Eventos",
    title: "Cobertura e pressão para palco e festival",
    buttonText: "Ver projeto",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: 3,
    badge: "Casas de show",
    title: "Sistema de PA para casas de espetáculo",
    buttonText: "Ver projeto",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: 4,
    badge: "Instalações",
    title: "Line array, subs e DSP em espaço fixo",
    buttonText: "Ver projeto",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: 5,
    badge: "Eventos",
    title: "Montagem rápida para convenções e marcas",
    buttonText: "Ver projeto",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: 6,
    badge: "Instalações",
    title: "Áudio profissional para operação diária",
    buttonText: "Ver projeto",
    image: "/products/Mackie-Thump15v4-3Q-Hero-Left-US.webp",
    href: WHATSAPP_URL,
  },
];

export function Projects() {
  return (
    <section id="projetos" className="scroll-mt-20 border-t border-line bg-ink-900/40 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          title="Projetos que ganham vida com Nucleopro"
          description="Sistemas de áudio aplicados em igrejas, eventos, casas de show, instalações fixas e projetos profissionais."
          align="center"
        />
        <div className="mt-4 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
          >
            Falar sobre um projeto
          </a>
        </div>
        <div className="mt-10">
          <ImageExpansionSlider slides={projectSlides} />
        </div>
      </div>
    </section>
  );
}
