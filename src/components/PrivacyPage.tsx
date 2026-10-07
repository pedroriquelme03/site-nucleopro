import { WHATSAPP_DISPLAY } from "@/lib/utils";
import { LegalBlock, LegalLayout } from "./LegalLayout";

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Política de privacidade"
      description="Como a Núcleo ProAudio trata os dados pessoais coletados neste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
    >
      <p className="text-xs uppercase tracking-widest text-slate-500">
        Última atualização: 9 de setembro de 2026
      </p>

      <LegalBlock title="1. Quem controla os dados">
        <p>
          O controlador é a Núcleo ProAudio, distribuidora oficial Mackie no Brasil, com
          atendimento em São Paulo e contato pelo e-mail{" "}
          <a
            href="mailto:contato@nucleoproaudio.com.br"
            className="text-slate-300 underline decoration-line underline-offset-4 hover:text-brand"
          >
            contato@nucleoproaudio.com.br
          </a>{" "}
          ou WhatsApp {WHATSAPP_DISPLAY}.
        </p>
      </LegalBlock>

      <LegalBlock title="2. Quais dados coletamos">
        <p>Podemos tratar, conforme o uso do site:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>CNPJ, estado, tipo de revenda, e-mail e WhatsApp enviados no cadastro de parceiro;</li>
          <li>informações que você enviar pelo WhatsApp ao falar com a Núcleo;</li>
          <li>dados técnicos de navegação, como endereço IP, tipo de dispositivo e páginas visitadas.</li>
        </ul>
        <p>Não solicitamos dados sensíveis neste site e não vendemos informações pessoais.</p>
      </LegalBlock>

      <LegalBlock title="3. Para que usamos">
        <p>Os dados são usados para:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>responder cotações, pedidos de suporte, garantia e assistência técnica;</li>
          <li>indicar revendedores e atender lojistas ou integradores;</li>
          <li>melhorar o site e a comunicação comercial da Núcleo.</li>
        </ul>
        <p>
          A base legal é, conforme o caso, o consentimento, a execução de medidas pré-contratuais a
          seu pedido ou o legítimo interesse em atender quem nos procura.
        </p>
      </LegalBlock>

      <LegalBlock title="4. Compartilhamento">
        <p>
          Podemos compartilhar dados com prestadores que operam o site, hospedagem e ferramentas de
          comunicação, apenas na medida necessária ao serviço. Também podemos fazê-lo quando a lei
          exigir. A Mackie e revendedores só recebem informações quando isso for necessário para
          atender o seu pedido.
        </p>
      </LegalBlock>

      <LegalBlock title="5. Retenção e segurança">
        <p>
          Guardamos os dados pelo tempo necessário para a finalidade informada ou para obrigações
          legais. Adotamos medidas razoáveis para proteger as informações contra acesso não
          autorizado, perda ou uso indevido.
        </p>
      </LegalBlock>

      <LegalBlock title="6. Seus direitos">
        <p>
          Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade,
          informação sobre compartilhamentos e revogação de consentimento, nos termos da LGPD. Para
          exercer esses direitos, escreva para contato@nucleoproaudio.com.br. Também é possível
          apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </LegalBlock>

      <LegalBlock title="7. Cookies">
        <p>
          O site pode usar cookies essenciais ao funcionamento e, quando aplicável, cookies de
          medição de audiência. Você pode bloquear cookies no navegador; algumas funções podem deixar
          de funcionar.
        </p>
      </LegalBlock>

      <LegalBlock title="8. Alterações">
        <p>
          Esta política pode ser atualizada. A versão vigente é sempre a publicada nesta página, com
          a data de atualização no topo.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
