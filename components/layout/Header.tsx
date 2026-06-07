"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/servicos",  label: "Experiências" },
  { href: "/imprensa", label: "Imprensa" },
  { href: "/sobre",    label: "A Quinta" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"PT" | "EN">("PT");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "glass border-b border-sand/40 shadow-glass"
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <Image
              src="/logo.svg"
              alt="Passeios a Cavalo Melides — logótipo"
              width={32}
              height={41}
              className={cn(
                "transition-all duration-300 shrink-0",
                isTransparent ? "brightness-0 invert" : "brightness-0 opacity-80"
              )}
              priority
            />
            <div className="flex flex-col leading-none">
              <span className={cn(
                "font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors",
                isTransparent ? "text-cream" : "text-espresso"
              )}>
                Passeios Melides
              </span>
              <span className={cn(
                "text-[10px] tracking-[0.2em] uppercase font-sans transition-colors",
                isTransparent ? "text-cream/70" : "text-terra"
              )}>
                Quinta do Almargem · Est. 1990
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-terra inline-link",
                  isTransparent ? "text-cream/90" : "text-espresso/80",
                  pathname === link.href && "text-terra"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(l => l === "PT" ? "EN" : "PT")}
              className={cn(
                "text-xs font-medium tracking-widest px-2 py-1 rounded border transition-colors",
                isTransparent
                  ? "text-cream/80 border-cream/30 hover:border-cream"
                  : "text-espresso/60 border-sand hover:border-terra hover:text-terra"
              )}
            >
              {lang === "PT" ? "EN" : "PT"}
            </button>
            <Link
              href="/reservar"
              className="bg-terra text-cream text-sm font-medium px-5 py-2.5 rounded-full hover:bg-terra-dark transition-colors shadow-sm"
            >
              Reservar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isTransparent ? "text-cream" : "text-espresso"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-cream flex flex-col pt-20 px-6 pb-8 md:hidden">
          <nav aria-label="Navegação principal (mobile)" className="flex flex-col gap-2 mt-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "font-serif text-3xl text-espresso py-3 border-b border-sand/50 transition-colors hover:text-terra",
                  "animate-fade-up opacity-0-init",
                  i === 0 && "animate-delay-100",
                  i === 1 && "animate-delay-200",
                  i === 2 && "animate-delay-300",
                )}
                style={{ animationFillMode: "forwards" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/reservar"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-terra text-cream text-center text-base font-medium py-4 rounded-2xl hover:bg-terra-dark transition-colors"
            >
              Reservar Experiência
            </Link>
            <a
              href="https://wa.me/351910477358"
              className="w-full flex items-center justify-center gap-2 border border-sand text-espresso text-sm py-3.5 rounded-2xl hover:border-terra hover:text-terra transition-colors"
            >
              <Phone size={16} />
              +351 910 477 358
            </a>

            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">© 2025 Quinta do Almargem</p>
              <button
                onClick={() => setLang(l => l === "PT" ? "EN" : "PT")}
                className="text-xs font-medium border border-sand px-3 py-1.5 rounded-full text-espresso/60 hover:text-terra hover:border-terra transition-colors"
              >
                {lang === "PT" ? "Switch to EN" : "Mudar para PT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
