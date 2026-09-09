import { motion } from "framer-motion";
import { BookOpen, Download, Wrench, ShieldCheck, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/utils";

const pillars = [
  {
    icon: BookOpen,
    title: "Manuais",
    desc: "Manuais de operação e especificações Mackie para o seu equipamento.",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá! Vim pelo site da Núcleo ProAudio e preciso de um manual Mackie.",
    )}`,
  },
  {
    icon: Download,
    title: "Downloads",
    desc: "Firmware, drivers e arquivos de setup para baixar quando precisar.",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá! Vim pelo site da Núcleo ProAudio e gostaria de um download (firmware, driver ou setup).",
    )}`,
  },
  {
    icon: Wrench,
    title: "Assistência",
    desc: "Suporte técnico e encaminhamento de reparo para manter o sistema no ar.",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá! Vim pelo site da Núcleo ProAudio e preciso de assistência técnica.",
    )}`,
  },
  {
    icon: ShieldCheck,
    title: "Garantia",
    desc: "Garantia de fábrica Mackie, com procedência oficial no Brasil.",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Olá! Vim pelo site da Núcleo ProAudio e gostaria de falar sobre garantia Mackie.",
    )}`,
  },
];

export function WhyNucleo() {
  return (
    <section id="sobre" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:order-2"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Suporte
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Manual, firmware, assistência e garantia no mesmo lugar. A Núcleo cuida do equipamento
            Mackie depois da entrega — para o sistema continuar no ar, com peça, orientação e
            encaminhamento oficial quando precisar.
          </p>
          <p className="mt-4 font-display text-xl font-bold text-brand">
            Se é Mackie, passa pela Núcleo.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-4 py-2 text-sm font-semibold text-ink-950 shadow-glow-sm transition-all hover:scale-[1.03] hover:to-[#a97c50] active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Falar com um especialista
          </a>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:order-1">
          {pillars.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-line bg-ink-800/40 p-6 transition-colors hover:border-brand/40 hover:bg-ink-800/70"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                <p.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
