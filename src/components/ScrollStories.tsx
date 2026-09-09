import { useLayoutEffect, useRef, useState } from "react";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";
import { SectionHeading } from "./SectionHeading";

const cardItems: iCardItem[] = [
  {
    title: "Igrejas",
    description: "Inteligibilidade da voz e graves controlados do púlpito ao mezanino.",
    tag: "igrejas",
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#08090B",
    textColor: "#ffffff",
  },
  {
    title: "Shows e eventos",
    description: "Pressão, clareza e cobertura para palco, casas de show e festivals.",
    tag: "shows",
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#0B0D10",
    textColor: "#ffffff",
  },
  {
    title: "Instalações fixas",
    description: "Line arrays, subs e DSP alinhados para casas de espetáculo e espaços permanentes.",
    tag: "install",
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#08090B",
    textColor: "#ffffff",
  },
  {
    title: "Casas noturnas",
    description: "SPL alto, graves definidos e sistema pronto para a pista a noite inteira.",
    tag: "nightclub",
    src: "https://images.unsplash.com/photo-1566737236500-c8ac43014e67?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#111418",
    textColor: "#f3e6d2",
  },
  {
    title: "Corporativo",
    description: "Áudio previsível para convenções, plenárias e eventos de marca.",
    tag: "corporativo",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#0B0D10",
    textColor: "#ffffff",
  },
  {
    title: "Auditórios",
    description: "Fala nítida e música com cobertura uniforme em toda a plateia.",
    tag: "auditorios",
    src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1600&q=80",
    link: "#produtos",
    color: "#08090B",
    textColor: "#ffffff",
  },
  {
    title: "Bares e restaurantes",
    description: "Som presente sem agressão — ambiente, música ao vivo e operação diária.",
    tag: "bares",
    src: "/products/Mackie-Thump15v4-3Q-Hero-Left-US.webp",
    link: "#produtos",
    color: "#111418",
    textColor: "#f3e6d2",
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
