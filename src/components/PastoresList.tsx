
import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient'; // Certifique-se que o caminho está correto

// Define a interface para os dados que esperamos receber do Sanity
interface Pastor {
  _id: string;
  nome: string;
  tipo?: string; // O tipo pode ser opcional, dependendo do seu schema
  bio?: string; // A bio também pode ser opcional
  imagemUrl?: string; // A URL da imagem também
}

const PastoresList: React.FC = () => {
  // Estado para armazenar a lista de pastores
  const [pastores, setPastores] = useState<Pastor[]>([]);
  // Estado para indicar se os dados estão sendo carregados
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    // Query GROQ para buscar todos os documentos do tipo 'pastor'
    // Ordenamos por 'ordem' se você tiver esse campo no schema
    const query = `*[_type == "pastor"] | order(ordem asc) {
      _id,
      nome,
      tipo,
      bio,
      "imagemUrl": foto.asset->url // Busca a URL da imagem referenciada
    }`;

    // Executa a busca no Sanity
    sanityClient.fetch<Pastor[]>(query)
      .then((data) => {
        // Se a busca for bem-sucedida, atualiza o estado
        setPastores(data);
        setLoading(false); // Marca o carregamento como concluído
      })
      .catch((err) => {
        // Se ocorrer um erro, registra no console e atualiza o estado de erro
        console.error("Erro ao buscar pastores:", err);
        setError("Falha ao carregar os dados dos pastores.");
        setLoading(false); // Marca o carregamento como concluído (mesmo com erro)
      });
  }, []); // O array vazio [] garante que o efeito rode apenas uma vez, quando o componente monta

  // Exibe mensagem de carregamento
  if (loading) {
    return <div>Carregando pastores...</div>;
  }

  // Exibe mensagem de erro, se houver
  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Renderiza a lista de pastores
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Nossa Equipe Pastoral</h2>
      {pastores.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pastores.map((pastor) => (
            <li key={pastor._id} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', display: 'flex', alignItems: 'center' }}>
              {/* Exibe a imagem se a URL existir */}
              {pastor.imagemUrl && (
                <img 
                  src={pastor.imagemUrl} 
                  alt={`Foto de ${pastor.nome}`} 
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }} 
                />
              )}
              <div>
                {/* Exibe o nome e o tipo (se existir) */}
                <strong style={{ fontSize: '1.2em' }}>{pastor.nome}</strong>
                {pastor.tipo && <span style={{ marginLeft: '5px', color: '#555' }}>({pastor.tipo})</span>}
                {/* Exibe a bio (se existir) */}
                {pastor.bio && <p style={{ margin: '5px 0 0 0', color: '#333' }}>{pastor.bio}</p>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // Mensagem caso nenhum pastor seja encontrado
        <p>Nenhum pastor encontrado no momento.</p>
      )}
    </div>
  );
};

export default PastoresList;

