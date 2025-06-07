import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { BookText, BookOpen, User, Calendar, Loader, AlertCircle, Filter } from 'lucide-react';

/**
 * Interface para os dados de artigos buscados do Sanity
 */
interface Artigo {
  _id: string;
  titulo?: string;
  autor?: string;
  dataPublicacao?: string; // Formato YYYY-MM-DD
  resumo?: string;
  conteudo?: any[]; // Tipo Portable Text
  imagemPrincipalUrl?: string;
  slug?: {
    current?: string;
  };
  tipo: 'artigo';
}

/**
 * Interface para os dados de sermões escritos buscados do Sanity
 */
interface SermaoEscrito {
  _id: string;
  titulo?: string;
  pregador?: string;
  data?: string; // Formato YYYY-MM-DD
  conteudo?: any[]; // Tipo Portable Text
  slug?: {
    current?: string;
  };
  tipo: 'sermao';
}

// Tipo união para representar ambos os tipos de conteúdo
type ConteudoEscrito = Artigo | SermaoEscrito;

const ArtigosPage: React.FC = () => {
  const [conteudos, setConteudos] = useState<ConteudoEscrito[]>([]);
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'artigos' | 'sermoes'>('todos');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar tanto artigos quanto sermões escritos do Sanity
     * - Ordenados por data (mais recentes primeiro)
     * - Ajuste os nomes dos tipos e campos conforme seu schema
     */
    const query = `*[_type == "artigo" || _type == "sermaoEscrito"] | order(coalesce(dataPublicacao, data) desc) {
      _id,
      titulo,
      "autor": select(
        _type == "artigo" => autor,
        _type == "sermaoEscrito" => pregador
      ),
      "dataPublicacao": select(
        _type == "artigo" => dataPublicacao,
        _type == "sermaoEscrito" => data
      ),
      resumo,
      conteudo,
      "imagemPrincipalUrl": select(
        _type == "artigo" => imagemPrincipal.asset->url,
        _type == "sermaoEscrito" => null
      ),
      slug,
      "tipo": select(
        _type == "artigo" => "artigo",
        _type == "sermaoEscrito" => "sermao"
      )
    }`;

    console.log('ArtigosPage: Buscando conteúdos escritos...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<ConteudoEscrito[]>(query)
      .then((data) => {
        console.log('ArtigosPage: Conteúdos recebidos:', data);
        setConteudos(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ArtigosPage: Erro ao buscar conteúdos:', err);
        setError('Falha ao carregar os conteúdos.');
        setLoading(false);
      });
  }, []);

  /**
   * Função auxiliar para formatar data (DD/MM/YYYY)
   */
  const formatData = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(`${dateString}T12:00:00Z`);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
    } catch (e) {
      return '?';
    }
  };

  // Filtra os conteúdos com base no filtro ativo
  const conteudosFiltrados = conteudos.filter(item => {
    if (filtroAtivo === 'todos') return true;
    if (filtroAtivo === 'artigos') return item.tipo === 'artigo';
    if (filtroAtivo === 'sermoes') return item.tipo === 'sermao';
    return true;
  });

  // Componentes customizados para Portable Text
  const portableTextComponents = {
    block: {
      normal: ({children}: any) => <p className="mb-4 text-gray-700 dark:text-gray-300">{children}</p>,
      h1: ({children}: any) => <h1 className="text-3xl font-bold my-6 text-gray-900 dark:text-white">{children}</h1>,
      h2: ({children}: any) => <h2 className="text-2xl font-bold my-5 text-gray-800 dark:text-gray-100">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-xl font-bold my-4 text-gray-800 dark:text-gray-200">{children}</h3>,
      blockquote: ({children}: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400">{children}</blockquote>,
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc list-inside mb-4 pl-4 text-gray-700 dark:text-gray-300">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal list-inside mb-4 pl-4 text-gray-700 dark:text-gray-300">{children}</ol>,
    },
    listItem: {
      bullet: ({children}: any) => <li className="mb-1">{children}</li>,
      number: ({children}: any) => <li className="mb-1">{children}</li>,
    },
    marks: {
      link: ({value, children}: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow noreferrer' : undefined} className="text-blue-600 dark:text-blue-400 hover:underline">
            {children}
          </a>
        );
      },
      strong: ({children}: any) => <strong className="font-bold">{children}</strong>,
      em: ({children}: any) => <em className="italic">{children}</em>,
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">Artigos e Sermões</h1>
      
      {/* Filtros */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
          <Filter size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-3">Filtrar por:</span>
          <div className="flex space-x-1">
            <button 
              onClick={() => setFiltroAtivo('todos')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filtroAtivo === 'todos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFiltroAtivo('artigos')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filtroAtivo === 'artigos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Artigos
            </button>
            <button 
              onClick={() => setFiltroAtivo('sermoes')} 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filtroAtivo === 'sermoes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Sermões
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader size={32} className="animate-spin text-blue-500" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando conteúdos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erro ao Carregar</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && conteudosFiltrados.length === 0 && (
        <div className="text-center py-10 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded">
          {filtroAtivo === 'todos' && <BookText size={48} className="mx-auto mb-4" />}
          {filtroAtivo === 'artigos' && <BookOpen size={48} className="mx-auto mb-4" />}
          {filtroAtivo === 'sermoes' && <BookText size={48} className="mx-auto mb-4" />}
          <h2 className="text-2xl font-bold mb-2">Nenhum Conteúdo Encontrado</h2>
          <p>
            {filtroAtivo === 'todos' && 'Ainda não há artigos ou sermões publicados.'}
            {filtroAtivo === 'artigos' && 'Ainda não há artigos publicados.'}
            {filtroAtivo === 'sermoes' && 'Ainda não há sermões publicados.'}
          </p>
        </div>
      )}

      {!loading && !error && conteudosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {conteudosFiltrados.map((item) => (
            <article 
              key={item._id} 
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col ${
                item.tipo === 'sermao' ? 'border-l-4 border-blue-600 dark:border-blue-500' : ''
              }`}
            >
              {/* Cabeçalho do Card */}
              <div className="p-6 pb-3">
                {/* Badge do tipo */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    item.tipo === 'artigo' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {item.tipo === 'artigo' ? 'Artigo' : 'Sermão'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatData(item.dataPublicacao || item.data)}
                  </span>
                </div>
                
                {/* Título */}
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.slug?.current ? (
                    <Link to={`/${item.tipo === 'artigo' ? 'artigos' : 'sermoes'}/${item.slug.current}`}>
                      {item.titulo || (item.tipo === 'artigo' ? 'Artigo Sem Título' : 'Sermão Sem Título')}
                    </Link>
                  ) : (
                    item.titulo || (item.tipo === 'artigo' ? 'Artigo Sem Título' : 'Sermão Sem Título')
                  )}
                </h2>
                
                {/* Autor/Pregador */}
                {item.autor && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <User size={16} className="mr-1" />
                    <span>{item.autor}</span>
                  </div>
                )}
              </div>
              
              {/* Conteúdo do Card */}
              <div className="px-6 pb-6 flex-grow">
                {/* Imagem para artigos */}
                {item.tipo === 'artigo' && item.imagemPrincipalUrl && (
                  <div className="mb-4 rounded overflow-hidden">
                    <img 
                      src={item.imagemPrincipalUrl} 
                      alt={item.titulo || 'Imagem do artigo'} 
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {/* Resumo ou início do conteúdo */}
                <div className="text-gray-700 dark:text-gray-300">
                  {item.resumo ? (
                    <p className="line-clamp-3">{item.resumo}</p>
                  ) : item.conteudo ? (
                    <div className="line-clamp-3 prose prose-sm dark:prose-invert max-w-none">
                      <PortableText 
                        value={item.conteudo.slice(0, 1)} 
                        components={portableTextComponents} 
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">Sem conteúdo disponível</p>
                  )}
                </div>
                
                {/* Link para ler mais */}
                {item.slug?.current && (
                  <Link 
                    to={`/${item.tipo === 'artigo' ? 'artigos' : 'sermoes'}/${item.slug.current}`}
                    className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Ler {item.tipo === 'artigo' ? 'artigo' : 'sermão'} completo
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtigosPage;
