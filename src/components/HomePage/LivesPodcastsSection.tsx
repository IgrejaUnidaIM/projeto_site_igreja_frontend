// src/components/HomePage/LivesPodcastsSection.tsx
import React from 'react';
import LivesPodcasts from '../LivesPodcasts';
import { ArrowRight, Headphones, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const LivesPodcastsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Video className="w-8 h-8 text-red-600" aria-hidden="true" />
            <Headphones className="w-8 h-8 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lives e Podcasts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Não perca nossas transmissões ao vivo e acompanhe nossos podcasts 
            com ensinamentos que transformam vidas.
          </p>
          
          {/* Botão para ver todos */}
          <Link
            to="/lives-podcasts"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="Ver todos os lives e podcasts"
          >
            Ver Todos
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </div>

        {/* Componente de Lives e Podcasts */}
        <LivesPodcasts 
          limite={6} 
          mostrarFiltros={false} 
          apenasDestaques={true} 
        />
      </div>
    </section>
  );
};

export default LivesPodcastsSection;
