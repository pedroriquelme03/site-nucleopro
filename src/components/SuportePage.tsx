import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, ShieldCheck, Wrench } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: BookOpen,
    title: "Manuais",
    desc: "Manuais de operação e especificações Mackie para o seu equipamento.",
    href: "/manuais",
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

export function SuportePage() {
  useEffect(() => {
    document.title = "Suporte | Núcleo ProAudio";
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
            title="Suporte"
            description="Manual, firmware, assistência e garantia no mesmo lugar. A Núcleo cuida do equipamento Mackie depois da entrega — para o sistema continuar no ar, com peça, orientação e encaminhamento oficial quando precisar."
          />

          <p className="mt-6 font-display text-xl font-bold text-brand">
            Se é Mackie, passa pela Núcleo.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.06 }}
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
    </main>
  );
}
