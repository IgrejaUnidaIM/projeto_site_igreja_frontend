import { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

const HistoriaSection = () => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  
  // Dados da linha do tempo (serão preenchidos posteriormente)
  const timelineEvents = [
    { 
      year: 1990, 
      title: "Fundação da Igreja", 
      description: "Este espaço está reservado para a história da fundação da 1ª Igreja Unida de Inácio Monteiro. Informações detalhadas serão adicionadas posteriormente.",
      image: null
    },
    { 
      year: 2000, 
      title: "Construção do Templo", 
      description: "Este espaço está reservado para a história da construção do templo. Informações detalhadas serão adicionadas posteriormente.",
      image: null
    },
    { 
      year: 2010, 
      title: "Expansão dos Ministérios", 
      description: "Este espaço está reservado para a história da expansão dos ministérios. Informações detalhadas serão adicionadas posteriormente.",
      image: null
    },
    { 
      year: 2020, 
      title: "Renovação e Crescimento", 
      description: "Este espaço está reservado para a história recente da igreja. Informações detalhadas serão adicionadas posteriormente.",
      image: null
    }
  ];

  const toggleYear = (year: number) => {
    setActiveYear(year === activeYear ? null : year);
  };

  return (
    <section id="historia" className="py-20 bg-blue-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Nossa História
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça a jornada de fé e dedicação que construiu a 1ª Igreja Unida de Inácio Monteiro
          </p>
        </div>

        {/* Linha do tempo interativa */}
        <div className="relative max-w-5xl mx-auto">
          {/* Linha central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-300 dark:bg-blue-700 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Eventos da linha do tempo */}
          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.year}
                className={`relative ${index % 2 === 0 ? 'md:text-right' : ''}`}
              >
                {/* Marcador de ano na linha (visível apenas em desktop) */}
                <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      activeYear === event.year 
                        ? 'bg-blue-600 text-white scale-125' 
                        : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-700 hover:scale-110'
                    }`}
                    onClick={() => toggleYear(event.year)}
                  >
                    <span className="font-bold text-sm">{event.year}</span>
                  </div>
                </div>
                
                {/* Conteúdo do evento */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Ano (visível apenas em mobile) */}
                  <div 
                    className="md:hidden flex items-center mb-3 cursor-pointer"
                    onClick={() => toggleYear(event.year)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      activeYear === event.year 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-700'
                    }`}>
                      <span className="font-bold text-xs">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {event.title}
                    </h3>
                  </div>
                  
                  {/* Título (visível apenas em desktop) */}
                  <h3 
                    className="hidden md:block text-xl font-bold text-blue-700 dark:text-blue-300 mb-3 cursor-pointer"
                    onClick={() => toggleYear(event.year)}
                  >
                    {event.title}
                  </h3>
                  
                  {/* Card expandido com detalhes */}
                  <div 
                    className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                      activeYear === event.year ? 'opacity-100 max-h-96' : 'opacity-70 max-h-24 hover:opacity-90'
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={16} className="mr-1" />
                          <span>{event.year}</span>
                        </div>
                        <button 
                          onClick={() => toggleYear(event.year)}
                          className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          {activeYear === event.year ? (
                            <>Menos detalhes <ChevronLeft size={16} className="ml-1" /></>
                          ) : (
                            <>Mais detalhes <ChevronRight size={16} className="ml-1" /></>
                          )}
                        </button>
                      </div>
                      
                      <p className={`text-gray-600 dark:text-gray-300 transition-all duration-300 ${
                        activeYear === event.year ? 'opacity-100' : 'opacity-0 md:opacity-100 line-clamp-2'
                      }`}>
                        {event.description}
                      </p>
                      
                      {/* Conteúdo expandido */}
                      {activeYear === event.year && (
                        <div className="mt-4 space-y-4">
                          {/* Placeholder para imagem */}
                          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-500">Imagem histórica será adicionada aqui</span>
                          </div>
                          
                          {/* Espaço para depoimentos */}
                          <div className="bg-blue-50 dark:bg-slate-700 p-3 rounded-md">
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Depoimentos</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                              "Este espaço está reservado para depoimentos de membros que vivenciaram este momento histórico da igreja."
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chamada para contribuição */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Você faz parte da nossa história? Compartilhe suas memórias e ajude a preservar o legado da nossa igreja.
          </p>
          <button className="btn-secondary">
            Contribuir com a Nossa História
          </button>
        </div>
      </div>
    </section>
  );
};

export default HistoriaSection;
