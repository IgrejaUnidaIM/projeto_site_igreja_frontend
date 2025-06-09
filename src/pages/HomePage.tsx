
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { Gift, BookOpen, Loader, AlertCircle, Calendar, Star } from 'lucide-react'; // Adicionado Calendar e Star
import BannerSlider from '../components/layout/BannerSlider'; // Importa o componente de banner

/**
 * Interface para os dados de aniversariantes buscados do Sanity
 * Contém informações como nome e data de nascimento
 */
interface Aniversariante {
  _id: string;
  nome?: string;
  dataNascimento?: string; // Formato esperado: YYYY-MM-DD
}

/**
 * Interface para os dados de artigos buscados do Sanity
 * Contém informações como título, resumo, slug e URL da imagem
 */
interface Artigo {
  _id: string;
  titulo?: string;
  resumo?: string;
  slug?: {
    current?: string;
  };
  imagemPrincipalUrl?: string; // URL da imagem principal
  // Outros campos podem ser adicionados conforme necessidade
}

/**
 * Interface para os dados de eventos em destaque buscados do Sanity
 */
interface EventoDestaque {
  _id: string;
  titulo?: string;
  data?: string; // Formato YYYY-MM-DD
  local?: string;
  imagemUrl?: string;
}

const HomePage: React.FC = () => {
  const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [eventosDestaque, setEventosDestaque] = useState<EventoDestaque[]>([]); // Estado para eventos em destaque
  const [loadingAniversariantes, setLoadingAniversariantes] = useState<boolean>(true);
  const [loadingArtigos, setLoadingArtigos] = useState<boolean>(true);
  const [loadingEventos, setLoadingEventos] = useState<boolean>(true); // Estado de loading para eventos
  const [errorAniversariantes, setErrorAniversariantes] = useState<string | null>(null);
  const [errorArtigos, setErrorArtigos] = useState<string | null>(null);
  const [errorEventos, setErrorEventos] = useState<string | null>(null); // Estado de erro para eventos

  useEffect(() => {
    /**
     * Busca Aniversariantes do Mês Atual
     */
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1; // getMonth() é 0-indexado
    const mesAtualString = mesAtual.toString().padStart(2, '0'); 
    const queryAniversariantes = `*[_type == "membro" && string(dataNascimento)[5..7] == $mesAtual] | order(string(dataNascimento)[8..10] asc) {
      _id,
      nome,
      dataNascimento
    }`;

    console.log('HomePage: Buscando aniversariantes do mês:', mesAtualString);
    setLoadingAniversariantes(true);
    setErrorAniversariantes(null);

    sanityClient.fetch<Aniversariante[]>(queryAniversariantes, { mesAtual: mesAtualString })
      .then((data) => {
        console.log('HomePage: Aniversariantes recebidos:', data);
        setAniversariantes(data || []);
        setLoadingAniversariantes(false);
      })
      .catch((err) => {
        console.error('HomePage: Erro ao buscar aniversariantes:', err);
        setErrorAniversariantes('Falha ao carregar aniversariantes.');
        setLoadingAniversariantes(false);
      });

    /**
     * Busca Artigos Recentes
     */
    const queryArtigos = `*[_type == "artigo"] | order(_createdAt desc) [0...3] {
      _id,
      titulo,
      resumo,
      slug,
      "imagemPrincipalUrl": imagemPrincipal.asset->url
    }`;

    console.log('HomePage: Buscando artigos recentes...');
    setLoadingArtigos(true);
    setErrorArtigos(null);

    sanityClient.fetch<Artigo[]>(queryArtigos)
      .then((data) => {
        console.log('HomePage: Artigos recebidos:', data);
        setArtigos(data || []);
        setLoadingArtigos(false);
      })
      .catch((err) => {
        console.error('HomePage: Erro ao buscar artigos:', err);
        setErrorArtigos('Falha ao carregar artigos.');
        setLoadingArtigos(false);
      });

    /**
     * Busca Eventos em Destaque
     * - Filtra por destaque == true
     * - Ordena por data (mais próximos primeiro)
     * - Limita a 2 eventos (ajuste conforme necessário)
     */
    const queryEventosDestaque = `*[_type == "evento" && destaque == true] | order(data asc) [0...2] {
      _id,
      titulo,
      data,
      local,
      "imagemUrl": imagem.asset->url
    }`;

    console.log('HomePage: Buscando eventos em destaque...');
    setLoadingEventos(true);
    setErrorEventos(null);

    sanityClient.fetch<EventoDestaque[]>(queryEventosDestaque)
      .then((data) => {
        console.log('HomePage: Eventos em destaque recebidos:', data);
        setEventosDestaque(data || []);
        setLoadingEventos(false);
      })
      .catch((err) => {
        console.error('HomePage: Erro ao buscar eventos em destaque:', err);
        setErrorEventos('Falha ao carregar eventos em destaque.');
        setLoadingEventos(false);
      });

  }, []);

  /**
   * Função auxiliar para formatar apenas o dia do aniversário
   */
  const formatDiaAniversario = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(`${new Date().getFullYear()}-${dateString.substring(5, 10)}T12:00:00Z`);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', timeZone: 'UTC' });
    } catch (e) {
      console.error('Erro ao formatar dia do aniversário:', e);
      return '?';
    }
  };

  /**
   * Função auxiliar para formatar data do evento (DD/MM)
   */
  const formatDataEvento = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(`${dateString}T12:00:00Z`); // Assume UTC para evitar problemas de fuso
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
    } catch (e) {
      console.error('Erro ao formatar data do evento:', e);
      return '?';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de Boas-vindas ou Banner Principal */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo à 1ª Igreja Unida em Inácio Monteiro</h1>
        <p className="text-lg md:text-xl mb-6">um lugar de fé, amor e esperança.</p>
      </div>

      {/* Slider de Banners */}
      <BannerSlider />

      {/* Seção de Eventos em Destaque */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <Star className="mr-3 text-yellow-500" size={28} />
          Próximos Eventos em Destaque
        </h2>
        {loadingEventos && (
          <div className="flex items-center justify-center py-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Loader size={20} className="animate-spin text-blue-500 mr-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Carregando eventos...</span>
          </div>
        )}
        {errorEventos && (
          <div className="text-center py-2 px-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200 rounded text-sm">
            <AlertCircle size={18} className="inline mr-1" /> {errorEventos}
          </div>
        )}
        {!loadingEventos && !errorEventos && eventosDestaque.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">Nenhum evento em destaque no momento.</p>
        )}
        {!loadingEventos && !errorEventos && eventosDestaque.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventosDestaque.map((evento) => (
              <Link 
                key={evento._id} 
                to={`/eventos`} // Link para a página geral de eventos
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative">
                  {evento.imagemUrl ? (
                    <img 
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      src={evento.imagemUrl} 
                      alt={evento.titulo || 'Evento'}
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <Calendar size={40}/>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {formatDataEvento(evento.data)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{evento.titulo || 'Evento Sem Título'}</h3>
                  {evento.local && <p className="text-sm text-gray-600 dark:text-gray-400 truncate">Local: {evento.local}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Grid para Aniversariantes e Artigos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        
        {/* Coluna Aniversariantes */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <Gift className="mr-3 text-pink-500" size={28} />
            Aniversariantes do Mês
          </h2>
          {loadingAniversariantes && (
            <div className="flex items-center justify-center py-4">
              <Loader size={20} className="animate-spin text-blue-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Carregando...</span>
            </div>
          )}
          {!loadingAniversariantes && errorAniversariantes && (
            <div className="text-center py-2 px-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200 rounded text-sm">
              <AlertCircle size={18} className="inline mr-1" /> {errorAniversariantes}
            </div>
          )}
          {!loadingAniversariantes && !errorAniversariantes && aniversariantes.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Nenhum aniversariante este mês.</p>
          )}
          {!loadingAniversariantes && !errorAniversariantes && aniversariantes.length > 0 && (
            <ul className="space-y-2">
              {aniversariantes.map((aniversariante) => (
                <li key={aniversariante._id} className="flex justify-between items-center text-gray-700 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 pb-1">
                  <span>{aniversariante.nome || 'Nome não informado'}</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">Dia {formatDiaAniversario(aniversariante.dataNascimento)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Coluna Artigos Recentes */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
            <BookOpen className="mr-3 text-green-500" size={28} />
            Leia Nossos Artigos
          </h2>
          {loadingArtigos && (
            <div className="flex items-center justify-center py-4">
              <Loader size={20} className="animate-spin text-blue-500 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Carregando artigos...</span>
            </div>
          )}
           {errorArtigos && (
            <div className="text-center py-2 px-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200 rounded text-sm mb-4">
               <AlertCircle size={18} className="inline mr-1" /> {errorArtigos}
            </div>
          )}
          {!loadingArtigos && !errorArtigos && artigos.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">Nenhum artigo publicado recentemente.</p>
          )}
          {!loadingArtigos && !errorArtigos && artigos.length > 0 && (
            <div className="space-y-6">
              {artigos.map((artigo) => (
                <Link 
                  key={artigo._id} 
                  to={artigo.slug?.current ? `/artigos/${artigo.slug.current}` : '#'}
                  className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      {artigo.imagemPrincipalUrl ? (
                        <img 
                          className="h-48 w-full object-cover md:w-48 transition-transform duration-300 group-hover:scale-105" 
                          src={artigo.imagemPrincipalUrl} 
                          alt={artigo.titulo || 'Artigo'}
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-48 w-full md:w-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                           <BookOpen size={40}/>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{artigo.titulo || 'Artigo Sem Título'}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{artigo.resumo || 'Leia mais...'}</p>
                      </div>
                      <span className="text-sm text-blue-500 dark:text-blue-400 mt-4 self-start group-hover:underline">Ler artigo completo</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Outras seções da Homepage podem vir aqui */}

    </div>
  );
};

/**
 * Exporta o componente HomePage
 * Esta página exibe a página inicial do site com seções dinâmicas
 * Recursos implementados:
 * - Banner principal responsivo
 * - Seção de eventos em destaque (busca dinâmica do Sanity)
 * - Grid responsivo para aniversariantes e artigos
 * - Seção de aniversariantes do mês atual (busca dinâmica do Sanity)
 * - Seção de artigos recentes (busca dinâmica do Sanity)
 * - Estados de carregamento, erro e dados vazios
 * - Acessibilidade (alt text, aria-hidden)
 */
export default HomePage;

