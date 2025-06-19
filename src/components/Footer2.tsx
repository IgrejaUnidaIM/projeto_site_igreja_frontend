import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import sanityClient from '../sanityClient';
import logoImg from '/logo.png';

interface RedeSocial {
  plataforma: string;
  url: string;
  _key: string;
}

interface HorarioCulto {
  diaSemana: string;
  horario: string;
  descricaoCulto?: string;
  _key: string;
}

interface ConfiguracoesGerais {
  endereco?: string;
  cep?: string;
  telefonePrincipal?: string;
  emailContato?: string;
  linkMapa?: string;
  redesSociais?: RedeSocial[];
  horariosCultos?: HorarioCulto[];
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [config, setConfig] = useState<ConfiguracoesGerais | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
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
        
        const data = await sanityClient.fetch<ConfiguracoesGerais>(query);
        
        // Se não houver dados no Sanity, usa os valores padrão
        setConfig(data || {
          endereco: "Rua Cachoeira Jaciquara, 175 - COHAB Inácio Monteiro",
          telefonePrincipal: "(11) 99001-0033",
          emailContato: "unidainaciononteiro@gmail.com",
          redesSociais: [],
          horariosCultos: []
        });
      } catch (err) {
        console.error("Erro ao buscar configurações:", err);
        // Fallback para valores padrão em caso de erro
        setConfig({
          endereco: "Rua Cachoeira Jaciquara, 175 - COHAB Inácio Monteiro",
          telefonePrincipal: "(11) 99001-0033",
          emailContato: "unidainaciononteiro@gmail.com",
          redesSociais: [],
          horariosCultos: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <footer className="bg-blue-950 dark:bg-slate-900 text-white pt-12 pb-6" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1: Logo e Informações */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-24 h-24 mb-4">
              <img 
                src={logoImg} 
                alt="Logotipo da 1ª Igreja Unida em Inácio Monteiro"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">1ª Igreja Unida em Inácio Monteiro</h3>
            <p className="text-blue-200 dark:text-blue-300 text-sm text-center md:text-left">
              Levando o amor de Cristo a todos os povos e nações.
            </p>
          </div>
          
          {/* Coluna 2: Links Rápidos */}
          <nav aria-labelledby="footer-links-rapidos">
            <h4 id="footer-links-rapidos" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/nossa-historia" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/pastores" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Pastores
                </Link>
              </li>
              <li>
                <Link to="/ministerios" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Ministérios
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          {/* Coluna 3: Horários de Culto */}
          <section aria-labelledby="footer-horarios">
            <h4 id="footer-horarios" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Horários de Culto
            </h4>
            {loading ? (
              <p className="text-sm text-blue-200">Carregando horários...</p>
            ) : config?.horariosCultos?.length ? (
              <ul className="space-y-2 text-sm">
                {config.horariosCultos.map((item) => (
                  <li key={item._key} className="flex flex-col">
                    <span className="font-medium">{item.diaSemana} - {item.horario}</span>
                    {item.descricaoCulto && (
                      <span className="text-blue-200 dark:text-blue-300">{item.descricaoCulto}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-blue-200">Horários não disponíveis.</p>
            )}
          </section>
          
          {/* Coluna 4: Endereço e Contato */}
          <section aria-labelledby="footer-endereco">
            <h4 id="footer-endereco" className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Endereço e Contato
            </h4>
            {loading ? (
              <p className="text-sm text-blue-200">Carregando contato...</p>
            ) : config ? (
              <address className="not-italic text-sm space-y-2">
                {config.endereco && <p>{config.endereco}</p>}
                {config.cep && <p>Cep: {config.cep}</p>}
                {config.linkMapa && (
                  <div className="mt-2 mb-3">
                    <div className="mt-3 rounded-md overflow-hidden border border-blue-800 shadow-md h-32 bg-gray-100 flex items-center justify-center">
                      <iframe
                        src={config.linkMapa}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Localização da Igreja"
                      ></iframe>
                    </div>
                  </div>
                )}
                
                
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
            ) : (
              <p className="text-sm text-blue-200">Informações de contato não disponíveis.</p>
            )}
            
            {/* Redes Sociais */}
            {!loading && config?.redesSociais?.length ? (
              <div className="mt-4 flex space-x-3">
                {config.redesSociais.map((rede) => {
                  let IconComponent;
                  let bgColorClass = "";
                  let hoverColorClass = "";
                  
                  switch(rede.plataforma?.toLowerCase()) {
                    case 'facebook':
                      IconComponent = Facebook;
                      bgColorClass = "bg-blue-700 dark:bg-blue-800";
                      hoverColorClass = "hover:bg-blue-600 dark:hover:bg-blue-700";
                      break;
                    case 'instagram':
                      IconComponent = Instagram;
                      bgColorClass = "bg-pink-600 dark:bg-pink-700";
                      hoverColorClass = "hover:bg-pink-500 dark:hover:bg-pink-600";
                      break;
                    case 'youtube':
                      IconComponent = Youtube;
                      bgColorClass = "bg-red-600 dark:bg-red-700";
                      hoverColorClass = "hover:bg-red-500 dark:hover:bg-red-600";
                      break;
                    default:
                      IconComponent = Facebook;
                      bgColorClass = "bg-gray-600 dark:bg-gray-700";
                      hoverColorClass = "hover:bg-gray-500 dark:hover:bg-gray-600";
                  }
                  
                  return (
                    <a 
                      key={rede._key}
                      href={rede.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`w-10 h-10 rounded-full ${bgColorClass} flex items-center justify-center text-white ${hoverColorClass} transition-colors`}
                      aria-label={`Nossa página no ${rede.plataforma}`}
                      title={rede.plataforma?.charAt(0)?.toUpperCase() + rede.plataforma?.slice(1)}
                    >
                      <IconComponent size={20} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </section>
        </div>
        
        {/* Linha divisória e Copyright */}
        <div className="border-t border-blue-800 dark:border-blue-950 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-200 dark:text-blue-300 mb-4 md:mb-0">
              &copy; {currentYear} 1ª Igreja Unida em Inácio Monteiro. Todos os direitos reservados.
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
