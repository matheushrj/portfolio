import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <Play size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Especialista em Audiovisual</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight"
            >
              Transformo ideias em{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                conteúdo visual
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Sou Matheus, criador de conteúdo audiovisual especializado em criativos para tráfego pago, 
              vídeos para Reels, YouTube e anúncios que geram resultados. Transformo sua mensagem em 
              conteúdo que converte e engaja.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('contato')}
                className="group px-8 py-4 bg-white text-black rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                Solicitar Orçamento
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('criativos')}
                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                Ver Portfólio
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 blur-3xl" />
              
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 aspect-square lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1765275928007-168ee8590032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2aWRlb2dyYXBoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg0ODYxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Matheus - Profissional de Audiovisual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
