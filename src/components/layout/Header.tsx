
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Get current location

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]); // Only close on pathname change, not hash

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define navigation links - ALL are separate pages now
  const navLinks = [
    { to: "/", text: "Início" },
    { to: "/historia", text: "Nossa História" }, // Changed to page route
    { to: "/pastores", text: "Pastores" },
    { to: "/ministerios", text: "Ministérios" },
    { to: "/eventos", text: "Eventos" }, // Changed to page route
    { to: "/galeria", text: "Galeria" }, // Changed to page route
    { to: "/contato", text: "Contato" }, // Changed to page route
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="relative w-16 h-16 overflow-hidden">
              <img 
                src={logo} 
                alt="Igreja Unida de Inácio Monteiro" 
                className="w-full h-full object-contain transition-transform hover:scale-110 duration-300"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-lg md:text-xl font-bold text-blue-800 dark:text-blue-400">
                1ª Igreja Unida
              </h1>
              <p className="text-xs md:text-sm text-blue-600 dark:text-blue-300">
                de Inácio Monteiro
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.text}
            </Link>
          ))}
          <Link to="/login" className="btn-primary">Área de Membros</Link> 
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200"
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-md bg-blue-600 text-white"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="mobile-nav-link" 
                // onClick handled by useEffect based on location change
              >
                {link.text}
              </Link>
            ))}
            <Link 
              to="/login" 
              className="btn-primary-mobile" 
              // onClick handled by useEffect based on location change
            >
              Área de Membros
            </Link> 
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

