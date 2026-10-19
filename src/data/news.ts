export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  text: string;
  image: string;
  body: string[];
  sourceUrl?: string;
}

export function newsPagePath(slug: string) {
  return `/blog/${slug}`;
}

export function newsBySlug(slug: string) {
  return newsItems.find((item) => item.slug === slug);
}

export function relatedNews(slug: string, limit = 3) {
  const current = newsBySlug(slug);
  if (!current) return newsItems.slice(0, limit);
  return newsItems.filter((item) => item.slug !== slug).slice(0, limit);
}

export const newsItems: NewsItem[] = [
  {
    slug: "como-posicionar-e-alinhar-o-subwoofer",
    date: "Nov 2025",
    title: "Como posicionar e alinhar o subwoofer",
    text: "Tutorial Mackie de crossover, polaridade e delay para o grave chegar definido no público — sem embolar o sistema.",
    image: "/noticias/subwoofer-setup.jpg",
    sourceUrl: "https://mackie.com/intl/blog/all/How_to_Set_Up_Your_Subwoofer.html",
    body: [
      "Um subwoofer bem alinhado muda o sistema inteiro: o grave chega definido, a pressão sobe sem embolar a caixa full-range e o público sente o peso no peito — sem sujeira no mix.",
      "Comece pelo crossover. Defina a frequência em que o sub entrega o grave e a caixa principal assume o restante. Em muitos setups Mackie, a região entre 80 e 100 Hz é um bom ponto de partida; ajuste ouvindo a transição, não só o número no display.",
      "Confira a polaridade. Se o sub e as caixas estiverem fora de fase, o grave some no centro da plateia. Inverta a polaridade (ou o cabo) e compare: mantenha a opção em que o low-end fica mais cheio e estável.",
      "Use delay quando o sub não está no mesmo plano das caixas. Alguns milissegundos de atraso alinhados à distância física evitam cancelamento e deixam o ataque do kick mais sólido.",
      "Por fim, caminhe pela área de público. O que soa bem na FOH pode falhar nas laterais. Ajuste nível e posição até o grave ficar homogêneo — e documente o preset para o próximo evento.",
    ],
  },
  {
    slug: "monte-um-karaoke-melhor-com-equipamento-mackie",
    date: "Nov 2025",
    title: "Monte um karaokê melhor com equipamento Mackie",
    text: "Microfone, mixer e caixa no lugar certo: o passo a passo da Mackie para um setup de karaokê com som profissional.",
    image: "/noticias/karaoke-setup.jpg",
    sourceUrl: "https://mackie.com/intl/blog/all/How_to_Make_Your_Own_Better_Karaoke_Machine.html",
    body: [
      "Karaokê bom não é volume no máximo: é voz inteligível, acompanhamento equilibrado e zero feedback no microfone.",
      "Escolha um microfone dinâmico adequado a voz e um mixer com EQ e efeitos — a linha ProFX da Mackie entrega pré, reverb e compressão sem complicar o operador.",
      "Posicione as caixas à frente dos microfones, apontadas para o público. Microfone atrás da caixa é convite a microfonia; mantenha o cantor na zona coberta pelo sistema, não no eixo do woofer.",
      "No mixer, corte grave desnecessário no canal de voz, use high-pass e ajuste o ganho antes do volume master. Um leve reverb ajuda o canto sem lavar a letra.",
      "Com playback em Bluetooth, USB ou cabo, deixe o acompanhamento um pouco abaixo da voz. O resultado é um karaokê que soa profissional — em casa, bar ou evento.",
    ],
  },
  {
    slug: "thumpsub-go-grave-portatil-a-bateria",
    date: "Set 2025",
    title: "ThumpSub GO: grave portátil a bateria",
    text: "A Mackie lança o primeiro subwoofer profissional a bateria da linha Thump GO — até 12 horas de grave onde não tem tomada.",
    image: "/noticias/thumpsub-go.jpg",
    sourceUrl: "https://mackie.com/intl/blog/all/Drop_the_Bass_Anyplace_With_the_New_Mackie_ThumpSub_GO.html",
    body: [
      "O ThumpSub GO leva o grave da linha Thump para onde a tomada não chega: praia, praça, rooftop e eventos outdoor com autonomia de até 12 horas.",
      "Ele foi pensado para casar com as caixas Thump GO, formando um sistema portátil completo — satélites no alto, sub no chão, tudo a bateria.",
      "Além da mobilidade, o processamento ajuda a manter o low-end limpo e integrado. Menos adivinhação no setup, mais pressão onde o público está.",
      "Para DJs, bandas e equipes de evento, a promessa é simples: grave profissional sem gerador barulhento nem extensão improvisada.",
      "Na Núcleo ProAudio, o ThumpSub GO entra no catálogo oficial Mackie no Brasil, com garantia de fábrica e suporte de quem especifica o sistema.",
    ],
  },
  {
    slug: "10-desafios-de-pa-e-como-o-thump-go-resolve",
    date: "Ago 2025",
    title: "10 desafios de PA e como o Thump GO resolve",
    text: "Feedback, falta de energia, transporte e cobertura: o guia Mackie para sonorizar eventos com a linha GO.",
    image: "/noticias/thump-go-desafios.jpg",
    sourceUrl:
      "https://mackie.com/intl/blog/all/10_Common_Challenges_With_PA_Systems_and_How_Thump_GO_Solves_Them.html",
    body: [
      "Montar PA em evento pequeno ou médio costuma repetir os mesmos problemas: feedback, tomada longe, peso no transporte e cobertura irregular.",
      "A linha Thump GO ataca esses pontos com caixas a bateria, DSP e formato pensado para carregar e posicionar rápido — sem abrir mão de pressão sonora.",
      "Bluetooth e app ajudam a ajustar o sistema sem ficar preso atrás do mixer. Em espaços improvisados, isso reduz o tempo de ensaio e o risco de microfonia.",
      "Transporte leve e autonomia fazem diferença em casamentos, feiras e cultos itinerantes. Menos cabo, menos risco, mais foco no conteúdo do evento.",
      "Se o desafio é sonorizar sem estrutura fixa, o Thump GO é o atalho Mackie para um PA confiável — e a Núcleo entrega com suporte no Brasil.",
    ],
  },
  {
    slug: "11-coisas-que-voce-pode-ligar-nos-monitores-cr",
    date: "Jul 2025",
    title: "11 coisas que você pode ligar nos monitores CR",
    text: "Do interface ao toca-discos: tutoriais de conexão para a linha de monitores de estúdio Mackie CR.",
    image: "/noticias/monitores-conexoes.jpg",
    sourceUrl: "https://mackie.com/intl/blog/all/11_Things_You_Can_Connect_to_CR_Studio_Monitors.html",
    body: [
      "Monitores CR não servem só para DAW. A série Mackie aceita uma lista longa de fontes — e cada conexão muda o jeito de trabalhar no estúdio.",
      "Interface de áudio, mixer, toca-discos, console de games, TV e até celular entram no jogo. O importante é bater nível e impedância sem distorcer.",
      "Use cabos adequados (TRS, RCA ou XLR, conforme o modelo) e evite adaptadores improvisados que geram ruído. Ganho limpo começa na conexão física.",
      "Se for vinil ou fonte de linha fraca, confirme se precisa de pré. Nos monitores com entrada dedicada, o caminho fica mais direto.",
      "Com as CR no lugar certo e as fontes organizadas, o estúdio vira um hub de referência — para mixar, produzir e ouvir com confiança.",
    ],
  },
  {
    slug: "srm-v-class-e-o-dsp-advanced-impulse",
    date: "Jun 2025",
    title: "SRM V-Class e o DSP Advanced Impulse",
    text: "Como o processamento da série SRM deixa a caixa mais inteligente no palco, na igreja e na instalação.",
    image: "/noticias/srm-dsp.png",
    sourceUrl:
      "https://mackie.com/intl/blog/all/Making_Speakers_More_Intelligent_with_Advanced_Impulse_DSP.html",
    body: [
      "O Advanced Impulse DSP da série SRM V-Class não é efeito de marketing: ele corrige resposta e fase para a caixa soar mais natural e previsível.",
      "No palco e na igreja, isso significa menos EQ de emergência e mais coerência entre caixas. O sistema “pensa” a resposta antes do sinal sair do driver.",
      "Presets e controle via app aceleram o setup. Em instalação fixa, o mesmo processamento ajuda a manter cobertura e inteligibilidade no dia a dia.",
      "Para empresas de locação, a previsibilidade do V-Class reduz tempo de alinhamento e reclamação de “som estranho” em ambientes diferentes.",
      "Se a meta é PA inteligente sem complicar a operação, SRM V-Class + Advanced Impulse é o caminho Mackie — disponível com a Núcleo no Brasil.",
    ],
  },
  {
    slug: "por-que-o-srm-v-class-virou-referencia-de-palco",
    date: "Mar 2025",
    title: "Por que o SRM V-Class virou referência de palco",
    text: "Dez motivos pelos quais a linha SRM V-Class se consolidou em casas de show, igrejas e empresas de locação.",
    image: "/noticias/srm-vclass.jpg",
    sourceUrl:
      "https://mackie.com/intl/blog/all/10_Ways_Mackie_Set_a_New_Industry_Standard_With_SRM_V_Class_Loudspeakers.html",
    body: [
      "A SRM V-Class virou referência porque entrega pressão, clareza e recursos de DSP em um pacote que equipes realmente usam no dia a dia.",
      "Em casas de show, a caixa segura vocal e instrumentos sem “gritar”. Em igrejas, a inteligibilidade da palavra ganha prioridade sem perder musicalidade.",
      "Locadoras valorizam durabilidade, presets e o fato de o sistema casar bem com subs e auxiliares da mesma família Mackie.",
      "Controle remoto e mixer digital integrado em alguns modelos enxugam o rack. Menos equipamento auxiliar, menos ponto de falha.",
      "Não é coincidência ver SRM V-Class em tantos plots: a linha acertou o equilíbrio entre performance e operação — e a Núcleo coloca isso no Brasil com suporte oficial.",
    ],
  },
  {
    slug: "como-acertar-o-som-com-os-monitores-cr",
    date: "Fev 2025",
    title: "Como acertar o som com os monitores CR",
    text: "Tutorial de posição, controle de tom e volume para mixar e produzir com a série CR da Mackie.",
    image: "/noticias/monitores-cr.jpg",
    sourceUrl:
      "https://mackie.com/intl/blog/all/How_to_Dial_in_Your_Perfect_Sound_With_CR_Series_Studio_Monitors.html",
    body: [
      "Monitores CR bem posicionados fazem a mixagem viajar melhor: o que você ouve no estúdio chega parecido no carro, no fone e na caixa de PA.",
      "Forme um triângulo equilátero entre as duas caixas e a cabeça. Tweeters na altura dos ouvidos, leve ângulo para dentro, sem encostar na parede.",
      "Use os controles de tom da série CR para compensar a sala — não para “embelezar” a mix. O objetivo é referência neutra, não playlist gostosa.",
      "Trabalhe em volume moderado. Ouvido cansado empurra agudo e comprime decisões ruins. Pause, compare e volte com orelha fresca.",
      "Com posição, nível e EQ de sala no lugar, a CR vira ferramenta de decisão — e a produção ganha consistência de verdade.",
    ],
  },
  {
    slug: "profx10-go-mixer-profissional-a-bateria",
    date: "Jan 2025",
    title: "ProFX10 GO: mixer profissional a bateria",
    text: "Até 8 horas de mixagem com pré Onyx, efeitos GigFX+ e USB-C — o mixer analógico Mackie que não depende da tomada.",
    image: "/noticias/profx10-go.jpg",
    sourceUrl: "https://mackie.com/intl/blog/all/ProFX10_GO_Battery_Powered_Mixer.html",
    body: [
      "O ProFX10 GO coloca um mixer analógico Mackie no ombro: pré Onyx, efeitos GigFX+ e até 8 horas a bateria para ensaios, lives e eventos sem energia estável.",
      "USB-C facilita gravação e playback. Em podcasts e bandas pequenas, o GO vira o centro do setup sem precisar de interface extra na maioria dos casos.",
      "Os efeitos e o EQ ajudam a entregar um som apresentável rápido — útil quando não há técnico dedicado no local.",
      "Combine com caixas Thump GO e o sistema inteiro fica portátil. Menos extensão, menos gerador, mais mobilidade.",
      "Para quem precisa misturar com qualidade Mackie fora do rack tradicional, o ProFX10 GO é o formato certo — com distribuição oficial pela Núcleo.",
    ],
  },
  {
    slug: "dl16se-e-dl32se-a-nova-geracao-dl-series",
    date: "Nov 2024",
    title: "DL16SE e DL32SE: a nova geração DL Series",
    text: "Mixers digitais de rack com pré Onyx+, Master Fader SE e interface USB — a linha DL continua no catálogo Mackie.",
    image: "/noticias/dl-se.jpg",
    sourceUrl:
      "https://mackie.com/intl/blog/all/Mackie_Sustains_DL_Series_With_DL16SE_and_DL32SE_Digital_Rack_Mixers.html",
    body: [
      "A série DL SE renova o mixer digital de rack Mackie com pré Onyx+, Master Fader SE e interface USB para palco, igreja e instalação.",
      "O formato rack economiza espaço e deixa o FOH mais limpo. O controle por app permite ajustar mix de monitores e sala sem ficar preso ao hardware.",
      "DL16SE e DL32SE cobrem diferentes contagens de canal — escolha conforme o plot, não conforme o hype. Escalabilidade importa em casas que crescem.",
      "Para equipes que já conheciam a DL Series, a geração SE mantém a linguagem familiar e atualiza o fluxo de trabalho.",
      "Na Núcleo ProAudio, a linha DL SE segue no catálogo oficial Mackie, com suporte para especificação e pós-venda no Brasil.",
    ],
  },
];
