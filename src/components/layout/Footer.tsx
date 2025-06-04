import { Heart } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 dark:bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Informações */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-24 h-24 mb-4">
              <img 
                src={logo} 
                alt="Igreja Unida de Inácio Monteiro" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">1ª Igreja Unida de Inácio Monteiro</h3>
            <p className="text-blue-200 dark:text-blue-300 text-sm text-center md:text-left">
              Levando o amor de Cristo a todos
            </p>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Início</a></li>
              <li><a href="#historia" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Nossa História</a></li>
              <li><a href="#pastores" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Pastores</a></li>
              <li><a href="#ministerios" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Ministérios</a></li>
              <li><a href="#galeria" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Galeria</a></li>
              <li><a href="#contato" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Horários */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Horários de Culto
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-col">
                <span className="font-medium">Domingo - 08h30</span>
                <span className="text-blue-200 dark:text-blue-300">Escola Bíblica Dominical</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Domingo - 18h00</span>
                <span className="text-blue-200 dark:text-blue-300">Culto da Família</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Quinta-feira - 20h00</span>
                <span className="text-blue-200 dark:text-blue-300">Culto de Oração</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Domingo - 09h00</span>
                <span className="text-blue-200 dark:text-blue-300">Santa Ceia</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Segunda-feira - 08h00</span>
                <span className="text-blue-200 dark:text-blue-300">Círculo de Oração</span>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-blue-700 dark:border-blue-800 pb-2">
              Contato
            </h4>
            <address className="not-italic text-sm space-y-2">
              <p>R. Cachoeira Jaciquara, 175</p>
              <p>Conj. Hab. Inacio Monteiro, São Paulo - SP</p>
              <p>Cep: 08472-420</p>
              <p className="pt-2">
                <span className="font-medium">Telefone:</span> (11) 99001-0033
              </p>
              <p>
                <span className="font-medium">Email:</span> unidainaciomonteiro@gmail.com
              </p>
            </address>
            
            {/* Redes Sociais */}
            <div className="mt-4 flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-800 dark:bg-blue-950 flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Linha divisória */}
        <div className="border-t border-blue-800 dark:border-blue-950 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-200 dark:text-blue-300 mb-4 md:mb-0">
              &copy; {currentYear} 1ª Igreja Unida de Inácio Monteiro. Todos os direitos reservados.
            </p>
            <div className="flex items-center text-sm text-blue-200 dark:text-blue-300">
              <span>Feito com</span>
              <Heart size={16} className="mx-1 text-red-400" />
              <span>para a glória de Deus</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
