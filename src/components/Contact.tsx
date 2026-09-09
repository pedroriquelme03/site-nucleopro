import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, WHATSAPP_URL } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";

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

export function Contact() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Olá! Meu nome é ${form.nome} ${form.sobrenome}.`.trim(),
      form.email && `E-mail: ${form.email}`,
      form.telefone && `Telefone: ${form.telefone}`,
      "",
      form.mensagem,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noreferrer"
    );
  };

  const inputCls =
    "w-full rounded-xl border border-line bg-ink-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20";

  return (
    <section id="contato" className="scroll-mt-20 border-t border-line bg-ink-900/40 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left — info */}
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
            Estamos aqui para responder a todas as suas perguntas. Não hesite em nos contatar para
            mais informações sobre a linha Mackie.
          </p>

          <div className="mt-8 space-y-4">
            {contactCards.map((card) => {
              const Tag = card.href ? motion.a : motion.div;
              return (
                <Tag
                  key={card.label}
                  {...(card.href
                    ? { href: card.href, target: card.external ? "_blank" : undefined, rel: card.external ? "noreferrer" : undefined }
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

        {/* Right — form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="rounded-3xl border border-line bg-ink-800/50 p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Nome</label>
              <input className={inputCls} value={form.nome} onChange={set("nome")} placeholder="Seu nome" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Sobrenome</label>
              <input
                className={inputCls}
                value={form.sobrenome}
                onChange={set("sobrenome")}
                placeholder="Seu sobrenome"
              />
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
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Telefone</label>
              <input
                className={inputCls}
                value={form.telefone}
                onChange={set("telefone")}
                placeholder="(11) 90000-0000"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Mensagem <span className="text-brand">*</span>
            </label>
            <textarea
              required
              rows={4}
              className={inputCls + " resize-none"}
              value={form.mensagem}
              onChange={set("mensagem")}
              placeholder="Como podemos ajudar?"
            />
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow-sm transition-transform hover:scale-[1.01] active:scale-95"
          >
            <Send className="h-4 w-4" />
            Enviar mensagem
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Ao enviar, você será direcionado ao nosso WhatsApp com a mensagem preenchida.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
