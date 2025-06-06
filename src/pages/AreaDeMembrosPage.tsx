
import React, { useState } from 'react';
import { LogIn, User, ShieldCheck } from 'lucide-react';

/**
 * Interface para o estado do usuário (implementação futura)
 * Define a estrutura de dados para controle de autenticação e tipo de usuário
 */
interface UserState {
  isLoggedIn: boolean;       // Indica se o usuário está autenticado
  userType: 'admin' | 'member' | null;  // Tipo de usuário: administrador ou membro comum
  // Outros dados do usuário podem ser adicionados conforme necessidade
}

/**
 * Componente da página de Área de Membros
 * Permite login de usuários com diferentes níveis de acesso (admin ou membro)
 */
const AreaDeMembrosPage: React.FC = () => {
  // Estado para gerenciar o tipo de usuário (será implementado com autenticação real)
  // const [user, setUser] = useState<UserState>({ isLoggedIn: false, userType: null });

  /**
   * Função para processar o envio do formulário de login
   * @param event - Evento de submissão do formulário
   */
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Tentativa de login iniciada...');
    
    /**
     * LÓGICA DE AUTENTICAÇÃO (FUTURA IMPLEMENTAÇÃO)
     * 
     * 1. Obter email/senha do formulário
     * const formData = new FormData(event.currentTarget);
     * const email = formData.get('login-email');
     * const password = formData.get('login-password');
     */

    // 2. Enviar credenciais para a API de autenticação (ex: backend próprio, Firebase Auth, etc.)
    //    A API deve retornar se o login foi bem-sucedido e qual o TIPO de usuário (admin ou member)
    
    // 3. Se o login for bem-sucedido:
    //    - Atualizar o estado global da aplicação para indicar que o usuário está logado
    //    - Armazenar o tipo de usuário (admin/member)
    //    - Redirecionar para a página apropriada:
    //      - Se admin: Redirecionar para um painel de administração?
    //      - Se member: Redirecionar para uma área restrita de membros?
    //    - Exemplo: setUser({ isLoggedIn: true, userType: 'admin' }); // Ou 'member'
    //    - Exemplo: navigate('/painel-admin'); // Ou '/area-membro'

    // 4. Se o login falhar:
    //    - Exibir mensagem de erro apropriada

    // Mensagem temporária enquanto a lógica não está implementada
    alert('Funcionalidade de login ainda não implementada. Verifique o console para detalhes.');
    console.log('Lógica de autenticação e verificação de tipo de usuário (admin/member) a ser implementada aqui.');
  };

  // --- RENDERIZAÇÃO CONDICIONAL (FUTURA IMPLEMENTAÇÃO) ---
  // Se o usuário estivesse logado, poderíamos exibir conteúdo diferente:
  // if (user.isLoggedIn) {
  //   return (
  //     <div className="container mx-auto px-4 py-16 min-h-screen">
  //       <h1 className="text-3xl font-bold text-center mb-6">Bem-vindo!</h1>
  //       {user.userType === 'admin' && (
  //         <div className="bg-yellow-100 p-4 rounded text-center">
  //           <ShieldCheck className="inline-block mr-2" /> Você está logado como Administrador.
  //           {/* Link para painel admin */}
  //         </div>
  //       )}
  //       {user.userType === 'member' && (
  //         <div className="bg-blue-100 p-4 rounded text-center">
  //            <User className="inline-block mr-2" /> Você está logado como Membro.
  //            {/* Conteúdo exclusivo para membros */}
  //         </div>
  //       )}
  //       {/* Botão de Logout */}
  //     </div>
  //   );
  // }

  // Renderiza o formulário de login se o usuário não estiver logado
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          {/* Ícone de Login */}
          <LogIn size={48} className="mx-auto text-blue-500 mb-4" aria-hidden="true" />
          {/* Título da Página */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Área de Membros</h1>
          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-400 mt-2">Acesse sua conta para conteúdo exclusivo.</p>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleLoginSubmit} className="space-y-6" aria-labelledby="login-heading">
          {/* Campo Email/Usuário */}
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email ou Usuário</label>
            <input 
              type="text" // Pode ser 'email' se for apenas email
              id="login-email" 
              name="login-email" 
              required 
              aria-required="true"
              autoComplete="username" // Ajuda navegadores a preencher
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          {/* Campo Senha */}
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input 
              type="password" 
              id="login-password" 
              name="login-password" 
              required 
              aria-required="true"
              autoComplete="current-password" // Ajuda navegadores a preencher
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="********"
            />
          </div>
          
          {/* TODO: Adicionar link "Esqueci minha senha" se necessário */}
          {/* <div className="text-sm text-right"> */}
          {/*   <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"> */}
          {/*     Esqueceu sua senha? */}
          {/*   </a> */}
          {/* </div> */}

          {/* Botão de Envio */}
          <div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              Entrar
            </button>
          </div>

          {/* TODO: Adicionar opção de registro se necessário */}
          {/* <p className="text-sm text-center text-gray-600 dark:text-gray-400"> */}
          {/*   Não tem uma conta?{' '} */}
          {/*   <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"> */}
          {/*     Registre-se */}
          {/*   </a> */}
          {/* </p> */}
        </form>
      </div>
    </div>
  );
};

/**
 * Exporta o componente AreaDeMembrosPage
 * Esta página exibe um formulário de login para acesso à área restrita
 * Recursos implementados:
 * - Layout responsivo e centralizado
 * - Acessibilidade (labels, aria-attributes)
 * - Estrutura para futura implementação de autenticação com dois níveis (admin/membro)
 * - Formulário com validação básica
 */
export default AreaDeMembrosPage;

