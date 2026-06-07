"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Star, MapPin, ChevronRight } from "lucide-react";

export default function HeroSection() {
  // Captura a altura uma vez para evitar o hero "crescer" quando a barra
  // do browser mobile aparece/desaparece durante o scroll.
  const [heroHeight, setHeroHeight] = useState<number | null>(null);

  useEffect(() => {
    setHeroHeight(window.innerHeight);
  }, []);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] md:h-[100dvh] flex items-end overflow-hidden"
      style={heroHeight ? { height: `${heroHeight}px` } : undefined}
      aria-label="Secção principal — Passeios a Cavalo Melides"
    >
      {/* Background — cavalo branco */}
      <div className="absolute inset-0">
        {/* Mobile: crop portrait centrado */}
        <Image
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=1400&q=85&auto=format&fit=crop&crop=center"
          alt="Cavalo branco a galopar na Quinta do Almargem"
          fill
          priority
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />
        {/* Desktop: landscape */}
        <Image
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85&auto=format&fit=crop"
          alt="Cavalo branco a galopar na Quinta do Almargem"
          fill
          className="hidden md:block object-cover object-center scale-105"
          sizes="(min-width: 768px) 100vw, 0px"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container pb-16 md:pb-28 w-full">
        {/* Location badge */}
        <div className="hero-in hero-d1 flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 glass-dark px-3 py-1.5 rounded-full">
            <MapPin size={12} className="text-gold" aria-hidden="true" />
            <span className="text-cream/90 text-xs font-medium tracking-wide">Melides, Alentejo Litoral</span>
          </div>
          <div className="flex items-center gap-2 bg-green-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-black/50">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75 [animation-delay:1.5s]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span>Aberto hoje</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-in hero-d2 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-[1.05] max-w-2xl mb-6 text-shadow-hero">
          A cavalo pelo<br />
          <em className="text-gold not-italic">Alentejo</em>
        </h1>

        {/* Subtitle */}
        <p className="hero-in hero-d3 text-cream/85 text-base md:text-lg max-w-md leading-relaxed mb-8 font-sans text-shadow-hero">
          Passeios entre dunas e serra, degustações de vinho e gastronomia alentejana.
          Experiências únicas desde 2010 na Quinta do Almargem.
        </p>

        {/* CTAs */}
        <div className="hero-in hero-d4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/reservar"
            className="btn-pulse inline-flex items-center justify-center bg-terra text-cream font-medium text-sm px-8 py-4 rounded-full transition-colors shadow-lg hover:bg-terra/90 active:scale-[0.98] duration-200 gap-2"
          >
            Reservar Experiência
            <ChevronRight size={16} />
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center gap-2 glass-dark text-cream font-medium text-sm px-8 py-4 rounded-full hover:bg-cream/10 border border-cream/20 transition-colors duration-200 active:scale-[0.98]"
          >
            Ver Todas as Experiências
          </Link>
        </div>

        {/* Rating badge */}
        <div className="hero-in hero-d5 mt-10 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 glass-dark px-4 py-2.5 rounded-2xl">
            <div className="flex" aria-label="5 estrelas">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={12} className="fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
            <span className="text-cream font-semibold text-sm ml-1">5.0</span>
            <span className="text-cream/60 text-xs">· +200 avaliações</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {["FÉ", "SM", "GR"].map((initials) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full bg-sand/30 border-2 border-cream/20 flex items-center justify-center text-[10px] font-semibold text-cream"
              >
                {initials}
              </div>
            ))}
            <span className="text-cream/50 text-xs ml-1">Reservaram esta semana</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-cream/40 text-[10px] tracking-[0.2em] uppercase font-sans">Descobrir</span>
        <div className="animate-bounce">
          <ArrowDown size={16} className="text-cream/40" />
        </div>
      </div>
    </section>
  );
}
