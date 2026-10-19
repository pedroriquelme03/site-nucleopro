import { useEffect } from "react";
import { motion } from "framer-motion";
import { Handshake, Headphones, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Sparkles,
    title: "Inovação e qualidade",
    desc: "Trabalhamos com marcas e produtos que tenham inovação, qualidade e credibilidade — soluções que realmente agregam valor.",
  },
  {
    icon: Handshake,
    title: "Relacionamento",
    desc: "Nossa essência está em estar próximos: entender o negócio do cliente e construir parcerias sólidas, transparentes e duradouras.",
  },
  {
    icon: Headphones,
    title: "Suporte e pós-venda",
    desc: "Investimos em atendimento, conhecimento e suporte técnico para oferecer segurança em toda a jornada — não só na compra.",
  },
];

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 text-base leading-relaxed text-slate-400 first:mt-0 sm:text-lg">{children}</p>;
}

export function SobreNosPage() {
  useEffect(() => {
    document.title = "Sobre nós | Núcleo ProAudio";
    window.scrollTo(0, 0);
    return () => {
      document.title = "Núcleo ProAudio | Distribuidor oficial Mackie no Brasil";
    };
  }, []);

  return (
    <main>
      <section className="scroll-mt-20 py-20 pt-28 sm:py-28 sm:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Sobre nós"
            description="Experiência, conhecimento e parceria para transformar negócios em grandes projetos."
          />

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <P>
                A <strong className="font-semibold text-white">Núcleo Proaudio</strong> nasce como
                uma nova divisão da <strong className="font-semibold text-white">Núcleo Musical</strong>,
                empresa que há mais de 10 anos atua no mercado de instrumentos musicais e acessórios,
                construindo sua trajetória com experiência, credibilidade e, principalmente,
                relacionamento com seus clientes e parceiros.
              </P>
              <P>
                Ao longo desses anos, a Núcleo Musical cresceu entendendo que distribuir produtos vai
                muito além de simplesmente vender. É preciso conhecer o mercado, entender as
                necessidades dos clientes, oferecer atendimento próximo e estar presente também
                depois da venda.
              </P>
              <P>
                É com essa experiência que nasce a{" "}
                <strong className="font-semibold text-white">Núcleo Proaudio</strong>, trazendo para
                o mercado de áudio profissional toda a estrutura, conhecimento e solidez construídos
                pela Núcleo Musical ao longo de sua história.
              </P>
              <P>
                A nova divisão chega para dar ainda mais força ao grupo e ampliar nossa atuação no
                mercado Audio Pró, com o objetivo de nos posicionar entre as principais e mais
                completas distribuidoras do segmento no Brasil.
              </P>
              <P>
                Nosso propósito é trabalhar com{" "}
                <strong className="font-semibold text-white">
                  marcas e produtos que tenham inovação, qualidade e credibilidade
                </strong>
                , oferecendo ao mercado soluções que realmente agreguem valor aos nossos clientes.
              </P>
              <P>Mas acreditamos que bons produtos são apenas parte dessa história.</P>
              <P>
                Nossa essência está no{" "}
                <strong className="font-semibold text-white">relacionamento</strong>.
              </P>
              <P>
                Queremos estar próximos de nossos clientes, entender seus negócios, conhecer suas
                necessidades e ajudá-los a encontrar as melhores soluções para cada projeto. Nosso
                compromisso não termina quando o negócio é fechado. Pelo contrário: é a partir daí
                que começa uma parceria que queremos construir e manter por muitos anos.
              </P>
              <P>
                Por isso, investimos em{" "}
                <strong className="font-semibold text-white">
                  atendimento, conhecimento, suporte técnico e pós-venda
                </strong>
                , buscando oferecer segurança e tranquilidade em todos os momentos. Queremos que
                nossos clientes saibam que podem contar conosco não apenas na hora da compra, mas
                também durante toda a sua jornada.
              </P>
              <P>
                Acreditamos em relações{" "}
                <strong className="font-semibold text-white">sólidas, transparentes e duradouras</strong>
                , construídas com confiança, respeito e resultados para os dois lados.
              </P>
              <P>
                A <strong className="font-semibold text-white">Núcleo Proaudio</strong> chega ao
                mercado com a experiência de 10 anos da Núcleo Musical, mas com um novo olhar,
                novos desafios e uma grande vontade de crescer junto com nossos clientes e
                parceiros.
              </P>
              <P>
                <strong className="font-semibold text-white">
                  Nossa essência é simples: oferecer grandes marcas, bons produtos, conhecimento e,
                  acima de tudo, estar presente.
                </strong>
              </P>
              <P>
                Porque para nós, a satisfação não está apenas em fechar um negócio. Está em ver
                nosso cliente fazendo uma boa escolha, tendo resultado com ela e sabendo que terá a
                Núcleo Proaudio ao seu lado sempre que precisar.
              </P>
              <p className="mt-8 font-display text-xl font-bold text-brand sm:text-2xl">
                Núcleo Proaudio. Experiência, conhecimento e parceria para transformar negócios em
                grandes projetos.
              </p>
            </motion.div>

            <div className="grid gap-4 lg:sticky lg:top-28">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-ink-800/40 p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
