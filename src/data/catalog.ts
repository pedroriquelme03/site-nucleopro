// Catálogo Mackie — Núcleo ProAudio
// Fonte: catálogo oficial em PDF (nome, descrição e imagem por produto).
// Imagens oficiais Mackie (brandfolder) em /public/produtos/<slug>.webp

export type CatalogCategoryId =
  | "caixas-ativas"
  | "line-array-vertical"
  | "line-array"
  | "portateis"
  | "monitores"
  | "controle"
  | "mixers-analogicos"
  | "mixers-digitais"
  | "amp-fone"
  | "fones"
  | "microfones"
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
  { id: "caixas-ativas", name: "Caixas de Som Ativas", short: "Caixas Ativas" },
  { id: "line-array-vertical", name: "Line Array Vertical", short: "Line Array Vertical" },
  { id: "line-array", name: "Line Array", short: "Line Array" },
  { id: "portateis", name: "Produtos Portáteis a Bateria", short: "Portáteis" },
  { id: "monitores", name: "Monitores de Referência", short: "Monitores" },
  { id: "controle", name: "Interfaces de Áudio", short: "Interfaces" },
  { id: "mixers-analogicos", name: "Consoles de Áudio Analógico", short: "Consoles Analógicos" },
  { id: "mixers-digitais", name: "Consoles de Áudio Digital", short: "Consoles Digitais" },
  { id: "amp-fone", name: "Amplificadores de Fone", short: "Amp. de Fone" },
  { id: "fones", name: "Fones de Ouvido", short: "Fones" },
  { id: "microfones", name: "Microfones", short: "Microfones" },
  { id: "direct-box", name: "Ferramentas de Áudio", short: "Ferramentas" },
];

export const catalogProducts: CatalogProduct[] = [
  // ---- Caixas de som ativas ----
  {
    slug: "thump12v4",
    name: "Thump12v4",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 12\" · 1400W · SoundCheck DSP",
    description:
      "A Thump mais potente, grave e clara já feita. Amplificador Classe D de 1400W, woofer de 12\" e driver de compressão de 1\", com SoundCheck DSP: modos de voz Flat, DJ, Live e Wedge, Outdoor Mode, Music Ducking e eliminador de feedback. Mixer integrado para microfone e linha, Bluetooth para streaming e link entre caixas e controle pelo app Thump Connect 2. RF: 39 Hz – 20 kHz, SPL máximo 129 dB.",
  },
  {
    slug: "thump15v4",
    name: "Thump15v4",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 15\" · 1400W · SoundCheck DSP",
    description:
      "Impacto de sobra para DJs e bandas. Amplificador Classe D de 1400W, woofer de 15\" e driver de compressão de 1\", com SoundCheck DSP: modos de voz Flat, DJ, Live e Wedge, Outdoor Mode, Music Ducking e eliminador de feedback. Mixer integrado, Bluetooth para streaming e link entre caixas, app Thump Connect 2, alças de metal e pontos de fly M10. RF: 34 Hz – 20 kHz, SPL máximo 130 dB.",
  },
  {
    slug: "thump15sv4",
    name: "Thump15Sv4",
    category: "caixas-ativas",
    tagline: "Subwoofer ativo de 15\" · 1400W",
    description:
      "Graves profundos para completar o sistema Thump. Amplificador Classe D ultraeficiente de 1400W e woofer de 15\" de alto desempenho, com modos de passa-alta para casar com as suas caixas. Entradas XLR estéreo, saídas XLR high-pass e full-range (com botão mono para encadear mais subs), inversão de fase e rosca M20 para haste. RF: 29 Hz – 160 Hz, SPL máximo 132 dB.",
  },
  {
    slug: "thump18sv4",
    name: "Thump18Sv4",
    category: "caixas-ativas",
    tagline: "Subwoofer ativo de 18\" · 1400W",
    description:
      "O grave mais profundo da linha Thump. Amplificador Classe D ultraeficiente de 1400W e woofer de 18\" de alto desempenho, com modos de passa-alta para casar com as suas caixas. Entradas XLR estéreo, saídas XLR high-pass e full-range (com botão mono para encadear mais subs), inversão de fase e rosca M20 para haste. RF: 28 Hz – 160 Hz, SPL máximo 132 dB.",
  },
  {
    slug: "thrash12v2",
    name: "Thrash12v2",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 12\" · 1300W · Bluetooth",
    description:
      "Segunda geração da linha Thrash: a potência e a robustez Mackie agora com Bluetooth. Amplificador Classe D de 1300W e woofer de 12\", para uso em pedestal, como monitor de palco ou sobre subwoofer. RF: 45 Hz – 18 kHz, SPL máximo 129 dB.",
  },
  {
    slug: "thrash15v2",
    name: "Thrash15v2",
    category: "caixas-ativas",
    tagline: "Caixa ativa de 15\" · 1300W · Bluetooth",
    description:
      "Segunda geração da linha Thrash: a potência e a robustez Mackie agora com Bluetooth. Amplificador Classe D de 1300W e woofer de 15\", para uso em pedestal, como monitor de palco ou sobre subwoofer. RF: 40 Hz – 18 kHz, SPL máximo 129 dB.",
  },
  {
    slug: "srm212v",
    name: "SRM212 V-Class",
    category: "caixas-ativas",
    tagline: "Caixa ativa de alto desempenho de 12\" · 2000W",
    description:
      "Um novo patamar na linha SRM. Amplificador Classe D de 2000W, DSP Advanced Impulse e Intelligent Bass Management, corneta Sym-X com driver de compressão de polímero de 1,4\" e woofer de 12\" de alta saída. Mixer digital de 4 canais com display colorido, Bluetooth e controle sem fio pelo app SRM Connect. RF: 42 Hz – 20 kHz, SPL máximo 135 dB.",
  },
  {
    slug: "srm215v",
    name: "SRM215 V-Class",
    category: "caixas-ativas",
    tagline: "Caixa ativa de alto desempenho de 15\" · 2000W",
    description:
      "O topo da linha SRM portátil. Amplificador Classe D de 2000W, DSP Advanced Impulse e Intelligent Bass Management, corneta Sym-X com driver de compressão de polímero de 1,4\" e woofer de 15\" de alta saída. Mixer digital de 4 canais com display colorido, Bluetooth e controle sem fio pelo app SRM Connect. RF: 40 Hz – 20 kHz, SPL máximo 136 dB.",
  },
  // ---- Line array vertical ----
  {
    slug: "srm-flex",
    name: "SRM-Flex",
    category: "line-array-vertical",
    tagline: "Sistema de PA portátil ultracompacto · 1300W",
    description:
      "Coluna de alto-falantes de ampla dispersão com 1300W e mixer digital de 6 canais integrado, controlável por botões físicos ou pelo app SRM-Flex Connect. Reprodução via Bluetooth, bolsa de transporte e capa protetora inclusas.",
  },
  // ---- Line array ----
  {
    slug: "drm12a",
    name: "DRM12A",
    category: "line-array",
    tagline: "Line array ativo de 12\" · 2000W",
    description:
      "Módulo de line array ativo e arranjável para casas de show, igrejas e locação. Amplificador Classe D de 2000W com correção de fator de potência, DSP Advanced Impulse com filtros FIR, woofer de 12\" de alta excursão e três drivers de compressão de titânio de 1\". Painel DRM Control Dashboard com display colorido, presets de array, EQ paramétrico de 3 bandas e delay de alinhamento. Gabinete de compensado de 15 mm com ferragens de fly integradas. RF: 50 Hz – 20 kHz, SPL máximo 135 dB.",
  },
  {
    slug: "drm18s",
    name: "DRM18S",
    category: "line-array",
    tagline: "Subwoofer ativo de 18\" · 2000W",
    description:
      "O subwoofer da linha DRM: empilhável, suspenso junto ao array ou com haste para caixas. Amplificador Classe D de 2000W com correção de fator de potência, DSP Advanced Impulse, woofer de 18\" de alta excursão e gabinete de compensado de 18 mm. DRM Control Dashboard com crossover variável, modo cardioide, inversão de polaridade, delay de alinhamento e 6 presets de usuário.",
  },
  // ---- Portáteis a bateria ----
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
    slug: "thrash212go",
    name: "Thrash212 GO",
    category: "portateis",
    tagline: "Alto-falante de 12\" a bateria · 300W",
    description:
      "Solução perfeita para situações sem acesso à rede elétrica: até 12 horas com bateria recarregável e substituível incluída. Amplificador Classe D de 300W, Bluetooth, woofer de 12\" e driver de titânio de 1\". RF: 52 Hz – 20 kHz.",
  },
  {
    slug: "showbox",
    name: "ShowBox",
    category: "portateis",
    tagline: "Sistema de som a bateria all-in-one",
    description:
      "PA portátil, amplificador para violão, mesa de 6 canais, rack de efeitos e interface USB-C em um só aparelho. Eliminador de feedback, modos de voz interno/externo, gravação em micro SD, 2 entradas XLR e Bluetooth.",
  },
  {
    slug: "profx10go",
    name: "ProFX10 GO",
    category: "portateis",
    tagline: "Mixer profissional de 10 canais com bateria",
    description:
      "Até 8 horas de mixagem e gravação com uma única carga (bateria GB-10 incluída). Bluetooth dedicado, efeitos GigFX+ de alta resolução, interface USB-C 2×4 de 24 bits/192 kHz e 4 pré-amplificadores Onyx com ganho de até 60 dB.",
  },
  // ---- Monitores de referência ----
  {
    slug: "cr3-5",
    name: "CR3.5",
    category: "monitores",
    tagline: "Monitores de estúdio ativos de 3,5\"",
    description:
      "Para mixar podcast, ouvir música e animar a casa com o mesmo par de caixas. Controle de tom, 50 W RMS bi-amplificados Classe A/B, entradas TRS, RCA e 3,5 mm, saída de fone e tweeter de seda com grade. 206 × 140 × 180 mm.",
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
    slug: "cr8bt",
    name: "CR8BT",
    category: "monitores",
    tagline: "Monitores de estúdio de 8\" com Bluetooth",
    description:
      "O maior par da linha CR de terceira geração, para produzir, mixar e ouvir música com graves de verdade. Woofer de 8\", tweeter de domo de seda com grade de proteção, controle de tom e Bluetooth para streaming direto do celular.",
  },
  {
    slug: "mr524",
    name: "Mr524",
    category: "monitores",
    tagline: "Monitor de estúdio ativo de 5\"",
    description:
      "Reprodução clara em todo o espectro para mixagens profissionais em casa. Tweeter de seda de 1\" e woofer de polipropileno de 5\", 50 W bi-amplificados Classe A/B e filtros acústicos espaciais ajustáveis. RF: 45 Hz – 20 kHz.",
  },
  {
    slug: "mrs10",
    name: "MRS10",
    category: "monitores",
    tagline: "Subwoofer de estúdio ativo de 10\"",
    description:
      "120 W de graves puros para mixagens com impacto. Woofer de 10\" em fibra de vidro e aramida, amplificação Classe D, conexões estéreo XLR e TRS, crossover ajustável de 40 Hz a 180 Hz e interruptor de polaridade.",
  },
  // ---- Interfaces de áudio ----
  {
    slug: "big-knob-passive",
    name: "Big Knob Passive",
    category: "controle",
    tagline: "Controlador de monitor passivo 2×2",
    description:
      "Comutação de entrada e monitor 2×2 com a qualidade Mackie. Três botões para mudo, mono e dim oferecem controle essencial e rápido. Passivo, não requer alimentação, extremamente robusto para estúdios e streamers.",
  },
  {
    slug: "big-knob-studio",
    name: "Big Knob Studio",
    category: "controle",
    tagline: "Controlador de monitor e interface USB 2×2",
    description:
      "Seleção profissional entre 3 fontes e 2 pares de monitores com o clássico botão Big Knob. Interface USB 2×2 de 24 bits/192 kHz com dois pré-amplificadores Onyx e phantom power, funções mono, mute e dim, ajuste independente em todas as fontes e saídas, duas saídas de fone com volume próprio, microfone de talkback embutido e medidor de 16 segmentos.",
  },
  {
    slug: "big-knob-studio-plus",
    name: "Big Knob Studio+",
    category: "controle",
    tagline: "Controlador de monitor e interface USB 2×4",
    description:
      "Seleção profissional entre 4 fontes e 3 pares de monitores com o clássico botão Big Knob. Interface USB 2×4 de 24 bits/192 kHz com dois pré-amplificadores Onyx e phantom power, funções mono, mute e dim, duas saídas de fone com volume e fonte independentes, talkback com entrada para microfone externo e pedal, e saída de estúdio amplificada para sistemas de distribuição de fones.",
  },
  // ---- Consoles analógicos ----
  {
    slug: "profx6v3",
    name: "ProFX6v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 6 canais",
    description:
      "O ProFXv3 mais compacto, para gravação em casa, streaming e pequenos eventos. 2 pré-amplificadores Onyx com até 60 dB de ganho, 24 efeitos GigFX, gravação em alta resolução via USB (24 bits/192 kHz), chaves Hi-Z para instrumentos, filtro de 100 Hz e phantom power de 48V.",
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
    slug: "profx16v3",
    name: "ProFX16v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 16 canais",
    description:
      "Qualidade de estúdio para bandas, igrejas e eventos. Pré-amplificadores Onyx com até 60 dB de ganho, compressão de um botão, EQ de 3 bandas, 24 efeitos GigFX e gravação em alta resolução via USB (24 bits/192 kHz), com phantom power de 48V e construção robusta.",
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
    slug: "profx30v3",
    name: "ProFX30v3",
    category: "mixers-analogicos",
    tagline: "Mixer profissional de 30 canais",
    description:
      "O maior mixer da linha ProFXv3, para sonorização ao vivo com muitos canais. Pré-amplificadores Onyx com até 60 dB de ganho, compressão de um botão, EQ de 3 bandas, subgrupos, 24 efeitos GigFX e gravação em alta resolução via USB (24 bits/192 kHz).",
  },
  {
    slug: "onyx12",
    name: "Onyx12",
    category: "mixers-analogicos",
    tagline: "Mixer analógico premium de 12 canais com USB multipista",
    description:
      "Som clássico e performance moderna: pré-amplificadores Onyx com até 60 dB de ganho e EQ Perkins de 3 bandas em todos os canais. Gravação multipista via USB em 24 bits/96 kHz, gravação e reprodução estéreo em cartão SD, efeitos integrados controlados pelo Studio Command com display colorido e streaming via Bluetooth.",
  },
  {
    slug: "onyx16",
    name: "Onyx16",
    category: "mixers-analogicos",
    tagline: "Mixer analógico premium de 16 canais com USB multipista",
    description:
      "Som clássico e performance moderna: pré-amplificadores Onyx com até 60 dB de ganho e EQ Perkins de 3 bandas em todos os canais. Gravação multipista via USB em 24 bits/96 kHz, gravação e reprodução estéreo em cartão SD, efeitos integrados controlados pelo Studio Command com display colorido e streaming via Bluetooth.",
  },
  {
    slug: "onyx24",
    name: "Onyx24",
    category: "mixers-analogicos",
    tagline: "Mixer analógico premium de 24 canais com USB multipista",
    description:
      "O maior mixer da linha Onyx: pré-amplificadores Onyx com até 60 dB de ganho e EQ Perkins de 3 bandas em todos os canais. Gravação multipista via USB em 24 bits/96 kHz, gravação e reprodução estéreo em cartão SD, efeitos integrados controlados pelo Studio Command com display colorido e streaming via Bluetooth.",
  },
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
  // ---- Consoles digitais ----
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
  {
    slug: "master-fader-5se",
    name: "Master Fader 5 SE",
    category: "mixers-digitais",
    tagline: "App de controle dos mixers DL16SE e DL32SE",
    description:
      "O aplicativo que comanda os mixers digitais DL16SE e DL32SE em iOS, Android, macOS e Windows. Mixe de qualquer lugar do ambiente, com até 20 dispositivos conectados ao mesmo tempo e limitação de acesso por usuário. EQ paramétrico de 4 bandas, EQ gráfico de 31 bandas, compressor/limiter, delay de alinhamento, RTA/espectrógrafo e 4 processadores de efeitos.",
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
  {
    slug: "em-99b",
    name: "EM-99B",
    category: "microfones",
    tagline: "Microfone dinâmico de broadcast",
    description:
      "Voz de rádio para podcast, live e gravação de locução. Cápsula dinâmica cardioide de alta sensibilidade (-53 dB) com resposta otimizada para fala (50 Hz – 16 kHz), filtro pop interno de espuma, suspensão de eixo único contra vibrações e corpo todo em metal. Conexão XLR profissional, sem necessidade de alimentação.",
  },
  // ---- Ferramentas de áudio ----
  {
    slug: "mdb2p",
    name: "MDB2P",
    category: "direct-box",
    tagline: "Direct box passivo estéreo",
    description:
      "De guitarras acústicas a laptops, o melhor som para fontes estéreo como teclados e sintetizadores. Duas entradas de alta impedância de 1/4\" com saídas thru e atenuadores de -15 dB, além de duas saídas XLR de baixa impedância com aterramento.",
  },
];

export function catalogProductBySlug(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}

export function catalogCategoryById(id: CatalogCategoryId) {
  return catalogCategories.find((category) => category.id === id);
}

export function productPagePath(slug: string) {
  return `/produto/${slug}`;
}

export function productImageSrc(slug: string) {
  return `/produtos/${slug}.webp`;
}

export function normalizeSearch(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function productMatchesQuery(
  product: CatalogProduct,
  query: string,
  scope: "name" | "any" = "name",
) {
  const trimmed = query.trim();
  if (!trimmed) return true;
  const haystack =
    scope === "any"
      ? [product.name, product.tagline, product.description, catalogCategoryById(product.category)?.name]
          .filter(Boolean)
          .join(" ")
      : product.name;
  const normalized = normalizeSearch(haystack);
  return trimmed
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => normalized.includes(normalizeSearch(term)));
}

export function searchCatalog(query: string, scope: "name" | "any" = "name") {
  return catalogProducts.filter((product) => productMatchesQuery(product, query, scope));
}
