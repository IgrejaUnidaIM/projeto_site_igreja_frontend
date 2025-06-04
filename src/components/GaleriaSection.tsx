import { useState } from 'react';
import { Camera, Download, Share2, Heart } from 'lucide-react';

const GaleriaSection = () => {
  const [activeTab, setActiveTab] = useState('fotos');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Dados de exemplo para a galeria (serão substituídos por conteúdo real)
  const fotos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Foto ${i + 1}`,
    description: 'Descrição da imagem será adicionada aqui.',
    category: i % 3 === 0 ? 'eventos' : i % 3 === 1 ? 'cultos' : 'ministerios',
    date: '2025'
  }));
  
  const videos = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Vídeo ${i + 1}`,
    description: 'Descrição do vídeo será adicionada aqui.',
    category: i % 2 === 0 ? 'pregações' : 'eventos',
    date: '2025'
  }));

  // Filtros para categorias
  const fotoCategorias = ['Todos', 'Eventos', 'Cultos', 'Ministérios'];
  const [fotoFiltro, setFotoFiltro] = useState('Todos');
  
  const videoCategorias = ['Todos', 'Pregações', 'Eventos'];
  const [videoFiltro, setVideoFiltro] = useState('Todos');

  // Função para filtrar itens por categoria
  const filtrarItens = (items: any[], filtro: string) => {
    if (filtro === 'Todos') return items;
    return items.filter(item => 
      item.category.toLowerCase() === filtro.toLowerCase()
    );
  };

  // Função para abrir visualização detalhada
  const abrirImagem = (id: number) => {
    setSelectedImage(id === selectedImage ? null : id);
  };

  return (
    <section id="galeria" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            Nossa Galeria
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Momentos especiais da nossa comunidade em imagens e vídeos
          </p>
        </div>

        {/* Abas de navegação */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('fotos')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'fotos'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Fotos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Vídeos
            </button>
          </div>
        </div>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {activeTab === 'fotos' ? (
            fotoCategorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => setFotoFiltro(categoria)}
                className={`px-4 py-1 text-sm rounded-full transition-colors ${
                  fotoFiltro === categoria
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {categoria}
              </button>
            ))
          ) : (
            videoCategorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => setVideoFiltro(categoria)}
                className={`px-4 py-1 text-sm rounded-full transition-colors ${
                  videoFiltro === categoria
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              >
                {categoria}
              </button>
            ))
          )}
        </div>

        {/* Galeria de Fotos */}
        {activeTab === 'fotos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtrarItens(fotos, fotoFiltro).map(foto => (
              <div 
                key={foto.id}
                className={`group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ${
                  selectedImage === foto.id ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {/* Placeholder para imagem */}
                <div 
                  className="aspect-square bg-gray-200 dark:bg-gray-700 cursor-pointer"
                  onClick={() => abrirImagem(foto.id)}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Camera size={32} />
                  </div>
                </div>
                
                {/* Overlay com informações */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
                    selectedImage === foto.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  onClick={() => abrirImagem(foto.id)}
                >
                  <h3 className="text-white font-medium">{foto.title}</h3>
                  <p className="text-gray-200 text-sm">{foto.date}</p>
                </div>
                
                {/* Botões de ação */}
                <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity duration-300 ${
                  selectedImage === foto.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <button className="p-1.5 rounded-full bg-white/80 dark:bg-black/50 text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-black/70">
                    <Download size={16} />
                  </button>
                  <button className="p-1.5 rounded-full bg-white/80 dark:bg-black/50 text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-black/70">
                    <Share2 size={16} />
                  </button>
                  <button className="p-1.5 rounded-full bg-white/80 dark:bg-black/50 text-blue-600 dark:text-blue-400 hover:bg-white dark:hover:bg-black/70">
                    <Heart size={16} />
                  </button>
                </div>
                
                {/* Detalhes expandidos */}
                {selectedImage === foto.id && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/80 p-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {foto.description}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {foto.category.charAt(0).toUpperCase() + foto.category.slice(1)}
                      </span>
                      <button 
                        className="text-xs text-gray-600 dark:text-gray-400"
                        onClick={() => setSelectedImage(null)}
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Galeria de Vídeos */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrarItens(videos, videoFiltro).map(video => (
              <div 
                key={video.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden"
              >
                {/* Placeholder para thumbnail do vídeo */}
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.3" />
                      <path d="M15.5 12L10 15.5V8.5L15.5 12Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                    3:45
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{video.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {video.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Botão para ver mais */}
        <div className="mt-12 text-center">
          <button className="btn-primary">
            {activeTab === 'fotos' ? 'Ver Mais Fotos' : 'Ver Mais Vídeos'}
          </button>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Acesse a área de membros para ver todo o acervo de mídia
          </p>
        </div>
      </div>
    </section>
  );
};

export default GaleriaSection;
