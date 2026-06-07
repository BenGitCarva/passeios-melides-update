import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Termos e Condições — Passeios a Cavalo Melides" };

export default function TermosPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-cream min-h-screen pt-28 pb-20">
        <div className="container max-w-3xl">
          <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-espresso font-light mb-10">
            Termos e Condições
          </h1>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-8">
            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">1. Identificação</h2>
              <p>
                <strong className="text-espresso">Melides Almargem Lda</strong>, operador de animação turística registado
                no RNAAT sob o nº 1042/2018, com sede na Quinta do Almargem, 7540-909 Melides.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">2. Reservas</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Todas as reservas são sujeitas a confirmação por email no prazo de 2 horas úteis.</li>
                <li>A reserva só é confirmada após receção do pagamento (total ou sinal conforme indicado).</li>
                <li>As experiências têm capacidade máxima indicada e não são garantidas sem reserva prévia.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">3. Pagamentos</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pagamento online via cartão de crédito/débito (Stripe) ou MB WAY.</li>
                <li>Os preços incluem IVA à taxa legal em vigor.</li>
                <li>Para grupos acima de 6 pessoas, pode ser exigido sinal de 30% no momento da reserva.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">4. Cancelamentos e reembolsos</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-espresso">Mais de 72h antes:</strong> reembolso total.</li>
                <li><strong className="text-espresso">Entre 24h e 72h:</strong> reembolso de 50%.</li>
                <li><strong className="text-espresso">Menos de 24h:</strong> sem reembolso (exceto cancelamento por condições climatéricas adversas).</li>
                <li>Cancelamentos por condições meteorológicas: remarcação gratuita ou reembolso total.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">5. Responsabilidade e segurança</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Todas as experiências incluem seguro de responsabilidade civil.</li>
                <li>Os participantes devem informar sobre condições de saúde relevantes aquando da reserva.</li>
                <li>A Quinta do Almargem reserva-se o direito de recusar a participação de pessoas que aparentem estar
                    em condições físicas ou psicológicas inadequadas para a experiência.</li>
                <li>Não é necessária experiência equestre prévia nas experiências de iniciação.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">6. Propriedade intelectual</h2>
              <p>
                Todo o conteúdo deste website (textos, imagens, logótipos) é propriedade de Melides Almargem Lda
                e não pode ser reproduzido sem autorização escrita prévia.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-espresso font-medium mb-3">7. Lei aplicável</h2>
              <p>
                Estes termos são regidos pela lei portuguesa. Em caso de litígio, as partes submetem-se
                à competência dos Tribunais de Santiago do Cacém, sem prejuízo de recurso a meios
                alternativos de resolução de conflitos de consumo.
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
