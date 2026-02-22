import { useEffect, useMemo, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { videos } from "../data/videos";

type VideoItem = typeof videos[number];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function aspectClass(aspect?: string) {
  const a = aspect ?? "16/9";
  return `aspect-[${a}]`;
}

function maxWClass(maxW?: VideoItem["maxW"]) {
  switch (maxW) {
    case "sm":
      return "max-w-sm";
    case "md":
      return "max-w-md";
    case "lg":
      return "max-w-lg";
    case "xl":
      return "max-w-xl";
    case "full":
      return "max-w-none";
    default:
      return "max-w-none";
  }
}

function VideoCard({
  video,
  isActive,
  requestPlay,
  onStopped,
}: {
  video: VideoItem;
  isActive: boolean;
  requestPlay: (id: VideoItem["id"], el: HTMLVideoElement) => void;
  onStopped: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerClass = useMemo(() => {
    return cx(
      "relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 bg-black mb-6",
      aspectClass(video.aspect),
      maxWClass(video.maxW),
      video.maxW && video.maxW !== "full" ? "mx-auto" : ""
    );
  }, [video.aspect, video.maxW]);

  // ✅ Pausa imediatamente ao perder o "ativo" (sem depender de isPlaying state)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!isActive) {
      el.pause();
      // opcional: voltar pro começo quando troca de vídeo
      // el.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (!el.paused) {
      el.pause();
      setIsPlaying(false);
      onStopped();
      return;
    }

    // ✅ avisa o pai qual elemento vai tocar (pai pausa o anterior na hora)
    requestPlay(video.id, el);

    try {
      await el.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      onStopped();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;

    const next = !isMuted;
    el.muted = next;
    setIsMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div className={containerClass}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={video.thumbnail}
          loop
          playsInline
          muted={isMuted}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            onStopped();
          }}
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>

        <div
          className={cx(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          )}
        />

        <button
          onClick={togglePlay}
          className={cx(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          )}
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all hover:scale-110">
            {isPlaying ? (
              <Pause className="w-8 h-8 lg:w-10 lg:h-10 text-black" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 lg:w-10 lg:h-10 text-black ml-1" fill="currentColor" />
            )}
          </div>
        </button>

        <div
          className={cx(
            "absolute bottom-4 right-4 flex gap-2 transition-opacity duration-300",
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/10">
            {video.category}
          </span>
        </div>
      </div>

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
  const [activeId, setActiveId] = useState<VideoItem["id"] | null>(null);

  // ✅ guarda o elemento que está tocando agora (real, não state)
  const currentlyPlayingRef = useRef<HTMLVideoElement | null>(null);

  const requestPlay = (id: VideoItem["id"], el: HTMLVideoElement) => {
    // pausa imediatamente o anterior, se existir e for diferente
    const prev = currentlyPlayingRef.current;
    if (prev && prev !== el) {
      prev.pause();
      // opcional:
      // prev.currentTime = 0;
    }

    currentlyPlayingRef.current = el;
    setActiveId(id);
  };

  return (
    <section id="videos" className="py-20 lg:py-32 bg-gradient-to-b from-black to-black">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            Vídeos que{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              engajam
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Do Reels ao YouTube, cada vídeo é produzido com foco em storytelling e performance.
            Veja alguns projetos e os resultados alcançados.
          </p>
        </motion.div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 768: 2, 1280: 3 }}>
          <Masonry gutter="32px">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isActive={activeId === video.id}
                requestPlay={requestPlay}
                onStopped={() => {
                  if (activeId === video.id) setActiveId(null);
                  if (currentlyPlayingRef.current) currentlyPlayingRef.current = null;
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
