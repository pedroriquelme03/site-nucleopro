import { HeroSection } from "@/components/ui/hero-section-4";

export function PartnerHero() {
  return (
    <HeroSection
      id="parceiros"
      className="h-auto min-h-[520px] scroll-mt-20 sm:h-[70vh] sm:min-h-[560px]"
      title="Seja parceiro ou seja uma revenda"
      subtitle="Cadastre sua loja física ou online e venda Mackie com a Núcleo ProAudio."
      primaryButtonText="Quero ser parceiro"
      primaryButtonHref="/?tipo=parceiro#contato"
      secondaryButtonText="Ver marcas"
      secondaryButtonHref="/marcas"
      imageUrl="/intlscimageheader.jpg"
    />
  );
}
