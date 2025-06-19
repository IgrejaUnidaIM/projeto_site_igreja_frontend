import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PastoresPage from './pages/PastoresPage';
import MinisteriosPage from './pages/MinisteriosPage';
import NossaHistoriaPage from './pages/NossaHistoriaPage'; // Import da nova página
import EventosPage from './pages/EventosPage';
import GaleriaPage from './pages/GaleriaPage';
import ContatoPage from './pages/ContatoPage';
import ArtigosPage from './pages/ArtigosPage'; // Nova página unificada de artigos e sermões
import ArtigoDetalhe from './pages/ArtigoDetalhe'; // Página de detalhe para artigos
import SermaoDetalhe from './pages/SermaoDetalhe'; // Página de detalhe para sermões
import LoginPage from './pages/LoginPage'; // Importa a nova página de Login/Área de Membros
import Header from './components/Header';
import Footer from './components/Footer2';
import BackToTop from './components/BackToTop'; // Importa o componente de voltar ao topo
import './App.css';

function App() {
  return (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-24">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nossa-historia" element={<NossaHistoriaPage />} /> {/* Nova rota */}
          <Route path="/pastores" element={<PastoresPage />} />
          <Route path="/ministerios" element={<MinisteriosPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/artigos" element={<ArtigosPage />} /> {/* Nova rota unificada para artigos e sermões */}
          <Route path="/artigos/:slug" element={<ArtigoDetalhe />} /> {/* Rota dinâmica para detalhe de artigo */}
          <Route path="/sermoes/:slug" element={<SermaoDetalhe />} /> {/* Rota dinâmica para detalhe de sermão */}
          <Route path="/area-administrativa" element={<LoginPage />} /> {/* Rota corrigida para Área de Membros */}
        </Routes>
      </main>
      <Footer />
      <BackToTop /> {/* Adiciona o botão de voltar ao topo em todas as páginas */}
    </div>
  );
}

export default App;

