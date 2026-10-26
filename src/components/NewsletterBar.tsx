import { useState } from "react";
import { Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/utils";

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

const inputCls =
  "h-10 w-full rounded-lg border border-line bg-ink-950/60 px-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand/60";

export function NewsletterBar() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.nome.trim() || !form.email.trim() || !form.whatsapp.trim()) {
      setError("Preencha nome, e-mail e WhatsApp.");
      return;
    }

    const data = new FormData();
    data.append("nome", form.nome.trim());
    data.append("email", form.email.trim());
    data.append("whatsapp", form.whatsapp);
    data.append("_subject", `Newsletter — ${form.nome.trim()}`);
    data.append("_template", "table");
    data.append("_captcha", "false");
    data.append("_replyto", form.email.trim());

    setSending(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Falha no envio");
      setSent(true);
    } catch {
      setError("Não foi possível enviar agora. Tente de novo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-b border-line bg-ink-900/50">
      <div className="container-x flex flex-col gap-3 py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-10">
        <div className="min-w-0 max-w-md shrink-0">
          <p className="font-display text-base font-bold text-white">Newsletter</p>
          <p className="mt-0.5 text-sm leading-snug text-slate-400">
            Fique por dentro das notícias Mackie e da Núcleo.
          </p>
        </div>

        {sent ? (
          <p className="text-sm font-medium text-brand">Inscrição enviada. Em breve você recebe as novidades.</p>
        ) : (
          <form onSubmit={onSubmit} className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <label className="sr-only" htmlFor="newsletter-nome">
                Nome
              </label>
              <input
                id="newsletter-nome"
                required
                className={inputCls}
                value={form.nome}
                onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
                placeholder="Nome"
                autoComplete="name"
              />
              <label className="sr-only" htmlFor="newsletter-email">
                E-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                className={inputCls}
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="E-mail"
                autoComplete="email"
              />
              <label className="sr-only" htmlFor="newsletter-whatsapp">
                WhatsApp
              </label>
              <input
                id="newsletter-whatsapp"
                required
                inputMode="tel"
                className={inputCls}
                value={form.whatsapp}
                onChange={(event) =>
                  setForm((current) => ({ ...current, whatsapp: formatWhatsapp(event.target.value) }))
                }
                placeholder="WhatsApp"
                autoComplete="tel"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.01] active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              >
                <Send className="h-3.5 w-3.5" />
                {sending ? "Enviando" : "Assinar"}
              </button>
            </div>
            {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}
