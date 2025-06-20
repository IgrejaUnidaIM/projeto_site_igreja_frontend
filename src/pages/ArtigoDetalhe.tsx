import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient.js';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar, User, Loader, AlertCircle} from 'lucide-react';

interface ArtigoDetalhes {
  _id: string;
  titulo?: string;
  autor?: string;
  dataPublicacao?: string;
  conteudo?: any[];
  imagemPrincipalUrl?: string;
}

const ArtigoDetalhe: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [artigo, setArtigo] = useState<ArtigoDetalhes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('Slug não fornecido');
      setLoading(false);
      return;
    }

    const query = `*[_type == "artigo" && slug.current == $slug][0]{
      _id,
      titulo,
      autor,
      dataPublicacao,
      conteudo,
      "imagemPrincipalUrl": imagemPrincipal.asset->url
    }`;

    console.log('ArtigoDetalhe: Buscando artigo com slug:', slug);
    setLoading(true);
    setError(null);

    sanityClient.fetch<ArtigoDetalhes>(query, { slug })
      .then((data) => {
        console.log('ArtigoDetalhe: Artigo recebido:', data);
        if (!data) {
          setError('Artigo não encontrado');
        } else {
          setArtigo(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('ArtigoDetalhe: Erro ao buscar artigo:', err);
        setError('Falha ao carregar o artigo.');
        setLoading(false);
      });
  }, [slug]);

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
    types: {
      image: ({value}: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        // Construir URL da imagem usando o ID do asset
        const imageUrl = `https://cdn.sanity.io/images/${process.env.REACT_APP_SANITY_PROJECT_ID}/${process.env.REACT_APP_SANITY_DATASET}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
        
        return (
          <figure className="my-8">
            <img
              src={imageUrl}
              alt={value.alt || 'Imagem do artigo'}
              className="w-full h-auto rounded-lg shadow-md"
              loading="lazy"
            />
            {value.caption && (
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Botão Voltar */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={18} className="mr-1" />
        Voltar para Artigos
      </button>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader size={32} className="animate-spin text-blue-500" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando artigo...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Erro</h2>
          <p>{error}</p>
          <Link to="/artigos" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            Voltar para a lista de artigos
          </Link>
        </div>
      )}

      {!loading && !error && artigo && (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
          {/* Cabeçalho do Artigo */}
          <header className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Artigo
              </span>
              {artigo.dataPublicacao && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-1" />
                  <time dateTime={artigo.dataPublicacao}>{formatData(artigo.dataPublicacao)}</time>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{artigo.titulo || 'Artigo Sem Título'}</h1>
            {artigo.autor && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <User size={16} className="mr-1" />
                <span>Por {artigo.autor}</span>
              </div>
            )}
          </header>

          {/* Imagem Principal (se houver) */}
          {artigo.imagemPrincipalUrl && (
            <div className="w-full">
              <img 
                src={artigo.imagemPrincipalUrl} 
                alt={artigo.titulo || 'Imagem do artigo'} 
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Conteúdo do Artigo */}
          <div className="p-6 prose prose-lg dark:prose-invert max-w-none">
            {artigo.conteudo ? (
              <PortableText 
                value={artigo.conteudo} 
                components={portableTextComponents} 
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">Este artigo não possui conteúdo.</p>
            )}
          </div>

          {/* Rodapé do Artigo */}
          <footer className="p-6 pt-0">
            <Link to="/artigos" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <ArrowLeft size={18} className="mr-1" />
              Voltar para todos os artigos
            </Link>
          </footer>
        </article>
      )}
    </div>
  );
};

export default ArtigoDetalhe;
