import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Loader, AlertCircle, Image as ImageIcon, Video as VideoIcon, X, Download, Filter } from 'lucide-react';

/**
 * Interface para os itens da galeria vindos do Sanity
 * Cada item pode ser uma imagem ou um vídeo.
 */
interface GaleriaItem {
  _id: string;
  titulo?: string;
  _type: string;
  imagemUrl?: string; // URL da imagem
  imagemLegenda?: string; // Legenda da imagem (dentro do campo imagem)
  imagemAlt?: string; // Alt text da imagem
  videoUrl?: string; // URL do vídeo (ex: YouTube, Vimeo, ou upload direto)
  legenda?: string; // Descrição/biografia detalhada (para vídeos)
  categoria?: string; // Categoria do item
  dataFoto?: string; // Data da foto
  dataVideo?: string; // Data do vídeo
}

const GaleriaPage: React.FC = () => {
  const [itens, setItens] = useState<GaleriaItem[]>([]);
  const [itensFiltrados, setItensFiltrados] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemSelecionado, setItemSelecionado] = useState<GaleriaItem | null>(null);
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'imagens' | 'videos'>('todos');

  useEffect(() => {
    /**
     * Query para buscar itens da galeria do Sanity
     * - Ordenados por data de criação (mais recentes primeiro)
     * - Busca ID, título, tipo, URL da imagem, URL do vídeo e legenda
     */
    const query = `*[_type in ["galeriaImagem", "galeriaVideo"]] | order(_createdAt desc) {
      _id,
      titulo,
      _type,
      "imagemUrl": imagem.asset->url,
      "imagemLegenda": imagem.legenda,
      "imagemAlt": imagem.alt,
      videoUrl,
      legenda,
      categoria,
      dataFoto,
      dataVideo
    }`;

    console.log('GaleriaPage: Iniciando busca de dados...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<GaleriaItem[]>(query)
      .then((data) => {
        console.log('GaleriaPage: Dados recebidos do Sanity:', data);
        setItens(data || []);
        setItensFiltrados(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('GaleriaPage: Erro ao buscar itens da galeria:', err);
        setError('Falha ao carregar os itens da galeria. Verifique a conexão ou a query.');
        setLoading(false);
      });
  }, []);

  // Efeito para filtrar itens quando o filtro muda
  useEffect(() => {
    if (filtroAtivo === 'todos') {
      setItensFiltrados(itens);
    } else if (filtroAtivo === 'imagens') {
      setItensFiltrados(itens.filter(item => item._type === 'galeriaImagem'));
    } else if (filtroAtivo === 'videos') {
      setItensFiltrados(itens.filter(item => item._type === 'galeriaVideo'));
    }
  }, [filtroAtivo, itens]);

  /**
   * Função para extrair ID do YouTube de uma URL
   * Suporta vários formatos de URL do YouTube, incluindo URLs de live
   */
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    console.log('Tentando extrair ID do YouTube da URL:', url);
    
    // Limpar a URL removendo parâmetros desnecessários mas mantendo o ID
    let cleanUrl = url.trim();
    
    // Regex específico para URLs de live do YouTube
    const liveMatch = cleanUrl.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/);
    if (liveMatch && liveMatch[1]) {
      console.log('YouTube Live ID extraído:', liveMatch[1]);
      return liveMatch[1];
    }
    
    // Regex para URLs padrão do YouTube
    const patterns = [
      // URL padrão: youtube.com/watch?v=ID
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      // URL curta: youtu.be/ID
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      // URL embed: youtube.com/embed/ID
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      // URL v: youtube.com/v/ID
      /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match && match[1]) {
        console.log('YouTube ID extraído:', match[1]);
        return match[1];
      }
    }
    
    console.log('Não foi possível extrair ID do YouTube da URL:', url);
    return null;
  };

  /**
   * Função para mostrar detalhes de um item
   */
  const mostrarDetalhes = (item: GaleriaItem) => {
    setItemSelecionado(item);
  };

  /**
   * Função para fechar detalhes
   */
  const fecharDetalhes = () => {
    setItemSelecionado(null);
  };

  /**
   * Função para fazer download de uma imagem
   */
  const downloadImagem = async (url: string, titulo: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${titulo || 'imagem'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Erro ao fazer download da imagem:', error);
      alert('Erro ao fazer download da imagem');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Galeria</h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setFiltroAtivo('todos')}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            filtroAtivo === 'todos'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Filter className="mr-2" size={18} />
          Todos ({itens.length})
        </button>
        <button
          onClick={() => setFiltroAtivo('imagens')}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            filtroAtivo === 'imagens'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <ImageIcon className="mr-2" size={18} />
          Fotos ({itens.filter(item => item._type === 'galeriaImagem').length})
        </button>
        <button
          onClick={() => setFiltroAtivo('videos')}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            filtroAtivo === 'videos'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <VideoIcon className="mr-2" size={18} />
          Vídeos ({itens.filter(item => item._type === 'galeriaVideo').length})
        </button>
      </div>

      {/* Estados de carregamento e erro */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader size={32} className="animate-spin text-blue-500 mr-3" />
          <span className="text-lg text-gray-600 dark:text-gray-400">Carregando galeria...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-8 px-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200 rounded-lg">
          <AlertCircle size={24} className="inline mr-2" />
          <span className="font-medium">Erro ao Carregar Galeria</span>
          <p className="mt-2 text-sm">{error}</p>
          <p className="mt-1 text-xs">Verifique o console do navegador (F12) para mais detalhes técnicos.</p>
        </div>
      )}

      {/* Mensagem quando não há itens */}
      {!loading && !error && itensFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            {filtroAtivo === 'todos' && <Filter size={48} className="mx-auto mb-2" />}
            {filtroAtivo === 'imagens' && <ImageIcon size={48} className="mx-auto mb-2" />}
            {filtroAtivo === 'videos' && <VideoIcon size={48} className="mx-auto mb-2" />}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {filtroAtivo === 'todos' && 'Nenhum item encontrado na galeria.'}
            {filtroAtivo === 'imagens' && 'Nenhuma foto encontrada.'}
            {filtroAtivo === 'videos' && 'Nenhum vídeo encontrado.'}
          </p>
        </div>
      )}

      {/* Grid de itens da galeria (imagens e vídeos) */}
      {!loading && !error && itensFiltrados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itensFiltrados.map((item) => {
            const isVideo = item._type === 'galeriaVideo' && item.videoUrl;
            const isImage = item._type === 'galeriaImagem' && item.imagemUrl;
            const youtubeId = isVideo ? getYouTubeId(item.videoUrl || '') : null;

            return (
              <div 
                key={item._id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                onClick={() => mostrarDetalhes(item)}
              >
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  {/* Renderização de imagem */}
                  {isImage && (
                    <div className="relative w-full h-full">
                      <img 
                        src={item.imagemUrl} 
                        alt={item.titulo || 'Imagem da Galeria'} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Botão de download para imagens */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImagem(item.imagemUrl!, item.titulo || 'imagem');
                        }}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        title="Download da imagem"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  )}
                  
                  {/* Renderização de vídeo */}
                  {isVideo && (
                    <div className="w-full h-full">
                      {youtubeId ? (
                        <div className="relative w-full h-full">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                            title={item.titulo || 'Vídeo do YouTube'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                          {/* Overlay para indicar que é um vídeo */}
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            YouTube
                          </div>
                        </div>
                      ) : (
                        <video 
                          className="w-full h-full object-cover" 
                          controls
                          preload="metadata"
                        >
                          <source src={item.videoUrl} type="video/mp4" />
                          Seu navegador não suporta o elemento de vídeo.
                        </video>
                      )}
                    </div>
                  )}
                  
                  {!isImage && !isVideo && ( // Placeholder se não for nem imagem nem vídeo válido
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                      {item._type === 'galeriaVideo' ? <VideoIcon size={48} aria-hidden="true" /> : <ImageIcon size={48} aria-hidden="true" />}
                    </div>
                  )}
                  
                  {/* Overlay com título */}
                  {item.titulo && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-bold text-lg mb-1 truncate">{item.titulo}</h3>
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
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de detalhes */}
      {itemSelecionado && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={fecharDetalhes}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {itemSelecionado._type === 'galeriaImagem' && itemSelecionado.imagemUrl && (
                <div className="relative">
                  <img 
                    src={itemSelecionado.imagemUrl} 
                    alt={itemSelecionado.titulo || 'Imagem da Galeria'} 
                    className="w-full h-96 object-cover"
                  />
                  {/* Botão de download no modal */}
                  <button
                    onClick={() => downloadImagem(itemSelecionado.imagemUrl!, itemSelecionado.titulo || 'imagem')}
                    className="absolute top-4 right-16 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    title="Download da imagem"
                  >
                    <Download size={20} />
                  </button>
                </div>
              )}
              {itemSelecionado._type === 'galeriaVideo' && itemSelecionado.videoUrl && (
                <div className="w-full h-96">
                  {getYouTubeId(itemSelecionado.videoUrl) ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeId(itemSelecionado.videoUrl)}?rel=0&modestbranding=1&autoplay=0`}
                      title={itemSelecionado.titulo || 'Vídeo do YouTube'}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video 
                      className="w-full h-full object-cover" 
                      controls
                      preload="metadata"
                    >
                      <source src={itemSelecionado.videoUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  )}
                </div>
              )}
              
              {/* Botão de fechar */}
              <button 
                onClick={fecharDetalhes}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Fechar detalhes"
              >
                <X size={20} className="text-gray-800 dark:text-white" />
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {itemSelecionado.titulo || (itemSelecionado._type === 'galeriaVideo' ? 'Vídeo' : 'Imagem')}
              </h2>
              
              {/* Descrição/Legenda detalhada */}
              {(itemSelecionado.legenda || itemSelecionado.imagemLegenda) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Descrição</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {itemSelecionado._type === 'galeriaVideo' 
                      ? itemSelecionado.legenda 
                      : itemSelecionado.imagemLegenda || itemSelecionado.legenda
                    }
                  </p>
                </div>
              )}
              
              {/* Informações adicionais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {itemSelecionado.categoria && (
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Categoria</h4>
                    <p className="text-gray-600 dark:text-gray-400">{itemSelecionado.categoria}</p>
                  </div>
                )}
                
                {(itemSelecionado.dataFoto || itemSelecionado.dataVideo) && (
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Data</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {itemSelecionado._type === 'galeriaVideo' 
                        ? new Date(itemSelecionado.dataVideo!).toLocaleDateString('pt-BR')
                        : new Date(itemSelecionado.dataFoto!).toLocaleDateString('pt-BR')
                      }
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Tipo: {itemSelecionado._type === 'galeriaVideo' ? 'Vídeo' : 'Imagem'}
                </div>
                <button 
                  onClick={fecharDetalhes}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
 * Esta página exibe uma galeria de imagens e vídeos com funcionalidades de:
 * - Filtros por tipo (todos, imagens, vídeos)
 * - Visualização em modal com detalhes
 * - Download de imagens
 * - Suporte a vídeos do YouTube e uploads diretos
 * - Layout responsivo
 * - Estados de carregamento e erro
 */
export default GaleriaPage;

