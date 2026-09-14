import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  imageUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      imageUrl,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex min-h-[min(85svh,700px)] w-full items-center justify-center overflow-hidden sm:min-h-[700px] sm:h-screen",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-[1] bg-ink-950/55" aria-hidden="true" />

        <motion.div
          className="z-10 flex max-w-4xl flex-col items-center justify-center px-5 text-center text-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2
            className="px-1 font-display text-[1.85rem] font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            {title}
          </motion.h2>

          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:mt-6 sm:text-lg md:text-xl md:leading-8"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4" variants={itemVariants}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={primaryButtonHref} target={primaryButtonHref.startsWith("http") ? "_blank" : undefined} rel={primaryButtonHref.startsWith("http") ? "noreferrer" : undefined}>
                {primaryButtonText}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href={secondaryButtonHref}>{secondaryButtonText}</a>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
