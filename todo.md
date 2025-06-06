# Lista de Tarefas - Ajustes e Melhorias

## Fase 1: Correções Urgentes (Plano 002)

- [X] **Aniversariantes (Home):** Investigar erro de query GROQ (erro 400 no log) e ajustar a exibição para "Nenhum aniversariante este mês" se a busca retornar vazia, sem tarja vermelha.
- [-] **Foto Eventos:** Corrigir exibição da imagem na página de Eventos (verificar query/componente - *Pendente verificação no Sanity pelo usuário*).
- [X] **Dados Contato:** Corrigir exibição do e-mail e telefone na página de Contato (verificar query/componente).
- [X] **Info Cultos (Rodapé):** Corrigir exibição das informações de EBD, Consagração e Santa Ceia no rodapé (verificar query/componente Footer).

## Fase 2: Ajustes de Layout e Texto (Plano 003)

- [X] **Rodapé (Tamanho):** Diminuir a altura geral do rodapé ou ajustar espaçamentos internos.
- [X] **Texto Boas-vindas (Home):** Alterar para "Bem-vindo à 1ª Igreja Unida em Inácio Monteiro" e "um lugar de fé, amor e esperança."
- [X] **Cabeçalho (Alinhamento/Texto):** Centralizar logo e texto "1ª Igreja Unida em Inácio Monteiro".
- [X] **Foto Pastores:** Ajustar o CSS para evitar corte no rosto na página de Pastores.
- [X] **Texto Endereço (Rodapé):** Alterar o título da seção de "Contato" para "Endereço e Contato" no rodapé.

## Fase 3: Correções Funcionais (Plano 004)

- [X] **Modo Escuro/Claro:** Corrigir funcionalidade do botão e ajustar posicionamento/visibilidade.
- [X] **Link Área Membros:** Garantir que o link/botão leve para a página `/area-de-membros`.

## Fase 4: Conteúdo e Integrações (Plano 005)

- [X] **Ícones Redes Sociais:** Readicionar ícones (Instagram, Facebook, YouTube) no rodapé com links buscados do Sanity.

## Fase 5: Implementação de Novas Funcionalidades (Plano 006)

- [X] **Formulário Contato:** Integrar com Formspree (adicionar campo para endpoint no código - *Pendente URL do usuário*).
- [X] **Galeria:** Adaptar para exibir Vídeos (além de Imagens) buscando do Sanity.
- [X] **Eventos em Destaque (Home):** Implementar busca e exibição de eventos marcados como `destaque` (*Pendente ajuste no Sanity pelo usuário*).
- [X] **Banners Rotativos (Home):** Criar componente e busca para banners (*Pendente tipo `Banner` no Sanity pelo usuário*).
- [X] **Sermões Escritos:** Criar nova página e componente para exibir sermões escritos (*Pendente tipo/campo no Sanity pelo usuário*).
- [X] **Notícias:** Criar nova página e componente para exibir notícias (*Pendente tipo `Noticia` no Sanity pelo usuário*).

## Fase 6: Preparação de Instruções Sanity (Plano 007)

- [ ] **Instruções Sanity:** Criar arquivo `instrucoes_sanity.md` detalhando como o usuário pode:
    - Adicionar campo `destaque` (booleano) ao tipo `evento`.
    - Criar novo tipo `banner` (com imagem, título, descrição, link).
    - Adicionar campo de texto rico (Portable Text) ao tipo `sermoesPregacoes` (ou criar tipo `sermaoEscrito`).
    - Criar novo tipo `noticia` (similar a `artigo`).
    - Remover tipo `paginas` (se não utilizado).

## Fase 7: Revisão Final e Validação (Plano 008-009)

- [X] **Cabeçalho (Dinâmica):** Revisar ajuste de padding para garantir que não cubra conteúdo em páginas com muitas listagens (ex: Ministérios).
- [X] **Validação Geral:** Testar todas as páginas e funcionalidades após os ajustes.

## Fase 8: Entrega e Próximos Passos (Plano 010-011)

- [ ] **Empacotar:** Criar arquivo zip final com todas as correções e novas funcionalidades.
- [ ] **Reportar:** Enviar pacote, `instrucoes_sanity.md` e resumo das alterações para o usuário.
- [ ] **Aguardar:** Entrar em modo idle aguardando feedback ou novos pedidos.o Formulário Contato:** Definir e implementar o destino das mensagens enviadas (ex: API externa, serviço de e-mail).
- [ ] **Galeria (Vídeos):** Discutir e planejar como adaptar a galeria para exibir vídeos além de fotos.
- [ ] **Sermões:** Discutir e planejar criação de seção para sermões (escritos, áudio, vídeo).

## Fase 6: Revisão Final Layout (Plano 007)

- [ ] **Cabeçalho (Dinâmica):** Revisar o ajuste de padding-top para garantir que funcione bem com conteúdos longos e diferentes alturas de cabeçalho (rolagem).

## Fase 7: Validação e Entrega (Plano 008 e 009)

- [ ] Validar todas as páginas e funcionalidades após os ajustes.
- [ ] Preparar e enviar pacote final ao usuário.

