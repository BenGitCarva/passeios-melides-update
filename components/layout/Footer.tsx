import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/80">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl text-cream font-semibold mb-1">Passeios Melides</p>
            <p className="text-xs tracking-[0.2em] uppercase text-terra mb-4">Quinta do Almargem · Est. 1990</p>
            <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
              Experiências únicas a cavalo no coração do Alentejo Litoral — entre a Serra de Grândola
              e as praias douradas de Melides.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com/passeiosmelides" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-terra hover:text-terra transition-colors">
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/pages/Passeios-a-Cavalo-Melides/435405223176558" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-terra hover:text-terra transition-colors">
                <Facebook size={16} aria-hidden="true" />
              </a>
            </div>
            {/* RNAAT badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-cream/5 border border-cream/10">
              <Shield size={12} className="text-terra" aria-hidden="true" />
              <span className="text-xs text-cream/50">RNAAT nº 1042/2018</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-cream/40 mb-5 font-medium">Explorar</p>
            <ul className="space-y-3">
              {[
                { href: "/servicos",  label: "Experiências" },
                { href: "/imprensa", label: "Imprensa" },
                { href: "/sobre",    label: "A Quinta" },
                { href: "/galeria",  label: "Galeria" },
                { href: "/reservar", label: "Reservar" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-terra transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Actividades */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-cream/40 mb-5 font-medium">Actividades</p>
            <ul className="space-y-3">
              {[
                { href: "/servicos?cat=passeio",       label: "Passeio à Praia" },
                { href: "/servicos?cat=passeio",       label: "Passeio pela Serra" },
                { href: "/servicos?cat=aula",          label: "Aulas de Equitação" },
                { href: "/servicos?cat=experiencia",   label: "Degustação de Vinhos" },
                { href: "/servicos?cat=experiencia",   label: "Picnic na Quinta" },
                { href: "/servicos?cat=gastronomia",   label: "Almoço com Chef" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cream/70 hover:text-terra transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-cream/40 mb-5 font-medium">Contacto</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-terra mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-sm text-cream/70">
                  Quinta do Almargem<br />7540-909 Melides, Alentejo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-terra shrink-0" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+351910477358" className="text-sm text-cream/70 hover:text-terra transition-colors">
                    +351 910 477 358
                  </a>
                  <a href="tel:+351917474865" className="text-sm text-cream/70 hover:text-terra transition-colors">
                    +351 917 474 865
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-terra shrink-0" aria-hidden="true" />
                <a href="mailto:info@passeiosacavalomelides.com" className="text-sm text-cream/70 hover:text-terra transition-colors">
                  info@passeiosacavalomelides.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">
            © 2026 Melides Almargem Lda · Passeios a Cavalo Melides · Todos os direitos reservados
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="text-xs text-cream/40 hover:text-cream/70 transition-colors">Privacidade</Link>
            <Link href="/termos"      className="text-xs text-cream/40 hover:text-cream/70 transition-colors">Termos</Link>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer"
              className="text-xs text-cream/40 hover:text-cream/70 transition-colors">
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
