import { Gallery4 } from "@/components/ui/gallery4";
import { WHATSAPP_URL } from "@/lib/utils";

const projectItems = [
  {
    id: "igrejas",
    title: "Culto com voz nítida do púlpito ao mezanino",
    description: "Igrejas",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: "eventos",
    title: "Cobertura e pressão para palco e festival",
    description: "Eventos",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: "casas-de-show",
    title: "Sistema de PA para casas de espetáculo",
    description: "Casas de show",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: "instalacoes",
    title: "Line array, subs e DSP em espaço fixo",
    description: "Instalações",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: "convencoes",
    title: "Montagem rápida para convenções e marcas",
    description: "Eventos",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    href: WHATSAPP_URL,
  },
  {
    id: "operacao",
    title: "Áudio profissional para operação diária",
    description: "Instalações",
    image: "/products/Mackie-Thump15v4-3Q-Hero-Left-US.webp",
    href: WHATSAPP_URL,
  },
];

export function Projects() {
  return (
    <section id="projetos" className="scroll-mt-20 border-t border-line bg-ink-900/40 py-20 sm:py-28">
      <div className="container-x">
        <Gallery4
          title="Projetos que ganham vida com Nucleopro"
          description="Sistemas de áudio aplicados em igrejas, eventos, casas de show, instalações fixas e projetos profissionais."
          cta={{ label: "Falar sobre um projeto", href: WHATSAPP_URL }}
          items={projectItems}
        />
      </div>
    </section>
  );
}
