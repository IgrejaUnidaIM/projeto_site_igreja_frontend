import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Componente de botão "Voltar ao Topo"
 * Aparece quando o usuário rola a página para baixo
 * Ao clicar, a página rola suavemente de volta ao topo
 */
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para verificar a posição de rolagem e mostrar/esconder o botão
  const toggleVisibility = () => {
    // Mostra o botão quando a rolagem for maior que 300px
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Função para rolar suavemente até o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Adiciona o evento de rolagem quando o componente é montado
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    // Remove o evento quando o componente é desmontado
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 z-50"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
