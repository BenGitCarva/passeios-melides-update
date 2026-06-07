"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = ["Todos", "Passeios", "Cavalos", "Gastronomia", "Quinta"] as const;
type Category = typeof categories[number];

const photos: { src: string; alt: string; label: string; category: Exclude<Category, "Todos">; tall?: boolean }[] = [
  { src: "https://images.unsplash.com/photo-1640262653870-c3f1b394fef9?w=1200&q=85&auto=format&fit=crop", alt: "Cavaleiro a galope na praia de Melides ao pôr do sol",           label: "Passeio à Praia",         category: "Passeios",    tall: true  },
  { src: "https://images.unsplash.com/photo-1693318836072-776a9392b842?w=1200&q=85&auto=format&fit=crop", alt: "Vinhas em socalcos no Alentejo português",                       label: "Degustação de Vinhos",    category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1765987461643-73722eadc867?w=1200&q=85&auto=format&fit=crop", alt: "Cavalo lusitano branco a pastar na quinta ao amanhecer",         label: "Cavalos Lusitanos",       category: "Cavalos",     tall: false },
  { src: "https://images.unsplash.com/photo-1776758107856-bfabf799fd8c?w=1200&q=85&auto=format&fit=crop", alt: "Amazona em attire clássica de equitação no picadeiro",           label: "Aulas de Equitação",      category: "Passeios",    tall: true  },
  { src: "https://images.unsplash.com/photo-1760915170446-9c5b0b67b6e2?w=1200&q=85&auto=format&fit=crop", alt: "Cesto de picnic gourmet com vinho rosé ao ar livre na quinta",   label: "Picnic na Quinta",        category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1750943082452-c714763f73b2?w=1200&q=85&auto=format&fit=crop", alt: "Prato de alta gastronomia apresentado pelo chef da quinta",       label: "Almoço com Chef",         category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=85&auto=format&fit=crop",    alt: "Cavaleiro a galope junto ao oceano em dia nublado",               label: "Praia da Vigia",          category: "Passeios",    tall: false },
  { src: "https://images.unsplash.com/photo-1571407169682-2c8d8368a4dc?w=1200&q=85&auto=format&fit=crop", alt: "Cavalos a pastar livremente no campo ao entardecer",              label: "Cavalos em Liberdade",    category: "Cavalos",     tall: true  },
  { src: "https://images.unsplash.com/photo-1578764823012-37f22fa03a97?w=1200&q=85&auto=format&fit=crop", alt: "Grupo em passeio por trilho de sobreiros do montado",             label: "Trilho do Montado",       category: "Passeios",    tall: false },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop", alt: "Mesa de degustação com produtos alentejanos e vinhos locais",     label: "Produtos da Terra",       category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85&auto=format&fit=crop", alt: "Chef a preparar menu de degustação com ingredientes locais",      label: "Chef em Acção",           category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1634549666012-6156d6a7fbc1?w=1200&q=85&auto=format&fit=crop", alt: "Cavaleiro em trilho rural ao pôr do sol no Alentejo Litoral",    label: "Ao Pôr do Sol",           category: "Passeios",    tall: true  },
  { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85&auto=format&fit=crop", alt: "Copos de vinho tinto alentejano numa mesa ao ar livre",           label: "Vinhos do Alentejo",      category: "Gastronomia", tall: false },
  { src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=85&auto=format&fit=crop", alt: "Quinta histórica rodeada de pinheiros e sobreiros",               label: "Quinta do Almargem",      category: "Quinta",      tall: false },
  { src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=85&auto=format&fit=crop", alt: "Cavalo lusitano cinzento de perfil com juba ao vento",             label: "Raça Lusitana",           category: "Cavalos",     tall: false },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop",    alt: "Vista aérea das dunas de Melides com o oceano ao fundo",          label: "Dunas de Melides",        category: "Quinta",      tall: true  },
];

const cardVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, delay: (i % 8) * 0.06, ease },
  }),
  exit: { opacity: 0, scale: 0.88, transition: { duration: 0.3 } },
};

export default function GaleriaPage() {
  const [active, setActive] = useState<Category>("Todos");
  const [lightbox, setLightbox] = useState<null | typeof photos[0]>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  const filtered = active === "Todos" ? photos : photos.filter(p => p.category === active);

  return (
    <>
      <Header />
      <main id="main-content">

        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1640262653870-c3f1b394fef9?w=1600&q=85&auto=format&fit=crop"
            alt="Cavaleiro na praia de Melides"
            fill className="object-cover object-top" sizes="100vw" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 to-espresso/20" />
          <div className="relative z-10 container pb-10 md:pb-14">
            <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-2">Quinta do Almargem</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream font-light">Galeria</h1>
          </div>
        </section>

        {/* Filter bar */}
        <section className="bg-cream sticky top-16 md:top-20 z-30 border-b border-sand/40 shadow-sm">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                    active === cat
                      ? "bg-terra text-cream shadow-sm"
                      : "bg-sand/50 text-espresso/70 hover:bg-sand hover:text-espresso"
                  }`}
                >
                  {cat}
                  {active === cat && (
                    <span className="ml-1.5 text-cream/70">
                      ({cat === "Todos" ? photos.length : photos.filter(p => p.category === cat).length})
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-cream py-12 md:py-16" ref={gridRef}>
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.src}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="group relative break-inside-avoid rounded-3xl overflow-hidden cursor-pointer mb-4"
                    style={{ aspectRatio: p.tall ? "3/4" : "4/3" }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={() => setLightbox(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setLightbox(p)}
                    aria-label={`Ver foto: ${p.label}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={i < 6 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                      <div>
                        <p className="text-terra text-[10px] tracking-[0.15em] uppercase font-medium mb-0.5">{p.category}</p>
                        <p className="font-serif text-cream text-base font-medium leading-tight">{p.label}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <ZoomIn size={14} className="text-cream" aria-hidden="true" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-espresso py-16 md:py-20">
          <div className="container text-center">
            <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Reserve a sua experiência</p>
            <h2 className="font-serif text-3xl md:text-4xl text-cream font-light mb-6">
              Cada fotografia é um convite
            </h2>
            <p className="text-cream/60 max-w-md mx-auto mb-8 leading-relaxed text-sm">
              Venha criar as suas próprias memórias no Alentejo Litoral.
              Disponibilidade limitada — reserve com antecedência.
            </p>
            <a
              href="/reservar"
              className="btn-pulse inline-flex items-center gap-2 bg-terra text-cream font-medium px-8 py-4 rounded-full hover:bg-terra/90 transition-all text-sm shadow-lg hover:scale-[1.03] active:scale-[0.98] duration-200"
            >
              Reservar Agora
            </a>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-espresso/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-label={`Foto ampliada: ${lightbox.label}`}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-terra text-[10px] tracking-[0.2em] uppercase font-medium mb-0.5">{lightbox.category}</p>
                  <p className="font-serif text-cream text-lg">{lightbox.label}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
                  aria-label="Fechar"
                >
                  <X size={18} className="text-cream" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
