import { useEffect } from "react";
import { SectionHeading } from "./SectionHeading";

export function LegalLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} | Núcleo ProAudio`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, [title]);

  return (
    <main>
      <section className="scroll-mt-20 py-20 pt-28 sm:py-28 sm:pt-32">
        <div className="container-x">
          <SectionHeading title={title} description={description} />
          <div className="mt-12 max-w-3xl space-y-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">{children}</div>
    </section>
  );
}
