import { useState } from 'react';
import { ChevronRight, ChevronLeft, Calendar, MapPin, Heart } from 'lucide-react';

// Tipo para os dados dos pastores
type Pastor = {
  id: number;
  nome: string;
  cargo: string;
  periodo: string;
  foto: string;
  biografia: string;
  isAtual: boolean;
};

const PastoresSection = () => {
  // Estado para controlar qual pastor está sendo visualizado em detalhes
  const [pastorAtivo, setPastorAtivo] = useState<number | null>(null);
  
  // Dados dos pastores (atuais e históricos)
  const pastores: Pastor[] = [
    {
      id: 1,
      nome: "João Alexandre de França",
      cargo: "Pastor Titular",
      periodo: "Atual",
      foto: "placeholder-pastor.jpg", // Será substituído pela foto real
      biografia: "Pastor João Alexandre de França é o atual pastor titular da 1ª Igreja Unida de Inácio Monteiro. Sua biografia completa será adicionada aqui.",
      isAtual: true
    },
    {
      id: 2,
      nome: "Emilia Alexandre de Paula",
      cargo: "Pastora Fundadora (Jubilada)",
      periodo: "Fundação - Atual (Conselheira)",
      foto: "placeholder-pastora.jpg", // Será substituído pela foto real
      biografia: "Pastora Emilia Alexandre de Paula é a fundadora da 1ª Igreja Unida de Inácio Monteiro e atualmente serve como conselheira do Pastor João. Sua biografia completa será adicionada aqui.",
      isAtual: true
    },
    {
      id: 3,
      nome: "Vagner Vanucci",
      cargo: "Segundo Pastor",
      periodo: "Atual",
      foto: "placeholder-pastor.jpg", // Será substituído pela foto real
      biografia: "Pastor Vagner Vanucci atualmente serve como segundo pastor da 1ª Igreja Unida de Inácio Monteiro. Sua biografia completa será adicionada aqui.",
      isAtual: true
    },
    {
      id: 4,
      nome: "José Alexandre da Silva Filho",
      cargo: "Terceiro Pastor",
      periodo: "Atual",
      foto: "placeholder-pastor.jpg", // Será substituído pela foto real
      biografia: "Pastor José Alexandre da Silva Filho atualmente serve como terceiro pastor da 1ª Igreja Unida de Inácio Monteiro. Sua biografia completa será adicionada aqui.",
      isAtual: true
    },
    {
      id: 5,
      nome: "Pastor Histórico 1",
      cargo: "Pastor Anterior",
      periodo: "2000 - 2010",
      foto: "placeholder-pastor-historico.jpg", // Será substituído pela foto real
      biografia: "Este espaço está reservado para informações sobre pastores históricos que contribuíram para a construção da igreja. Sua biografia completa será adicionada aqui.",
      isAtual: false
    },
    {
      id: 6,
      nome: "Pastor Histórico 2",
      cargo: "Pastor Fundador",
      periodo: "1990 - 2000",
      foto: "placeholder-pastor-historico.jpg", // Será substituído pela foto real
      biografia: "Este espaço está reservado para informações sobre pastores históricos que contribuíram para a construção da igreja. Sua biografia completa será adicionada aqui.",
      isAtual: false
    }
  ];

  // Filtrar pastores atuais e históricos
  const pastoresAtuais = pastores.filter(pastor => pastor.isAtual);
  const pastoresHistoricos = pastores.filter(pastor => !pastor.isAtual);

  // Função para exibir detalhes do pastor
  const mostrarDetalhesPastor = (id: number) => {
    setPastorAtivo(id === pastorAtivo ? null : id);
  };

  return (
    <section id="pastores" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Nossos Pastores
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça os líderes que guiam nossa igreja e aqueles que fizeram parte da nossa história
          </p>
        </div>

        {/* Linha do tempo interativa */}
        <div className="relative mb-20">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-blue-200 dark:bg-blue-800 transform -translate-y-1/2"></div>
          <div className="relative flex justify-between max-w-4xl mx-auto">
            {[1990, 2000, 2010, 2020, "Atual"].map((ano, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 mb-2 z-10"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{ano}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pastores Atuais */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-8 text-center">
            Liderança Atual
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastoresAtuais.map(pastor => (
              <div 
                key={pastor.id} 
                className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                  pastorAtivo === pastor.id ? 'transform scale-105 ring-2 ring-blue-500' : 'hover:shadow-xl'
                }`}
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 dark:bg-gray-700">
                  {/* Placeholder para foto do pastor */}
                  <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-1">{pastor.nome}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pastor.cargo}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <span>{pastor.periodo}</span>
                  </div>
                  
                  <button 
                    onClick={() => mostrarDetalhesPastor(pastor.id)}
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {pastorAtivo === pastor.id ? (
                      <>Menos detalhes <ChevronLeft size={16} className="ml-1" /></>
                    ) : (
                      <>Mais detalhes <ChevronRight size={16} className="ml-1" /></>
                    )}
                  </button>
                  
                  {/* Biografia expandida */}
                  {pastorAtivo === pastor.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {pastor.biografia}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pastores Históricos */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-8 text-center">
            Pastores que Fizeram História
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastoresHistoricos.map(pastor => (
              <div 
                key={pastor.id} 
                className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                  pastorAtivo === pastor.id ? 'transform scale-105 ring-2 ring-blue-500' : 'hover:shadow-xl'
                }`}
              >
                <div className="flex">
                  <div className="w-1/3 bg-gray-200 dark:bg-gray-700">
                    {/* Placeholder para foto do pastor */}
                    <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-1">{pastor.nome}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{pastor.cargo}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{pastor.periodo}</span>
                    </div>
                    
                    <button 
                      onClick={() => mostrarDetalhesPastor(pastor.id)}
                      className="text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      {pastorAtivo === pastor.id ? (
                        <>Menos detalhes <ChevronLeft size={14} className="ml-1" /></>
                      ) : (
                        <>Mais detalhes <ChevronRight size={14} className="ml-1" /></>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Biografia expandida */}
                {pastorAtivo === pastor.id && (
                  <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {pastor.biografia}
                    </p>
                    <div className="mt-3 flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <Heart size={16} className="mr-1" />
                      <span>Compartilhe uma memória</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Botão para adicionar depoimentos */}
        <div className="mt-12 text-center">
          <button className="btn-secondary">
            Compartilhar Memórias e Testemunhos
          </button>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Ajude-nos a preservar a história da nossa igreja compartilhando suas memórias
          </p>
        </div>
      </div>
    </section>
  );
};

export default PastoresSection;
