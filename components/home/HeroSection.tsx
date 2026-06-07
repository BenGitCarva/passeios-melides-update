"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star, MapPin, ChevronRight } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroHeight, setHeroHeight] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setHeroHeight(window.innerHeight); // capture once, never update
  }, []); // empty deps = runs once on mount only

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "20%"]);
  const contentY = useTransform(scrollY, [0, 400], ["0%", "12%"]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] md:h-[100dvh] flex items-end overflow-hidden"
      style={!isDesktop && heroHeight ? { height: `${heroHeight}px` } : undefined}
      aria-label="Secção principal — Passeios a Cavalo Melides"
    >
      {/* Background image with parallax (parallax disabled on mobile to prevent layout shift) */}
      <motion.div className="absolute inset-0" style={isDesktop ? { y: bgY } : {}}>
        {/* Mobile: cavalo branco a galopar — crop portrait centrado */}
        <Image
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=1400&q=85&auto=format&fit=crop&crop=center"
          alt="Cavalo branco a galopar na Quinta do Almargem"
          fill
          priority
          className="block md:hidden object-cover object-center"
          sizes="100vw"
        />
        {/* Desktop: cavalo branco landscape */}
        <Image
          src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1920&q=85&auto=format&fit=crop"
          alt="Cavalo branco a galopar na Quinta do Almargem"
          fill
          className="object-cover object-center scale-110 hidden md:block"
          sizes="(min-width: 768px) 100vw, 0px"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Grain texture — hidden on mobile (SVG feTurbulence is CPU-rendered) */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-repeat pointer-events-none hidden md:block"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container pb-16 md:pb-28 w-full"
        style={isDesktop ? { y: contentY, opacity } : {}}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Location badge */}
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 glass-dark px-3 py-1.5 rounded-full">
            <MapPin size={12} className="text-gold" aria-hidden="true" />
            <span className="text-cream/90 text-xs font-medium tracking-wide">Melides, Alentejo Litoral</span>
          </div>
          <div className="flex items-center gap-2 bg-green-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-black/50">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75 [animation-delay:2s]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span>Aberto hoje</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-[1.05] max-w-2xl mb-6 text-shadow-hero"
        >
          A cavalo pelo<br />
          <em className="text-gold not-italic">Alentejo</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-cream/85 text-base md:text-lg max-w-md leading-relaxed mb-8 font-sans text-shadow-hero"
        >
          Passeios entre dunas e serra, degustações de vinho e gastronomia alentejana.
          Experiências únicas desde 2010 na Quinta do Almargem.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/reservar"
            className="btn-pulse inline-flex items-center justify-center bg-terra text-cream font-medium text-sm px-8 py-4 rounded-full transition-all shadow-lg hover:bg-terra/90 hover:scale-[1.03] active:scale-[0.98] duration-200 gap-2"
          >
            Reservar Experiência
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/servicos"
            className="inline-flex items-center justify-center gap-2 glass-dark text-cream font-medium text-sm px-8 py-4 rounded-full hover:bg-cream/10 border border-cream/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Ver Todas as Experiências
          </Link>
        </motion.div>

        {/* Rating badge */}
        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4 flex-wrap">
          <motion.div
            className="flex items-center gap-1.5 glass-dark px-4 py-2.5 rounded-2xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="flex" aria-label="5 estrelas">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={12} className="fill-gold text-gold" aria-hidden="true" />
              ))}
            </div>
            <span className="text-cream font-semibold text-sm ml-1">5.0</span>
            <span className="text-cream/60 text-xs">· +200 avaliações</span>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-3"
            variants={fadeIn}
          >
            {["FÉ", "SM", "GR"].map((initials, i) => (
              <motion.div
                key={initials}
                className="w-8 h-8 rounded-full bg-sand/30 border-2 border-cream/20 flex items-center justify-center text-[10px] font-semibold text-cream backdrop-blur-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                {initials}
              </motion.div>
            ))}
            <span className="text-cream/50 text-xs ml-1">Reservaram esta semana</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-cream/40 text-[10px] tracking-[0.2em] uppercase font-sans">Descobrir</span>
        <div className="md:animate-bounce [animation-delay:3s]">
          <ArrowDown size={16} className="text-cream/40" />
        </div>
      </motion.div>
    </section>
  );
}
