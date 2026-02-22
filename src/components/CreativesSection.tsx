import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { creatives } from '../data/creatives';

export function CreativesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="criativos" ref={sectionRef} className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            Criativos que <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">convertem</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Cada criativo é desenvolvido com estratégia, pensando em performance e resultados. 
            Do conceito à execução, entrego material de alta qualidade para suas campanhas.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <Masonry columnsCount={3} gutter="16px" className="hidden lg:block">
          {creatives.map((creative, index) => (
            <motion.div
              key={creative.id}
              data-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
            >
              <img
                src={creative.url}
                alt={creative.alt}
                loading="lazy"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-2">
                    {creative.category}
                  </span>
                  <p className="text-white">{creative.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        {/* Mobile/Tablet Grid */}
        <Masonry columnsCount={2} gutter="12px" className="lg:hidden">
          {creatives.map((creative, index) => (
            <motion.div
              key={creative.id}
              data-index={index}
              initial={{ opacity: 0, y: 20 }}
              animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              <img
                src={creative.url}
                alt={creative.alt}
                loading="lazy"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full mb-2">
                    {creative.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
