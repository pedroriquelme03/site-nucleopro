import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Store } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

type StoreType = "fisica" | "online" | "";

const PARTNER_EMAIL = "alexandre.medeiros@nucleoproaudio.com.br";

const UFS: { uf: string; name: string }[] = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];

const contactCards = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@nucleoproaudio.com.br",
    href: "mailto:contato@nucleoproaudio.com.br",
    external: false,
  },
  {
    icon: MapPin,
    label: "Atendimento",
    value: "São Paulo · Entrega para todo o Brasil",
    href: undefined,
    external: false,
  },
];

function formatCnpj(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    cnpj: "",
    estado: "",
    tipo: "" as StoreType,
    whatsapp: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.cnpj.replace(/\D/g, "") || form.cnpj.replace(/\D/g, "").length !== 14) {
      setError("Informe um CNPJ válido.");
      return;
    }
    if (!form.estado || !form.tipo || !form.email.trim() || !form.whatsapp.trim()) {
      setError("Preencha CNPJ, estado, tipo de revenda, e-mail e WhatsApp.");
      return;
    }

    const tipoLabel = form.tipo === "fisica" ? "Revenda física" : "Revenda online";
    const estadoLabel = UFS.find((item) => item.uf === form.estado);
    const data = new FormData();
    data.append("cnpj", form.cnpj);
    data.append("estado", estadoLabel ? `${estadoLabel.uf} — ${estadoLabel.name}` : form.estado);
    data.append("tipo_revenda", tipoLabel);
    data.append("email", form.email.trim());
    data.append("whatsapp", form.whatsapp);
    data.append("_subject", `Cadastro de revenda — ${form.cnpj} (${tipoLabel})`);
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_replyto", form.email.trim());

    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PARTNER_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Falha no envio");
      setSent(true);
    } catch {
      setError("Não foi possível enviar agora. Tente de novo em instantes.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-ink-950/50 px-4 py-3 text-base text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20 sm:text-sm";

  return (
    <section id="contato" className="scroll-mt-20 border-t border-line bg-ink-900/40 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Fale com a Núcleo
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
            Tire dúvidas sobre a linha Mackie pelo WhatsApp ou e-mail. Lojistas e parceiros
            podem se cadastrar no formulário ao lado.
          </p>

          <div className="mt-8 space-y-4">
            {contactCards.map((card) => {
              const Tag = card.href ? motion.a : motion.div;
              return (
                <Tag
                  key={card.label}
                  {...(card.href
                    ? {
                        href: card.href,
                        target: card.external ? "_blank" : undefined,
                        rel: card.external ? "noreferrer" : undefined,
                      }
                    : {})}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-line bg-ink-800/40 p-4 transition-colors hover:border-brand/40 hover:bg-ink-800/70"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-110">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      {card.label}
                    </p>
                    <p className="text-sm font-semibold text-white transition-colors group-hover:text-brand">
                      {card.value}
                    </p>
                  </div>
                </Tag>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-line bg-ink-800/50 p-6 shadow-card sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
              <Store className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Seja uma revenda</p>
              <p className="text-xs text-slate-500">Cadastro de parceiro ou loja</p>
            </div>
          </div>

          {sent ? (
            <div className="mt-8 rounded-2xl border border-brand/30 bg-ink-950/40 px-5 py-10 text-center">
              <p className="font-display text-xl font-bold text-white">Cadastro enviado</p>
              <p className="mt-2 text-sm text-slate-400">
                Recebemos os dados da revenda. A Núcleo responde no e-mail informado.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    CNPJ <span className="text-brand">*</span>
                  </label>
                  <input
                    required
                    inputMode="numeric"
                    className={inputCls}
                    value={form.cnpj}
                    onChange={(event) => setForm((current) => ({ ...current, cnpj: formatCnpj(event.target.value) }))}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    Estado <span className="text-brand">*</span>
                  </label>
                  <select required className={inputCls} value={form.estado} onChange={set("estado")}>
                    <option value="" disabled>
                      Selecione o estado
                    </option>
                    {UFS.map((item) => (
                      <option key={item.uf} value={item.uf}>
                        {item.uf} — {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-xs font-medium text-slate-400">
                  Tipo de revenda <span className="text-brand">*</span>
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      { id: "fisica", label: "Revenda física" },
                      { id: "online", label: "Revenda online" },
                    ] as const
                  ).map((item) => {
                    const active = form.tipo === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setForm((current) => ({ ...current, tipo: item.id }))}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "border-brand/50 bg-brand/15 text-white"
                            : "border-line bg-ink-950/40 text-slate-400 hover:text-white",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    E-mail <span className="text-brand">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className={inputCls}
                    value={form.email}
                    onChange={set("email")}
                    placeholder="loja@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-400">
                    WhatsApp <span className="text-brand">*</span>
                  </label>
                  <input
                    required
                    inputMode="tel"
                    className={inputCls}
                    value={form.whatsapp}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, whatsapp: formatWhatsapp(event.target.value) }))
                    }
                    placeholder="(11) 90000-0000"
                  />
                </div>
              </div>

              {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.01] active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {sending ? "Enviando..." : "Enviar cadastro"}
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                O cadastro é enviado para {PARTNER_EMAIL}.
              </p>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
