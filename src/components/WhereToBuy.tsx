import { motion } from "framer-motion";
import { BrazilMap } from "./BrazilMap";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const dealerUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Núcleo ProAudio e quero encontrar um revendedor perto de mim.",
)}`;

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
            Encontre um revendedor Nucleopro perto de você.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500">
            Clique no estado para ver o contato. Depois use o botão para falar no WhatsApp.
          </p>
          <a
            href={dealerUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
          >
            Encontrar um revendedor
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="relative min-w-0"
        >
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-brand/15 blur-3xl" />
          <div className="relative mx-auto w-full max-w-3xl">
            <BrazilMap />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
