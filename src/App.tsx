import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BrandStrip } from "./components/BrandStrip";
import { ProductShowcase } from "./components/ProductShowcase";
import { About } from "./components/About";
import { FeaturedProduct } from "./components/FeaturedProduct";
import { ScrollStories } from "./components/ScrollStories";
import { Projects } from "./components/Projects";
import { Stats } from "./components/Stats";
import { BuildSystem } from "./components/BuildSystem";
import { WhoUses } from "./components/WhoUses";
import { WhereToBuy } from "./components/WhereToBuy";
import { WhyNucleo } from "./components/WhyNucleo";
import { News } from "./components/News";
import { PartnerHero } from "./components/PartnerHero";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { MarcasPage } from "./components/MarcasPage";
import { SobreNosPage } from "./components/SobreNosPage";
import { SitemapPage } from "./components/SitemapPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { TermsPage } from "./components/TermsPage";
import { BioPage } from "./components/BioPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      {children}
      <Footer />
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
      <BrandStrip />
      <ProductShowcase />
      <About />
      <FeaturedProduct />
      <ScrollStories />
      <Projects />
      <Stats />
      <BuildSystem />
      <WhoUses />
      <WhereToBuy />
      <WhyNucleo />
      <News />
      <PartnerHero />
      <Contact />
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

  if (path === "/sobre-nos") {
    return (
      <Layout>
        <SobreNosPage />
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

  if (path === "/bio") {
    return <BioPage />;
  }

  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}
