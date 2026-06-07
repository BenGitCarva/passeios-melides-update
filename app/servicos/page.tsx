"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Check, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { services, categoryLabels, type Service } from "@/data/services";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const allCategories = ["todos", "passeio", "aula", "experiencia", "gastronomia"] as const;
type Filter = typeof allCategories[number];

const filterLabels: Record<Filter, string> = {
  todos: "Todos",
  passeio: "Passeios",
  aula: "Aulas",
  experiencia: "Experiências",
  gastronomia: "Gastronomia",
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease },
  }),
};

export default function ServicosPage() {
  const [active, setActive] = useState<Filter>("todos");
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-60px" });

  const filtered = active === "todos"
    ? services
    : services.filter((s) => s.category === active);

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Hero — compact */}
        <section className="relative h-52 md:h-64 flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1765987461643-73722eadc867?w=1400&q=80&auto=format&fit=crop"
            alt="Cavalos lusitanos na Quinta do Almargem"
            fill className="object-cover object-center" sizes="100vw" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-espresso/20" />
          <div className="relative z-10 container pb-8 md:pb-10">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-1">Quinta do Almargem</p>
            <h1 className="font-serif text-3xl md:text-4xl text-cream font-light">Experiências</h1>
          </div>
        </section>

        {/* Sticky filter tabs */}
        <div className="bg-espresso sticky top-16 md:top-20 z-30 shadow-md">
          <div className="container">
            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide py-4">
              {allCategories.map((cat) => {
                const count = cat === "todos" ? services.length : services.filter(s => s.category === cat).length;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${
                      active === cat
                        ? "bg-terra text-cream shadow-lg"
                        : "bg-white/10 text-cream/85 border border-white/15 hover:bg-white/20 hover:text-cream"
                    }`}
                  >
                    {filterLabels[cat]}
                    <span className={`text-xs tabular-nums font-normal ${active === cat ? "text-cream/75" : "text-cream/45"}`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card list */}
        <section className="bg-cream py-8 md:py-10" ref={listRef}>
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((s, i) => (
                  <motion.div
                    key={s.id}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                  >
                    <ServiceRow service={s} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-espresso py-14 md:py-16">
          <div className="container text-center">
            <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Experiências à medida</p>
            <h2 className="font-serif text-3xl md:text-4xl text-cream font-light mb-4">
              Não encontrou o que procura?
            </h2>
            <p className="text-cream/60 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Criamos experiências personalizadas para grupos, aniversários, lua-de-mel e eventos corporativos.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-terra text-cream font-medium px-7 py-4 rounded-full hover:bg-terra/90 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm shadow-lg"
            >
              Falar Connosco
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ServiceRow({ service: s }: { service: Service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-3xl border border-border hover:border-terra/25 hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col sm:flex-row">

        {/* Image */}
        <div className="relative sm:w-56 md:w-64 shrink-0 h-44 sm:h-auto overflow-hidden">
          <Image
            src={s.image} alt={s.imageAlt} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, 256px"
          />
          {s.badge && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-terra text-cream text-[10px] font-medium px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles size={9} aria-hidden="true" />
              {s.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-terra text-[10px] tracking-[0.2em] uppercase font-medium mb-0.5">
                {categoryLabels[s.category]}
              </p>
              <h2 className="font-serif text-espresso text-xl md:text-2xl font-medium leading-tight">
                {s.name}
              </h2>
              <p className="text-muted-foreground text-sm italic mt-0.5">{s.tagline}</p>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <div className="font-serif text-terra text-2xl font-semibold leading-none">
                €{s.price}
                {s.priceHigh && <span className="text-base text-muted-foreground font-sans">–{s.priceHigh}</span>}
              </div>
              {s.perPerson && <p className="text-muted-foreground text-[10px] mt-0.5">por pessoa</p>}
              {s.priceNote && <p className="text-muted-foreground text-[10px] mt-0.5">{s.priceNote}</p>}
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={11} aria-hidden="true" /> {s.duration}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users size={11} aria-hidden="true" /> máx.&nbsp;{s.maxParticipants}
            </span>
            {s.minParticipants && (
              <span className="text-xs text-muted-foreground">· mín.&nbsp;{s.minParticipants}</span>
            )}
          </div>

          {/* Expandable details */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.includes.map((inc) => (
                    <span key={inc} className="inline-flex items-center gap-1 text-xs bg-sand/60 text-espresso/80 px-2.5 py-1 rounded-full">
                      <Check size={10} className="text-terra" aria-hidden="true" /> {inc}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-terra transition-colors"
              aria-expanded={open}
            >
              {open ? "Fechar detalhes" : "Ver o que inclui"}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={13} aria-hidden="true" />
              </motion.span>
            </button>

            <Link
              href={`/reservar?servico=${s.id}`}
              className="bg-terra text-cream text-sm font-medium px-5 py-2.5 rounded-full hover:bg-terra/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
