export type CategoryId =
  | "line-array"
  | "caixas"
  | "subwoofers"
  | "amplificadores"
  | "dsp"
  | "acessorios";

export type IconType = "monitor" | "mixer" | "mic" | "headphone" | "amp" | "utility";

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  icon: IconType;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  icon: IconType;
  tagline: string;
  description: string;
  featured?: boolean;
  badge?: string;
}

export const categories: Category[] = [
  {
    id: "line-array",
    name: "Line Array",
    short: "Line Array",
    icon: "mixer",
    description:
      "Módulos de line array para cobertura consistente em arenas, casas de show e grandes eventos.",
  },
  {
    id: "caixas",
    name: "Caixas",
    short: "Caixas",
    icon: "monitor",
    description:
      "Caixas ativas e passivas Mackie para palco, igreja e eventos — da linha Thump à SRM e DRM.",
  },
  {
    id: "subwoofers",
    name: "Subwoofers",
    short: "Subwoofers",
    icon: "monitor",
    description:
      "Graves definidos e pressão sonora para completar o sistema — ativos e para array.",
  },
  {
    id: "amplificadores",
    name: "Amplificadores",
    short: "Amplificadores",
    icon: "amp",
    description:
      "Amplificadores de potência Mackie para sistemas passivos, com proteção e headroom para o palco.",
  },
  {
    id: "dsp",
    name: "DSP",
    short: "DSP",
    icon: "utility",
    description:
      "Processadores de loudspeaker e DSP para alinhamento, crossover, EQ e proteção do sistema.",
  },
  {
    id: "acessorios",
    name: "Acessórios",
    short: "Acessórios",
    icon: "utility",
    description:
      "Capas, pedestais, kits de transporte e acessórios originais para proteger e montar o sistema.",
  },
];

export const products: Product[] = [
  {
    slug: "thump15bst",
    name: "Thump15BST",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa ativa 15\" · 1400W",
    description:
      "Woofer de 15\", driver de compressão e Bluetooth. DSP integrado com voicings para DJ, palco e fala.",
    featured: true,
    badge: "Destaque",
  },
  {
    slug: "thump12a",
    name: "Thump12A",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa ativa 12\" · 1300W",
    description:
      "Formato compacto com potência para bandas, igrejas e eventos. Entradas combo e mixer de 2 canais.",
  },
  {
    slug: "srm210-vclass",
    name: "SRM210 V-Class",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa ativa 10\" · 2000W",
    description:
      "Linha SRM V-Class com processamento Advanced Impulse DSP e cobertura precisa para palco profissional.",
    featured: true,
    badge: "V-Class",
  },
  {
    slug: "drm212",
    name: "DRM212",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa ativa 12\" · 1600W",
    description:
      "Série DRM com DSP de alta resolução, LCD colorido e voicings para FOH, monitor e DJ.",
  },
  {
    slug: "s215",
    name: "S215",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa passiva 15\" · 2 vias",
    description:
      "Woofer de 15\" e driver de compressão para sistemas com amplificação externa. Ideal para instalação e palco.",
  },
  {
    slug: "c300z",
    name: "C300z",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa passiva 12\" · 2 vias",
    description:
      "Design compacto de alta eficiência, fly points e resposta equilibrada para casas de show e igrejas.",
  },
  {
    slug: "hd1521",
    name: "HD1521",
    category: "caixas",
    icon: "monitor",
    tagline: "Caixa passiva 15\" high-definition",
    description:
      "Componente de sistema HD para touring e instalação, com cobertura controlada e SPL elevado.",
  },
  {
    slug: "drm12a",
    name: "DRM12A",
    category: "line-array",
    icon: "mixer",
    tagline: "Módulo de line array 12\"",
    description:
      "Elemento de array da série DRM, com DSP integrado e rigging para montagem vertical em touring.",
    featured: true,
    badge: "Array",
  },
  {
    slug: "hd1221",
    name: "HD1221",
    category: "line-array",
    icon: "mixer",
    tagline: "Módulo de array 12\"",
    description:
      "Módulo passivo de line array para sistemas de grande formato, com ângulos de splay ajustáveis.",
  },
  {
    slug: "thump18s",
    name: "Thump18S",
    category: "subwoofers",
    icon: "monitor",
    tagline: "Subwoofer ativo 18\"",
    description:
      "Grave de impacto para completar o sistema Thump. Filtro passa-alta para as caixas satélite.",
    featured: true,
  },
  {
    slug: "srm1850",
    name: "SRM1850",
    category: "subwoofers",
    icon: "monitor",
    tagline: "Subwoofer ativo 18\" · 1600W",
    description:
      "Sub da linha SRM com DSP e polaridade invertível. Empilhável com as caixas SRM full-range.",
  },
  {
    slug: "drm18s",
    name: "DRM18S",
    category: "subwoofers",
    icon: "monitor",
    tagline: "Subwoofer de array 18\"",
    description:
      "Subwoofer da série DRM para complementar o line array, com processamento e rigging compatível.",
  },
  {
    slug: "frs-2800",
    name: "FRS-2800",
    category: "amplificadores",
    icon: "amp",
    tagline: "Amplificador de potência 2800W",
    description:
      "Dois canais com proteção térmica e contra clipping. Headroom para caixas passivas em palco e instalação.",
    featured: true,
  },
  {
    slug: "frs-1700",
    name: "FRS-1700",
    category: "amplificadores",
    icon: "amp",
    tagline: "Amplificador de potência 1700W",
    description:
      "Formato rack 2U, modo stereo/bridge e circuitos de proteção para uso contínuo em eventos.",
  },
  {
    slug: "sp260",
    name: "SP260",
    category: "dsp",
    icon: "utility",
    tagline: "Processador de loudspeaker · 2 in / 6 out",
    description:
      "Crossover, EQ paramétrico, delay e limiters por saída. Alinha e protege o sistema de PA.",
    featured: true,
    badge: "DSP",
  },
  {
    slug: "drm-control",
    name: "DRM Control App",
    category: "dsp",
    icon: "utility",
    tagline: "Controle DSP das séries DRM e SRM",
    description:
      "Ajuste voicings, EQ e delay pelo app. Integra o processamento embarcado das caixas ativas Mackie.",
  },
  {
    slug: "thump-cover",
    name: "Thump Cover 15",
    category: "acessorios",
    icon: "utility",
    tagline: "Capa de proteção 15\"",
    description:
      "Capa original para transporte e armazenamento das caixas Thump 15, com acesso a alças e conector.",
  },
  {
    slug: "speaker-pole",
    name: "Speaker Pole",
    category: "acessorios",
    icon: "utility",
    tagline: "Pedestal para caixa",
    description:
      "Pedestal de aço com altura ajustável e pino de 35 mm para montar caixas sobre subwoofers ou no chão.",
  },
  {
    slug: "caster-kit",
    name: "Caster Kit",
    category: "acessorios",
    icon: "utility",
    tagline: "Kit de rodízios para subwoofer",
    description:
      "Rodízios para deslocar subwoofers DRM e SRM no palco e no carregamento, sem danificar o gabinete.",
  },
];
