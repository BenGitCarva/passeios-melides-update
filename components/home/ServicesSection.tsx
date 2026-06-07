"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { services, categoryLabels } from "@/data/services";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show:   (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const smallCard = {
  hidden: { opacity: 0, x: 20 },
  show:   (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.08, ease },
  }),
};

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = services.filter((s) => s.popular).slice(0, 3);
  const others   = services.filter((s) => !s.popular).slice(0, 4);

  return (
    <section className="section-pad bg-cream" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Experiências</p>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso font-light mb-4">As nossas aventuras</h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Desde o galope na praia ao almoço com chef privado — cada experiência é pensada ao pormenor.
          </p>
        </motion.div>

        {/* Featured cards — large */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {featured.map((s, i) => (
            <motion.div
              key={s.id}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
            >
              <Link
                href={`/reservar?servico=${s.id}`}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4] flex flex-col justify-end cursor-pointer block"
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/10" />
                <motion.div
                  className="absolute inset-0 bg-terra/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {s.badge && (
                  <motion.div
                    className="absolute top-4 left-4 bg-terra text-cream text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <Sparkles size={10} aria-hidden="true" />
                    {s.badge}
                  </motion.div>
                )}

                <div className="relative z-10 p-6">
                  <p className="text-gold/80 text-[10px] tracking-[0.2em] uppercase mb-1">
                    {categoryLabels[s.category]}
                  </p>
                  <h3 className="font-serif text-cream text-2xl font-medium mb-2">{s.name}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed line-clamp-2 mb-4">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1 text-cream/60 text-xs">
                        <Clock size={11} aria-hidden="true" /> {s.duration}
                      </span>
                      <span className="flex items-center gap-1 text-cream/60 text-xs">
                        <Users size={11} aria-hidden="true" /> máx. {s.maxParticipants}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-cream font-serif text-xl font-medium">
                        €{s.price}
                      </span>
                      {s.priceHigh && (
                        <span className="text-cream/50 text-xs"> – €{s.priceHigh}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
                  <ArrowRight size={14} className="text-cream" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Other services */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-4 pb-2 md:pb-0">
          {others.map((s, i) => (
            <motion.div
              key={s.id}
              custom={i}
              variants={smallCard}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              className="flex-shrink-0 w-64 md:w-auto"
            >
              <Link
                href={`/reservar?servico=${s.id}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-terra/30 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width:768px) 256px, 25vw"
                  />
                  <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-terra text-[10px] tracking-[0.15em] uppercase mb-1">{categoryLabels[s.category]}</p>
                  <h4 className="font-serif text-espresso font-medium mb-1">{s.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} aria-hidden="true" /> {s.duration}
                    </span>
                    <span className="font-serif text-terra font-semibold">
                      €{s.price}{s.perPerson ? "/pp" : ""}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link
            href="/servicos"
            className="group inline-flex items-center gap-2 text-terra font-medium text-sm hover:text-terra-text transition-colors"
          >
            Ver todas as experiências
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
