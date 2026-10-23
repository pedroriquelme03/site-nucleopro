import { useEffect } from "react";
import { motion } from "framer-motion";
import { CatalogBrowse } from "./CatalogBrowse";
import { SectionHeading } from "./SectionHeading";

export function MarcasPage() {
  useEffect(() => {
    document.title = "Marcas | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  return (
    <main>
      <section className="scroll-mt-20 border-b border-line py-16 pt-28 sm:py-20 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Marcas"
            description="A Núcleo ProAudio é a distribuidora oficial Mackie no Brasil — produto original, garantia de fábrica e suporte para o sistema inteiro."
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-10 flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/40 shadow-card lg:flex-row"
          >
            <div className="relative flex min-h-[180px] flex-1 items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950 p-8 lg:min-h-[220px]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
              <div className="absolute inset-0 bg-grid-fade [background-size:22px_22px] opacity-30" />
              <img
                src="/parceiros/mackie.webp"
                alt="Mackie"
                className="relative h-14 w-auto object-contain sm:h-16 lg:h-20"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                Distribuidor oficial no Brasil
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                A marca do palco, da igreja e da instalação
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
                Line array, caixas, subs, amplificadores, DSP e acessórios Mackie — prontos para
                entrega nacional, com assistência técnica de quem especifica o sistema.
              </p>
            </div>
          </motion.div>

          <CatalogBrowse className="mt-12" />
        </div>
      </section>
    </main>
  );
}
