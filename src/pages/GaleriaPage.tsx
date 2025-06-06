
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Image as ImageIcon, AlertCircle, Loader } from 'lucide-react';

/**
 * Interface para os itens da galeria vindos do Sanity
 * Cada item pode ter título, descrição e imagem
 */
interface GaleriaItem {
  _id: string;
  titulo?: string;
  descricao?: string;
  imagem?: {
    asset?: {
      _ref?: string;
      url?: string; // URL da imagem que será buscada do Sanity
    };
  };
  // Outros campos podem ser adicionados conforme necessidade
}

const GaleriaPage: React.FC = () => {
  const [itens, setItens] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar itens da galeria do Sanity
     * - Ordenados por data de criação (mais recentes primeiro)
     * - Busca ID, título, descrição e URL da imagem
     * - Ajuste o nome do schema ('galeriaItem') conforme configurado no seu Sanity
     */
    const query = `*[_type == "galeriaItem"] | order(_createdAt desc) {
      _id,
      titulo,
      descricao,
      "imagemUrl": imagem.asset->url
    }`;

    console.log('GaleriaPage: Iniciando busca de dados...');
    setLoading(true);
    setError(null);

    sanityClient.fetch(query)
      .then((data: GaleriaItem[]) => {
        console.log('GaleriaPage: Dados recebidos do Sanity:', data);
        // Mapeia os dados para incluir a URL da imagem diretamente no objeto
        const mappedData = data.map(item => ({ ...item, imagem: { asset: { url: (item as any).imagemUrl } } }));
        setItens(mappedData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('GaleriaPage: Erro ao buscar itens da galeria:', err);
        setError('Falha ao carregar os itens da galeria. Verifique a conexão ou a query.');
        setLoading(false);
      });
  }, []);

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

      {/* Grid de imagens da galeria */}
      {!loading && !error && itens.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itens.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-square"
              tabIndex={0}
              role="img"
              aria-label={item.titulo || 'Item da Galeria'}
            >
              {item.imagem?.asset?.url ? (
                <img 
                  src={item.imagem.asset.url} 
                  alt={item.titulo || 'Item da Galeria'} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <ImageIcon size={48} aria-hidden="true" />
                </div>
              )}
              {/* Overlay com título/descrição ao passar o mouse ou focar */}
              {(item.titulo || item.descricao) && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 group-focus:bg-opacity-70 transition-opacity duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                  {item.titulo && <h3 className="text-white font-bold text-lg mb-1 truncate">{item.titulo}</h3>}
                  {item.descricao && <p className="text-gray-200 text-sm line-clamp-2">{item.descricao}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Exporta o componente GaleriaPage
 * Esta página exibe uma galeria de imagens dinâmica, buscando dados do Sanity
 * Recursos implementados:
 * - Grid responsivo (1 coluna em mobile, até 4 colunas em desktop)
 * - Acessibilidade (navegação por teclado, textos alternativos)
 * - Estados de carregamento, erro e galeria vazia
 * - Efeito de hover/focus para mostrar detalhes das imagens
 */
export default GaleriaPage;

