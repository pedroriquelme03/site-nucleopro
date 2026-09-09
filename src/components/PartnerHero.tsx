import { HeroSection } from "@/components/ui/hero-section-4";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const partnerUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Sou lojista/integrador e gostaria de ser parceiro Nucleopro.",
)}`;

export function PartnerHero() {
  return (
    <HeroSection
      id="parceiros"
      className="h-[70vh] min-h-[560px] scroll-mt-20"
      title="É lojista ou integrador?"
      subtitle="Seja parceiro Nucleopro."
      primaryButtonText="Quero ser parceiro"
      primaryButtonHref={partnerUrl}
      secondaryButtonText="Ver marcas"
      secondaryButtonHref="/marcas"
      imageUrl="/intlscimageheader.jpg"
    />
  );
}
