import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Instagram, LayoutGrid } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BrandStrip } from "./BrandStrip";

const links = [
  {
    label: "Contato",
    desc: "Fale com a Núcleo no WhatsApp",
    href: WHATSAPP_URL,
    external: true,
    icon: WhatsAppIcon,
  },
  {
    label: "Redes",
    desc: "Instagram @nucleoproaudio",
    href: INSTAGRAM_URL,
    external: true,
    icon: Instagram,
  },
  {
    label: "Catálogo",
    desc: "Linha Mackie no Brasil",
    href: "/#produtos",
    external: false,
    icon: LayoutGrid,
  },
  {
    label: "Site",
    desc: "Acesse o site completo",
    href: "/",
    external: false,
    icon: Globe,
  },
];

export function BioPage() {
  useEffect(() => {
    document.title = "Núcleo ProAudio · Links";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  return (
    <div className="relative min-h-svh bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(40rem 28rem at 50% -10%, rgba(169,124,80,0.16), transparent 60%)",
        }}
      />

      <main className="relative mx-auto flex min-h-svh w-full max-w-md flex-col px-5 py-14 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h1 className="sr-only">Núcleo ProAudio</h1>
          <img
            src="/logo-branca-dourada.webp"
            alt="Núcleo ProAudio"
            className="h-10 w-auto object-contain sm:h-11"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            Distribuidora oficial Mackie no Brasil. Equipamentos de áudio high-end com suporte
            especializado.
          </p>
          <p className="mt-3 font-display text-sm font-bold text-brand">
            Se é Mackie, passa pela Núcleo.
          </p>
        </motion.header>

        <nav className="mt-10 flex flex-col gap-3" aria-label="Links rápidos">
          {links.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.06 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-800/50 p-4 transition-colors hover:border-brand/40 hover:bg-ink-800/80"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block font-display text-base font-bold text-white transition-colors group-hover:text-brand">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm text-slate-400">{item.desc}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-brand" />
            </motion.a>
          ))}
        </nav>

        <BrandStrip className="mt-6 overflow-hidden rounded-2xl border border-line" />

        <p className="mt-auto pt-12 text-center text-xs text-slate-500">
          Desenvolvido por{" "}
          <a
            href="https://qeel.com.br"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 transition-colors hover:text-brand"
          >
            QeeL Tech
          </a>
        </p>
      </main>
    </div>
  );
}
