import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';

const creatives = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1532617754634-819393ff5106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFkdmVydGlzaW5nJTIwZGVzaWdufGVufDF8fHx8MTc2ODQwNjg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Creative Advertising Design',
    category: 'Tráfego Pago',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1644771571408-f2b3b8782f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGNvbnRlbnR8ZW58MXx8fHwxNzY4Mzc5MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Social Media Content',
    category: 'Redes Sociais',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1632187989763-c9c620420b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzY4NDQxOTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Video Production',
    category: 'Produção',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1760784016748-79421d6f8e74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBncmFwaGljJTIwZGVzaWdufGVufDF8fHx8MTc2ODQ2ODQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Modern Graphic Design',
    category: 'Design',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1614762586156-8b9a22069f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY4NDI4NTA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Digital Marketing Creative',
    category: 'Marketing Digital',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1660557989690-d09a28f6356e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY4MzgzMjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Commercial Photography',
    category: 'Fotografia Comercial',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2ODM5MjI1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Brand Identity Design',
    category: 'Identidade Visual',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1764663908318-54b7756776a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBjb250ZW50JTIwY3JlYXRpb258ZW58MXx8fHwxNzY4NDg2MTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'Mobile Content Creation',
    category: 'Conteúdo Mobile',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0dWJlJTIwdGh1bWJuYWlsfGVufDF8fHx8MTc2ODQ3NjQzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    alt: 'YouTube Thumbnail',
    category: 'YouTube',
  },
];

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
