import PastoresList from './components/PastoresList';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import HeroSection from './components/HeroSection';
import HistoriaSection from './components/HistoriaSection';
import PastoresSection from './components/PastoresSection';
import MinisteriosSection from './components/MinisteriosSection';
import GaleriaSection from './components/GaleriaSection';
import ContatoSection from './components/ContatoSection';
import Footer from './components/layout/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-900 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 animate-pulse">
            {/* Placeholder para o logo durante carregamento */}
            <div className="w-full h-full rounded-full bg-blue-700 dark:bg-blue-800 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">IU</span>
            </div>
          </div>
          <h1 className="text-white text-xl font-bold animate-pulse">
            1ª Igreja Unida de Inácio Monteiro
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main>
        <HeroSection />
        <HistoriaSection />
        <PastoresList />
        <MinisteriosSection />
        <GaleriaSection />
        <ContatoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
