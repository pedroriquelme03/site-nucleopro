import { LegalBlock, LegalLayout } from "./LegalLayout";

const pages = [
  { label: "Home", href: "/" },
  { label: "Bio / Links", href: "/bio" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Manuais", href: "/manuais" },
  { label: "Blog", href: "/blog" },
  { label: "Marcas", href: "/marcas" },
  { label: "Sobre nós", href: "/sobre-nos" },
  { label: "Suporte", href: "/suporte" },
  { label: "Representantes", href: "/representantes" },
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de uso", href: "/termos-de-uso" },
];

const sections = [
  { label: "Produtos", href: "/#produtos" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Lojas parceiras", href: "/#quem-usa" },
  { label: "Onde comprar", href: "/#onde-comprar" },
  { label: "Notícias", href: "/#noticias" },
  { label: "Parceiros", href: "/#parceiros" },
];

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className="text-slate-300 transition-colors hover:text-brand">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SitemapPage() {
  return (
    <LegalLayout
      title="Mapa do site"
      description="Encontre as páginas e seções da Núcleo ProAudio."
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <LegalBlock title="Páginas">
          <LinkList items={pages} />
        </LegalBlock>
        <LegalBlock title="Na home">
          <LinkList items={sections} />
        </LegalBlock>
      </div>
    </LegalLayout>
  );
}
