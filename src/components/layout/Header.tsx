
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png'; // Importa o logo

// Componente Header: Cabeçalho principal do site
const Header = () => {
  // Estado para controlar o modo escuro
  const [darkMode, setDarkMode] = useState(false);
  // Estado para controlar a abertura do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar se a página foi rolada (para aplicar estilo ao header)
  const [scrolled, setScrolled] = useState(false);
  // Hook para obter a localização atual (URL)
  const location = useLocation();

  // Efeito para detectar rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Define como rolado se scroll > 10px
    };
    window.addEventListener('scroll', handleScroll);
    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para aplicar/remover a classe 'dark' no HTML baseado no estado darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Efeito para fechar o menu mobile sempre que a rota (pathname) mudar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]); // Dependência: apenas o pathname da URL

  // Função para alternar o modo escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Função para alternar a visibilidade do menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define os links de navegação (todas são páginas separadas agora)
  const navLinks = [
    { to: "/", text: "Início" },
    { to: "/historia", text: "Nossa História" }, // Rota para página
    { to: "/pastores", text: "Pastores" },
    { to: "/ministerios", text: "Ministérios" },
    { to: "/eventos", text: "Eventos" }, // Rota para página
    { to: "/galeria", text: "Galeria" }, // Rota para página
    { to: "/contato", text: "Contato" }, // Rota para página
  ];

  return (
    // Tag header com classes dinâmicas para estilo baseado na rolagem
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
      role="banner" // Adiciona role para acessibilidade
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo e Nome da Igreja - Centralizado */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label="Página Inicial">
            <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden flex-shrink-0"> {/* Ajusta tamanho e evita encolher */}
              <img 
                src={logo} 
                alt="Logotipo da 1ª Igreja Unida de Inácio Monteiro" // Alt text mais descritivo
                className="w-full h-full object-contain transition-transform hover:scale-110 duration-300"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-base md:text-xl font-bold text-blue-800 dark:text-blue-400 whitespace-nowrap"> {/* Ajusta tamanho e evita quebra de linha */}
                1ª Igreja Unida em Inácio Monteiro
              </h1>
              {/* <p className="text-xs md:text-sm text-blue-600 dark:text-blue-300">
                de Inácio Monteiro
              </p> */}
            </div>
          </Link>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Navegação Principal">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.text}
            </Link>
          ))}
          {/* Link para Área de Membros (Login) */}
          <Link to="/area-de-membros" className="btn-primary">Área de Membros</Link> 
          {/* Botão para alternar modo claro/escuro - Estilo ajustado para visibilidade */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full border border-gray-300 dark:border-slate-700 bg-gray-50 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"} // aria-label já estava bom
            title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"} // Adiciona title para tooltip
          >
            {darkMode ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
        </nav>

        {/* Botões Mobile (Dark Mode e Menu) */}
        <div className="flex items-center md:hidden">
          {/* Botão Dark Mode Mobile */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            title={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          {/* Botão Abrir/Fechar Menu Mobile */}
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md bg-blue-600 text-white"
            aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"} // aria-label mais descritivo
            aria-expanded={isMenuOpen} // Indica se o menu está expandido
            aria-controls="mobile-menu" // Associa ao menu que ele controla
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Navegação Mobile (Dropdown) */}
      {/* Adicionado id para aria-controls e role navigation */}
      {isMenuOpen && (
        <nav 
          id="mobile-menu" 
          className="md:hidden bg-white dark:bg-slate-900 shadow-lg"
          aria-label="Navegação Móvel"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="mobile-nav-link" 
                // onClick é tratado pelo useEffect que fecha ao mudar rota
              >
                {link.text}
              </Link>
            ))}
            {/* Link Área de Membros Mobile */}
            <Link 
              to="/area-de-membros" 
              className="btn-primary-mobile" 
              // onClick é tratado pelo useEffect que fecha ao mudar rota
            >
              Área de Membros
            </Link> 
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

