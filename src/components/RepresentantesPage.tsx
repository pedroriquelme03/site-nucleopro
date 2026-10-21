import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Search } from "lucide-react";
import {
  commercialRepresentatives,
  representativeStates,
  type CommercialRepresentative,
} from "@/data/representatives";
import { cn } from "@/lib/utils";
import { RepresentanteForm } from "./RepresentanteForm";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./WhatsAppIcon";

function matchesQuery(rep: CommercialRepresentative, query: string) {
  const haystack = `${rep.name} ${rep.region} ${rep.states.join(" ")} ${rep.email}`.toLowerCase();
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function RepresentantesPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("todos");

  useEffect(() => {
    document.title = "Representantes | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  const visible = useMemo(
    () =>
      commercialRepresentatives.filter((rep) => {
        if (state !== "todos" && !rep.states.includes(state)) return false;
        return matchesQuery(rep, query);
      }),
    [query, state],
  );

  return (
    <main>
      <section className="scroll-mt-20 py-20 pt-28 sm:py-28 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Representantes comerciais"
            description="Fale com o representante Mackie da sua região. A Núcleo atende o Brasil com equipe comercial para lojistas, integradores e parceiros."
          />
          <a
            href="#cadastro"
            className="mt-6 inline-flex items-center rounded-xl border border-line bg-ink-800/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-brand/50 hover:text-brand"
          >
            Quero ser representante
          </a>

          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, estado ou e-mail..."
              aria-label="Buscar representantes"
              className="h-12 w-full rounded-2xl border border-line bg-ink-800/60 pl-11 pr-4 text-base text-white outline-none placeholder:text-slate-500 focus:border-brand/50 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
          </div>

          <div className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button
              type="button"
              onClick={() => setState("todos")}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                state === "todos"
                  ? "border-brand/50 bg-brand/15 text-white"
                  : "border-line bg-ink-800/40 text-slate-400 hover:text-white",
              )}
            >
              Todos
            </button>
            {representativeStates.map((uf) => (
              <button
                key={uf}
                type="button"
                onClick={() => setState(uf)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  state === uf
                    ? "border-brand/50 bg-brand/15 text-white"
                    : "border-line bg-ink-800/40 text-slate-400 hover:text-white",
                )}
              >
                {uf}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-sm text-slate-400">Nenhum representante encontrado para essa busca.</p>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((rep, index) => (
                <motion.article
                  key={`${rep.name}-${rep.region}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.24) }}
                  className="flex h-full flex-col rounded-2xl border border-line bg-ink-800/40 p-6"
                >
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
                    <MapPin className="h-3.5 w-3.5" />
                    {rep.region}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{rep.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{rep.states.join(" · ")}</p>
                  <p className="mt-4 text-sm font-semibold text-white">{rep.phone}</p>
                  <a
                    href={`mailto:${rep.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="break-all">{rep.email}</span>
                  </a>
                  <a
                    href={rep.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.01] active:scale-95"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Entre em contato
                  </a>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
      <RepresentanteForm />
    </main>
  );
}
