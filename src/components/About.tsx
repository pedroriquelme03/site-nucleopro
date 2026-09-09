import { ArrowUpRight } from "lucide-react";
import { TextParallaxContent } from "@/components/ui/text-parallax-content-scroll";
import { WHATSAPP_URL } from "@/lib/utils";

const blocks = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80",
    subheading: "Sobre nós",
    heading: "A casa da Mackie no Brasil.",
    title: "Distribuidor oficial",
    paragraphs: [
      "A Núcleo ProAudio leva a linha Mackie ao palco, à igreja e à instalação fixa com produto original, garantia de fábrica e quem entende o sistema do começo ao fim.",
      "Não é vitrine. É especificação, suporte e entrega para quem não pode errar o som.",
    ],
    ctaLabel: "Fale com um especialista",
    ctaHref: WHATSAPP_URL,
    external: true,
  },
];

function AboutCopy({
  title,
  paragraphs,
  ctaLabel,
  ctaHref,
  external,
}: {
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  external: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 font-display text-3xl font-bold tracking-tight text-white md:col-span-4">
        {title}
      </h2>
      <div className="col-span-1 md:col-span-8">
        {paragraphs.map((text) => (
          <p key={text} className="mb-4 text-xl leading-relaxed text-slate-400 last:mb-8 md:text-2xl">
            {text}
          </p>
        ))}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/sobre-nos"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95 md:w-fit"
          >
            Saiba mais
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={ctaHref}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:text-white md:w-fit"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre-nos" className="scroll-mt-20 bg-ink-950">
      {blocks.map((block) => (
        <TextParallaxContent
          key={block.heading}
          imgUrl={block.imgUrl}
          subheading={block.subheading}
          heading={block.heading}
        >
          <AboutCopy
            title={block.title}
            paragraphs={block.paragraphs}
            ctaLabel={block.ctaLabel}
            ctaHref={block.ctaHref}
            external={block.external}
          />
        </TextParallaxContent>
      ))}
    </section>
  );
}
