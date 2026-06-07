import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ExternalLink, Newspaper } from "lucide-react";

const press = [
  {
    outlet: "Público",
    type: "Imprensa escrita",
    excerpt: "\"Uma das experiências mais autênticas do Alentejo Litoral — cavalos, vinho e silêncio, a menos de 2 horas de Lisboa.\"",
    category: "Turismo & Lifestyle",
  },
  {
    outlet: "Expresso",
    type: "Imprensa escrita",
    excerpt: "\"Melides está na moda, mas a Quinta do Almargem já cá estava. Luís Lamas conhece cada trilho, cada sobreiro, cada conto desta terra.\"",
    category: "Viagens",
  },
  {
    outlet: "NiT · New in Town",
    type: "Media digital",
    excerpt: "\"Os melhores passeios a cavalo em Portugal? Ficam mesmo ao lado de Comporta — e a maioria dos visitantes nem sabe.\"",
    category: "Experiências",
  },
  {
    outlet: "Time Out Lisboa",
    type: "Media digital",
    excerpt: "\"Uma fuga perfeita: cavalgar até à praia de Melides, regressar com um copo de Vale das Éguas na mão.\"",
    category: "Escapadelas",
  },
  {
    outlet: "Evasões",
    type: "Revista",
    excerpt: "\"O Alentejo a cavalo revela-se de outra forma — mais lento, mais verdadeiro. A Quinta do Almargem é o ponto de partida certo.\"",
    category: "Turismo de Natureza",
  },
  {
    outlet: "RTP",
    type: "Televisão",
    excerpt: "\"Reportagem especial sobre o turismo equestre no Litoral Alentejano — a Quinta do Almargem em destaque no programa Portugal em Directo.\"",
    category: "Televisão",
  },
  {
    outlet: "Turismo de Portugal",
    type: "Institucional",
    excerpt: "\"Operador certificado RNAAT nº 1042/2018 — exemplo de boas práticas no turismo de natureza e animação turística.\"",
    category: "Certificação",
  },
  {
    outlet: "Visão",
    type: "Revista",
    excerpt: "\"Entre o montado e o oceano, há uma quinta que transformou a tradição dos cavalos de endurance numa experiência para todos.\"",
    category: "Cultura & Viagens",
  },
];

const heroImage = "https://images.unsplash.com/photo-1634549666012-6156d6a7fbc1?w=1400&q=80&auto=format&fit=crop";

export default function ImprensaPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <Image src={heroImage} alt="Cavaleiro em trilho do Alentejo" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-espresso/20" />
          <div className="relative z-10 container pb-10 md:pb-14">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-2">Comunicação Social</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream font-light">Imprensa</h1>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-cream py-16 md:py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
              <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-4">Na comunicação social</p>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso font-light mb-4">
                Reconhecidos pela imprensa nacional
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao longo dos anos, a Quinta do Almargem tem sido destaque em alguns dos principais meios de comunicação portugueses,
                reconhecida como uma das experiências de turismo equestre mais autênticas do país.
              </p>
            </div>

            {/* Press grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
              {press.map((p) => (
                <article
                  key={p.outlet}
                  className="group bg-card rounded-3xl p-7 border border-border hover:border-terra/30 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Newspaper size={14} className="text-terra" aria-hidden="true" />
                        <span className="text-terra text-[10px] tracking-[0.2em] uppercase font-medium">{p.type}</span>
                      </div>
                      <h3 className="font-serif text-espresso text-xl font-medium">{p.outlet}</h3>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">{p.excerpt}</p>
                </article>
              ))}
            </div>

            {/* Contact for press */}
            <div className="bg-espresso rounded-3xl p-10 md:p-14 text-center">
              <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Assessoria de Imprensa</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream font-light mb-4">
                Pedidos de comunicação social
              </h2>
              <p className="text-cream/60 max-w-md mx-auto leading-relaxed mb-8">
                Para pedidos de press trip, entrevistas, fotografias ou informações para publicação,
                contacte directamente o Luís Lamas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@passeiosacavalomelides.com"
                  className="inline-flex items-center justify-center gap-2 bg-terra text-cream font-medium px-8 py-4 rounded-full hover:bg-terra/90 transition-colors text-sm"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  info@passeiosacavalomelides.com
                </a>
                <a
                  href="tel:+351910477358"
                  className="inline-flex items-center justify-center gap-2 border border-cream/30 bg-cream/10 text-cream font-medium px-8 py-4 rounded-full hover:bg-cream/20 transition-colors text-sm"
                >
                  +351 910 477 358
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
