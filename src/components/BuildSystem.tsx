import * as React from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { WHATSAPP_NUMBER } from "@/lib/utils";

const ambientes = [
  { value: "igreja", label: "Igreja" },
  { value: "shows", label: "Shows e eventos" },
  { value: "noite", label: "Casa noturna" },
  { value: "corporativo", label: "Corporativo" },
  { value: "auditorio", label: "Auditório" },
  { value: "bar", label: "Bar ou restaurante" },
  { value: "install", label: "Instalação fixa" },
];

const tamanhos = [
  { value: "pequeno", label: "Até 100 pessoas" },
  { value: "medio", label: "100 a 400 pessoas" },
  { value: "grande", label: "400 a 1.000 pessoas" },
  { value: "arena", label: "Mais de 1.000 pessoas" },
];

const usos = [
  { value: "voz", label: "Voz e fala" },
  { value: "banda", label: "Banda ao vivo" },
  { value: "dj", label: "DJ e festa" },
  { value: "ambiente", label: "Música ambiente" },
];

function TooltipIcon({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground" aria-label={text}>
          <Info className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function recommend(ambiente: string, tamanho: string, uso: string) {
  const isLarge = tamanho === "grande" || tamanho === "arena";
  const needsArray = ambiente === "shows" || ambiente === "install" || tamanho === "arena";
  const needsSub = uso === "banda" || uso === "dj" || ambiente === "noite" || isLarge;
  const voiceFirst = uso === "voz" || ambiente === "igreja" || ambiente === "auditorio";

  if (needsArray) {
    return {
      title: "Line array DRM + sub + DSP",
      items: ["DRM12A", "DRM18S", "SP260"],
      text: "Cobertura consistente para recinto grande. Array, grave e processamento alinhados — o desenho que a Núcleo especifica para palco e instalação.",
    };
  }

  if (ambiente === "noite" || uso === "dj") {
    return {
      title: "SRM V-Class + sub Thump",
      items: ["SRM210 V-Class", "Thump18S"],
      text: "Pressão na pista com DSP embarcado. Compacto de montar, forte no grave, pronto para a noite inteira.",
    };
  }

  if (voiceFirst && !isLarge) {
    return {
      title: "Thump + DSP para a voz",
      items: ["Thump15BST", "SP260"],
      text: "Inteligibilidade do púlpito à última cadeira. Caixa ativa com voicing de fala e processador para alinhar o sistema.",
    };
  }

  if (tamanho === "pequeno" || uso === "ambiente") {
    return {
      title: "Par Thump para o dia a dia",
      items: ["Thump12A", "Thump15BST"],
      text: "Sistema direto, com mixer na própria caixa. Serve bar, restaurante e espaço pequeno sem overkill.",
    };
  }

  return {
    title: "SRM V-Class para palco e igreja",
    items: ["SRM210 V-Class", "Thump18S"],
    text: "Potência e cobertura para banda e culto. Comece por aqui — a Núcleo fecha o resto do sistema com você.",
  };
}

export function BuildSystem() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [ambiente, setAmbiente] = React.useState("");
  const [tamanho, setTamanho] = React.useState("");
  const [uso, setUso] = React.useState("");
  const totalSteps = 4;

  const result = recommend(ambiente, tamanho, uso);
  const ambienteLabel = ambientes.find((a) => a.value === ambiente)?.label ?? "";
  const tamanhoLabel = tamanhos.find((t) => t.value === tamanho)?.label ?? "";
  const usoLabel = usos.find((u) => u.value === uso)?.label ?? "";

  const canAdvance =
    (currentStep === 1 && Boolean(ambiente)) ||
    (currentStep === 2 && Boolean(tamanho)) ||
    (currentStep === 3 && Boolean(uso)) ||
    currentStep === 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (!canAdvance) return;
      setCurrentStep((s) => s + 1);
      return;
    }

    const message = `Olá! Vim pelo site da Núcleo ProAudio e quero montar um sistema.
Ambiente: ${ambienteLabel}
Tamanho: ${tamanhoLabel}
Uso: ${usoLabel}
Sugestão: ${result.title} (${result.items.join(", ")})`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noreferrer",
    );
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAmbiente("");
    setTamanho("");
    setUso("");
  };

  const titles = [
    "Onde o som vai tocar?",
    "Qual o tamanho do espaço?",
    "Qual o uso principal?",
    "Seu sistema sugerido",
  ];
  const descriptions = [
    "O ambiente define cobertura, pressão e o tipo de caixa.",
    "Público e recinto indicam se o caminho é Thump, SRM ou array.",
    "Voz, banda ou pista pedem grave e DSP diferentes.",
    "Uma base Mackie para começar — a Núcleo fecha o projeto com você.",
  ];

  return (
    <section id="sistema" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Monte seu sistema
          </h2>
          <p className="mt-6 font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Não sabe qual equipamento escolher?
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Responda algumas perguntas.
          </p>
          <a
            href="#formulario-sistema"
            className="group mt-8 inline-flex items-center gap-1 text-sm font-semibold text-white transition-colors hover:text-white/80"
          >
            Encontrar meu sistema
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <div id="formulario-sistema" className="scroll-mt-24">
          <TooltipProvider delayDuration={200}>
            <MultiStepForm
              size="lg"
              className="w-full"
              currentStep={currentStep}
              totalSteps={totalSteps}
              title={titles[currentStep - 1]}
              description={descriptions[currentStep - 1]}
              onBack={handleBack}
              onNext={handleNext}
              nextDisabled={!canAdvance}
              nextButtonText={currentStep === 4 ? "Falar no WhatsApp" : "Continuar"}
              footerContent={
                currentStep === 4 ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-slate-400 hover:text-white"
                  >
                    Recomeçar
                  </button>
                ) : (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Olá! Vim pelo site da Núcleo ProAudio e gostaria de ajuda para montar um sistema.",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-brand hover:underline"
                  >
                    Precisa de ajuda? <ArrowUpRight className="h-4 w-4" />
                  </a>
                )
              }
            >
              {currentStep === 1 && (
                <Field
                  label="Ambiente"
                  hint="Igreja, palco e instalação pedem desenhos diferentes."
                  htmlFor="ambiente"
                >
                  <Select value={ambiente} onValueChange={setAmbiente}>
                    <SelectTrigger id="ambiente">
                      <SelectValue placeholder="Selecione o ambiente..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ambientes.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}

              {currentStep === 2 && (
                <Field
                  label="Capacidade"
                  hint="Uma estimativa do público já basta para dimensionar o sistema."
                  htmlFor="tamanho"
                >
                  <Select value={tamanho} onValueChange={setTamanho}>
                    <SelectTrigger id="tamanho">
                      <SelectValue placeholder="Selecione o tamanho..." />
                    </SelectTrigger>
                    <SelectContent>
                      {tamanhos.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}

              {currentStep === 3 && (
                <Field
                  label="Uso principal"
                  hint="Fala nítida e pista cheia não usam o mesmo grave."
                  htmlFor="uso"
                >
                  <Select value={uso} onValueChange={setUso}>
                    <SelectTrigger id="uso">
                      <SelectValue placeholder="Selecione o uso..." />
                    </SelectTrigger>
                    <SelectContent>
                      {usos.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}

              {currentStep === 4 && (
                <div className="space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                    Recomendação
                  </p>
                  <h4 className="font-display text-2xl font-bold text-white">{result.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-400">{result.text}</p>
                  <ul className="flex flex-wrap gap-2">
                    {result.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-ink-950/60 px-3 py-1 text-xs font-semibold text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-500">
                    {ambienteLabel} · {tamanhoLabel} · {usoLabel}
                  </p>
                </div>
              )}
            </MultiStepForm>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        <TooltipIcon text={hint} />
      </div>
      {children}
    </div>
  );
}
