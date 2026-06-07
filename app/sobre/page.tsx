import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Leaf, Award } from "lucide-react";

const values = [
  { icon: Heart, title: "Bem-estar Animal", desc: "Os nossos cavalos lusitanos são criados com liberdade e respeito, numa quinta com mais de 30 hectares de pasto natural." },
  { icon: Leaf, title: "Turismo Sustentável", desc: "Grupos pequenos, impacto mínimo. Trabalhamos com fornecedores locais e praticamos uma gastronomia de proximidade e época." },
  { icon: Award, title: "Certificados pelo Turismo de Portugal", desc: "Actividade registada no RNAAT nº 1042/2018. Seguro de responsabilidade civil incluído em todas as experiências. Não é necessária experiência equestre prévia." },
];

const team = [
  { name: "Luís Lamas",      initials: "LL", color: "bg-terra/20 text-terra",          role: "Fundador & Guia Principal",    bio: "Arquitecto de formação, nasceu e cresceu em Melides. Criou a coudelaria na Quinta do Almargem em 1990 para cavalos de desporto de endurance. Abriu ao turismo equestre em 2010, com a missão de mostrar o Alentejo genuíno a quem vem de longe." },
  { name: "Catarina Fonseca", initials: "CF", color: "bg-gold/20 text-espresso",        role: "Instrutora de Equitação",       bio: "Amazona desde os 6 anos, formada em equitação clássica em Portugal e Espanha. Especialista em iniciação e em trabalhar com crianças." },
  { name: "Miguel Carvalho",  initials: "MC", color: "bg-espresso/10 text-espresso/70", role: "Chef & Sommelier",              bio: "Chef com passagem por restaurantes com estrela Michelin, voltou ao Alentejo para trabalhar com o produto local. Cuida da nossa gastronomia e da degustação de vinhos." },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-72 md:h-[420px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1400&q=80"
            alt="Quinta do Almargem ao pôr do sol" fill className="object-cover" sizes="100vw" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-espresso/10" />
          <div className="relative z-10 container pb-12">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-2">A Nossa História</p>
            <h1 className="font-serif text-4xl md:text-6xl text-cream font-light leading-tight max-w-xl">
              A Quinta do<br /><em className="not-italic text-gold">Almargem</em>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="section-pad bg-cream">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-espresso font-light mb-6 leading-tight">
                  Uma propriedade familiar<br />
                  <em className="not-italic text-terra">desde o século XVII</em>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>A Quinta do Almargem é uma propriedade histórica em Melides, Alentejo Litoral, concedida por carta régia desde o século XVII. Na família Lamas há mais de três séculos, foi palco de criação de cavalos de desporto muito antes de abrir ao turismo.</p>
                  <p>Em 1990, Luís Lamas — arquitecto de profissão e cavaleiro de coração — fundou a coudelaria para cavalos de endurance de competição. Em 2010, abriu as portas ao turismo equestre: qualquer pessoa, sem qualquer experiência prévia, pode hoje cavalgar neste território.</p>
                  <p>Os cavalos são extremamente calmos e mansos. Os trilhos vão desde as dunas da Praia da Vigia até ao montado de sobreiros da Serra de Grândola — dois mundos, a poucos quilómetros.</p>
                </div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1693750035890-c600cad9e306?w=800&q=80&auto=format&fit=crop" alt="Quinta histórica em Évora, Alentejo" fill className="object-cover" sizes="50vw" />
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {values.map((v, i) => (
                <div key={i} className="bg-card rounded-3xl p-7 border border-border">
                  <div className="w-11 h-11 rounded-2xl bg-terra/10 flex items-center justify-center mb-4">
                    <v.icon size={20} className="text-terra" />
                  </div>
                  <h3 className="font-serif text-espresso text-lg font-medium mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <div>
              <div className="text-center mb-10">
                <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Equipa</p>
                <h2 className="font-serif text-3xl md:text-4xl text-espresso font-light">
                  Quem vos vai receber
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-28 h-28 rounded-full mx-auto mb-4 border-4 border-sand flex items-center justify-center ${m.color}`}>
                      <span className="font-serif text-3xl font-semibold select-none" aria-hidden="true">
                        {m.initials}
                      </span>
                    </div>
                    <h4 className="font-serif text-espresso text-lg font-medium">{m.name}</h4>
                    <p className="text-terra text-xs tracking-wide uppercase mb-3">{m.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-espresso py-16 md:py-20">
          <div className="container text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-cream font-light mb-4">
              Venha conhecer a Quinta
            </h2>
            <p className="text-cream/60 max-w-sm mx-auto mb-8">
              Reserve a sua experiência e descubra o Alentejo como nunca o viu.
            </p>
            <Link href="/reservar" className="inline-flex items-center gap-2 bg-terra text-cream font-medium px-7 py-4 rounded-full hover:bg-terra-dark transition-colors text-sm">
              Reservar Agora <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
