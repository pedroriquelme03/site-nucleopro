import { memo, useCallback, useEffect, useRef, useState } from "react";
import { dealersByState, type Representative } from "@/data/dealers";
import {
  SELECT_DEALER_EVENT,
  type SelectDealerDetail,
} from "@/lib/select-dealer";
import { WHATSAPP_NUMBER } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";
import "./brazil-map.css";

type MapState = {
  id: string;
  name: string;
  x: number;
  y: number;
};

type FocusedDealer = {
  name: string;
  label: string;
};

const BrazilSvg = memo(function BrazilSvg({
  markup,
  selectedId,
  onHoverChange,
  onSelect,
}: {
  markup: string;
  selectedId: string | null;
  onHoverChange: (hover: MapState | null) => void;
  onSelect: (next: MapState) => void;
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
    svg.setAttribute(
      "aria-label",
      "Mapa do Brasil — clique em um estado para ver as lojas parceiras",
    );

    const paths = host.querySelectorAll<SVGPathElement>("path[id^='BR']");

    const place = (event: MouseEvent, path: SVGPathElement): MapState => {
      const rect = host.getBoundingClientRect();
      return {
        id: path.id,
        name: path.getAttribute("name") ?? path.id,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onEnter = (event: MouseEvent) => {
      const path = event.currentTarget as SVGPathElement;
      path.setAttribute("data-active", "true");
      onHoverChange(place(event, path));
    };
    const onMove = (event: MouseEvent) => {
      onHoverChange(place(event, event.currentTarget as SVGPathElement));
    };
    const onLeave = (event: MouseEvent) => {
      (event.currentTarget as SVGPathElement).removeAttribute("data-active");
      onHoverChange(null);
    };
    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const path = event.currentTarget as SVGPathElement;
      onSelect(place(event, path));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const path = event.currentTarget as SVGPathElement;
      const bbox = path.getBoundingClientRect();
      const hostBox = host.getBoundingClientRect();
      onSelect({
        id: path.id,
        name: path.getAttribute("name") ?? path.id,
        x: bbox.left + bbox.width / 2 - hostBox.left,
        y: bbox.top + bbox.height / 2 - hostBox.top,
      });
    };

    paths.forEach((path) => {
      path.setAttribute("tabindex", "0");
      path.setAttribute("aria-label", path.getAttribute("name") ?? path.id);
      path.addEventListener("mouseenter", onEnter);
      path.addEventListener("mousemove", onMove);
      path.addEventListener("mouseleave", onLeave);
      path.addEventListener("click", onClick);
      path.addEventListener("keydown", onKeyDown);
    });

    return () => {
      paths.forEach((path) => {
        path.removeEventListener("mouseenter", onEnter);
        path.removeEventListener("mousemove", onMove);
        path.removeEventListener("mouseleave", onLeave);
        path.removeEventListener("click", onClick);
        path.removeEventListener("keydown", onKeyDown);
      });
    };
  }, [markup, onHoverChange, onSelect]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.querySelectorAll<SVGPathElement>("path[id^='BR']").forEach((path) => {
      if (path.id === selectedId) path.setAttribute("data-selected", "true");
      else path.removeAttribute("data-selected");
    });
  }, [markup, selectedId]);

  return <div ref={hostRef} className="brazil-map" dangerouslySetInnerHTML={{ __html: markup }} />;
});

function buildDealerList(
  stateId: string,
  stateName: string,
  focus: FocusedDealer | null,
): Representative[] {
  const base = [...(dealersByState[stateId] ?? [])];
  if (!focus) return base;

  const matchIndex = base.findIndex((d) => d.name === focus.name);
  if (matchIndex >= 0) {
    const [match] = base.splice(matchIndex, 1);
    return [{ ...match, name: focus.label || match.name }, ...base];
  }

  return [
    {
      name: focus.label,
      region: stateName,
      phone: "—",
      email: "",
      whatsapp: "",
    },
    ...base,
  ];
}

export function BrazilMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<SelectDealerDetail | null>(null);
  const [markup, setMarkup] = useState("");
  const [hover, setHover] = useState<MapState | null>(null);
  const [selected, setSelected] = useState<MapState | null>(null);
  const [focus, setFocus] = useState<FocusedDealer | null>(null);

  const applySelection = useCallback((detail: SelectDealerDetail) => {
    const wrap = wrapRef.current;
    if (!wrap) return false;
    const path = wrap.querySelector<SVGPathElement>(`path#${detail.stateId}`);
    if (!path) return false;

    const bbox = path.getBoundingClientRect();
    const hostBox = wrap.getBoundingClientRect();
    setSelected({
      id: detail.stateId,
      name: path.getAttribute("name") ?? detail.stateId,
      x: bbox.left + bbox.width / 2 - hostBox.left,
      y: bbox.top + bbox.height / 2 - hostBox.top,
    });
    setFocus({
      name: detail.dealerName ?? detail.label,
      label: detail.label,
    });
    setHover(null);
    return true;
  }, []);

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

  useEffect(() => {
    if (!markup || !pendingFocus.current) return;
    if (applySelection(pendingFocus.current)) {
      pendingFocus.current = null;
    }
  }, [markup, applySelection]);

  useEffect(() => {
    const onSelectDealer = (event: Event) => {
      const detail = (event as CustomEvent<SelectDealerDetail>).detail;
      if (!detail?.stateId) return;
      if (!applySelection(detail)) {
        pendingFocus.current = detail;
      }
    };
    window.addEventListener(SELECT_DEALER_EVENT, onSelectDealer);
    return () => window.removeEventListener(SELECT_DEALER_EVENT, onSelectDealer);
  }, [applySelection]);

  const onHoverChange = useCallback((next: MapState | null) => {
    setHover(next);
  }, []);

  const onSelect = useCallback((next: MapState) => {
    setFocus(null);
    setSelected((current) => (current?.id === next.id ? current : next));
  }, []);

  const active = selected ?? hover;
  const dealers = active
    ? buildDealerList(active.id, active.name, selected ? focus : null)
    : [];
  const showPanel = Boolean(selected);
  const uncovered = Boolean(selected && dealers.length === 0);
  const uncoveredWhatsApp =
    selected && dealers.length === 0
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          `Olá! Vim pelo site da Núcleo ProAudio. Ainda não encontrei loja em ${selected.name}. Podem me ajudar?`,
        )}`
      : "";
  const width = wrapRef.current?.clientWidth ?? 480;
  const cardX = active ? Math.min(Math.max(active.x, 136), width - 136) : 0;
  const cardY = active ? Math.max(active.y, 12) : 0;

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      onClick={(event) => {
        if (!(event.target as Element).closest("path[id^='BR'], .dealer-card")) {
          setSelected(null);
          setFocus(null);
        }
      }}
    >
      {markup ? (
        <BrazilSvg
          markup={markup}
          selectedId={selected?.id ?? null}
          onHoverChange={onHoverChange}
          onSelect={onSelect}
        />
      ) : (
        <div className="aspect-[1000/912] w-full animate-pulse rounded-3xl bg-brand/20" />
      )}
      {active ? (
        <div
          className={`dealer-card absolute z-20 max-h-[min(22rem,50vh)] w-[min(16.5rem,calc(100%-1.5rem))] -translate-x-1/2 -translate-y-[calc(100%+14px)] overflow-y-auto rounded-2xl border border-line bg-ink-950/95 p-4 shadow-card backdrop-blur-sm ${
            showPanel ? "" : "pointer-events-none"
          }`}
          style={{ left: cardX, top: cardY }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">{active.name}</p>
          {dealers.length ? (
            <div className="mt-2 space-y-3">
              {dealers.map((dealer, index) => {
                const isFocused = Boolean(focus && index === 0 && selected);
                return (
                  <div
                    key={`${dealer.name}-${dealer.region}-${index}`}
                    className={`border-t border-line/70 pt-3 first:border-t-0 first:pt-0 ${
                      isFocused ? "rounded-lg bg-brand/10 px-2 py-2 ring-1 ring-brand/40" : ""
                    }`}
                  >
                    <p className="font-display text-sm font-bold text-white">{dealer.name}</p>
                    {dealer.region && dealer.region !== dealer.name ? (
                      <p className="mt-0.5 text-xs text-slate-400">{dealer.region}</p>
                    ) : null}
                    {dealer.phone && dealer.phone !== "—" ? (
                      <p className="mt-1 text-sm font-semibold text-white">{dealer.phone}</p>
                    ) : null}
                    {showPanel && dealer.whatsapp ? (
                      <a
                        href={dealer.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-3 py-2 text-xs font-semibold text-ink-950 shadow-glow-sm transition-all hover:to-[#a97c50] active:scale-95"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Falar no WhatsApp
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : uncovered ? (
            <div className="mt-2">
              <p className="font-display text-sm font-bold text-white">Ainda não atendemos essa região</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Não há loja parceira cadastrada neste estado no momento. Fale com a Núcleo para indicarmos a melhor opção.
              </p>
              <a
                href={uncoveredWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-white to-white px-3 py-2 text-xs font-semibold text-ink-950 shadow-glow-sm transition-all hover:to-[#a97c50] active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar com a Núcleo
              </a>
            </div>
          ) : (
            <p className="mt-2 text-[11px] text-slate-500">Clique no estado para ver o contato</p>
          )}
          {showPanel || !dealers.length ? null : (
            <p className="mt-2 text-[11px] text-slate-500">Clique no estado para ver o contato</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
