export interface CommercialRepresentative {
  name: string;
  region: string;
  states: string[];
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

function representative(
  name: string,
  region: string,
  states: string[],
  phone: string,
  email: string,
): CommercialRepresentative {
  const firstName = name.split(" ")[0];
  return {
    name,
    region,
    states,
    phone: formatPhone(phone),
    email,
    whatsapp: `https://wa.me/${whatsappDigits(phone)}?text=${encodeURIComponent(
      `Olá, ${firstName}! Vim pelo site da Núcleo ProAudio e gostaria de falar sobre produtos da Mackie.`,
    )}`,
  };
}

export const commercialRepresentatives: CommercialRepresentative[] = [
  representative("Joiner Torrano", "RS e SC", ["RS", "SC"], "51 9692-0980", "joiner@torranorep.com.br"),
  representative("Rodrigo New Aba", "DF, TO e GO", ["DF", "TO", "GO"], "62 8223-0267", "newabarep@gmail.com"),
  representative("Felipe Maria", "Rio de Janeiro", ["RJ"], "21 99795-6323", "felipedemaria@gmail.com"),
  representative("Marcos Motta", "BA e SE", ["BA", "SE"], "71 8845-4765", "mota1996@terra.com.br"),
  representative("Ricardo Marinelli", "São Paulo — Interior", ["SP"], "16 98124-0597", "ricardomarinelli@icloud.com"),
  representative("Moacyr Aguiar", "Ceará", ["CE"], "85 9171-5055", "jmr.aguia@jmraguiar.com.br"),
  representative("Ronan", "Espírito Santo", ["ES"], "27 99316-5994", "ronanbruck@hotmail.com"),
  representative("Luiz Zen", "Paraná", ["PR"], "41 9981-6764", "luizfzen@aol.com"),
  representative("Dinho Mourão", "Minas Gerais", ["MG"], "31 8899-7387", "dinhomourao@gmail.com"),
  representative("André Angelo", "AL, PE, PB e RN", ["AL", "PE", "PB", "RN"], "81 9974-3835", "andreangelosofia@gmail.com"),
  representative("João Pedro", "São Paulo — DDD 11 - 12 - 13 Capital", ["SP"], "11 95196-2107", "jp_representacao@yahoo.com"),
  representative("Beto Teixeira", "AP e PA", ["AP", "PA"], "91 8319-7279", "betoteixeirajr@hotmail.com"),
  representative("Franklin", "MA e PI", ["MA", "PI"], "98 8402-9150", "ffrepresentacoes2010@gmail.com"),
  representative("Felipe Medeiros", "AC e RO", ["AC", "RO"], "69 9244-3360", "willian.felipe@migorepresentacoes.com"),
];

export const representativeStates = [
  ...new Set(commercialRepresentatives.flatMap((item) => item.states)),
].sort((a, b) => a.localeCompare(b, "pt-BR"));
