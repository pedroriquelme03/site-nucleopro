import { useCallback, useEffect, useState } from "react";
import { HeroSection } from "@/components/ui/hero-section-4";
import { PartnerFormModal } from "@/components/PartnerFormModal";

function shouldOpenPartnerForm() {
  const params = new URLSearchParams(window.location.search);
  return params.get("tipo") === "parceiro" || window.location.hash === "#contato";
}

export function PartnerHero() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  useEffect(() => {
    if (shouldOpenPartnerForm()) openForm();
  }, [openForm]);

  return (
    <>
      <HeroSection
        id="parceiros"
        className="h-auto min-h-[520px] scroll-mt-20 sm:h-[70vh] sm:min-h-[560px]"
        title="Seja parceiro ou seja uma revenda"
        subtitle="Cadastre sua loja física ou online e venda Mackie com a Núcleo ProAudio."
        primaryButtonText="Quero ser parceiro"
        onPrimaryClick={openForm}
        secondaryButtonText="Ver marcas"
        secondaryButtonHref="/marcas"
        imageUrl="/intlscimageheader.jpg"
      />
      <PartnerFormModal open={formOpen} onClose={closeForm} />
    </>
  );
}
