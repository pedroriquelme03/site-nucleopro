import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Distribuidor oficial",
    desc: "Produtos Mackie originais, com garantia de fábrica e procedência que o palco e a instalação exigem.",
  },
  {
    icon: Wrench,
    title: "Assistência técnica",
    desc: "Suporte especializado e pós-venda para manter o sistema no ar — peça, setup e garantia.",
  },
  {
    icon: Truck,
    title: "Entrega nacional",
    desc: "Envio para os 27 estados, com agilidade para quem tem data de culto, show ou inauguração.",
  },
];

export function SobreNosPage() {
  useEffect(() => {
    document.title = "Sobre nós | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  return (
    <main>
      <section className="scroll-mt-20 py-20 pt-28 sm:py-28 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Sobre nós"
            description="A Núcleo ProAudio é a casa da Mackie no Brasil. Especificamos, entregamos e sustentamos o sistema — do púlpito à pista."
          />

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
                A Núcleo leva a linha Mackie ao palco, à igreja e à instalação fixa com produto
                original e quem entende o sistema do começo ao fim.
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">
                Não é vitrine. É desenho de cobertura, pressão e inteligibilidade — line array, sub,
                DSP e caixa de palco no lugar certo. Depois da entrega, o mesmo cuidado continua na
                assistência e no pós-venda.
              </p>
              <p className="mt-8 font-display text-2xl font-bold text-brand">
                Se é Mackie, passa pela Núcleo.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-ink-800/40 p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
