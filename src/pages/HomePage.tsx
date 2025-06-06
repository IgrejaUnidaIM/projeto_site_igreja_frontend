
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Link } from 'react-router-dom';
import { Gift, BookOpen, Loader, AlertCircle } from 'lucide-react';

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

const HomePage: React.FC = () => {
  const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>([]);
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loadingAniversariantes, setLoadingAniversariantes] = useState<boolean>(true);
  const [loadingArtigos, setLoadingArtigos] = useState<boolean>(true);
  const [errorAniversariantes, setErrorAniversariantes] = useState<string | null>(null);
  const [errorArtigos, setErrorArtigos] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Busca Aniversariantes do Mês Atual
     */
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1; // getMonth() é 0-indexado
    // Formata o mês com zero à esquerda se necessário (ex: 01, 02, ..., 11, 12)
    const mesAtualString = mesAtual.toString().padStart(2, '0'); 
    
    /**
     * Query GROQ para buscar aniversariantes do mês atual
     * - Filtra pelo mês atual (extraído da data de nascimento)
     * - Ordena pelo dia do mês (para exibir em ordem cronológica)
     * - Busca ID, nome e data de nascimento
     */
    const queryAniversariantes = `*[_type == "aniversariante" && dateTime::string(dataNascimento).substring(5, 7) == $mesAtual] | order(dateTime::string(dataNascimento).substring(8, 10) asc) {
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
     * - Query para buscar os últimos 3 artigos
     * - Ordenados por data de criação (mais recentes primeiro)
     * - Busca ID, título, resumo, slug e URL da imagem principal
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

  }, []);

  /**
   * Função auxiliar para formatar apenas o dia do aniversário
   * @param dateString - String de data no formato YYYY-MM-DD
   * @returns Dia formatado (ex: "05") ou string vazia/interrogação em caso de erro
   */
  const formatDiaAniversario = (dateString?: string) => {
    if (!dateString) return '';
    try {
      // Adiciona um ano fixo e hora para evitar problemas de fuso horário na extração do dia
      const date = new Date(`${new Date().getFullYear()}-${dateString.substring(5, 10)}T12:00:00Z`);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', timeZone: 'UTC' });
    } catch (e) {
      console.error('Erro ao formatar dia do aniversário:', e);
      return '?';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de Boas-vindas ou Banner Principal (Mantida ou Adicionada Aqui) */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo à 1ª Igreja Unida</h1>
        <p className="text-lg md:text-xl mb-6">Um lugar de fé, comunidade e esperança.</p>
        {/* Adicionar botões ou links se necessário */}
        {/* <Link to="/sobre" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors"> */}
        {/*  Saiba Mais */}
        {/* </Link> */}
      </div>

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
          {errorAniversariantes && (
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
                    {/* Imagem do Artigo (Banner) - Atenção ao alinhamento e responsividade */}
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
                           {/* Placeholder se não houver imagem */}
                           <BookOpen size={40}/>
                        </div>
                      )}
                    </div>
                    {/* Conteúdo do Artigo */}
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
 * - Grid responsivo (1 coluna em mobile, múltiplas em desktop)
 * - Seção de aniversariantes do mês atual (busca dinâmica do Sanity)
 * - Seção de artigos recentes (busca dinâmica do Sanity)
 * - Estados de carregamento, erro e dados vazios
 * - Acessibilidade (alt text, aria-hidden)
 */
export default HomePage;

