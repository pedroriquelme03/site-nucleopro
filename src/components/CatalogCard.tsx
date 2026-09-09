import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { CatalogProduct } from "@/data/catalog";
import { WHATSAPP_NUMBER } from "@/lib/utils";

export function CatalogCard({ product }: { product: CatalogProduct }) {
  const [open, setOpen] = useState(false);
  const quoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${product.name} (Mackie). Poderiam me passar mais informações e valor?`
  )}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/60 shadow-card transition-colors hover:border-brand/40"
    >
      {/* Product photo tile */}
      <div className="relative aspect-square overflow-hidden bg-[#f4f4f5]">
        <img
          src={`/produtos/${product.slug}.jpg`}
          alt={`Mackie ${product.name}`}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand/90">{product.tagline}</p>

        <p
          className={`mt-2 flex-1 text-sm leading-relaxed text-slate-400 ${
            open ? "" : "line-clamp-3"
          }`}
        >
          {product.description}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 inline-flex items-center gap-1 self-start text-xs font-semibold text-slate-400 transition-colors hover:text-brand"
          aria-expanded={open}
        >
          {open ? "Ver menos" : "Ver detalhes"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <a
          href={quoteUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.02] active:scale-95"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar preço
        </a>
      </div>
    </motion.div>
  );
}
