import { useLayoutEffect, useRef, useState } from "react";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";
import { SectionHeading } from "./SectionHeading";

const cardItems: iCardItem[] = [
  {
    title: "Som ao vivo",
    description: "Do ensaio ao palco",
    tag: "live-sound",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    link: "/catalogo",
    color: "#08090B",
    textColor: "#ffffff",
  },
  {
    title: "A bateria",
    description: "Leve o som a qualquer lugar",
    tag: "battery",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    link: "/catalogo",
    color: "#0B0D10",
    textColor: "#ffffff",
  },
  {
    title: "Estúdio",
    description: "Grave o próximo hit",
    tag: "studio",
    src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    link: "/catalogo",
    color: "#08090B",
    textColor: "#ffffff",
  },
];

const NAV_HEIGHT = 64;

export function ScrollStories() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [headingH, setHeadingH] = useState(148);

  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const update = () => setHeadingH(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const offsetTop = NAV_HEIGHT + headingH;

  return (
    <section id="sistemas" className="border-t border-line bg-ink-950">
      <div className="relative">
        <div
          ref={headingRef}
          className="sticky z-20 bg-ink-950"
          style={{ top: NAV_HEIGHT }}
        >
          <div className="container-x pb-5 pt-12 sm:pb-6 sm:pt-16">
            <SectionHeading
              title="Feito para o seu ambiente"
              description="Seja qual for o seu setup, existe uma solução Mackie certa — e a Núcleo indica a ideal para você."
              align="center"
            />
          </div>
        </div>
        <CardsParallax items={cardItems} offsetTop={offsetTop} />
      </div>
    </section>
  );
}
