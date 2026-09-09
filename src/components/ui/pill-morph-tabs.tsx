import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export interface PillTab {
  value: string;
  label: React.ReactNode;
  panel?: React.ReactNode;
}

interface PillMorphTabsProps {
  items?: PillTab[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export default function PillMorphTabs({
  items = [
    { value: "overview", label: "Overview", panel: <div>Overview content</div> },
    { value: "features", label: "Features", panel: <div>Feature list</div> },
    { value: "pricing", label: "Pricing", panel: <div>Pricing & plans</div> },
    { value: "faq", label: "FAQ", panel: <div>FAQ content</div> },
  ],
  defaultValue,
  onValueChange,
  className,
}: PillMorphTabsProps) {
  const first = items[0]?.value ?? "tab-0";
  const [value, setValue] = React.useState<string>(defaultValue ?? first);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);
  const [isExpanding, setIsExpanding] = React.useState(false);
  const hasPanels = items.some((it) => it.panel != null);

  const measure = React.useCallback(() => {
    const list = listRef.current;
    const activeEl = triggerRefs.current[value];
    if (!list || !activeEl) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: tRect.left - listRect.left + list.scrollLeft,
      width: tRect.width,
    });
  }, [value]);

  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    Object.values(triggerRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    setIsExpanding(true);
    const id = window.setTimeout(() => setIsExpanding(false), 300);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <div className={cn("w-full", className)}>
      <Tabs
        value={value}
        onValueChange={(v) => {
          setValue(v);
          onValueChange?.(v);
        }}
      >
        <div
          ref={listRef}
          className={cn(
            "relative inline-flex max-w-full items-center gap-2 overflow-x-auto rounded-full p-1",
            "border border-white/10 bg-white/[0.04] backdrop-blur-sm",
          )}
        >
          {indicator && (
            <motion.div
              layout
              initial={false}
              animate={{
                left: indicator.left,
                width: indicator.width,
                scaleY: isExpanding ? 1.06 : 1,
                borderRadius: isExpanding ? 24 : 999,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              className="pointer-events-none absolute top-1 bottom-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, rgba(169,124,80,0.32), rgba(201,160,110,0.18))",
                boxShadow: "0 6px 20px rgba(169,124,80,0.18)",
                border: "1px solid rgba(169,124,80,0.28)",
                left: indicator.left,
                width: indicator.width,
              }}
            />
          )}

          {indicator && (
            <motion.div
              layout
              initial={false}
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="pointer-events-none absolute top-0 bottom-0 rounded-full opacity-40 blur-2xl"
              style={{
                background: "linear-gradient(90deg,#a97c50,#c9a06e)",
                mixBlendMode: "screen",
                left: indicator.left,
                width: indicator.width,
              }}
            />
          )}

          <TabsList className="relative flex gap-1 bg-transparent p-1 text-slate-400">
            {items.map((it) => {
              const isActive = it.value === value;
              return (
                <TabsTrigger
                  key={it.value}
                  value={it.value}
                  ref={(el: HTMLButtonElement | null) => {
                    triggerRefs.current[it.value] = el;
                  }}
                  className={cn(
                    "relative z-10 rounded-full px-4 py-2 text-sm font-medium shadow-none transition-colors",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    isActive ? "text-white" : "text-slate-400 hover:text-white",
                  )}
                >
                  {it.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {hasPanels ? (
          <div className="mt-4">
            {items.map((it) => (
              <TabsContent key={it.value} value={it.value} className="p-2">
                {it.panel ?? null}
              </TabsContent>
            ))}
          </div>
        ) : null}
      </Tabs>
    </div>
  );
}
