import React from 'react';
import { Link } from 'react-router-dom';

const HistoriaPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Nossa História</h1>
      
      {/* Conteúdo da página será adicionado aqui */}
      <p className="text-center text-xl text-gray-500 mb-8">
        Conteúdo sobre a história da igreja em breve...
      </p>

      <div className="mt-12 text-center">
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default HistoriaPage;

