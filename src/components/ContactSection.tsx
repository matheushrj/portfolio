import { motion } from 'motion/react';
import { MessageCircle, Mail, Instagram, Youtube, Linkedin } from 'lucide-react';

const services = [
  'Criação de criativos para tráfego pago',
  'Conteúdo audiovisual para mobile',
  'Edição de vídeos personalizados',
  'Produção de vídeos para Reels',
  'Conteúdo para YouTube',
  'Vídeos para anúncios',
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:contato@matheus.com' },
];

export function ContactSection() {
  const whatsappNumber = '5511999999999'; // Substitua pelo número real
  const whatsappMessage = encodeURIComponent(
    'Olá! Vim pelo site e gostaria de solicitar um orçamento para criação de conteúdo audiovisual.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contato" className="relative py-20 lg:py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl text-white mb-6">
              Vamos criar algo <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">incrível juntos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entre em contato e receba um orçamento personalizado para o seu projeto. 
              Respondo rapidamente e estou sempre disponível para novos desafios.
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl lg:rounded-3xl p-8 lg:p-12 mb-12 backdrop-blur-sm"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl text-white mb-4">
                  Solicite seu orçamento personalizado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cada projeto é único. Conte-me sobre sua necessidade e vou criar uma proposta 
                  customizada com prazos e valores transparentes.
                </p>
                <div className="space-y-2">
                  {services.slice(0, 3).map((service, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full lg:w-auto"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full lg:w-auto px-8 lg:px-12 py-5 lg:py-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl lg:rounded-2xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-sm opacity-90">Fale comigo no</div>
                      <div className="text-xl">WhatsApp</div>
                    </div>
                  </motion.button>
                </a>
                <p className="text-sm text-muted-foreground mt-4 text-center lg:text-right">
                  Resposta em até 2 horas úteis
                </p>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="p-4 lg:p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <p className="text-white text-sm lg:text-base">{service}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-white/10 pt-12"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h4 className="text-white mb-2">Matheus Audiovisual</h4>
                <p className="text-sm text-muted-foreground">
                  Criador de conteúdo especializado em performance
                </p>
              </div>

              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="container mx-auto px-4 lg:px-8 relative z-10 mt-20"
      >
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Matheus Audiovisual. Todos os direitos reservados.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
