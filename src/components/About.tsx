import { ArrowUpRight } from "lucide-react";

function AboutCopy() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 font-display text-3xl font-bold tracking-tight text-white md:col-span-4">
        Distribuidor oficial
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl leading-relaxed text-slate-400 md:text-2xl">
          A Núcleo ProAudio leva a linha Mackie ao palco, à igreja e à instalação fixa com produto
          original, garantia de fábrica e quem entende o sistema do começo ao fim.
        </p>
        <p className="mb-8 text-xl leading-relaxed text-slate-400 md:text-2xl">
          Não é vitrine. É especificação, suporte e entrega para quem não pode errar o som.
        </p>
        <a
          href="/sobre-nos"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95 md:w-fit"
        >
          Saiba mais
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre-nos" className="scroll-mt-20 bg-ink-950">
      <AboutCopy />
    </section>
  );
}
