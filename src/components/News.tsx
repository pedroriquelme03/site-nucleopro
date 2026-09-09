import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    date: "Ago 2026",
    title: "Mackie Thump v4 chega ao Brasil pela Núcleo",
    text: "A nova geração de caixas ativas Thump já está disponível com garantia oficial e suporte técnico no território nacional.",
  },
  {
    date: "Jul 2026",
    title: "Suporte técnico e assistência pós-venda",
    text: "Ampliamos o atendimento para quem precisa de peça, orientação de setup ou encaminhamento de garantia Mackie.",
  },
  {
    date: "Jun 2026",
    title: "Rede de dealers em expansão",
    text: "Novos pontos de venda em todo o Brasil. Fale com a Núcleo para encontrar o dealer mais próximo.",
  },
  {
    date: "Mai 2026",
    title: "Como alinhar sub e satélite no DSP",
    text: "Tutorial rápido de crossover, polaridade e delay para o sistema Mackie chegar inteiro no público — sem grave embolado.",
  },
  {
    date: "Abr 2026",
    title: "Montagem de line array DRM no palco",
    text: "Passo a passo de rigging, splay e voicing para cobertura uniforme em casa de show e igreja.",
  },
];

const arrowClass =
  "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink-950 text-slate-300 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:text-white active:scale-95";

export function News() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const el = sliderRef.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;

    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 20;
    const step = card.offsetWidth + gap;
    const max = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + direction * step;

    if (direction === 1 && next > max - 8) next = 0;
    if (direction === -1 && next < 0) next = max;

    el.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <section id="noticias" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          title="Notícias e Tutoriais"
          description="Atualizações da Núcleo ProAudio e da linha Mackie no Brasil."
        />

        <div className="relative mt-10">
          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <article
                key={item.title}
                className="w-[85%] shrink-0 snap-start rounded-2xl border border-line bg-ink-800/40 p-6 md:w-[calc((100%-40px)/3)]"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-brand">{item.date}</p>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                className={cn(arrowClass, "left-0 -translate-x-1/2")}
                aria-label="Notícias anteriores"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                className={cn(arrowClass, "right-0 translate-x-1/2")}
                aria-label="Próximas notícias"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
