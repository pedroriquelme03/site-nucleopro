import { motion } from "framer-motion";

export function SectionHeading({
  title,
  description,
  align = "left",
}: {
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed text-slate-400 ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
