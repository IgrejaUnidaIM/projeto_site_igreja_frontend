
import React, { useState, useEffect } from 'react'; // Importa hooks do React
import { Link } from 'react-router-dom'; // Importa Link para navegação interna
import { Heart, Facebook, Instagram, Youtube } from 'lucide-react'; // Importa ícones
import sanityClient from '../../sanityClient.js'; // Importa o cliente Sanity (ajuste o caminho se necessário)
import logo from '../../assets/images/logo.png'; // Importa o logo

// Interface para os dados de configuração buscados do Sanity
interface ConfiguracoesGerais {
  endereco?: string;
  cep?: string;
  telefonePrincipal?: string;
  emailContato?: string;
  linkMapa?: string; // Corrigido para corresponder ao schema do Sanity
  redesSociais?: Array<{ // Corrigido para corresponder ao schema do Sanity
    plataforma?: string;
    url?: string;
    _key?: string;
  }>;
  horariosCultos?: Array<{ // Corrigido para corresponder ao schema do Sanity
    diaSemana?: string;
    horario?: string;
    descricaoCulto?: string;
    _key?: string;
  }>;
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
      telefonePrincipal, 
      emailContato,
      linkMapa,
      "redesSociais": redesSociais[] {
        plataforma,
        url,
        _key
      },
      "horariosCultos": horariosCultos[] {
        diaSemana,
        horario,
        descricaoCulto,
        _key
      }
    }`;
    
    console.log('Footer: Iniciando busca de configurações gerais...');
    setLoading(true);
    // setError(null);

    sanityClient.fetch<ConfiguracoesGerais>(query)
      .then((data) => {
        console.log("Footer: Configurações recebidas do Sanity:", data);
        if (!data) {
          console.warn("Footer: Nenhum dado de configuração encontrado no Sanity.");
        } else {
          console.log("Footer: Endereço:", data.endereco);
          console.log("Footer: Link do Mapa:", data.linkMapa);
          console.log("Footer: Horários de Culto:", data.horariosCultos);
          console.log("Footer: Redes Sociais:", data.redesSociais);
        }
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Footer: Erro ao buscar configurações gerais:", err);
        // setError("Falha ao carregar informações."); // Não mostra erro no rodapé
        setLoading(false);
      });
  }, []);

  // Remove a constante hardcoded, pois os dados virão do Sanity
  /*
  const horariosCulto = [
    { dia: "Domingo", horario: "08h30", descricao: "Escola Bíblica Dominical" },
    { dia: "Domingo", horario: "18h00", descricao: "Culto da Família" },
    { dia: "Quinta-feira", horario: "20h00", descricao: "Culto de Oração" },
    { dia: "Domingo", horario: "09h00", descricao: "Santa Ceia" }, // Verificar se é todo domingo
    { dia: "Segunda-feira", horario: "08h00", descricao: "Círculo de Oração" },
  ];
  */

  return (
    // Rodapé com cor de fundo azul escura e padding reduzido
    <footer className="bg-blue-950 dark:bg-slate-900 text-white pt-12 pb-6" role="contentinfo">
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
              <li><Link to="/nossa-historia" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Nossa História</Link></li>
              <li><Link to="/pastores" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Pastores</Link></li>
              <li><Link to="/ministerios" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Ministérios</Link></li>
              <li><Link to="/galeria" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Galeria</Link></li>
              <li><Link to="/lives-podcasts" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Lives & Podcasts</Link></li>
              <li><Link to="/contato" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          {/* Coluna 3: Horários de Culto */}
          <section aria-labelledby="footer-horarios">
            <h4 id="footer-horarios" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Horários de Culto
            </h4>
            {loading && <p className="text-sm text-blue-200">Carregando horários...</p>}
            {!loading && config?.horariosCultos && config.horariosCultos.length > 0 && (
              <ul className="space-y-2 text-sm">
                {config.horariosCultos.map((item) => (
                  <li key={item._key} className="flex flex-col">
                    <span className="font-medium">{item.diaSemana} - {item.horario}</span>
                    <span className="text-blue-200 dark:text-blue-300">{item.descricaoCulto}</span>
                  </li>
                ))}
              </ul>
            )}
            {!loading && (!config?.horariosCultos || config.horariosCultos.length === 0) && (
              <p className="text-sm text-blue-200">Horários não disponíveis.</p>
            )}
          </section>
          
          {/* Coluna 4: Endereço e Contato (Dinâmico do Sanity) */}
          <section aria-labelledby="footer-endereco">
            <h4 id="footer-endereco" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Endereço e Contato
            </h4>
            {loading && <p className="text-sm text-blue-200">Carregando contato...</p>}
            {!loading && config && (
              <address className="not-italic text-sm space-y-2">
                {config.endereco && <p>{config.endereco}</p>}
                {/* Adiciona o link e o mapa do Google Maps se existirem */}
                {config.linkMapa && (
                  <div className="mt-2 mb-3">
                    <a 
                      href={config.linkMapa} // Usa o link direto aqui
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-white underline transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                      </svg>
                      Ver no Google Maps
                    </a>
                    {/* Mostra o iframe apenas se houver um endereço para buscar */}
                    {config.endereco && (
                      <div className="mt-3 rounded-md overflow-hidden border border-blue-800 shadow-md h-32">
                      <iframe 
                        // Usa o endereço para buscar no embed. Se não houver endereço, o iframe não será renderizado.
                        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.521260322233!2d-75.57624!3d6.1944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTEnMzkuOCJOIDc1wrAzNCczNC41Ilc!5e0!3m2!1sen!2sus!4v1605101710790!5m2!1sen!2sus&q=${encodeURIComponent(config.endereco)}`} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Igreja"
                        aria-label="Mapa mostrando a localização da igreja"
                      ></iframe>
                      </div>
                    )}
                  </div>
                )}
                {config.cep && <p>Cep: {config.cep}</p>}
                {config.telefonePrincipal && (
                  <p className="pt-2">
                    <span className="font-medium">Telefone:</span> {config.telefonePrincipal}
                  </p>
                )}
                {config.emailContato && (
                  <p>
                    <span className="font-medium">Email:</span> {config.emailContato}
                  </p>
                )}
              </address>
            )}
            {!loading && !config && (
              <p className="text-sm text-blue-200">Informações de contato não disponíveis.</p>
            )}
            
            {/* Redes Sociais (Dinâmicas do Sanity) */}
            {!loading && config && config.redesSociais && config.redesSociais.length > 0 && (
              <div className="mt-4 flex space-x-3">
                {config.redesSociais.map((rede) => {
                  // Determina o ícone e a cor com base na plataforma
                  let IconComponent;
                  let bgColorClass = "";
                  let hoverColorClass = "";
                  let ariaLabel = "";
                  
                  switch(rede.plataforma) {
                    case 'facebook':
                      IconComponent = Facebook;
                      bgColorClass = "bg-blue-700 dark:bg-blue-800";
                      hoverColorClass = "hover:bg-blue-600 dark:hover:bg-blue-700";
                      ariaLabel = "Nossa página no Facebook (abre em nova aba)";
                      break;
                    case 'instagram':
                      IconComponent = Instagram;
                      bgColorClass = "bg-pink-600 dark:bg-pink-700";
                      hoverColorClass = "hover:bg-pink-500 dark:hover:bg-pink-600";
                      ariaLabel = "Nosso perfil no Instagram (abre em nova aba)";
                      break;
                    case 'youtube':
                      IconComponent = Youtube;
                      bgColorClass = "bg-red-600 dark:bg-red-700";
                      hoverColorClass = "hover:bg-red-500 dark:hover:bg-red-600";
                      ariaLabel = "Nosso canal no YouTube (abre em nova aba)";
                      break;
                    default:
                      // Caso não seja uma das plataformas acima, usa um estilo padrão
                      IconComponent = Facebook; // Ícone padrão
                      bgColorClass = "bg-gray-600 dark:bg-gray-700";
                      hoverColorClass = "hover:bg-gray-500 dark:hover:bg-gray-600";
                      ariaLabel = `Nossa página em ${rede.plataforma} (abre em nova aba)`;
                  }
                  
                  return (
                    <a 
                      key={rede._key}
                      href={rede.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center text-white ${hoverColorClass} transition-colors`}
                      aria-label={ariaLabel}
                      title={rede.plataforma.charAt(0).toUpperCase() + rede.plataforma.slice(1)}
                    >
                      <IconComponent size={20} aria-hidden="true" />
                    </a>
                  );
                })}
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

