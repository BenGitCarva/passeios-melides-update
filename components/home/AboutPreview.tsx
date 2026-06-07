"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Award, Heart } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const textBlock = {
  hidden: { opacity: 0, y: 20 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease },
  }),
};

export default function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-pad bg-cream overflow-hidden" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Image stack */}
          <div className="relative order-2 md:order-1">
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1, ease }}
            >
              <Image
                src="https://images.unsplash.com/photo-1693750035890-c600cad9e306?w=800&q=80&auto=format&fit=crop"
                alt="Quinta do Almargem — propriedade histórica em Évora, Alentejo"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              {/* Subtle overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
            </motion.div>

            {/* Floating stats card */}
            <motion.div
              className="absolute -bottom-6 -right-4 md:-right-8 bg-card rounded-2xl p-5 shadow-card-hover border border-border max-w-[210px] animate-float"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease }}
            >
              <div className="text-3xl font-serif text-terra font-semibold">+15</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-snug">anos de experiências inesquecíveis</div>
              <div className="mt-3 flex -space-x-2">
                {["SM","JC","MS","LH"].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-sand flex items-center justify-center text-[9px] font-medium text-espresso border-2 border-card">
                    {i}
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full bg-terra flex items-center justify-center text-[9px] font-medium text-cream border-2 border-card">+</div>
              </div>
            </motion.div>

            {/* Second floating badge — top left */}
            <motion.div
              className="absolute -top-4 -left-4 md:-left-6 bg-espresso rounded-2xl p-4 shadow-lg flex items-center gap-3 animate-float-slow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease }}
            >
              <div className="w-9 h-9 rounded-xl bg-terra/20 flex items-center justify-center">
                <Award size={16} className="text-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-cream text-xs font-semibold leading-none">Certificados FEI</p>
                <p className="text-cream/40 text-[10px] mt-0.5">Equitação de qualidade</p>
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <motion.p
              custom={0}
              variants={textBlock}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-4"
            >
              A Nossa História
            </motion.p>

            <motion.h2
              custom={1}
              variants={textBlock}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="font-serif text-4xl md:text-5xl text-espresso font-light leading-tight mb-6"
            >
              Uma propriedade<br />
              <em className="not-italic text-terra">desde o século XVII</em>
            </motion.h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {[
                "A Quinta do Almargem é uma propriedade familiar histórica no coração de Melides, Alentejo Litoral. O que começou como uma exploração agrícola secular transformou-se, em 2010, num refúgio de experiências únicas.",
                "Os nossos cavalos lusitanos são criados e treinados aqui mesmo, com todo o cuidado e respeito pelo bem-estar animal. Cada experiência é guiada por instrutores certificados que conhecem cada trilho, cada vinha e cada conto deste território.",
                "Melides é o Alentejo que os viajantes ainda descobrem — autêntico, selvagem e de uma beleza que fica na memória.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  custom={i + 2}
                  variants={textBlock}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              custom={5}
              variants={textBlock}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-8 grid grid-cols-3 gap-4 py-6 border-y border-border"
            >
              {[
                { icon: MapPin, value: "Melides", label: "Alentejo Litoral" },
                { icon: Heart,  value: "+200",    label: "Clientes felizes" },
                { icon: Award,  value: "5.0 ★",   label: "Avaliação média" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon size={14} className="text-terra mx-auto mb-1" aria-hidden="true" />
                  <div className="font-serif text-espresso font-semibold text-lg leading-none">{value}</div>
                  <div className="text-muted-foreground text-[10px] mt-1">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={6}
              variants={textBlock}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-6"
            >
              <Link
                href="/sobre"
                className="group inline-flex items-center gap-2 text-espresso font-medium text-sm hover:text-terra transition-colors"
              >
                Conhecer a Quinta
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
