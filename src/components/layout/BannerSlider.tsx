import React, { useState, useEffect } from 'react';
import sanityClient from '../../sanityClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Loader, AlertCircle, Image as ImageIcon } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

/**
 * Interface para os dados de banners buscados do Sanity
 */
interface Banner {
  _id: string;
  titulo?: string;
  descricao?: string;
  link?: string; // Link opcional para o banner
  imagemUrl?: string; // URL da imagem do banner
}

const BannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Query para buscar banners do Sanity
     * - Ordenados por data de criação ou um campo de ordem, se existir
     * - Busca ID, título, descrição, link e URL da imagem
     * - Ajuste o nome do schema ('banner') e dos campos conforme configurado no seu Sanity
     */
    const queryBanners = `*[_type == "banner"] | order(_createdAt desc) {
      _id,
      titulo,
      descricao,
      link,
      "imagemUrl": imagem.asset->url
    }`;

    console.log('BannerSlider: Buscando banners...');
    setLoading(true);
    setError(null);

    sanityClient.fetch<Banner[]>(queryBanners)
      .then((data) => {
        console.log('BannerSlider: Banners recebidos:', data);
        setBanners(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('BannerSlider: Erro ao buscar banners:', err);
        setError('Falha ao carregar os banners.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <Loader size={20} className="animate-spin text-blue-500 mr-2" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Carregando banners...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 px-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-200 rounded text-sm">
        <AlertCircle size={18} className="inline mr-1" /> {error}
      </div>
    );
  }

  if (banners.length === 0) {
    // Não renderiza nada se não houver banners, ou pode mostrar uma mensagem padrão
    // console.log('BannerSlider: Nenhum banner encontrado.');
    return null; 
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      spaceBetween={0} // Sem espaço entre slides
      slidesPerView={1} // Mostrar 1 slide por vez
      navigation // Habilita setas de navegação
      pagination={{ clickable: true }} // Habilita paginação clicável
      autoplay={{ delay: 5000, disableOnInteraction: false }} // Autoplay a cada 5 segundos
      loop={true} // Loop infinito
      className="rounded-lg overflow-hidden shadow-lg mb-12" // Estilos para o container do Swiper
      aria-label="Carrossel de Banners"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner._id}>
          {banner.link ? (
            <Link to={banner.link} target="_blank" rel="noopener noreferrer" className="block relative w-full h-64 md:h-96" aria-label={banner.titulo || 'Banner'}>
              {banner.imagemUrl ? (
                <img 
                  src={banner.imagemUrl} 
                  alt={banner.titulo || 'Banner'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  <ImageIcon size={64} />
                </div>
              )}
              {/* Overlay com texto (opcional) */}
              {(banner.titulo || banner.descricao) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                  {banner.titulo && <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">{banner.titulo}</h2>}
                  {banner.descricao && <p className="text-gray-200 text-sm md:text-base drop-shadow-md">{banner.descricao}</p>}
                </div>
              )}
            </Link>
          ) : (
            <div className="relative w-full h-64 md:h-96" role="img" aria-label={banner.titulo || 'Banner'}>
              {banner.imagemUrl ? (
                <img 
                  src={banner.imagemUrl} 
                  alt={banner.titulo || 'Banner'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                  <ImageIcon size={64} />
                </div>
              )}
              {/* Overlay com texto (opcional) */}
              {(banner.titulo || banner.descricao) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                  {banner.titulo && <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">{banner.titulo}</h2>}
                  {banner.descricao && <p className="text-gray-200 text-sm md:text-base drop-shadow-md">{banner.descricao}</p>}
                </div>
              )}
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;

