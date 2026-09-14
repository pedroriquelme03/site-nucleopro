import { Instagram } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { catalogCategories } from "@/data/catalog";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/utils";

export function Footer() {
  const nav = [
    { label: "Representante comercial", href: "/#contato" },
    { label: "Blog", href: "/blog" },
    { label: "Quem somos", href: "/sobre-nos" },
    { label: "Parceiros", href: "/#parceiros" },
  ];

  const legal = [
    { label: "Mapa do site", href: "/mapa-do-site" },
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de uso", href: "/termos-de-uso" },
  ];

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Distribuidora oficial Mackie no Brasil. Equipamentos de áudio high-end com suporte
              técnico especializado e entrega nacional.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-slate-300 transition-colors hover:border-brand/50 hover:text-brand"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-slate-300 transition-colors hover:border-brand/50 hover:text-brand"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-slate-400 transition-colors hover:text-brand">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Linhas Mackie
            </h4>
            <ul className="mt-4 space-y-2.5">
              {catalogCategories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`/catalogo?categoria=${c.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-brand"
                  >
                    {c.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              {legal.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-slate-400 transition-colors hover:text-brand">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Núcleo ProAudio · Distribuidor oficial Mackie no Brasil.
          </p>
          <p className="text-xs text-slate-500">
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
        </div>
      </div>
    </footer>
  );
}
