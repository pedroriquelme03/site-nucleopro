import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { newsBySlug, newsPagePath, relatedNews } from "@/data/news";

export function BlogPostPage({ slug }: { slug: string }) {
  const post = newsBySlug(slug);
  const related = relatedNews(slug, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      document.title = "Matéria não encontrada | Núcleo ProAudio";
      return;
    }
    document.title = `${post.title} | Núcleo ProAudio`;
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, [slug, post]);

  if (!post) {
    return (
      <main className="container-x py-28">
        <h1 className="font-display text-3xl font-bold text-white">Matéria não encontrada</h1>
        <p className="mt-3 text-slate-400">Essa notícia não está no blog atual.</p>
        <a href="/blog" className="mt-6 inline-flex text-sm font-semibold text-brand">
          Voltar ao blog
        </a>
      </main>
    );
  }

  return (
    <main>
      <section className="relative isolate min-h-[280px] overflow-hidden border-b border-line pt-16 sm:min-h-[380px]">
        <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/40" />
        <div className="container-x relative z-10 flex min-h-[280px] flex-col justify-end py-10 sm:min-h-[380px] sm:py-14">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <a href="/blog" className="hover:text-white">
              Blog
            </a>
            <span>/</span>
            <span className="text-white/70">{post.title}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{post.date}</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{post.text}</p>
        </div>
      </section>

      <section className="border-b border-line py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
          <article className="min-w-0">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Todas as matérias
            </a>

            <div className="mt-8 space-y-5">
              {post.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-slate-300 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.sourceUrl ? (
              <p className="mt-10 text-sm text-slate-500">
                Conteúdo adaptado pela Núcleo ProAudio a partir do material oficial Mackie.{" "}
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand hover:text-white"
                >
                  Ver fonte original
                </a>
              </p>
            ) : null}
          </article>

          <aside className="lg:pt-10">
            <a
              href="/catalogo"
              className="group relative block overflow-hidden rounded-2xl border border-line"
            >
              <img
                src="/intlscimageheader.jpg"
                alt="Catálogo Mackie"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Mackie</p>
                <p className="mt-1 font-display text-lg font-bold text-white">Ver catálogo</p>
              </div>
            </a>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-12 sm:py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Matérias relacionadas</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={newsPagePath(item.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/40 transition-colors hover:border-brand/40"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-ink-900">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-brand">{item.date}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-white group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{item.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white transition-colors group-hover:text-brand">
                      Ler matéria
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
