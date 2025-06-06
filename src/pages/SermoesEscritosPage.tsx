import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { BookText, User, Calendar, Loader, AlertCircle } from 'lucide-react';

/**
 * Interface para os dados de sermões escritos buscados do Sanity
 * Ajuste os nomes dos campos (pregador, data, conteudo) conforme seu schema
 */
interface SermaoEscrito {
  _id: string;
  titulo?: string;
  pregador?: string; // Ou referência a um tipo 'pessoa'
  data?: string; // Formato YYYY-MM-DD
  conteudo?: any[]; // Tipo Portable Text
  slug?: {
    current?: string;
  };
}

const SermoesEscritosPage: React.FC = () => {
  const [sermoes, setSermoes] = useState<SermaoEscrito[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar sermões escritos do Sanity
     * - Ordenados por data (mais recentes primeiro)
     * - Ajuste o nome do tipo (_type == 'sermaoEscrito') e dos campos
     */
    const query = `*[_type == "sermaoEscrito"] | order(data desc) {
      _id,
      titulo,
      pregador,
      data,
      conteudo,
      slug
    }`;

    console.log('SermoesEscritosPage: Buscando sermões...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<SermaoEscrito[]>(query)
      .then((data) => {
        console.log('SermoesEscritosPage: Sermões recebidos:', data);
        setSermoes(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('SermoesEscritosPage: Erro ao buscar sermões:', err);
        setError('Falha ao carregar os sermões.');
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

  // Componentes customizados para Portable Text (opcional, para estilização)
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
    // Adicione outros tipos e marcas conforme necessário
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Sermões Escritos</h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader size={32} className="animate-spin text-blue-500" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando sermões...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erro ao Carregar</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && sermoes.length === 0 && (
        <div className="text-center py-10 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded">
          <BookText size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Nenhum Sermão Encontrado</h2>
          <p>Ainda não há sermões escritos publicados.</p>
        </div>
      )}

      {!loading && !error && sermoes.length > 0 && (
        <div className="space-y-12">
          {sermoes.map((sermao) => (
            <article key={sermao._id} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {/* Adicionar link para página individual do sermão se houver slug */}
                {sermao.slug?.current ? (
                  <Link to={`/sermoes/${sermao.slug.current}`}>{sermao.titulo || 'Sermão Sem Título'}</Link>
                ) : (
                  sermao.titulo || 'Sermão Sem Título'
                )}
              </h2>
              <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                {sermao.pregador && (
                  <span className="flex items-center mr-4 mb-1">
                    <User size={16} className="mr-1" /> {sermao.pregador}
                  </span>
                )}
                {sermao.data && (
                  <span className="flex items-center mr-4 mb-1">
                    <Calendar size={16} className="mr-1" /> {formatData(sermao.data)}
                  </span>
                )}
              </div>
              {sermao.conteudo && (
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <PortableText value={sermao.conteudo} components={portableTextComponents} />
                </div>
              )}
              {/* Adicionar link para ler mais se o conteúdo for muito longo ou se houver página individual */}
              {sermao.slug?.current && (
                 <Link to={`/sermoes/${sermao.slug.current}`} className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Ler sermão completo</Link>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default SermoesEscritosPage;

