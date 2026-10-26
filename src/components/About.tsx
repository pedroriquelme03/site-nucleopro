import { ArrowUpRight } from "lucide-react";

function AboutCopy() {
  return (
    <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pb-24 pt-12 text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight text-white">
        Distribuidor oficial
      </h2>
      <p className="mt-8 text-xl leading-relaxed text-slate-200 md:text-2xl">
        A Núcleo ProAudio leva a linha Mackie ao palco, à igreja e à instalação fixa com produto
        original, garantia de fábrica e quem entende o sistema do começo ao fim.
      </p>
      <p className="mt-4 text-xl leading-relaxed text-slate-200 md:text-2xl">
        Não é vitrine. É especificação, suporte e entrega para quem não pode errar o som.
      </p>
      <a
        href="/sobre-nos"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
      >
        Saiba mais
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre-nos" className="relative scroll-mt-20 overflow-hidden">
      <img
        src="/about/distribuidor-oficial.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-left"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-bl from-ink-950/90 via-ink-950/65 to-ink-950/40"
      />
      <AboutCopy />
    </section>
  );
}
