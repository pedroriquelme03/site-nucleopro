import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductGlyph } from "./ProductGlyph";
import { WHATSAPP_NUMBER } from "@/lib/utils";

/**
 * Product card — adapted from the 21st.dev "Product Card" (staggered grid) pattern,
 * restyled for the Núcleo dark theme and a distributor flow (quote via WhatsApp
 * instead of a fixed price).
 */
export function ProductCard({ product }: { product: Product }) {
  const quoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${product.name} (Mackie). Poderiam me passar mais informações?`
  )}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/60 p-3 shadow-card transition-colors hover:border-brand/40"
    >
      {/* Visual stage */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-ink-700 to-ink-900">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
        <div className="absolute inset-0 bg-grid-fade [background-size:22px_22px] opacity-40" />
        <ProductGlyph
          type={product.icon}
          className="relative h-16 w-16 text-slate-300 transition-all duration-300 group-hover:scale-110 group-hover:text-brand"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-brand/90">{product.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{product.description}</p>

        <a
          href={quoteUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-between gap-2 rounded-xl border border-line bg-ink-950/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand/50 hover:text-brand"
        >
          Consultar preço
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
