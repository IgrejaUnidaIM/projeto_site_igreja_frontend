import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

/**
 * Interface para os dados dos ministérios buscados do Sanity
 * Contém informações como nome, descrição, líder e imagem
 */
interface Ministerio {
  _id: string;           // ID único do Sanity
  nome: string;          // Nome do ministério
  descricao?: string;    // Descrição do ministério e suas atividades
  descricaoDetalhada?: any[]; // Descrição detalhada em formato PortableText
  lider?: string;        // Nome do líder do ministério
  imagemUrl?: string;    // URL da imagem representativa do ministério
}

const MinisteriosPage: React.FC = () => {
  // Estados para gerenciar os dados e o carregamento
  const [ministerios, setMinisterios] = useState<Ministerio[] | null>(null); // Inicia como null para diferenciar de array vazio
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imagemAmpliada, setImagemAmpliada] = useState<string | null>(null);
  const [ministerioSelecionado, setMinisterioSelecionado] = useState<Ministerio | null>(null);

  console.log('MinisteriosPage: Renderizando componente...');

  /**
   * Efeito para buscar os dados dos ministérios do Sanity quando o componente montar
   */
  useEffect(() => {
    console.log('MinisteriosPage: Iniciando busca de dados no Sanity...');
    setLoading(true); // Garante que loading seja true no início da busca
    setError(null); // Limpa erros anteriores
    setMinisterios(null); // Limpa dados anteriores

    /**
     * Query GROQ para buscar todos os ministérios
     * - Ordenados por nome (ordem alfabética)
     * - Busca ID, nome, descrição, líder e URL da imagem
     * - Ajuste o nome do schema ('ministerio') conforme configurado no seu Sanity
     */
    const query = `*[_type == "ministerio"] | order(nome asc) {
      _id,
      nome,
      descricao,
      descricaoDetalhada,
      lider,
      "imagemUrl": imagem.asset->url 
    }`;

    console.log('MinisteriosPage: Executando query:', query);

    sanityClient.fetch<Ministerio[]>(query)
      .then((data) => {
        console.log('MinisteriosPage: Dados recebidos do Sanity:', data);
        setMinisterios(data || []); // Define como array vazio se data for null/undefined
        setLoading(false);
      })
      .catch((err) => {
        console.error("MinisteriosPage: Erro ao buscar ministérios:", err);
        setError("Falha ao carregar os dados dos ministérios. Verifique a conexão ou a query.");
        setLoading(false);
        setMinisterios([]); // Define como array vazio em caso de erro
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

  // Função para mostrar detalhes do ministério
  const mostrarDetalhes = (ministerio: Ministerio) => {
    setMinisterioSelecionado(ministerio);
  };

  // Função para fechar detalhes do ministério
  const fecharDetalhes = () => {
    setMinisterioSelecionado(null);
  };

  console.log('MinisteriosPage: Estado atual:', { loading, error, ministerios });

  // Exibe mensagem de carregamento
  if (loading) {
    console.log('MinisteriosPage: Renderizando estado de carregamento...');
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold mb-8">Carregando ministérios...</h1>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Exibe mensagem de erro, se houver
  if (error) {
    console.log('MinisteriosPage: Renderizando estado de erro...');
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Erro ao Carregar Ministérios</h1>
        <p className="text-xl mb-4">{error}</p>
        <p className="text-sm text-gray-500 mb-6">Verifique o console do navegador (F12) para mais detalhes técnicos.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  // Se não está carregando e não há erro, renderiza a lista (ou mensagem de vazio)
  console.log('MinisteriosPage: Renderizando lista de ministérios ou mensagem de vazio...');
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Nossos Ministérios</h1>
      
      {/* Verifica se ministerios não é null antes de checar length */}
      {ministerios && ministerios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministerios.map((ministerio) => (
            <div key={ministerio._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
              {ministerio.imagemUrl ? (
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={ministerio.imagemUrl} 
                    alt={`Imagem de ${ministerio.nome}`} 
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() => ampliarImagem(ministerio.imagemUrl!)}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} // Esconde se a imagem falhar
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{ministerio.nome}</h2>
                {ministerio.lider && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Líder: {ministerio.lider}</p>
                )}
                {ministerio.descricao && (
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{ministerio.descricao}</p> // Limita descrição
                )}
                <button 
                  onClick={() => mostrarDetalhes(ministerio)}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Ver mais detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">Nenhum ministério cadastrado no momento.</p>
      )}

      <div className="mt-12 text-center">
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Voltar para a página inicial
        </Link>
      </div>

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

      {/* Modal para detalhes do ministério */}
      {ministerioSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={fecharDetalhes}>
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {ministerioSelecionado.imagemUrl && (
                <img 
                  src={ministerioSelecionado.imagemUrl} 
                  alt={`Imagem de ${ministerioSelecionado.nome}`} 
                  className="w-full h-64 object-cover"
                />
              )}
              <button 
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg"
                onClick={fecharDetalhes}
              >
                <X size={24} className="text-gray-800 dark:text-white" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{ministerioSelecionado.nome}</h2>
              {ministerioSelecionado.lider && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Líder: {ministerioSelecionado.lider}</p>
              )}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {ministerioSelecionado.descricao && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{ministerioSelecionado.descricao}</p>
                )}
                {ministerioSelecionado.descricaoDetalhada && (
                  <div className="text-gray-700 dark:text-gray-300">
                    {/* Renderizar PortableText aqui quando implementado */}
                    <p>Conteúdo detalhado disponível.</p>
                  </div>
                )}
              </div>
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
 * Exporta o componente MinisteriosPage
 * Esta página exibe uma lista de ministérios da igreja, buscando dados do Sanity
 * Recursos implementados:
 * - Grid responsivo (1 coluna em mobile, até 3 colunas em desktop)
 * - Estados de carregamento, erro e lista vazia
 * - Cards com imagem, nome, líder e descrição de cada ministério
 * - Acessibilidade (alt text para imagens)
 * - Tratamento para imagens ausentes
 * - Ampliação de imagens ao clicar
 * - Modal de detalhes para cada ministério
 */
export default MinisteriosPage;

