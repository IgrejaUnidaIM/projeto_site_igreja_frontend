
import React, { useState, useEffect } from 'react'; // Importa hooks do React
import { Link } from 'react-router-dom'; // Importa Link para navegação interna
import { Heart, Facebook, Instagram, Youtube } from 'lucide-react'; // Importa ícones
import sanityClient from '../../sanityClient.js'; // Importa o cliente Sanity (ajuste o caminho se necessário)
import logo from '../../assets/images/logo.png'; // Importa o logo

// Interface para os dados de configuração buscados do Sanity
interface ConfiguracoesGerais {
  endereco?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  // Adicione outros campos se houver (ex: horariosCulto)
}

// Componente Footer: Rodapé principal do site
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // Obtém o ano atual
  const [config, setConfig] = useState<ConfiguracoesGerais | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Não vamos exibir erro no rodapé, apenas logar no console
  // const [error, setError] = useState<string | null>(null);

  // Efeito para buscar as configurações gerais do Sanity
  useEffect(() => {
    // Query para buscar as configurações gerais
    // Assumindo um tipo de documento singleton chamado 'configuracoesGerais'
    const query = `*[_type == "configuracoesGerais"][0] {
      endereco,
      cep,
      telefone,
      email,
      facebookUrl,
      instagramUrl,
      youtubeUrl
      // Adicione outros campos aqui
    }`;

    console.log('Footer: Iniciando busca de configurações gerais...');
    setLoading(true);
    // setError(null);

    sanityClient.fetch<ConfiguracoesGerais>(query)
      .then((data) => {
        console.log('Footer: Configurações recebidas:', data);
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Footer: Erro ao buscar configurações gerais:', err);
        // setError('Falha ao carregar informações.'); // Não mostra erro no rodapé
        setLoading(false);
      });
  }, []);

  // TODO: Considerar buscar horários de culto do Sanity também
  const horariosCulto = [
    { dia: "Domingo", horario: "08h30", descricao: "Escola Bíblica Dominical" },
    { dia: "Domingo", horario: "18h00", descricao: "Culto da Família" },
    { dia: "Quinta-feira", horario: "20h00", descricao: "Culto de Oração" },
    { dia: "Domingo", horario: "09h00", descricao: "Santa Ceia" }, // Verificar se é todo domingo
    { dia: "Segunda-feira", horario: "08h00", descricao: "Círculo de Oração" },
  ];

  return (
    // Rodapé com cor de fundo azul escura
    <footer className="bg-blue-950 dark:bg-slate-900 text-white pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1: Logo e Informações */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-24 h-24 mb-4">
              <img 
                src={logo} 
                alt="Logotipo da 1ª Igreja Unida de Inácio Monteiro" // Alt text descritivo
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">1ª Igreja Unida de Inácio Monteiro</h3>
            <p className="text-blue-200 dark:text-blue-300 text-sm text-center md:text-left">
              Levando o amor de Cristo a todos
            </p>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <nav aria-labelledby="footer-links-rapidos">
            <h4 id="footer-links-rapidos" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {/* Links internos usando React Router */}
              <li><Link to="/" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/historia" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link to="/pastores" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Pastores</Link></li>
              <li><Link to="/ministerios" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Ministérios</Link></li>
              <li><Link to="/galeria" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Galeria</Link></li>
              <li><Link to="/contato" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </nav>
          
          {/* Coluna 3: Horários (TODO: Tornar dinâmico?) */}
          <section aria-labelledby="footer-horarios">
            <h4 id="footer-horarios" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Horários de Culto
            </h4>
            <ul className="space-y-2 text-sm">
              {horariosCulto.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-medium">{item.dia} - {item.horario}</span>
                  <span className="text-blue-200 dark:text-blue-300">{item.descricao}</span>
                </li>
              ))}
            </ul>
          </section>
          
          {/* Coluna 4: Contato (Dinâmico do Sanity) */}
          <section aria-labelledby="footer-contato">
            <h4 id="footer-contato" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Contato
            </h4>
            {loading && <p className="text-sm text-blue-200">Carregando contato...</p>}
            {!loading && config && (
              <address className="not-italic text-sm space-y-2">
                {config.endereco && <p>{config.endereco}</p>}
                {/* <p>Conj. Hab. Inacio Monteiro, São Paulo - SP</p> */}
                {config.cep && <p>Cep: {config.cep}</p>}
                {config.telefone && (
                  <p className="pt-2">
                    <span className="font-medium">Telefone:</span> {config.telefone}
                  </p>
                )}
                {config.email && (
                  <p>
                    <span className="font-medium">Email:</span> {config.email}
                  </p>
                )}
              </address>
            )}
            {!loading && !config && (
              <p className="text-sm text-blue-200">Informações de contato não disponíveis.</p>
            )}
            
            {/* Redes Sociais (Dinâmicas do Sanity) */}
            {!loading && config && (config.facebookUrl || config.instagramUrl || config.youtubeUrl) && (
              <div className="mt-4 flex space-x-3">
                {config.facebookUrl && (
                  <a 
                    href={config.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                    aria-label="Nossa página no Facebook (abre em nova aba)"
                    title="Facebook"
                  >
                    <Facebook size={16} aria-hidden="true" />
                  </a>
                )}
                {config.instagramUrl && (
                  <a 
                    href={config.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                    aria-label="Nosso perfil no Instagram (abre em nova aba)"
                    title="Instagram"
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
                {config.youtubeUrl && (
                  <a 
                    href={config.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                    aria-label="Nosso canal no YouTube (abre em nova aba)"
                    title="YouTube"
                  >
                    <Youtube size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </section>
        </div>
        
        {/* Linha divisória e Copyright */}
        <div className="border-t border-blue-800 dark:border-blue-950 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-200 dark:text-blue-300 mb-4 md:mb-0">
              &copy; {currentYear} 1ª Igreja Unida de Inácio Monteiro. Todos os direitos reservados.
            </p>
            <div className="flex items-center text-sm text-blue-200 dark:text-blue-300">
              <span>Feito com</span>
              <Heart size={16} className="mx-1 text-red-400" aria-hidden="true" />
              <span>para a glória de Deus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

