"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show:   (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-pad bg-cream" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Avaliações</p>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso font-light mb-2">
            O que dizem os nossos visitantes
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex" aria-label="5 estrelas">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className="fill-terra text-terra" aria-hidden="true" />
              ))}
            </div>
            <span className="font-serif text-espresso font-semibold">5.0</span>
            <span className="text-muted-foreground text-sm">· +200 avaliações verificadas</span>
          </div>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              custom={i}
              variants={item}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="flex-shrink-0 w-[280px]"
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              custom={i}
              variants={item}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="h-full bg-card rounded-3xl p-6 border border-border shadow-card hover:shadow-card-hover transition-shadow cursor-default">
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          className="w-10 h-10 rounded-full bg-sand flex items-center justify-center text-sm font-semibold text-espresso"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {t.avatar}
        </motion.div>
        <div>
          <p className="font-medium text-espresso text-sm">{t.name}</p>
          <p className="text-muted-foreground text-xs">{t.flag} {t.location}</p>
        </div>
      </div>
      <div className="flex mb-3" aria-label={`${t.rating} estrelas`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={12} className="fill-terra text-terra" aria-hidden="true" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
        <span className="text-terra text-xs font-medium">{t.service}</span>
        <span className="text-muted-foreground text-xs">{t.date}</span>
      </div>
    </div>
  );
}
