import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, FileUp, Send, X } from "lucide-react";
import { catalogCategories, catalogProducts } from "@/data/catalog";

const CONTACT_EMAIL = "contato@nucleoproaudio.com.br";
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

const inputCls =
  "w-full rounded-xl border border-line bg-ink-950/50 px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20 sm:text-sm";

function productFromUrl() {
  const slug = new URLSearchParams(window.location.search).get("produto");
  if (!slug) return "";
  return catalogProducts.some((item) => item.slug === slug) ? slug : "";
}

function fileLabel(file: File) {
  const mb = file.size / (1024 * 1024);
  return `${file.name} · ${mb < 0.1 ? `${Math.round(file.size / 1024)} KB` : `${mb.toFixed(1)} MB`}`;
}

export function ManuaisPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    produto: productFromUrl(),
    outroProduto: "",
    revenda: "",
  });
  const [nota, setNota] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Manuais Mackie | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  const selectedName = useMemo(() => {
    if (form.produto === "outro") return form.outroProduto.trim();
    return catalogProducts.find((item) => item.slug === form.produto)?.name ?? "";
  }, [form.produto, form.outroProduto]);

  function setField(key: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      setError("");
    };
  }

  function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type) && !/\.(pdf|jpe?g|png|webp)$/i.test(file.name)) {
      setError("Envie a nota fiscal em PDF, JPG, PNG ou WEBP.");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError("A nota fiscal deve ter no máximo 8 MB.");
      return;
    }
    setNota(file);
    setError("");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.nome.trim() || !form.email.trim() || !form.revenda.trim()) {
      setError("Preencha nome, e-mail e a revenda onde comprou.");
      return;
    }
    if (!selectedName) {
      setError("Informe o produto Mackie para o qual precisa do manual.");
      return;
    }
    if (!nota) {
      setError("Anexe a nota fiscal da compra.");
      return;
    }

    setSending(true);
    setError("");

    const data = new FormData();
    data.append("nome", form.nome.trim());
    data.append("email", form.email.trim());
    data.append("produto", selectedName);
    data.append("revenda", form.revenda.trim());
    data.append("nota_fiscal", nota);
    data.append("_subject", `Solicitação de manual — ${selectedName}`);
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_replyto", form.email.trim());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Falha no envio");
      setSent(true);
    } catch {
      setError("Não foi possível enviar agora. Confira os campos e tente de novo em instantes.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <section className="relative isolate min-h-[280px] overflow-hidden border-b border-line pt-16 sm:min-h-[360px]">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/82 to-ink-950/40" />
        <div className="container-x relative z-10 flex min-h-[280px] flex-col justify-end py-10 sm:min-h-[360px] sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Suporte Mackie</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-6xl">
            Manuais
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">
            Solicite o manual de operação e as especificações do seu equipamento Mackie. A Núcleo
            confirma a compra e envia o arquivo para o seu e-mail.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Solicitação de manual
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Preencha os dados da compra e anexe a nota fiscal. O manual é liberado para produtos
              Mackie adquiridos em revenda autorizada no Brasil.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Nome, e-mail e modelo do equipamento
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Loja ou integrador onde você comprou
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Nota fiscal em PDF ou imagem, até 8 MB
              </li>
            </ul>
          </div>

          {sent ? (
            <div className="rounded-3xl border border-brand/30 bg-ink-800/50 px-6 py-12 text-center sm:px-10">
              <CheckCircle2 className="mx-auto h-10 w-10 text-brand" />
              <h3 className="mt-4 font-display text-2xl font-bold text-white">Solicitação enviada</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Recebemos o pedido do manual de <span className="text-white">{selectedName}</span>.
                A Núcleo confere a nota fiscal e responde no e-mail informado.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-line bg-ink-800/40 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Nome</span>
                  <input
                    required
                    name="nome"
                    value={form.nome}
                    onChange={setField("nome")}
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    className={inputCls}
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-2 block text-sm font-medium text-slate-300">E-mail</span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={setField("email")}
                    autoComplete="email"
                    placeholder="voce@email.com"
                    className={inputCls}
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Qual produto</span>
                <select
                  required
                  name="produto"
                  value={form.produto}
                  onChange={setField("produto")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Selecione o modelo Mackie
                  </option>
                  {catalogCategories.map((category) => (
                    <optgroup key={category.id} label={category.name}>
                      {catalogProducts
                        .filter((product) => product.category === category.id)
                        .map((product) => (
                          <option key={product.slug} value={product.slug}>
                            {product.name}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                  <option value="outro">Outro modelo</option>
                </select>
              </label>

              {form.produto === "outro" ? (
                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">Nome do modelo</span>
                  <input
                    required
                    name="outroProduto"
                    value={form.outroProduto}
                    onChange={setField("outroProduto")}
                    placeholder="Ex.: Thump215XT"
                    className={inputCls}
                  />
                </label>
              ) : null}

              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Qual revenda você comprou
                </span>
                <input
                  required
                  name="revenda"
                  value={form.revenda}
                  onChange={setField("revenda")}
                  placeholder="Nome da loja e cidade"
                  className={inputCls}
                />
              </label>

              <div className="mt-5">
                <span className="mb-2 block text-sm font-medium text-slate-300">Anexar nota fiscal</span>
                {nota ? (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-950/50 px-4 py-3">
                    <p className="truncate text-sm text-white">{fileLabel(nota)}</p>
                    <button
                      type="button"
                      onClick={() => setNota(null)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
                      aria-label="Remover arquivo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-ink-950/40 px-4 py-8 text-center transition-colors hover:border-brand/40">
                    <FileUp className="h-6 w-6 text-brand" />
                    <span className="mt-3 text-sm font-medium text-white">Enviar PDF ou imagem</span>
                    <span className="mt-1 text-xs text-slate-500">PDF, JPG, PNG ou WEBP · até 8 MB</span>
                    <input
                      required
                      type="file"
                      name="nota"
                      accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                      onChange={onFile}
                      className="sr-only"
                    />
                  </label>
                )}
              </div>

              {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.01] active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {sending ? "Enviando..." : "Solicitar manual"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
