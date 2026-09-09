import { WHATSAPP_DISPLAY } from "@/lib/utils";
import { LegalBlock, LegalLayout } from "./LegalLayout";

export function TermsPage() {
  return (
    <LegalLayout
      title="Termos de uso"
      description="Condições para navegação e uso do site da Núcleo ProAudio."
    >
      <p className="text-xs uppercase tracking-widest text-slate-500">
        Última atualização: 9 de setembro de 2026
      </p>

      <LegalBlock title="1. Aceite">
        <p>
          Ao acessar nucleoproaudio.com.br e páginas relacionadas, você concorda com estes termos e
          com a{" "}
          <a href="/politica-de-privacidade" className="text-slate-300 underline decoration-line underline-offset-4 hover:text-brand">
            Política de privacidade
          </a>
          . Se não concordar, não utilize o site.
        </p>
      </LegalBlock>

      <LegalBlock title="2. O que este site oferece">
        <p>
          Este site apresenta a Núcleo ProAudio como distribuidora oficial Mackie no Brasil,
          catálogo, conteúdos e canais de contato. Informações de produtos, especificações e
          disponibilidade são referenciais e podem mudar sem aviso prévio. Nenhuma página constitui
          proposta comercial vinculante até confirmação expressa pela Núcleo.
        </p>
      </LegalBlock>

      <LegalBlock title="3. Contato e orçamentos">
        <p>
          Formulários e botões de WhatsApp ({WHATSAPP_DISPLAY}) destinam-se a atendimento comercial e
          técnico. Você se responsabiliza pela veracidade dos dados enviados. Respostas, prazos e
          condições de venda, garantia ou assistência são definidos no atendimento, não apenas pelo
          conteúdo do site.
        </p>
      </LegalBlock>

      <LegalBlock title="4. Propriedade intelectual">
        <p>
          Marcas, nomes, logotipos, textos, imagens e vídeos deste site pertencem à Núcleo ProAudio,
          à Mackie ou a seus respectivos titulares. É vedada a reprodução, republicação ou uso
          comercial sem autorização, salvo o permitido por lei.
        </p>
      </LegalBlock>

      <LegalBlock title="5. Conduta">
        <p>
          É proibido usar o site para fins ilícitos, tentar acessar áreas restritas, inserir código
          malicioso ou prejudicar a operação da página. Links de terceiros (como WhatsApp e
          Instagram) seguem as regras dessas plataformas.
        </p>
      </LegalBlock>

      <LegalBlock title="6. Limitação">
        <p>
          O site é oferecido “como está”. A Núcleo não garante ausência de interrupções ou erros de
          conteúdo e não se responsabiliza por danos decorrentes do uso ou da impossibilidade de uso
          do site, na máxima extensão permitida pela lei brasileira.
        </p>
      </LegalBlock>

      <LegalBlock title="7. Alterações e foro">
        <p>
          Estes termos podem ser alterados a qualquer momento, passando a valer na data de
          publicação nesta página. Fica eleito o foro da comarca de São Paulo/SP, com renúncia a
          qualquer outro, por mais privilegiado que seja, para dirimir questões relacionadas a estes
          termos, salvo disposição legal em contrário.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
