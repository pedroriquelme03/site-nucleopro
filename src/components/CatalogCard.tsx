import { motion } from "framer-motion";
import type { CatalogProduct } from "@/data/catalog";
import { productImageSrc, productPagePath } from "@/data/catalog";

export function CatalogCard({ product }: { product: CatalogProduct }) {
  return (
    <motion.a
      href={productPagePath(product.slug)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/60 shadow-card transition-colors hover:border-brand/40"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f4f4f5]">
        <img
          src={productImageSrc(product.slug)}
          alt={`Mackie ${product.name}`}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand/90">{product.tagline}</p>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
          {product.description}
        </p>
        <span className="mt-4 text-sm font-semibold text-white transition-colors group-hover:text-brand">
          Ver produto
        </span>
      </div>
    </motion.a>
  );
}
