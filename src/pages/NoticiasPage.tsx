import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { Newspaper, Loader, AlertCircle } from 'lucide-react';

/**
 * Interface para os dados de notícias buscados do Sanity
 * Ajuste os nomes dos campos conforme seu schema
 */
interface Noticia {
  _id: string;
  titulo?: string;
  resumo?: string;
  dataPublicacao?: string; // Formato YYYY-MM-DD
  imagemPrincipalUrl?: string;
  slug?: {
    current?: string;
  };
}

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar notícias do Sanity
     * - Ordenadas por data de publicação (mais recentes primeiro)
     * - Ajuste o nome do tipo (_type == 'noticia') e dos campos
     */
    const query = `*[_type == "noticia"] | order(dataPublicacao desc) {
      _id,
      titulo,
      resumo,
      dataPublicacao,
      "imagemPrincipalUrl": imagemPrincipal.asset->url,
      slug
    }`;

    console.log('NoticiasPage: Buscando notícias...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<Noticia[]>(query)
      .then((data) => {
        console.log('NoticiasPage: Notícias recebidas:', data);
        setNoticias(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('NoticiasPage: Erro ao buscar notícias:', err);
        setError('Falha ao carregar as notícias.');
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

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Notícias</h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader size={32} className="animate-spin text-blue-500" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando notícias...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erro ao Carregar</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && noticias.length === 0 && (
        <div className="text-center py-10 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded">
          <Newspaper size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhuma Notícia Encontrada</h2>
          <p>Ainda não há notícias publicadas.</p>
        </div>
      )}

      {!loading && !error && noticias.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <Link 
              key={noticia._id} 
              to={noticia.slug?.current ? `/noticias/${noticia.slug.current}` : '#'}
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {noticia.imagemPrincipalUrl ? (
                <img 
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  src={noticia.imagemPrincipalUrl} 
                  alt={noticia.titulo || 'Notícia'}
                  loading="lazy"
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <Newspaper size={40}/>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{noticia.titulo || 'Notícia Sem Título'}</h3>
                {noticia.dataPublicacao && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{formatData(noticia.dataPublicacao)}</p>
                )}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">{noticia.resumo || 'Leia mais...'}</p>
                <span className="text-sm text-blue-500 dark:text-blue-400 group-hover:underline">Ler notícia completa</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Adicionar paginação se necessário */}
    </div>
  );
};

export default NoticiasPage;

