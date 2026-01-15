import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  objective: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: 'Campanha de Lançamento - Produto Tech',
    description: 'Vídeo criativo para campanha de tráfego pago focada em conversão',
    objective: 'Gerar awareness e conversões para lançamento de produto tech. Resultado: +150% de ROI',
    thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'Tráfego Pago',
  },
  {
    id: 2,
    title: 'Reels Engajamento - Marca de Lifestyle',
    description: 'Conteúdo dinâmico e viral para redes sociais',
    objective: 'Aumentar engajamento e alcance orgânico. Resultado: 2M+ visualizações',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'Reels',
  },
  {
    id: 3,
    title: 'YouTube - Review Detalhado',
    description: 'Produção completa para canal do YouTube com identidade visual',
    objective: 'Educar audiência sobre o produto com storytelling envolvente',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'YouTube',
  },
  {
    id: 4,
    title: 'Anúncio Mobile First',
    description: 'Creative otimizado para visualização em dispositivos móveis',
    objective: 'Maximizar conversão em mobile ads. Taxa de cliques 3x acima da média',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'Anúncios',
  },
];

function VideoCard({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Video Container */}
      <div className="relative aspect-video rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 bg-black mb-6">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={video.thumbnail}
          loop
          playsInline
          muted={isMuted}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        />

        {/* Play Button */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110">
            {isPlaying ? (
              <Pause className="w-8 h-8 lg:w-10 lg:h-10 text-black ml-0" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 lg:w-10 lg:h-10 text-black ml-1" fill="currentColor" />
            )}
          </div>
        </button>

        {/* Controls */}
        <div className={`absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
            {video.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl lg:text-2xl text-white">{video.title}</h3>
        <p className="text-muted-foreground">{video.description}</p>
        <div className="pt-3 border-t border-white/10">
          <p className="text-sm text-muted-foreground">
            <span className="text-white">Objetivo:</span> {video.objective}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function VideosSection() {
  return (
    <section id="videos" className="py-20 lg:py-32 bg-gradient-to-b from-black to-black">
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
            Vídeos que <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">engajam</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Do Reels ao YouTube, cada vídeo é produzido com foco em storytelling e performance. 
            Veja alguns projetos e os resultados alcançados.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
