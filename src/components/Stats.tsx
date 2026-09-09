import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 25, suffix: "+", label: "Produtos Mackie" },
  { value: 100, suffix: "%", label: "Distribuidor oficial" },
  { value: 27, suffix: " estados", label: "Entrega nacional" },
  { value: 1, prefix: "#", label: "Se é Mackie, é Núcleo" },
];

/** Number ticker — count-up on scroll (21st.dev "Number Ticker" pattern). */
function Ticker({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-line bg-gradient-to-b from-ink-900/60 to-ink-950 py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="text-center lg:text-left"
            >
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                <span className="text-gradient">
                  <Ticker value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-2 text-sm font-medium text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
