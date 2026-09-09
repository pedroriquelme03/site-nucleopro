import { memo, useCallback, useEffect, useRef, useState } from "react";
import { dealersByState } from "@/data/dealers";
import "./brazil-map.css";

type HoverState = {
  id: string;
  name: string;
  x: number;
  y: number;
};

const BrazilSvg = memo(function BrazilSvg({
  markup,
  onHoverChange,
}: {
  markup: string;
  onHoverChange: (hover: HoverState | null) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !markup) return;

    const svg = host.querySelector("svg");
    if (!svg) return;
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.removeAttribute("fill");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Mapa do Brasil — passe o mouse em um estado");

    const paths = host.querySelectorAll<SVGPathElement>("path[id^='BR']");

    const place = (event: MouseEvent, path: SVGPathElement) => {
      const rect = host.getBoundingClientRect();
      onHoverChange({
        id: path.id,
        name: path.getAttribute("name") ?? path.id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const onEnter = (event: MouseEvent) => {
      const path = event.currentTarget as SVGPathElement;
      path.setAttribute("data-active", "true");
      place(event, path);
    };
    const onMove = (event: MouseEvent) => {
      place(event, event.currentTarget as SVGPathElement);
    };
    const onLeave = (event: MouseEvent) => {
      (event.currentTarget as SVGPathElement).removeAttribute("data-active");
      onHoverChange(null);
    };
    const onClick = (event: MouseEvent) => {
      const path = event.currentTarget as SVGPathElement;
      const dealer = dealersByState[path.id];
      if (dealer) window.open(dealer.whatsapp, "_blank", "noopener,noreferrer");
    };

    paths.forEach((path) => {
      path.setAttribute("tabindex", "0");
      path.setAttribute("aria-label", path.getAttribute("name") ?? path.id);
      path.addEventListener("mouseenter", onEnter);
      path.addEventListener("mousemove", onMove);
      path.addEventListener("mouseleave", onLeave);
      path.addEventListener("click", onClick);
    });

    return () => {
      paths.forEach((path) => {
        path.removeEventListener("mouseenter", onEnter);
        path.removeEventListener("mousemove", onMove);
        path.removeEventListener("mouseleave", onLeave);
        path.removeEventListener("click", onClick);
      });
    };
  }, [markup, onHoverChange]);

  return <div ref={hostRef} className="brazil-map" dangerouslySetInnerHTML={{ __html: markup }} />;
});

export function BrazilMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState("");
  const [hover, setHover] = useState<HoverState | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/br.svg")
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        const start = text.indexOf("<svg");
        const end = text.lastIndexOf("</svg>");
        const svg = start >= 0 && end > start ? text.slice(start, end + 6) : text;
        setMarkup(svg.replace(/viewbox=/i, "viewBox="));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onHoverChange = useCallback((next: HoverState | null) => {
    setHover(next);
  }, []);

  const dealer = hover ? dealersByState[hover.id] : null;
  const width = wrapRef.current?.clientWidth ?? 480;
  const cardX = hover ? Math.min(Math.max(hover.x, 116), width - 116) : 0;
  const cardY = hover ? Math.max(hover.y, 12) : 0;

  return (
    <div ref={wrapRef} className="relative w-full">
      {markup ? <BrazilSvg markup={markup} onHoverChange={onHoverChange} /> : (
        <div className="aspect-[1000/912] w-full animate-pulse rounded-3xl bg-brand/20" />
      )}
      {hover && dealer ? (
        <div
          className="pointer-events-none absolute z-20 w-56 -translate-x-1/2 -translate-y-[calc(100%+14px)] rounded-2xl border border-line bg-ink-950/95 p-4 shadow-card backdrop-blur-sm"
          style={{ left: cardX, top: cardY }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">{hover.name}</p>
          <p className="mt-1 font-display text-sm font-bold text-white">{dealer.name}</p>
          <p className="mt-0.5 text-xs text-slate-400">{dealer.city}</p>
          <p className="mt-2 text-sm font-semibold text-white">{dealer.contact}</p>
          <p className="mt-1 text-[11px] text-slate-500">Clique para falar no WhatsApp</p>
        </div>
      ) : null}
    </div>
  );
}
