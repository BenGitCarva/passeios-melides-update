"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight, Clock } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1751380293408-fff42c7579fe?w=1600&q=85&auto=format&fit=crop"
        alt="Espigas douradas ao sol no campo alentejano"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Darker overlay for legibility */}
      <div className="absolute inset-0 bg-espresso/80" />

      {/* Decorative animated circle */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cream/5"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-terra/10"
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 container text-center"
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <motion.p variants={fadeUp} className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">
          Reserve Agora
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl text-cream font-light mb-6 max-w-2xl mx-auto leading-tight">
          Pronto para a sua aventura alentejana?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-cream/70 max-w-md mx-auto leading-relaxed mb-10">
          Disponibilidade limitada. Reserva a tua experiência agora e garante a data perfeita.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/reservar"
            className="btn-pulse group inline-flex items-center justify-center gap-2 bg-terra text-cream font-medium px-10 py-4 rounded-full transition-all text-sm shadow-lg hover:bg-terra/90 hover:scale-[1.04] active:scale-[0.98] duration-200"
          >
            Reservar Online
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </motion.span>
          </Link>
          <a
            href="https://wa.me/351910477358?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20uma%20experi%C3%AAncia"
            className="inline-flex items-center justify-center gap-2 border border-cream/30 bg-cream/10 text-cream font-medium px-8 py-4 rounded-full hover:bg-cream/20 transition-all text-sm hover:scale-[1.02] active:scale-[0.98] duration-200 backdrop-blur-sm"
            aria-label="Contactar via WhatsApp"
          >
            <Phone size={16} aria-hidden="true" />
            WhatsApp · +351 910 477 358
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex items-center justify-center gap-2 text-cream/40 text-xs">
          <Clock size={12} aria-hidden="true" />
          Segunda a Domingo · 8h30–19h00 · Confirmação em menos de 2 horas
        </motion.div>
      </motion.div>
    </section>
  );
}
