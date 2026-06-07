"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section-pad bg-cream overflow-hidden" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-terra text-xs tracking-[0.25em] uppercase font-medium mb-3">Vídeo</p>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso font-light leading-tight">
            Uma tarde na<br />
            <em className="not-italic text-terra">Quinta do Almargem</em>
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mt-4 leading-relaxed text-sm">
            Cavalos, dunas, vinho e silêncio — tudo o que a palavra conto não consegue substituir.
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sand/60 bg-espresso aspect-video">

            {/* Thumbnail + play overlay — shown before the user clicks play */}
            {!playing && (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 z-10 flex items-center justify-center group"
                aria-label="Reproduzir vídeo"
              >
                {/* Thumbnail via YouTube */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.youtube.com/vi/p0LuawbFPeQ/maxresdefault.jpg"
                  alt="Thumbnail — Uma tarde na Quinta do Almargem"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-espresso/40 group-hover:bg-espresso/30 transition-colors duration-300" />
                {/* Play button */}
                <motion.div
                  className="relative z-10 w-18 h-18 rounded-full bg-cream/95 flex items-center justify-center shadow-2xl group-hover:bg-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  style={{ width: 72, height: 72 }}
                >
                  <Play size={28} className="text-terra fill-terra ml-1" aria-hidden="true" />
                </motion.div>
              </button>
            )}

            {/* Actual iframe — only rendered after click */}
            {playing && (
              <iframe
                src="https://www.youtube-nocookie.com/embed/p0LuawbFPeQ?autoplay=1&rel=0&modestbranding=1&color=white"
                title="Uma tarde na Quinta do Almargem — Passeios a Cavalo Melides"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>

          {/* Caption */}
          <motion.p
            className="text-center text-xs text-muted-foreground mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Quinta do Almargem · Melides, Alentejo Litoral
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
