
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { PortableText } from '@portabletext/react'; // Importa o componente PortableText
import { Calendar, MapPin, Image as ImageIcon, Loader, AlertCircle } from 'lucide-react';

/**
 * Interface para definir a estrutura de um objeto Evento vindo do Sanity
 * Contém informações como título, data, descrição, local e imagem do evento
 */
interface Evento {
  _id: string;           // ID único do Sanity
  titulo?: string;       // Título do evento
  data?: string;         // Data do evento (formato string, ex: YYYY-MM-DD ou ISO)
  descricao?: any[];     // Descrição detalhada (Portable Text - array de blocos)
  local?: string;        // Local onde o evento será realizado
  imagemUrl?: string;    // URL da imagem do evento
}

// Componente da Página de Eventos
const EventosPage: React.FC = () => {
  // Estado para armazenar a lista de eventos
  const [eventos, setEventos] = useState<Evento[]>([]);
  // Estado para controlar o indicador de carregamento
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null);

  /**
   * Efeito para buscar os dados dos eventos do Sanity quando o componente montar
   */
  useEffect(() => {
    /**
     * Query GROQ para buscar todos os documentos do tipo 'evento'
     * - Ordenados por data (mais recentes primeiro)
     * - Seleciona ID, título, data, descrição, local e URL da imagem
     * - Ajuste o nome do schema ('evento') conforme configurado no seu Sanity
     */
    const query = `*[_type == "evento"] | order(data desc) {
      _id,
      titulo,
      data,
      descricao,
      local,
      "imagemUrl": imagem.asset->url
    }`;

    console.log('EventosPage: Iniciando busca de dados...');
    setLoading(true); // Ativa o loading
    setError(null); // Limpa erros anteriores

    // Executa a query no Sanity
    sanityClient.fetch<Evento[]>(query) // Especifica o tipo esperado
      .then((data) => {
        console.log('EventosPage: Dados recebidos do Sanity:', data);
        setEventos(data || []); // Atualiza o estado com os dados (ou array vazio)
        setLoading(false); // Desativa o loading
      })
      .catch((err) => {
        console.error('EventosPage: Erro ao buscar eventos:', err);
        setError('Falha ao carregar os dados dos eventos. Verifique a conexão ou a query.');
        setLoading(false); // Desativa o loading mesmo com erro
      });
  }, []); // Array de dependências vazio, executa apenas uma vez

  // Função auxiliar para formatar a data para o padrão brasileiro
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Data não definida';
    try {
      // Cria um objeto Date a partir da string
      const date = new Date(dateString);
      // Verifica se a data é válida (importante se a string puder ser inválida)
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      // Formata para dd/mm/aaaa
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC' // Considera a data como UTC para evitar problemas de fuso
      });
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return 'Data inválida';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Título da Página */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Próximos Eventos</h1>

      {/* Indicador de Carregamento */}
      {loading && (
        <div className="flex justify-center items-center py-10" aria-live="polite" aria-busy="true">
          <Loader size={32} className="animate-spin text-blue-500" />
          <p className="ml-3 text-gray-600 dark:text-gray-400">Carregando eventos...</p>
        </div>
      )}

      {/* Mensagem de Erro */}
      {error && (
        <div 
          className="text-center py-10 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded"
          role="alert"
        >
          <AlertCircle size={32} className="mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Erro ao Carregar Eventos</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">Verifique o console do navegador (F12) para mais detalhes técnicos.</p>
        </div>
      )}

      {/* Mensagem de Nenhum Evento Encontrado */}
      {!loading && !error && eventos.length === 0 && (
        <div 
          className="text-center py-10 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded"
          role="status"
        >
          <h2 className="text-2xl font-bold mb-2">Nenhum Evento Agendado</h2>
          <p>Não há eventos programados no momento. Volte em breve!</p>
        </div>
      )}

      {/* Grid de Eventos */}
      {!loading && !error && eventos.length > 0 && (
        // Grid responsivo: 1 coluna em telas pequenas, 2 em médias, 3 em grandes
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            // Card individual do evento
            <article key={evento._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col" aria-labelledby={`evento-titulo-${evento._id}`}>
              {/* Imagem do Evento (ou Placeholder) */}
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                {evento.imagemUrl ? (
                  <img 
                    src={evento.imagemUrl} 
                    alt={`Imagem do evento: ${evento.titulo || 'Evento sem título'}`} // Alt text descritivo
                    className="w-full h-full object-cover" // Garante que a imagem cubra a área
                    loading="lazy" // Carregamento preguiçoso para imagens
                  />
                 ) : (
                  // Placeholder se não houver imagem
                  <ImageIcon size={48} aria-hidden="true" />
                )}
              </div>
              
              {/* Conteúdo do Card */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Título do Evento */}
                <h2 id={`evento-titulo-${evento._id}`} className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{evento.titulo || 'Evento Sem Título'}</h2>
                {/* Data do Evento */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
                  <time dateTime={evento.data}>{formatDate(evento.data)}</time> {/* Usa tag <time> */} 
                </div>
                {/* Local do Evento (se houver) */}
                {evento.local && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
                    <span>{evento.local}</span>
                  </div>
                )}
                {/* Descrição do Evento (usando PortableText) */}
                <div className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow prose prose-sm dark:prose-invert max-w-none">
                  {evento.descricao ? (
                    <PortableText value={evento.descricao} />
                  ) : (
                    <p>Descrição não disponível.</p>
                  )}
                </div>
                {/* TODO: Adicionar botão de "Saiba Mais" ou link se necessário */}
                {/* Exemplo: */}
                {/* <Link 
                  to={`/eventos/${evento._id}`} // Ajustar rota se necessário
                  className="mt-auto inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center transition-colors self-start"
                  aria-label={`Saiba mais sobre ${evento.titulo || 'este evento'}`}
                >
                  Saiba Mais
                </Link> */}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Exporta o componente EventosPage
 * Esta página exibe uma lista de eventos da igreja, buscando dados do Sanity
 * Recursos implementados:
 * - Grid responsivo (1 coluna em mobile, até 3 colunas em desktop)
 * - Acessibilidade (aria-labels, roles, alt text)
 * - Estados de carregamento, erro e lista vazia
 * - Formatação de data para o padrão brasileiro
 * - Cards com imagem, título, data, local e descrição
 */
export default EventosPage;

