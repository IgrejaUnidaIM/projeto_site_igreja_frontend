
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Image as ImageIcon, Video as VideoIcon, AlertCircle, Loader, X } from 'lucide-react';

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
  const [imagemAmpliada, setImagemAmpliada] = useState<string | null>(null);
  const [itemSelecionado, setItemSelecionado] = useState<GaleriaItem | null>(null);

  useEffect(() => {
    /**
     * Query para buscar itens da galeria do Sanity
     * - Ordenados por data de criação (mais recentes primeiro)
     * - Busca ID, título, descrição, tipo de mídia, URL da imagem e URL do vídeo
     * - Ajuste os nomes dos campos (tipoMidia, videoUrl) conforme configurado no seu Sanity
     */
    const query = `*[_type in ["galeriaImagem", "galeriaVideo"]] | order(_createdAt desc) {
      _id,
      titulo,
      descricao,
      "tipoMidia": _type == "galeriaImagem" ? "imagem" : "video",
      "imagemUrl": imagem.asset->url,
      "videoUrl": videoUrl
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

  // Função para ampliar a imagem
  const ampliarImagem = (url: string) => {
    setImagemAmpliada(url);
  };

  // Função para fechar a imagem ampliada
  const fecharImagemAmpliada = () => {
    setImagemAmpliada(null);
  };

  // Função para mostrar detalhes do item
  const mostrarDetalhes = (item: GaleriaItem) => {
    setItemSelecionado(item);
  };

  // Função para fechar detalhes do item
  const fecharDetalhes = () => {
    setItemSelecionado(null);
  };

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
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-focus:scale-105 cursor-pointer"
                    loading="lazy"
                    onClick={() => ampliarImagem(item.imagemUrl!)}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        mostrarDetalhes(item);
                      }}
                      className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Ver detalhes
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal para imagem ampliada */}
      {imagemAmpliada && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={fecharImagemAmpliada}>
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button 
              className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                fecharImagemAmpliada();
              }}
            >
              <X size={24} className="text-gray-800 dark:text-white" />
            </button>
            <img 
              src={imagemAmpliada} 
              alt="Imagem ampliada" 
              className="max-h-[90vh] max-w-full object-contain mx-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Modal para detalhes do item */}
      {itemSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={fecharDetalhes}>
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {itemSelecionado.tipoMidia === 'imagem' && itemSelecionado.imagemUrl && (
                <img 
                  src={itemSelecionado.imagemUrl} 
                  alt={itemSelecionado.titulo || 'Imagem da Galeria'} 
                  className="w-full h-64 object-cover"
                />
              )}
              {itemSelecionado.tipoMidia === 'video' && itemSelecionado.videoUrl && (
                <div className="w-full h-64">
                  {getYouTubeId(itemSelecionado.videoUrl) ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeId(itemSelecionado.videoUrl)}`}
                      title={itemSelecionado.titulo || "Vídeo do YouTube"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={itemSelecionado.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
              )}
              <button 
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg"
                onClick={fecharDetalhes}
              >
                <X size={24} className="text-gray-800 dark:text-white" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{itemSelecionado.titulo || (itemSelecionado.tipoMidia === 'video' ? 'Vídeo' : 'Imagem')}</h2>
              {itemSelecionado.descricao && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">{itemSelecionado.descricao}</p>
              )}
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={fecharDetalhes}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
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
 * - Ampliação de imagens ao clicar
 * - Modal de detalhes para cada item
 */
export default GaleriaPage;
