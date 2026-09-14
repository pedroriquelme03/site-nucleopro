import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CatalogProduct } from "@/data/catalog";
import { productImageSrc, productPagePath } from "@/data/catalog";

export function ProductCard({
  product,
  badge,
}: {
  product: CatalogProduct;
  badge?: string;
}) {
  return (
    <motion.a
      href={productPagePath(product.slug)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/60 p-3 shadow-card transition-colors hover:border-brand/40"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#f4f4f5]">
        <img
          src={productImageSrc(product.slug)}
          alt={`Mackie ${product.name}`}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full border border-brand/30 bg-ink-950/80 px-2.5 py-1 text-[11px] font-semibold text-brand">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-0.5 text-sm font-medium text-brand/90">{product.tagline}</p>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
          {product.description}
        </p>

        <span className="mt-4 inline-flex items-center justify-between gap-2 rounded-xl border border-line bg-ink-950/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors group-hover:border-brand/50 group-hover:text-brand">
          Ver produto
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </motion.a>
  );
}
