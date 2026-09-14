import { Gallery4 } from "@/components/ui/gallery4";

const categoryItems = [
  {
    id: "live-sound",
    title: "Caixas ativas Thump, Thrash e SRM-Flex",
    description: "Live Sound",
    image: "/noticias/srm-vclass.jpg",
    href: "/catalogo?categoria=caixas-ativas",
  },
  {
    id: "battery-powered",
    title: "Linha GO: som profissional sem tomada",
    description: "Battery-Powered",
    image: "/noticias/thump-go-desafios.jpg",
    href: "/catalogo?categoria=portateis",
  },
  {
    id: "home-studio",
    title: "Monitores CR e MR para mixar e produzir",
    description: "Home Studio",
    image: "/noticias/monitores-cr.jpg",
    href: "/catalogo?categoria=monitores",
  },
  {
    id: "mixers-digitais",
    title: "DLZ Creator, DL16SE e DL32SE",
    description: "Mixers Digitais",
    image: "/noticias/dl-se.jpg",
    href: "/catalogo?categoria=mixers-digitais",
  },
  {
    id: "mixers-analogicos",
    title: "Mix, ProFX e Onyx",
    description: "Mixers Analógicos",
    image: "/noticias/profx10-go.jpg",
    href: "/catalogo?categoria=mixers-analogicos",
  },
  {
    id: "controle",
    title: "Big Knob para fonte, volume e interface",
    description: "Controle",
    image: "/noticias/monitores-conexoes.jpg",
    href: "/catalogo?categoria=controle",
  },
  {
    id: "microfones",
    title: "EM-89D e EM-91C para voz e captura",
    description: "Microfones",
    image: "/noticias/karaoke-setup.jpg",
    href: "/catalogo?categoria=microfones",
  },
  {
    id: "fones",
    title: "MC-100, MC-250 e MC-350",
    description: "Fones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    href: "/catalogo?categoria=fones",
  },
  {
    id: "amp-fone",
    title: "HM-4, HM-400 e HM-800",
    description: "Amp. de Fone",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    href: "/catalogo?categoria=amp-fone",
  },
  {
    id: "direct-box",
    title: "MDB2P para instrumentos e fontes estéreo",
    description: "Direct Box",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
    href: "/catalogo?categoria=direct-box",
  },
];

export function Projects() {
  return (
    <section id="categorias" className="scroll-mt-20 border-t border-line bg-ink-900/40 py-20 sm:py-28">
      <div className="container-x">
        <Gallery4
          title="Categorias de produtos"
          description="Live Sound, Battery-Powered, Home Studio e mais — escolha a linha Mackie para palco, estúdio ou operação a bateria."
          cta={{ label: "Ver todas as categorias", href: "/catalogo?categoria=todos" }}
          items={categoryItems}
        />
      </div>
    </section>
  );
}
