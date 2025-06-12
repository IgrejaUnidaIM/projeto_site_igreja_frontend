// src/pages/LivesPodcastsPage.tsx
import React from 'react';
import LivesPodcasts from '../components/LivesPodcasts';
import { Headphones, Video } from 'lucide-react';

const LivesPodcastsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Video className="w-8 h-8 text-red-600" aria-hidden="true" />
              <Headphones className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lives e Podcasts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acompanhe nossas transmissões ao vivo e ouça nossos podcasts com 
              ensinamentos, pregações e conteúdos edificantes para sua vida espiritual.
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LivesPodcasts 
          limite={50} 
          mostrarFiltros={true} 
          apenasDestaques={false} 
        />
      </div>
    </div>
  );
};

export default LivesPodcastsPage;
