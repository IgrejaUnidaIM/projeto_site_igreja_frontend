import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {/* Animated circles */}
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 dark:bg-blue-400/10 blur-xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-yellow-500/20 dark:bg-yellow-400/10 blur-xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ animationDelay: '0.4s' }}></div>
          <div className={`absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-blue-300/20 dark:bg-blue-200/10 blur-xl transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Logo animation container */}
        <div className="relative mx-auto mb-8 w-64 h-64">
          <div className={`absolute inset-0 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}>
            <img 
              src={logo} 
              alt="Igreja Unida Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Cross overlay that fades in */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`} style={{ transitionDelay: '1s' }}>
            <div className="w-1/2 h-1/6 bg-white/80 dark:bg-white/90 rounded-sm"></div>
            <div className="absolute w-1/6 h-2/3 bg-white/80 dark:bg-white/90 rounded-sm"></div>
          </div>
        </div>

        {/* Text content */}
        <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.8s' }}>
          1ª Igreja Unida de Inácio Monteiro
        </h1>
        
        <p className={`text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8 max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1s' }}>
          O Mundo Para Cristo
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1.2s' }}>
          <a href="#historia" className="btn-primary-large">
            Nossa História
          </a>
          <a href="#eventos" className="btn-secondary-large">
            Próximos Eventos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
