import { cn } from "@/lib/utils";

const logos = [
  { src: "/parceiros/mackie.webp", alt: "Mackie" },
  { src: "/parceiros/qsc.webp", alt: "QSC" },
  { src: "/parceiros/electro-voice.webp", alt: "Electro-Voice" },
  { src: "/parceiros/rcf.webp", alt: "RCF" },
];

export function BrandStrip({ className }: { className?: string }) {
  const set = Array.from({ length: 4 }, () => logos).flat();

  return (
    <section className={cn("border-y border-line bg-ink-900/50 py-4", className)} aria-label="Marcas">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="brand-marquee flex">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-12 pr-12"
              aria-hidden={copy === 1}
            >
              {set.map((logo, i) => (
                <img
                  key={`${copy}-${logo.alt}-${i}`}
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  className="h-8 w-auto shrink-0 object-contain"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
