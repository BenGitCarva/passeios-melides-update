"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ZoomIn } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const photos = [
  { src: "https://images.unsplash.com/photo-1640262653870-c3f1b394fef9?w=800&q=80&auto=format&fit=crop",  alt: "Cavaleiro a galope na praia ao pôr do sol",                   label: "Passeio à Praia",    tall: true  },
  { src: "https://images.unsplash.com/photo-1693318836072-776a9392b842?w=800&q=80&auto=format&fit=crop",  alt: "Vinhas em socalcos no Alentejo português",                    label: "Degustação",         tall: false },
  { src: "https://images.unsplash.com/photo-1765987461643-73722eadc867?w=800&q=80&auto=format&fit=crop",  alt: "Cavalo lusitano branco a pastar na quinta",                   label: "Cavalos Lusitanos",  tall: false },
  { src: "https://images.unsplash.com/photo-1776758107856-bfabf799fd8c?w=800&q=80&auto=format&fit=crop",  alt: "Amazona em atire clássica de equitação",                      label: "Aulas de Equitação", tall: true  },
  { src: "https://images.unsplash.com/photo-1760915170446-9c5b0b67b6e2?w=800&q=80&auto=format&fit=crop",  alt: "Cesto de picnic gourmet com vinho rosé ao ar livre",           label: "Picnic na Quinta",   tall: false },
  { src: "https://images.unsplash.com/photo-1750943082452-c714763f73b2?w=800&q=80&auto=format&fit=crop",  alt: "Prato de alta gastronomia apresentado pelo chef",             label: "Almoço com Chef",    tall: false },
];

const item = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease },
  }),
};

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-pad bg-espresso overflow-hidden" ref={ref}>
      <div className="container mb-10">
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Galeria</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream font-light">
              Momentos<br />
              <em className="not-italic text-gold">inesquecíveis</em>
            </h2>
          </div>
          <p className="text-cream/40 text-sm max-w-[200px] text-right hidden md:block">
            Cada imagem é um convite para viver esta experiência.
          </p>
        </motion.div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 md:hidden pb-2">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={item}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="group relative flex-shrink-0 w-64 h-80 rounded-3xl overflow-hidden cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 text-cream text-sm font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {p.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: masonry-like grid */}
      <div className="hidden md:grid grid-cols-3 gap-3 container">
        {photos.map((p, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={item}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer ${p.tall ? "row-span-2" : ""}`}
            style={{ aspectRatio: p.tall ? "3/4" : "4/3" }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
              <p className="font-serif text-cream text-lg font-medium">{p.label}</p>
              <div className="w-8 h-8 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center">
                <ZoomIn size={14} className="text-cream" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
