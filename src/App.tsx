import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductShowcase } from "./components/ProductShowcase";
import { About } from "./components/About";
import { FeaturedProduct } from "./components/FeaturedProduct";
import { Projects } from "./components/Projects";
import { Stats } from "./components/Stats";
import { WhoUses } from "./components/WhoUses";
import { WhereToBuy } from "./components/WhereToBuy";
import { News } from "./components/News";
import { PartnerHero } from "./components/PartnerHero";
import { Footer } from "./components/Footer";
import { PartnerFormHost } from "./components/PartnerFormHost";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { MarcasPage } from "./components/MarcasPage";
import { CatalogPage } from "./components/CatalogPage";
import { SobreNosPage } from "./components/SobreNosPage";
import { SuportePage } from "./components/SuportePage";
import { SitemapPage } from "./components/SitemapPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { TermsPage } from "./components/TermsPage";
import { BioPage } from "./components/BioPage";
import { ProductPage } from "./components/ProductPage";
import { ManuaisPage } from "./components/ManuaisPage";
import { BlogPage } from "./components/BlogPage";
import { BlogPostPage } from "./components/BlogPostPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950 pb-[env(safe-area-inset-bottom)]">
      <Navbar />
      {children}
      <Footer />
      <PartnerFormHost />
      <FloatingWhatsApp />
    </div>
  );
}

function HomePage() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main>
      <Hero />
      <ProductShowcase />
      <About />
      <FeaturedProduct />
      <Projects />
      <Stats />
      <WhoUses />
      <WhereToBuy />
      <News />
      <PartnerHero />
    </main>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  if (path === "/marcas") {
    return (
      <Layout>
        <MarcasPage />
      </Layout>
    );
  }

  if (path === "/catalogo") {
    return (
      <Layout>
        <CatalogPage />
      </Layout>
    );
  }

  if (path === "/manuais") {
    return (
      <Layout>
        <ManuaisPage />
      </Layout>
    );
  }

  if (path === "/blog") {
    return (
      <Layout>
        <BlogPage />
      </Layout>
    );
  }

  const blogPostMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogPostMatch) {
    return (
      <Layout>
        <BlogPostPage slug={decodeURIComponent(blogPostMatch[1])} />
      </Layout>
    );
  }

  if (path === "/sobre-nos") {
    return (
      <Layout>
        <SobreNosPage />
      </Layout>
    );
  }

  if (path === "/suporte") {
    return (
      <Layout>
        <SuportePage />
      </Layout>
    );
  }

  if (path === "/mapa-do-site") {
    return (
      <Layout>
        <SitemapPage />
      </Layout>
    );
  }

  if (path === "/politica-de-privacidade") {
    return (
      <Layout>
        <PrivacyPage />
      </Layout>
    );
  }

  if (path === "/termos-de-uso") {
    return (
      <Layout>
        <TermsPage />
      </Layout>
    );
  }

  const productMatch = path.match(/^\/produto\/([^/]+)$/);
  if (productMatch) {
    return (
      <Layout>
        <ProductPage slug={decodeURIComponent(productMatch[1])} />
      </Layout>
    );
  }

  if (path === "/bio") {
    return <BioPage />;
  }

  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}
