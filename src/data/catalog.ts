// Catálogo Mackie — Núcleo ProAudio
// Fonte: catálogo oficial em PDF (nome, descrição e imagem por produto).
// Imagens extraídas do PDF em /public/produtos/<slug>.jpg

export type CatalogCategoryId =
  | "mixers-digitais"
  | "mixers-analogicos"
  | "caixas-ativas"
  | "portateis"
  | "monitores"
  | "controle"
  | "microfones"
  | "fones"
  | "amp-fone"
  | "direct-box";

export interface CatalogCategory {
  id: CatalogCategoryId;
  name: string;
  short: string;
}

export interface CatalogProduct {
  slug: string;
  name: string;
  category: CatalogCategoryId;
  tagline: string;
  description: string;
}

export const catalogCategories: CatalogCategory[] = [
  { id: "mixers-digitais", name: "Mixers de Áudio Digital", short: "Mixers Digitais" },
  { id: "mixers-analogicos", name: "Mixers de Áudio Analógico", short: "Mixers Analógicos" },
  { id: "caixas-ativas", name: "Caixas Ativas", short: "Caixas Ativas" },
  { id: "portateis", name: "Produtos Portáteis a Bateria", short: "Portáteis" },
  { id: "monitores", name: "Monitores de Estúdio", short: "Monitores" },
  { id: "controle", name: "Controle de Monitores & Interface", short: "Controle" },
  { id: "microfones", name: "Microfones", short: "Microfones" },
  { id: "fones", name: "Fones de Ouvido", short: "Fones" },
  { id: "amp-fone", name: "Amplificadores de Fone", short: "Amp. de Fone" },
  { id: "direct-box", name: "Direct Box", short: "Direct Box" },
];

export const catalogProducts: CatalogProduct[] = [
  // ---- Mixers digitais ----
  {
    slug: "dlz-creator",
    name: "DLZ Creator",
    category: "mixers-digitais",
    tagline: "Mixer digital para podcast, YouTube e streaming",
    description:
      "Três modos de uso (Fácil, Aprimorado e Pró) com inteligência integrada Mix Agent, Automix para até 4 microfones e Mix Minus via Bluetooth. EQ paramétrico de 3 bandas, gate, de-esser, compressor, reverb e delay. Interface USB-C 4×4, gravação em cartão SD e 4 saídas de fone independentes.",
  },
  {
    slug: "dl16se",
    name: "DL16SE",
    category: "mixers-digitais",
    tagline: "Mixer digital sem fio de 16 canais para rack",
    description:
      "16 entradas com pré-amplificadores Onyx+, controle pelo app Master Fader SE e interface USB 16×16. Design de caixa de palco com suportes para rack, processamento poderoso (EQ, filtros, compressão e efeitos) e controle por até 20 dispositivos iOS, Android, macOS e Windows.",
  },
  {
    slug: "dl32se",
    name: "DL32SE",
    category: "mixers-digitais",
    tagline: "Mixer digital de 32 canais para rack",
    description:
      "32 entradas com pré-amplificadores Onyx+, interface USB 16×16 e controle pelo app Master Fader SE. Design de caixa de palco com suportes para rack e processamento completo, controlável por até 20 dispositivos simultâneos.",
  },
  // ---- Mixers analógicos ----
  {
    slug: "mix5",
    name: "Mix5",
    category: "mixers-analogicos",
    tagline: "Mixer compacto de 5 canais",
    description:
      "Ideal para gravações caseiras, transmissões ao vivo e podcasts. 1 entrada de microfone/linha e 2 entradas de linha estéreo, qualidade de som profissional, equalizador de 2 bandas e phantom power. Robusto e portátil.",
  },
  {
    slug: "mix8",
    name: "Mix8",
    category: "mixers-analogicos",
    tagline: "Mixer compacto de 8 canais",
    description:
      "Duas entradas de microfone com pré-amplificadores de qualidade de estúdio, EQ de 3 bandas por canal, entrada/saída RCA para gravação, duas entradas de linha estéreo, phantom power e envio/retorno auxiliar.",
  },
  {
    slug: "mix12fx",
    name: "Mix12FX",
    category: "mixers-analogicos",
    tagline: "Mixer compacto de 12 canais com efeitos",
    description:
      "Desempenho high-headroom e baixo ruído com 12 efeitos integrados (reverbs, chorus e delays). 4 entradas mic/linha com filtro passa-alta, 4 canais de linha estéreo, EQ de 3 bandas e phantom power.",
  },
  {
    slug: "profx10v3",
    name: "ProFX10v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 10 canais",
    description:
      "Qualidade de estúdio para gravações, streamings e conteúdo. Gravação em alta resolução via USB, pré-amplificadores Onyx premiados, efeitos com predefinições personalizáveis, phantom power de 48V e saída de fone com volume independente.",
  },
  {
    slug: "profx12v3",
    name: "ProFX12v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 12 canais",
    description:
      "Novo nível de desempenho com qualidade de estúdio para gravações e streamings. Gravação em alta resolução via USB, pré-amplificadores Onyx, efeitos com predefinições personalizáveis, phantom power de 48V e design robusto.",
  },
  {
    slug: "profx22v3",
    name: "ProFX22v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 22 canais",
    description:
      "Desempenho e versatilidade de última geração, de gravações à sonorização ao vivo. Poderoso mecanismo de efeitos, software Waveform OEM, gravação em alta resolução via USB, pré-amplificadores Onyx e saída dedicada para sala de controle.",
  },
  {
    slug: "profx10go",
    name: "ProFX10 GO",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 10 canais com bateria",
    description:
      "Até 8 horas de mixagem e gravação com uma única carga (bateria GB-10 incluída). Bluetooth dedicado, efeitos GigFX+ de alta resolução, interface USB-C 2×4 de 24 bits/192 kHz e 4 pré-amplificadores Onyx com ganho de até 60 dB.",
  },
  {
    slug: "onyx8",
    name: "Onyx8",
    category: "mixers-analogicos",
    tagline: "Mixer USB analógico premium de 8 canais",
    description:
      "Som clássico e performance moderna com pré-amplificadores Onyx e equalizadores Perkins. Gravação multipista via USB ou cartão SD até 24 bits/96 kHz, efeitos personalizáveis, comando Studio com LCD colorido, Bluetooth e alças QuickGrip.",
  },
  // ---- Caixas ativas ----
  {
    slug: "thrash212",
    name: "Thrash212",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 12\" · 1300W",
    description:
      "Amplificador Classe D ultraeficiente de 1300W e driver de compressão de titânio de 1\". Entradas duplas XLR/TRS e saída mix out, woofer de 12\", 4 alças e limitador térmico. RF: 52 Hz – 20 kHz, SPL máximo 125 dB.",
  },
  {
    slug: "thrash215",
    name: "Thrash215",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 15\" · 1300W",
    description:
      "Amplificador Classe D ultraeficiente de 1300W e driver de compressão de titânio de 1\". Entradas duplas XLR/TRS e saída mix out, woofer de 15\", 4 alças e limitador térmico. RF: 38 Hz – 20 kHz, SPL máximo 126 dB.",
  },
  {
    slug: "thump212",
    name: "Thump212",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 12\" · 1400W",
    description:
      "Leve e compacta, com eliminador de feedback integrado e modo de redução de volume (music ducking). Entradas duplas TRS/XLR e auxiliar estéreo de 3,5 mm, woofer de 12\" e driver de 1\". RF: 47 Hz – 23 kHz, SPL máximo 128 dB.",
  },
  {
    slug: "thump215",
    name: "Thump215",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 15\" · 1400W",
    description:
      "A escolha de inúmeros DJs pelo mundo: som comprovado, graves potentes e confiabilidade. Amplificador Classe D de 1400W, woofer de 15\" e driver de 1\", eliminador de feedback e music ducking. RF: 40 Hz – 23 kHz, SPL máximo 129 dB.",
  },
  {
    slug: "thump210xt",
    name: "Thump210XT",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 10\" · 1400W",
    description:
      "Compacta e ideal para sistemas portáteis, DJs e bares. Entradas XLR/TRS, auxiliar de 3,5 mm ou Bluetooth, woofer de 10\" e driver de 1\", com eliminador de feedback e music ducking. RF: 52 Hz – 23 kHz, SPL máximo 127 dB.",
  },
  {
    slug: "thump212xt",
    name: "Thump212XT",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 12\" · 1400W · sem fio",
    description:
      "Controle sem fio pelo celular com modos de EQ específicos por aplicação (interno/externo). Amplificador Classe D de 1400W construído como um tanque, woofer de 12\" e driver de 1\". RF: 47 Hz – 23 kHz, SPL máximo 128 dB.",
  },
  {
    slug: "thump215xt",
    name: "Thump215XT",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 15\" · 1400W · sem fio",
    description:
      "Controle e transmissão sem fio com modos de EQ para ambientes internos e externos. Amplificador Classe D de 1400W, woofer de 15\" e driver de 1\", eliminador de feedback e music ducking. RF: 40 Hz – 23 kHz, SPL máximo 129 dB.",
  },
  {
    slug: "thump115s",
    name: "Thump115S",
    category: "caixas-ativas",
    tagline: "Subwoofer ativo de 15\" · 1400W",
    description:
      "Modos de EQ selecionáveis e crossover variável. Entradas estéreo, saídas high-pass e full-range para flexibilidade, alças integradas. Amplificador Classe D de 1400W. RF: 36 Hz – 200 Hz, SPL máximo 131 dB.",
  },
  {
    slug: "thump118s",
    name: "Thump118S",
    category: "caixas-ativas",
    tagline: "Subwoofer ativo de 18\" · 1400W",
    description:
      "Modos de EQ selecionáveis e crossover variável. Entradas estéreo, saídas high-pass e full-range, alças integradas. Amplificador Classe D de 1400W. RF: 30 Hz – 200 Hz, SPL máximo 132 dB.",
  },
  {
    slug: "srm-flex",
    name: "SRM-Flex",
    category: "caixas-ativas",
    tagline: "Sistema de PA portátil ultracompacto · 1300W",
    description:
      "Coluna de alto-falantes de ampla dispersão com 1300W e mixer digital de 6 canais integrado, controlável por botões físicos ou pelo app SRM-Flex Connect. Reprodução via Bluetooth, bolsa de transporte e capa protetora inclusas.",
  },
  // ---- Portáteis a bateria ----
  {
    slug: "thrash212go",
    name: "Thrash212 GO",
    category: "portateis",
    tagline: "Alto-falante de 12\" a bateria · 300W",
    description:
      "Solução perfeita para situações sem acesso à rede elétrica: até 12 horas com bateria recarregável e substituível incluída. Amplificador Classe D de 300W, Bluetooth, woofer de 12\" e driver de titânio de 1\". RF: 52 Hz – 20 kHz.",
  },
  {
    slug: "thumpgo",
    name: "Thump GO",
    category: "portateis",
    tagline: "Alto-falante a bateria · 200W",
    description:
      "Som ao vivo profissional para shows e eventos, com bateria removível de íon-lítio para até 12 horas. Amplificador Classe D de 200W, woofer de 8\" e driver de 1\", transmissão via Bluetooth. Compatível com ThumpSub GO.",
  },
  {
    slug: "thumpsupgo",
    name: "ThumpSub GO",
    category: "portateis",
    tagline: "Subwoofer portátil a bateria · 400W",
    description:
      "Dois compartimentos de bateria para até 12 horas de graves contínuos. Ideal para estender a baixa frequência do ShowBox ou de qualquer caixa portátil. Dois drivers de 8\", amplificador Classe D de 400W, entradas XLR/TRS e Bluetooth.",
  },
  {
    slug: "showbox",
    name: "ShowBox",
    category: "portateis",
    tagline: "Sistema de som a bateria all-in-one",
    description:
      "PA portátil, amplificador para violão, mesa de 6 canais, rack de efeitos e interface USB-C em um só aparelho. Eliminador de feedback, modos de voz interno/externo, gravação em micro SD, 2 entradas XLR e Bluetooth.",
  },
  // ---- Controle & interface ----
  {
    slug: "big-knob-passive",
    name: "Big Knob Passive",
    category: "controle",
    tagline: "Controlador de monitor passivo 2×2",
    description:
      "Comutação de entrada e monitor 2×2 com a qualidade Mackie. Três botões para mudo, mono e dim oferecem controle essencial e rápido. Passivo, não requer alimentação, extremamente robusto para estúdios e streamers.",
  },
  // ---- Monitores de estúdio ----
  {
    slug: "cr3-5",
    name: "CR3.5",
    category: "monitores",
    tagline: "Monitores de estúdio ativos de 3,5\"",
    description:
      "Para mixar podcast, ouvir música e animar a casa com o mesmo par de caixas. Controle de tom, 50 W RMS bi-amplificados Classe A/B, entradas TRS, RCA e 3,5 mm, saída de fone e tweeter de seda com grade. 206 × 140 × 180 mm.",
  },
  {
    slug: "cr3-5bt",
    name: "CR3.5BT",
    category: "monitores",
    tagline: "Monitores de estúdio de 3,5\" com Bluetooth",
    description:
      "Mesma versatilidade da linha CR3.5 com conectividade Bluetooth. Controle de tom, 50 W RMS bi-amplificados Classe A/B, entradas TRS/RCA/3,5 mm, saída de fone e tweeter de seda com grade de proteção.",
  },
  {
    slug: "cr4-5",
    name: "CR4.5",
    category: "monitores",
    tagline: "Monitores de estúdio ativos de 4,5\"",
    description:
      "Referência criativa para produção em casa. Controle de tom, 50 W RMS bi-amplificados Classe A/B, entradas TRS, RCA e 3,5 mm, saída de fone e woofer trançado de 4,5\". 226 × 155 × 211 mm.",
  },
  {
    slug: "cr4-5bt",
    name: "CR4.5BT",
    category: "monitores",
    tagline: "Monitores de estúdio de 4,5\" com Bluetooth",
    description:
      "Linha CR4.5 com Bluetooth integrado. Controle de tom, 50 W RMS bi-amplificados Classe A/B, entradas TRS/RCA/3,5 mm, saída de fone e tweeter de seda com grade de proteção. 226 × 155 × 211 mm.",
  },
  {
    slug: "cr5bt",
    name: "CR5BT",
    category: "monitores",
    tagline: "Monitores de estúdio de 5,25\" com Bluetooth",
    description:
      "Controle de tom e Bluetooth com 100 W RMS bi-amplificados Classe D. Entradas TRS, RCA e 3,5 mm, saída de fone, tweeter de seda com grade e woofer trançado de 5,25\". 262 × 175 × 236 mm.",
  },
  {
    slug: "mrs10",
    name: "MRS10",
    category: "monitores",
    tagline: "Subwoofer de estúdio ativo de 10\"",
    description:
      "120 W de graves puros para mixagens com impacto. Woofer de 10\" em fibra de vidro e aramida, amplificação Classe D, conexões estéreo XLR e TRS, crossover ajustável de 40 Hz a 180 Hz e interruptor de polaridade.",
  },
  {
    slug: "mr524",
    name: "MR524",
    category: "monitores",
    tagline: "Monitor de estúdio ativo de 5\"",
    description:
      "Reprodução clara em todo o espectro para mixagens profissionais em casa. Tweeter de seda de 1\" e woofer de polipropileno de 5\", 50 W bi-amplificados Classe A/B e filtros acústicos espaciais ajustáveis. RF: 45 Hz – 20 kHz.",
  },
  // ---- Microfones ----
  {
    slug: "em-89d",
    name: "EM-89D",
    category: "microfones",
    tagline: "Microfone dinâmico cardioide para vocais",
    description:
      "Confiabilidade e qualidade de som sem preço exorbitante. Design portátil ideal para vocalistas e construção robusta para diversos instrumentos. Padrão cardioide. Acompanha clipe, cabo XLR e bolsa com zíper.",
  },
  {
    slug: "em-91c",
    name: "EM-91C",
    category: "microfones",
    tagline: "Microfone condensador de diafragma grande",
    description:
      "Reprodução sonora impecável para adicionar calor e brilho a vocais, capturar cordas ou dar ambiência às gravações. Padrão cardioide, rejeição de ruídos periféricos. Acompanha suporte anti-choque e cabo XLR.",
  },
  // ---- Fones ----
  {
    slug: "mc-100",
    name: "MC-100",
    category: "fones",
    tagline: "Fones de estúdio de alto desempenho",
    description:
      "Drivers customizados com assinatura sonora equilibrada, faixa de cabeça acolchoada e almofadas ergonômicas. RF: 15 Hz – 20 kHz, impedância 32 Ω, transdutor de 40 mm, cabo de 3 m. Acompanha adaptador de 1/4\".",
  },
  {
    slug: "mc-250",
    name: "MC-250",
    category: "fones",
    tagline: "Fones fechados de alta fidelidade",
    description:
      "Grande salto em clareza e precisão com driver de 50 mm de qualidade de estúdio. Faixa de cabeça ergonômica e almofadas extra macias. RF: 10 Hz – 20 kHz, impedância 38 Ω. Cabo destacável de 3 m, adaptador de 1/4\" e bolsa inclusos.",
  },
  {
    slug: "mc-350",
    name: "MC-350",
    category: "fones",
    tagline: "Fones profissionais fechados",
    description:
      "Clareza vocal e agudos presentes, porém não estridentes. Design fechado com drivers de 50 mm para ótimo isolamento e áudio sem distorção. RF: 20 Hz – 20 kHz, impedância 32 Ω. Acompanha adaptador de 1/4\" e capa protetora premium.",
  },
  // ---- Amplificadores de fone ----
  {
    slug: "hm-4",
    name: "HM-4",
    category: "amp-fone",
    tagline: "Amplificador de fone de 4 canais",
    description:
      "Divide um único sinal estéreo para até 4 pares de fones com controle individual de nível, mantendo a integridade do sinal. Perfeito para estúdios, salas de ensaio e palcos silenciosos. Alimentado por adaptador CA de 12V incluído.",
  },
  {
    slug: "hm-400",
    name: "HM-400",
    category: "amp-fone",
    tagline: "Amplificador de fone de 4 canais · rack 1U",
    description:
      "Versatilidade e qualidade em apenas 1U de rack. Entrada principal com controle de nível, saídas estéreo, entradas auxiliares e EQ por canal, com 12 saídas para fones (3 por canal). Ideal para estúdios e igrejas.",
  },
  {
    slug: "hm-800",
    name: "HM-800",
    category: "amp-fone",
    tagline: "Amplificador de fone de 8 canais · rack 1U",
    description:
      "Até 10 mixagens disponíveis com 16 saídas para fones. Duas entradas principais discretas com controle de nível, saídas estéreo e entradas auxiliares por canal. Perfeito para estúdios, igrejas e salas de ensaio.",
  },
  // ---- Direct box ----
  {
    slug: "mdb2p",
    name: "MDB2P",
    category: "direct-box",
    tagline: "Direct box passivo estéreo",
    description:
      "De guitarras acústicas a laptops, o melhor som para fontes estéreo como teclados e sintetizadores. Duas entradas de alta impedância de 1/4\" com saídas thru e atenuadores de -15 dB, além de duas saídas XLR de baixa impedância com aterramento.",
  },
];
