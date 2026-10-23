import { useEffect } from "react";
import { SectionHeading } from "./SectionHeading";
import { CatalogBrowse } from "./CatalogBrowse";

export function CatalogPage() {
  useEffect(() => {
    document.title = "Catálogo Mackie | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  return (
    <main>
      <section className="scroll-mt-20 border-b border-line py-16 pt-28 sm:py-20 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Catálogo Mackie"
            description="A linha Mackie completa distribuída pela Núcleo ProAudio no Brasil — mixers, caixas ativas, monitores, microfones, fones e mais. Consulte disponibilidade pelo WhatsApp."
          />
          <CatalogBrowse className="mt-8" />
        </div>
      </section>
    </main>
  );
}
