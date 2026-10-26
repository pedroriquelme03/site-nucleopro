import { motion } from "framer-motion";
import { BrazilMap } from "./BrazilMap";
import { WHATSAPP_URL } from "@/lib/utils";

export function WhereToBuy() {
  return (
    <section id="onde-comprar" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Onde comprar
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400 sm:text-xl">
            Encontre uma loja parceira Mackie na sua região.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500">
            Clique no estado para ver as lojas. Depois use o botão para falar no WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
          >
            Falar com a Núcleo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="relative min-w-0 max-sm:overflow-visible"
        >
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-brand/15 blur-3xl" />
          <div className="relative mx-auto w-[112%] max-w-none -translate-x-[5.35%] sm:w-full sm:max-w-3xl sm:translate-x-0">
            <BrazilMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
