import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Download } from 'lucide-react';

const MinisteriosSection = () => {
  const [ministerioAtivo, setMinisterioAtivo] = useState<number | null>(null);
  
  // Lista de ministérios da igreja
  const ministerios = [
    { id: 1, nome: "Ministério de Assistência Social", descricao: "Dedicado a ajudar pessoas em situação de vulnerabilidade social." },
    { id: 2, nome: "Ministério de Casais", descricao: "Fortalecimento de relacionamentos conjugais através de encontros e aconselhamento." },
    { id: 3, nome: "Círculo de Oração", descricao: "Grupo dedicado à intercessão e oração pela igreja e comunidade." },
    { id: 4, nome: "Ministério de Comunicação", descricao: "Responsável pela divulgação e comunicação das atividades da igreja." },
    { id: 5, nome: "Ministério de Coreografia Luz Divina", descricao: "Expressão de adoração através da dança e coreografia." },
    { id: 6, nome: "Ministério de Coreografia Preciosas para Deus", descricao: "Grupo de dança e expressão corporal para adoração." },
    { id: 7, nome: "Ministério de Cozinha", descricao: "Preparo de refeições para eventos e assistência social." },
    { id: 8, nome: "Ministério de Diaconia", descricao: "Serviço de apoio às necessidades práticas da igreja e membros." },
    { id: 9, nome: "Ministério de Escola Bíblica", descricao: "Ensino e educação cristã para todas as idades." },
    { id: 10, nome: "Ministério Infantil Pequenos Adoradores", descricao: "Atividades espirituais e recreativas para crianças." },
    { id: 11, nome: "Ministério de Jovens Átrios de Deus", descricao: "Comunidade de jovens focada em crescimento espiritual e comunhão." },
    { id: 12, nome: "Ministério de Louvor Adorar't", descricao: "Equipe de música e adoração para os cultos." },
    { id: 13, nome: "Ministério de Missões / Evangelismo", descricao: "Alcance de pessoas fora da igreja e apoio a missionários." },
    { id: 14, nome: "Ministério de Mulheres Lírio dos Vales", descricao: "Comunidade de mulheres para crescimento espiritual e apoio mútuo." }
  ];

  // Função para alternar a visualização detalhada de um ministério
  const toggleMinisterio = (id: number) => {
    setMinisterioAtivo(id === ministerioAtivo ? null : id);
  };

  return (
    <section id="ministerios" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Nossos Ministérios
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça as áreas de atuação da nossa igreja e como você pode participar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministerios.map((ministerio) => (
            <div 
              key={ministerio.id}
              className={`bg-gray-50 dark:bg-slate-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                ministerioAtivo === ministerio.id ? 'transform scale-105 ring-2 ring-blue-500' : 'hover:shadow-lg'
              }`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleMinisterio(ministerio.id)}
              >
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                  {ministerio.nome}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {ministerio.descricao}
                </p>
                
                <div className="flex justify-between items-center">
                  <button 
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {ministerioAtivo === ministerio.id ? 'Ver menos' : 'Ver mais'}
                  </button>
                  
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300">
                      <Users size={16} />
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Conteúdo expandido */}
              {ministerioAtivo === ministerio.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Próximos Eventos</h4>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
                        <div className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md mr-3">
                            <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">Reunião Mensal</p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <Clock size={14} className="mr-1" />
                              <span>Será agendado em breve</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <MapPin size={14} className="mr-1" />
                              <span>Templo principal</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Galeria</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Placeholders para fotos */}
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500 text-xs">Foto</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
                        <span>Ver todas as fotos</span>
                        <Download size={14} className="ml-1" />
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Como Participar</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Entre em contato com os líderes após os cultos ou preencha o formulário de interesse na área de membros.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinisteriosSection;
