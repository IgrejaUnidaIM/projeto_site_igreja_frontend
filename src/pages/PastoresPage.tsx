import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Define a interface para os dados dos pastores
interface Pastor {
  _id: string;
  nome: string;
  cargo?: string;
  atual?: boolean;
  dataEntrada?: string;
  dataSaida?: string;
  biografia?: string;
  imagemUrl?: string;
}

const PastoresPage: React.FC = () => {
  // Estados para gerenciar os dados e o carregamento
  const [pastores, setPastores] = useState<Pastor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pastorSelecionado, setPastorSelecionado] = useState<Pastor | null>(null);
  const [modalAberto, setModalAberto] = useState<boolean>(false);

  // Busca os dados dos pastores do Sanity
  useEffect(() => {
    const query = `*[_type == "pastor"] | order(ordem asc) {
      _id,
      nome,
      cargo,
      atual,
      dataEntrada,
      dataSaida,
      "biografia": biografia,
      "imagemUrl": foto.asset->url
    }`;

    sanityClient.fetch<Pastor[]>(query)
      .then((data) => {
        setPastores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pastores:", err);
        setError("Falha ao carregar os dados dos pastores.");
        setLoading(false);
      });
  }, []);

  // Função para formatar data (DD/MM/YYYY)
  const formatarData = (dataString?: string) => {
    if (!dataString) return '';
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        timeZone: 'UTC'
      });
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return dataString;
    }
  };

  // Função para abrir o modal com a foto ampliada
  const abrirModal = (pastor: Pastor) => {
    setPastorSelecionado(pastor);
    setModalAberto(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
    setPastorSelecionado(null);
  };

  // Exibe mensagem de carregamento
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <h1 className="text-3xl font-bold mb-8">Carregando pastores...</h1>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Exibe mensagem de erro, se houver
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Erro</h1>
        <p className="text-xl">{error}</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Nossa Equipe Pastoral</h1>
      
      {pastores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastores.map((pastor) => (
            <div key={pastor._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              {pastor.imagemUrl && (
                <div className="cursor-pointer" onClick={() => abrirModal(pastor)}>
                  <img 
                    src={pastor.imagemUrl} 
                    alt={`Foto de ${pastor.nome}`} 
                    className="w-full h-65 object-cover object-center hover:opacity-90 transition modal-image-fullscreen "
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{pastor.nome}</h2>
                {pastor.cargo && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pastor.cargo}</p>
                )}
                {/* Exibir status atual ou período de ministério */}
                {pastor.atual ? (
                  <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                    {pastor.dataEntrada ? `Desde ${formatarData(pastor.dataEntrada)}` : 'Pastor atual'}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {pastor.dataEntrada && pastor.dataSaida ? 
                      `${formatarData(pastor.dataEntrada)} - ${formatarData(pastor.dataSaida)}` : 
                      'Pastor histórico'}
                  </p>
                )}
                {pastor.biografia && (
                  <p className="text-gray-700 dark:text-gray-300">{pastor.biografia}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">Nenhum pastor encontrado no momento.</p>
      )}

      {/* Modal para exibir a foto ampliada */}
      {modalAberto && pastorSelecionado && pastorSelecionado.imagemUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={fecharModal}>
          <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img 
                src={pastorSelecionado.imagemUrl} 
                alt={`Foto de ${pastorSelecionado.nome}`} 
                className="w-full max-h-[80vh] object-contain"
              />
              <button 
                className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-full p-2 shadow-md"
                onClick={fecharModal}
              >
                <X size={24} className="text-gray-800 dark:text-white" />
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{pastorSelecionado.nome}</h2>
              {pastorSelecionado.cargo && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{pastorSelecionado.cargo}</p>
              )}
              {/* Exibir status atual ou período de ministério no modal também */}
              {pastorSelecionado.atual ? (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  {pastorSelecionado.dataEntrada ? `Desde ${formatarData(pastorSelecionado.dataEntrada)}` : 'Pastor atual'}
                </p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {pastorSelecionado.dataEntrada && pastorSelecionado.dataSaida ? 
                    `${formatarData(pastorSelecionado.dataEntrada)} - ${formatarData(pastorSelecionado.dataSaida)}` : 
                    'Pastor histórico'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default PastoresPage;
