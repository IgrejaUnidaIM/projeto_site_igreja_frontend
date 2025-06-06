
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Image as ImageIcon, Video as VideoIcon, AlertCircle, Loader } from 'lucide-react';

/**
 * Interface para os itens da galeria vindos do Sanity
 * Cada item pode ser uma imagem ou um vídeo.
 */
interface GaleriaItem {
  _id: string;
  titulo?: string;
  descricao?: string;
  tipoMidia?: 'imagem' | 'video'; // Campo para diferenciar imagem de vídeo
  imagemUrl?: string; // URL da imagem
  videoUrl?: string; // URL do vídeo (ex: YouTube, Vimeo, ou upload direto)
}

const GaleriaPage: React.FC = () => {
  const [itens, setItens] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar itens da galeria do Sanity
     * - Ordenados por data de criação (mais recentes primeiro)
     * - Busca ID, título, descrição, tipo de mídia, URL da imagem e URL do vídeo
     * - Ajuste os nomes dos campos (tipoMidia, videoUrl) conforme configurado no seu Sanity
     */
    const query = `*[_type == "galeriaItem"] | order(_createdAt desc) {
      _id,
      titulo,
      descricao,
      tipoMidia, // Campo para identificar o tipo
      "imagemUrl": imagem.asset->url, // Busca URL da imagem se for imagem
      videoUrl // Busca URL do vídeo se for vídeo (ajuste o nome do campo)
    }`;

    console.log('GaleriaPage: Iniciando busca de dados...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<GaleriaItem[]>(query)
      .then((data) => {
        console.log('GaleriaPage: Dados recebidos do Sanity:', data);
        setItens(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('GaleriaPage: Erro ao buscar itens da galeria:', err);
        setError('Falha ao carregar os itens da galeria. Verifique a conexão ou a query.');
        setLoading(false);
      });
  }, []);

  // Função auxiliar para extrair ID de vídeo do YouTube
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Galeria</h1>

      {/* Estado de carregamento */}
      {loading && (
        <div className="flex justify-center items-center py-10" role="status" aria-live="polite">
          <Loader size={32} className="animate-spin text-blue-500" aria-hidden="true" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando galeria...</p>
        </div>
      )}

      {/* Estado de erro */}
      {error && (
        <div 
          className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={48} className="mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold mb-2">Erro ao Carregar Galeria</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">Verifique o console do navegador (F12) para mais detalhes técnicos.</p>
        </div>
      )}

      {/* Estado vazio */}
      {!loading && !error && itens.length === 0 && (
        <div 
          className="text-center py-10 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded"
          role="status"
        >
          <ImageIcon size={48} className="mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold mb-2">Galeria Vazia</h2>
          <p>Nenhum item foi adicionado à galeria ainda.</p>
        </div>
      )}

      {/* Grid de itens da galeria (imagens e vídeos) */}
      {!loading && !error && itens.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itens.map((item) => {
            const isVideo = item.tipoMidia === 'video' && item.videoUrl;
            const isImage = item.tipoMidia === 'imagem' && item.imagemUrl;
            const youtubeId = isVideo ? getYouTubeId(item.videoUrl || '') : null;

            return (
              <div 
                key={item._id} 
                className="group relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-video" // Ajustado para aspect-video
                tabIndex={0}
                role="figure"
                aria-label={item.titulo || (isVideo ? 'Vídeo da Galeria' : 'Imagem da Galeria')}
              >
                {isImage && (
                  <img 
                    src={item.imagemUrl} 
                    alt={item.titulo || 'Imagem da Galeria'} 
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
                    loading="lazy"
                  />
                )}
                {isVideo && youtubeId && (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={item.titulo || "Vídeo do YouTube"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {isVideo && !youtubeId && item.videoUrl && ( // Para vídeos diretos (não YouTube)
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source src={item.videoUrl} type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                )}
                {!isImage && !isVideo && ( // Placeholder se não for nem imagem nem vídeo válido
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    {item.tipoMidia === 'video' ? <VideoIcon size={48} aria-hidden="true" /> : <ImageIcon size={48} aria-hidden="true" />}
                  </div>
                )}
                {/* Overlay com título/descrição */}
                {(item.titulo || item.descricao) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                    {item.titulo && <h3 className="text-white font-bold text-lg mb-1 truncate">{item.titulo}</h3>}
                    {item.descricao && <p className="text-gray-200 text-sm line-clamp-2">{item.descricao}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * Exporta o componente GaleriaPage
 * Esta página exibe uma galeria dinâmica de imagens e vídeos, buscando dados do Sanity
 * Recursos implementados:
 * - Suporte a imagens e vídeos (YouTube embed ou vídeo direto)
 * - Grid responsivo
 * - Acessibilidade
 * - Estados de carregamento, erro e galeria vazia
 * - Efeito de hover/focus para mostrar detalhes
 */
export default GaleriaPage;
