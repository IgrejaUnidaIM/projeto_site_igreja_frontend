import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'; // Manter para teste, remover depois
import PastoresPage from './pages/PastoresPage';
import MinisteriosPage from './pages/MinisteriosPage';
import HistoriaPage from './pages/HistoriaPage';
import EventosPage from './pages/EventosPage';
import GaleriaPage from './pages/GaleriaPage';
import ContatoPage from './pages/ContatoPage';
import LoginPage from './pages/LoginPage'; // Importa a nova página de Login/Área de Membros
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Header /> 
      <main className="flex-grow pt-20"> {/* Adiciona padding top para compensar o header fixo */} 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="/pastores" element={<PastoresPage />} />
          <Route path="/ministerios" element={<MinisteriosPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Adiciona a rota para Login/Área de Membros */}
          <Route path="/about" element={<AboutPage />} /> {/* Rota de teste */} 
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;

