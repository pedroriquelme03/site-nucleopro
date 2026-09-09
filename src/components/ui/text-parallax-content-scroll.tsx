import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-ink-950">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;
const NAV_HEIGHT = 64;

export interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children?: ReactNode;
}

export const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: TextParallaxContentProps) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const top = NAV_HEIGHT + IMG_PADDING;

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100svh - ${top + IMG_PADDING}px)`,
        top,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div className="absolute inset-0 bg-ink-950/70" style={{ opacity }} />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center px-4 pt-16 text-white"
    >
      <p className="mb-2 text-center font-sans text-xl text-[#f3e6d2] md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center font-display text-4xl font-bold tracking-tight md:text-7xl">
        {heading}
      </p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 font-display text-3xl font-bold text-white md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-slate-400 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis
        soluta eius quam modi aliquam quaerat odit deleniti minima maiores voluptate
        est ut saepe accusantium maxime doloremque nulla consectetur possimus.
      </p>
      <p className="mb-8 text-xl text-slate-400 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-9 py-4 text-xl font-semibold text-ink-950 transition-all hover:to-[#a97c50] md:w-fit"
      >
        Learn more <ArrowUpRight className="h-5 w-5" />
      </button>
    </div>
  </div>
);
