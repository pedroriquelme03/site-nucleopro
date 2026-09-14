import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, products } from "@/data/products";
import { ProductGlyph } from "./ProductGlyph";
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
      <section className="scroll-mt-20 border-b border-line py-20 pt-28 sm:py-28 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Marcas"
            description="A Núcleo ProAudio é a distribuidora oficial Mackie no Brasil — produto original, garantia de fábrica e suporte para o sistema inteiro."
          />

          <motion.a
            href="/#produtos"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="group mt-12 flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/40 shadow-card transition-colors hover:border-brand/40 lg:flex-row"
          >
            <div className="relative flex min-h-[240px] flex-1 items-center justify-center bg-gradient-to-br from-ink-700 to-ink-950 p-10 lg:min-h-[320px]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/15 blur-3xl" />
              <div className="absolute inset-0 bg-grid-fade [background-size:22px_22px] opacity-30" />
              <p className="relative font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                MACKIE
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
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
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-[#c9a06e]">
                Ver catálogo
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </motion.a>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const count = products.filter((p) => p.category === category.id).length;
              return (
                <motion.a
                  key={category.id}
                  href="/#produtos"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-line bg-ink-800/40 p-6 transition-colors hover:border-brand/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-slate-300 ring-1 ring-brand/20 transition-colors group-hover:text-brand">
                    <ProductGlyph type={category.icon} className="h-7 w-7" />
                  </span>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {count} {count === 1 ? "produto" : "produtos"}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {category.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
