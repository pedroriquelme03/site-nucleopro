import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/utils";

export interface Representative {
  name: string;
  region: string;
  phone: string;
  email: string;
  whatsapp: string;
}

function whatsappDigits(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && /[6-9]/.test(digits[2] ?? "")) {
    digits = `${digits.slice(0, 2)}9${digits.slice(2)}`;
  }
  return `55${digits}`;
}

function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && /[6-9]/.test(digits[2] ?? "")) {
    digits = `${digits.slice(0, 2)}9${digits.slice(2)}`;
  }
  return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

function representative(name: string, region: string, phone: string, email: string): Representative {
  const firstName = name.split(" ")[0];
  return {
    name,
    region,
    phone: formatPhone(phone),
    email,
    whatsapp: `https://wa.me/${whatsappDigits(phone)}?text=${encodeURIComponent(
      `Olá, ${firstName}! Vim pelo site da Núcleo ProAudio e gostaria de falar sobre representação comercial.`,
    )}`,
  };
}

const joiner = representative("Joiner Torrano", "RS e SC", "51 9692-0980", "joiner@torranorep.com.br");
const rodrigo = representative("Rodrigo New Aba", "DF, TO e GO", "62 8223-0267", "newabarep@gmail.com");
const felipeMaria = representative("Felipe Maria", "Rio de Janeiro", "21 99795-6323", "felipedemaria@gmail.com");
const marcos = representative("Marcos Motta", "BA e SE", "71 8845-4765", "mota1996@terra.com.br");
const ricardo = representative("Ricardo Marinelli", "São Paulo — Interior", "16 98124-0597", "ricardomarinelli@icloud.com");
const moacyr = representative("Moacyr Aguiar", "Ceará", "85 9171-5055", "jmr.aguia@jmraguiar.com.br");
const ronan = representative("Ronan", "Espírito Santo", "27 99316-5994", "ronanbruck@hotmail.com");
const luiz = representative("Luiz Zen", "Paraná", "41 9981-6764", "luizfzen@aol.com");
const dinho = representative("Dinho Mourão", "Minas Gerais", "31 8899-7387", "dinhomourao@gmail.com");
const andre = representative("André Angelo", "AL, PE, PB e RN", "81 9974-3835", "andreangelosofia@gmail.com");
const joaoPedro = representative("João Pedro", "São Paulo — Capital", "11 95196-2107", "jp_representacao@yahoo.com");
const beto = representative("Beto Teixeira", "AP e PA", "91 8319-7279", "betoteixeirajr@hotmail.com");
const franklin = representative("Franklin", "MA e PI", "98 8402-9150", "ffrepresentacoes2010@gmail.com");
const felipeMedeiros = representative("Felipe Medeiros", "AC e RO", "69 9244-3360", "willian.felipe@migorepresentacoes.com");

const nucleo: Representative = {
  name: "Núcleo ProAudio",
  region: "Atendimento nacional",
  phone: WHATSAPP_DISPLAY,
  email: "contato@nucleoproaudio.com.br",
  whatsapp: WHATSAPP_URL,
};

export const dealersByState: Record<string, Representative[]> = {
  BRAC: [felipeMedeiros],
  BRAL: [andre],
  BRAM: [nucleo],
  BRAP: [beto],
  BRBA: [marcos],
  BRCE: [moacyr],
  BRDF: [rodrigo],
  BRES: [ronan],
  BRGO: [rodrigo],
  BRMA: [franklin],
  BRMG: [dinho],
  BRMS: [nucleo],
  BRMT: [nucleo],
  BRPA: [beto],
  BRPB: [andre],
  BRPE: [andre],
  BRPI: [franklin],
  BRPR: [luiz],
  BRRJ: [felipeMaria],
  BRRN: [andre],
  BRRO: [felipeMedeiros],
  BRRR: [nucleo],
  BRRS: [joiner],
  BRSC: [joiner],
  BRSE: [marcos],
  BRSP: [joaoPedro, ricardo],
  BRTO: [rodrigo],
};
