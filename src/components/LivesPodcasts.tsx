// src/components/LivesPodcasts.tsx
import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, ExternalLink, Filter } from 'lucide-react';

// Interface para tipagem dos dados
interface LivePodcast {
  _id: string;
  titulo: string;
  slug: { current: string };
  tipo: 'live' | 'podcast';
  descricao: string;
  imagemCapa: any;
  dataHora: string;
  status: 'agendado' | 'ao_vivo' | 'finalizado';
  urlYoutube?: string;
  urlSpotify?: string;
  urlOutrasPlataformas?: Array<{
    plataforma: string;
    url: string;
  }>;
  pastor?: {
    nome: string;
    slug: { current: string };
  };
  tags?: string[];
  destaque: boolean;
  duracao?: number;
}

interface LivesPodcastsProps {
  limite?: number;
  mostrarFiltros?: boolean;
  apenasDestaques?: boolean;
}

const LivesPodcasts: React.FC<LivesPodcastsProps> = ({ 
  limite = 6, 
  mostrarFiltros = true, 
  apenasDestaques = false 
}) => {
  const [livesPodcasts, setLivesPodcasts] = useState<LivePodcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'live' | 'podcast'>('todos');

  // Query GROQ para buscar dados do Sanity
  const query = `
    *[_type == "livesPodcasts" ${apenasDestaques ? '&& destaque == true' : ''}] | order(dataHora desc) [0...${limite}] {
      _id,
      titulo,
      slug,
      tipo,
      descricao,
      imagemCapa,
      dataHora,
      status,
      urlYoutube,
      urlSpotify,
      urlOutrasPlataformas,
      pastor->{
        nome,
        slug
      },
      tags,
      destaque,
      duracao
    }
  `;

  useEffect(() => {
    const fetchLivesPodcasts = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(query);
        setLivesPodcasts(data);
      } catch (error) {
        console.error('Erro ao carregar lives e podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivesPodcasts();
  }, [query]);

  // Filtrar dados baseado no filtro ativo
  const dadosFiltrados = livesPodcasts.filter(item => {
    if (filtroAtivo === 'todos') return true;
    return item.tipo === filtroAtivo;
  });

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ao_vivo':
        return 'bg-red-500 text-white animate-pulse';
      case 'agendado':
        return 'bg-blue-500 text-white';
      case 'finalizado':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Função para obter texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ao_vivo':
        return '🔴 AO VIVO';
      case 'agendado':
        return '📅 AGENDADO';
      case 'finalizado':
        return '✅ FINALIZADO';
      default:
        return status.toUpperCase();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12" role="status" aria-label="Carregando conteúdo">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="sr-only">Carregando lives e podcasts...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filtros com acessibilidade melhorada */}
      {mostrarFiltros && (
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtros de conteúdo">
          <button
            onClick={() => setFiltroAtivo('todos')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              filtroAtivo === 'todos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={filtroAtivo === 'todos'}
            aria-label="Mostrar todos os conteúdos"
          >
            <Filter className="w-4 h-4 inline mr-1" aria-hidden="true" />
            Todos
          </button>
          <button
            onClick={() => setFiltroAtivo('live')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
              filtroAtivo === 'live'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={filtroAtivo === 'live'}
            aria-label="Mostrar apenas lives"
          >
            <span aria-hidden="true">🔴</span> Lives
          </button>
          <button
            onClick={() => setFiltroAtivo('podcast')}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              filtroAtivo === 'podcast'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            aria-pressed={filtroAtivo === 'podcast'}
            aria-label="Mostrar apenas podcasts"
          >
            <span aria-hidden="true">🎧</span> Podcasts
          </button>
        </div>
      )}

      {/* Grid de conteúdo com melhor responsividade */}
      {dadosFiltrados.length === 0 ? (
        <div className="text-center py-12" role="status">
          <p className="text-gray-500 text-base sm:text-lg">
            {filtroAtivo === 'todos' 
              ? 'Nenhum conteúdo encontrado.' 
              : `Nenhum ${filtroAtivo === 'live' ? 'live' : 'podcast'} encontrado.`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {dadosFiltrados.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            >
              {/* Imagem de capa com melhor responsividade */}
              <div className="relative">
                {item.imagemCapa && (
                  <img
                    src={urlFor(item.imagemCapa).width(400).height(225).url()}
                    alt={item.imagemCapa.alt || `Imagem de capa: ${item.titulo}`}
                    className="w-full h-40 sm:h-48 object-cover"
                    loading="lazy"
                  />
                )}
                
                {/* Status badge com melhor acessibilidade */}
                <div 
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}
                  role="status"
                  aria-label={`Status: ${getStatusText(item.status)}`}
                >
                  {getStatusText(item.status)}
                </div>

                {/* Tipo badge */}
                <div 
                  className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold bg-black bg-opacity-70 text-white"
                  aria-label={`Tipo de conteúdo: ${item.tipo === 'live' ? 'Live' : 'Podcast'}`}
                >
                  {item.tipo === 'live' ? '🔴 LIVE' : '🎧 PODCAST'}
                </div>
              </div>

              {/* Conteúdo com melhor estrutura semântica */}
              <div className="p-3 sm:p-4">
                <header>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.titulo}
                  </h3>
                </header>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.descricao}
                </p>

                {/* Informações adicionais com melhor responsividade */}
                <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 mb-3 space-y-1 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
                    <time dateTime={item.dataHora}>
                      {formatarData(item.dataHora)}
                    </time>
                  </div>
                  
                  {item.duracao && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 flex-shrink-0" aria-hidden="true" />
                      <span>{item.duracao} minutos</span>
                    </div>
                  )}
                </div>

                {/* Pastor */}
                {item.pastor && (
                  <p className="text-sm text-gray-600 mb-3">
                    Por: <span className="font-medium">{item.pastor.nome}</span>
                  </p>
                )}

                {/* Tags com melhor responsividade */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3" role="list" aria-label="Tags do conteúdo">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        role="listitem"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Botões de ação com melhor acessibilidade */}
                <div className="flex flex-wrap gap-2" role="group" aria-label="Links para acessar o conteúdo">
                  {item.urlYoutube && (
                    <a
                      href={item.urlYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                      aria-label={`Assistir ${item.titulo} no YouTube`}
                    >
                      <Play className="w-3 h-3 mr-1" aria-hidden="true" />
                      YouTube
                    </a>
                  )}
                  
                  {item.urlSpotify && (
                    <a
                      href={item.urlSpotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      aria-label={`Ouvir ${item.titulo} no Spotify`}
                    >
                      <Play className="w-3 h-3 mr-1" aria-hidden="true" />
                      Spotify
                    </a>
                  )}

                  {item.urlOutrasPlataformas && item.urlOutrasPlataformas.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.urlOutrasPlataformas.map((plataforma, index) => (
                        <a
                          key={index}
                          href={plataforma.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-2 py-1 bg-gray-600 text-white text-xs rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                          aria-label={`Acessar ${item.titulo} em ${plataforma.plataforma}`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" aria-hidden="true" />
                          {plataforma.plataforma}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default LivesPodcasts;
