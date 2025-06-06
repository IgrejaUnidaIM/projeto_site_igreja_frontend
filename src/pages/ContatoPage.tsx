import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient.js';
import { Mail, Phone, MapPin, Loader, AlertCircle } from 'lucide-react';

/**
 * Interface para os dados de contato buscados do Sanity
 * Contém informações como endereço, CEP, telefone e email da igreja
 */
interface ContatoInfo {
  endereco?: string;
  cep?: string;
  telefonePrincipal?: string; // Ajustado para corresponder ao nome provável no Sanity
  emailContato?: string;    // Ajustado para corresponder ao nome provável no Sanity
  // Outros campos podem ser adicionados conforme necessidade (ex: link do mapa, horários de funcionamento)
}

const ContatoPage: React.FC = () => {
  const [contatoInfo, setContatoInfo] = useState<ContatoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar as informações de contato do Sanity
     * - Busca do documento singleton 'configuracoesGerais'
     * - Recupera endereço, CEP, telefonePrincipal e emailContato
     * - Ajuste o nome do schema conforme configurado no seu Sanity
     */
    const query = `*[_type == "configuracoesGerais"][0] {
      endereco,
      cep,
      telefonePrincipal, // Ajustado para buscar o campo correto
      emailContato       // Ajustado para buscar o campo correto
      // Outros campos podem ser adicionados aqui conforme necessidade
    }`;

    console.log('ContatoPage: Iniciando busca de dados de contato...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<ContatoInfo>(query)
      .then((data) => {
        console.log("ContatoPage: Dados de contato recebidos:", data);
        // Log específico para telefone e email
        console.log("ContatoPage: Telefone recebido:", data?.telefone);
        console.log("ContatoPage: Email recebido:", data?.email);
        setContatoInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ContatoPage: Erro ao buscar informações de contato:', err);
        setError('Falha ao carregar as informações de contato. Verifique a conexão ou a query.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica de envio do formulário (pode ser implementada depois)
    alert('Funcionalidade de envio de formulário ainda não implementada.');
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Entre em Contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Informações de Contato */}
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Nossas Informações</h2>
          
          {/* Estado de carregamento */}
          {loading && (
            <div className="flex items-center justify-center py-4" role="status" aria-live="polite">
              <Loader size={24} className="animate-spin text-blue-500 mr-2" aria-hidden="true" />
              <span className="text-gray-600 dark:text-gray-400">Carregando informações...</span>
            </div>
          )}
          
          {/* Estado de erro */}
          {error && (
             <div 
               className="text-center py-4 px-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded mb-4"
               role="alert"
               aria-live="assertive"
             >
              <AlertCircle size={24} className="mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Exibe informações após carregar */}
          {!loading && !error && contatoInfo && (
            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Endereço:</p>
                  <p>{contatoInfo.endereco || 'Não informado'}</p>
                  {contatoInfo.cep && <p>CEP: {contatoInfo.cep}</p>}
                </div>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Telefone:</p>
                  <p>{contatoInfo.telefonePrincipal || 'Não informado'}</p> {/* Ajustado para usar telefonePrincipal */}
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-500 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{contatoInfo.emailContato || 'Não informado'}</p> {/* Ajustado para usar emailContato */}
                </div>
              </div>
            </div>
          )}
          
          {/* Estado vazio */}
          {!loading && !error && !contatoInfo && (
             <div 
               className="text-center py-4 px-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 rounded mb-4"
               role="status"
             >
              <p className="text-sm">Informações de contato não encontradas no sistema.</p>
            </div>
          )}

          {/* Espaço para mapa do Google Maps (implementação futura) */}
          {/* <div className="mt-8 h-64 bg-gray-200 dark:bg-gray-700 rounded"> */}
          {/*   Mapa aqui */}
          {/* </div> */}
        </div>

        {/* Formulário de Contato - Integrado com Formspree */}
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Envie sua Mensagem</h2>
          {/* 
            INSTRUÇÃO PARA O USUÁRIO:
            1. Crie uma conta gratuita em https://formspree.io/
            2. Crie um novo formulário no Formspree e copie o "endpoint URL" fornecido.
            3. Substitua a URL "#COLOQUE_SUA_URL_FORMSPREE_AQUI" abaixo pela sua URL real do Formspree.
          */}
          <form 
            action="https://formspree.io/f/mvgrzbpw" 
            method="POST" 
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assunto</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensagem</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                required 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                aria-required="true"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/**
 * Exporta o componente ContatoPage
 * Esta página exibe informações de contato da igreja e um formulário para envio de mensagens
 * Recursos implementados:
 * - Layout responsivo (1 coluna em mobile, 2 colunas em desktop)
 * - Acessibilidade (labels, aria-attributes, roles)
 * - Estados de carregamento, erro e dados vazios
 * - Busca dinâmica de informações de contato do Sanity
 */
export default ContatoPage;
