// Exemplos de aspect que você pode usar
// "16/9" → YouTube horizontal
// "9/16" → Shorts/Reels vertical
// "1/1" → quadrado (feed)
// "4/5" → Instagram feed retrato
// "2/3" → algumas peças de ads
// E maxW para controlar o "tamanho visual":
// "md" (legal pra shorts)
// "xl" (legal pra 16:9)
// "full" (se quiser ocupar tudo)

// source: "local"  → videoUrl aponta para um arquivo local (public/assets/videos/)
// source: "drive"  → driveId é o ID do arquivo no Google Drive
//                    (ex.: para https://drive.google.com/file/d/ABC123XYZ/view, o ID é "ABC123XYZ")

export type VideoSource = "local" | "drive";

export const videos = [
  {
    title: 'Campanha de Lançamento - Produto Tech',
    description: 'Vídeo criativo para campanha de tráfego pago focada em conversão',
    objective: 'Gerar awareness e conversões para lançamento de produto tech. Resultado: +150% de ROI',
    thumbnail: `./assets/videos/ForBiggerBlazes.jpeg`,
    source: "local" as VideoSource,
    videoUrl: `./assets/videos/ForBiggerBlazes.mp4`,
    category: 'Tráfego Pago',
    aspect: "16/9",
    maxW: "xl",
  },
  {
    title: 'Reels Engajamento - Corrida de Rua',
    description: 'Conteúdo dinâmico e viral para redes sociais',
    objective: 'Aumentar engajamento e alcance orgânico. Resultado: 2M+ visualizações',
    thumbnail: './assets/videos/reels_gislainy.jpeg',
    source: "local" as VideoSource,
    videoUrl: './assets/videos/reels_gislainy.mp4',
    category: 'Reels',
    aspect: "4/5",
    maxW: "md",
  },
  {
    // Exemplo de vídeo hospedado no Google Drive.
    // Substitua o driveId pelo ID real do seu arquivo no Drive.
    // Para obter o ID: abra o arquivo no Drive → clique em "Compartilhar" →
    // copie o link → o ID está entre "/d/" e "/view" na URL.
    title: 'Exemplo - Vídeo do Google Drive',
    description: 'Vídeo hospedado diretamente no Google Drive',
    objective: 'Demonstrar integração com Google Drive no portfólio',
    thumbnail: '',
    source: "drive" as VideoSource,
    driveId: 'SEU_DRIVE_FILE_ID_AQUI',
    category: 'Google Drive',
    aspect: "16/9",
    maxW: "xl",
  },
  {
    title: 'Campanha de Lançamento - Produto Tech',
    description: 'Vídeo criativo para campanha de tráfego pago focada em conversão',
    objective: 'Gerar awareness e conversões para lançamento de produto tech. Resultado: +150% de ROI',
    thumbnail: `./assets/videos/ForBiggerBlazes.jpeg`,
    source: "local" as VideoSource,
    videoUrl: `./assets/videos/ForBiggerBlazes.mp4`,
    category: 'Tráfego Pago',
    aspect: "16/9",
    maxW: "xl",
  },
  {
    title: 'Reels Engajamento - Corrida de Rua',
    description: 'Conteúdo dinâmico e viral para redes sociais',
    objective: 'Aumentar engajamento e alcance orgânico. Resultado: 2M+ visualizações',
    thumbnail: './assets/videos/reels_gislainy.jpeg',
    source: "local" as VideoSource,
    videoUrl: './assets/videos/reels_gislainy.mp4',
    category: 'Reels',
    aspect: "4/5",
    maxW: "md",
  },
  {
    title: 'Reels Engajamento - Corrida de Rua',
    description: 'Conteúdo dinâmico e viral para redes sociais',
    objective: 'Aumentar engajamento e alcance orgânico. Resultado: 2M+ visualizações',
    thumbnail: './assets/videos/reels_gislainy.jpeg',
    source: "local" as VideoSource,
    videoUrl: './assets/videos/reels_gislainy.mp4',
    category: 'Reels',
    aspect: "4/5",
    maxW: "md",
  },
];
