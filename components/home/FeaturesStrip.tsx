"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Users, Award, Clock } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
  { icon: Award, title: "Guias Certificados", desc: "Instrutores FEI certificados com mais de 15 anos de experiência", stat: "15", statLabel: "anos" },
  { icon: Shield, title: "Seguro Incluído",    desc: "Todas as experiências incluem seguro de responsabilidade civil",    stat: "100%", statLabel: "coberto" },
  { icon: Users, title: "Grupos Pequenos",     desc: "Máximo de 8 participantes — atenção individualizada garantida",     stat: "8", statLabel: "máx./grupo" },
  { icon: Clock, title: "Desde 2010",          desc: "Mais de 200 experiências inesquecíveis realizadas no Alentejo",     stat: "+200", statLabel: "aventuras" },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function FeaturesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-espresso" ref={ref}>
      <div className="container">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-cream/10"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`group flex flex-col items-center text-center px-6 py-10 md:py-12 cursor-default
                ${i < 2 ? "border-b md:border-b-0 border-cream/10" : ""}
                ${i === 0 ? "border-r md:border-r-0 border-cream/10" : ""}
                ${i === 2 ? "border-r md:border-r-0 border-cream/10" : ""}
              `}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl bg-terra/20 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0], backgroundColor: "rgba(193,122,86,0.35)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon size={20} className="text-terra" aria-hidden="true" />
              </motion.div>
              <p className="font-serif text-cream font-medium mb-1 text-lg">{f.title}</p>
              <p className="text-cream/50 text-xs leading-relaxed max-w-[160px] mb-3">{f.desc}</p>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="font-serif text-terra text-2xl font-semibold">{f.stat}</span>
                <span className="text-cream/30 text-xs">{f.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
