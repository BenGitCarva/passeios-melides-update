import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Política de Privacidade — Passeios a Cavalo Melides" };

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-cream min-h-screen pt-28 pb-20">
        <div className="container max-w-3xl">
          <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-espresso font-light mb-10">
            Política de Privacidade
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-8">
            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">1. Responsável pelo tratamento</h2>
              <p>
                <strong className="text-espresso">Melides Almargem Lda</strong> · NIF 514 XXX XXX<br />
                Quinta do Almargem, 7540-909 Melides, Santiago do Cacém, Portugal<br />
                Email: <a href="mailto:info@passeiosacavalomelides.com" className="text-terra hover:underline">info@passeiosacavalomelides.com</a><br />
                Telefone: <a href="tel:+351910477358" className="text-terra hover:underline">+351 910 477 358</a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">2. Dados recolhidos</h2>
              <p>Recolhemos apenas os dados necessários para processar as suas reservas e responder às suas questões:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Nome completo e contactos (email e telefone)</li>
                <li>Data e tipo de experiência pretendida</li>
                <li>Número de participantes e necessidades especiais</li>
                <li>Dados de pagamento (processados de forma segura pela Stripe — não armazenamos dados de cartão)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">3. Finalidade e base legal</h2>
              <p>
                Os seus dados são tratados exclusivamente para execução do contrato de prestação de serviços (reservas),
                cumprimento de obrigações legais (faturação) e, com o seu consentimento, envio de comunicações sobre
                novas experiências e promoções.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">4. Conservação</h2>
              <p>
                Os dados são conservados pelo período necessário à execução do contrato e cumprimento de obrigações
                legais (10 anos para efeitos fiscais). Os dados de marketing são eliminados no prazo de 3 anos após
                o último contacto ou mediante pedido de oposição.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">5. Os seus direitos</h2>
              <p>
                Tem direito de acesso, retificação, apagamento, limitação, portabilidade e oposição ao tratamento
                dos seus dados. Para exercer qualquer direito, contacte-nos por email ou correo postal.
                Pode também apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">6. Cookies</h2>
              <p>
                Este site utiliza apenas cookies estritamente necessários ao seu funcionamento.
                Não utilizamos cookies de rastreamento ou publicidade de terceiros.
              </p>
            </section>

            <p className="text-xs text-muted-foreground pt-4 border-t border-sand">
              Última atualização: Junho de 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
