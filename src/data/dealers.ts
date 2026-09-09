import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/utils";

export interface Dealer {
  name: string;
  city: string;
  contact: string;
  whatsapp: string;
}

const nucleo = (city: string, name = "Revendedor Nucleopro"): Dealer => ({
  name,
  city,
  contact: WHATSAPP_DISPLAY,
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Vim pelo site da Núcleo ProAudio e quero um revendedor em ${city}.`,
  )}`,
});

export const dealersByState: Record<string, Dealer> = {
  BRAC: nucleo("Rio Branco"),
  BRAL: nucleo("Maceió"),
  BRAM: nucleo("Manaus"),
  BRAP: nucleo("Macapá"),
  BRBA: nucleo("Salvador"),
  BRCE: nucleo("Fortaleza"),
  BRDF: nucleo("Brasília", "Núcleo ProAudio"),
  BRES: nucleo("Vitória"),
  BRGO: nucleo("Goiânia"),
  BRMA: nucleo("São Luís"),
  BRMG: nucleo("Belo Horizonte"),
  BRMS: nucleo("Campo Grande"),
  BRMT: nucleo("Cuiabá"),
  BRPA: nucleo("Belém"),
  BRPB: nucleo("João Pessoa"),
  BRPE: nucleo("Recife"),
  BRPI: nucleo("Teresina"),
  BRPR: nucleo("Curitiba"),
  BRRJ: nucleo("Rio de Janeiro"),
  BRRN: nucleo("Natal"),
  BRRO: nucleo("Porto Velho"),
  BRRR: nucleo("Boa Vista"),
  BRRS: nucleo("Porto Alegre"),
  BRSC: nucleo("Florianópolis"),
  BRSE: nucleo("Aracaju"),
  BRSP: nucleo("São Paulo", "Núcleo ProAudio"),
  BRTO: nucleo("Palmas"),
};
