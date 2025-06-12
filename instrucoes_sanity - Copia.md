# Instruções para Ajustes no Sanity Studio

Olá, Vagner! Como conversamos, o site (frontend) foi preparado para novas funcionalidades, mas elas precisam de alguns ajustes na estrutura do seu painel de controle Sanity (backend) para funcionarem corretamente. 

**Não se preocupe, são ajustes simples!** Siga os passos abaixo com calma dentro do seu projeto Sanity (na pasta onde está o código do seu `backend_site_igreja`, não no painel online). Você precisará editar alguns arquivos de código.

**Observação:** Sempre que modificar arquivos no código do Sanity Studio, você precisará parar o processo do Studio (se estiver rodando no seu terminal, pressione `Ctrl + C`) e iniciá-lo novamente (`npm run dev` ou `yarn dev`) para ver as mudanças refletidas no painel online.

---

## 1. Adicionar Campo "Destaque" aos Eventos

Para que você possa marcar quais eventos devem aparecer na página inicial.

1.  **Encontre o arquivo do schema `evento`:** Navegue até a pasta `schemas` (ou `schemaTypes`) dentro do seu projeto Sanity e abra o arquivo que define o tipo `evento` (provavelmente `evento.js` ou `evento.ts`).
2.  **Adicione o campo `destaque`:** Dentro do array `fields: [...]`, adicione o seguinte objeto (pode ser no final, antes do `]` de fechamento do array):

    ```javascript
    {
      name: 'destaque',
      title: 'Destaque na Página Inicial?',
      description: 'Marque esta opção para exibir este evento na seção de destaques da página inicial.',
      type: 'boolean',
      initialValue: false // Opcional: define que novos eventos não são destaque por padrão
    }
    ```
3.  **Salve o arquivo.**
4.  **Reinicie o Sanity Studio** (pare e inicie novamente no terminal).
5.  Agora, ao editar ou criar um evento no painel online, você verá uma nova opção "Destaque na Página Inicial?" (Sim/Não) para marcar.

---

## 2. Criar Novo Tipo de Conteúdo: "Banner"

Para você cadastrar os banners rotativos da página inicial.

1.  **Crie um novo arquivo:** Na pasta `schemas` (ou `schemaTypes`), crie um novo arquivo chamado `banner.js` (ou `banner.ts`).
2.  **Cole o seguinte código** dentro deste novo arquivo:

    ```javascript
    // schemas/banner.js (ou .ts)
    export default {
      name: 'banner',
      title: 'Banner Rotativo (Home)',
      type: 'document',
      fields: [
        {
          name: 'titulo',
          title: 'Título (Opcional)',
          description: 'Texto principal que aparece sobre o banner.',
          type: 'string',
        },
        {
          name: 'descricao',
          title: 'Descrição (Opcional)',
          description: 'Texto secundário sobre o banner.',
          type: 'text',
          rows: 2
        },
        {
          name: 'imagem',
          title: 'Imagem do Banner',
          type: 'image',
          options: {
            hotspot: true, // Permite selecionar a área de foco da imagem
          },
          validation: Rule => Rule.required().error('A imagem do banner é obrigatória.')
        },
        {
          name: 'link',
          title: 'Link (Opcional)',
          description: 'Para onde o banner deve levar ao ser clicado (ex: /eventos, https://exemplo.com). Deixe em branco se não houver link.',
          type: 'url',
          validation: Rule => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] })
        },
        // Você pode adicionar um campo de ordem se quiser controlar a sequência manualmente
        // {
        //   name: 'ordem',
        //   title: 'Ordem de Exibição',
        //   type: 'number',
        // }
      ],
      preview: {
        select: {
          title: 'titulo',
          media: 'imagem',
        },
        prepare({ title, media }) {
          return {
            title: title || 'Banner sem título',
            media: media,
          };
        },
      },
    };
    ```
3.  **Importe o novo tipo:** Abra o arquivo principal de schemas (geralmente `schemas/index.js`, `schemas/schema.js` ou similar, onde você importa todos os outros tipos como `evento`, `artigo`, etc.). Importe o novo tipo `banner` e adicione-o à lista de `types`.
    *   Adicione a linha de importação no topo: `import banner from './banner'`
    *   Adicione `banner` dentro do array `types: [...]`.
4.  **Salve os arquivos.**
5.  **Reinicie o Sanity Studio.**
6.  Você verá uma nova opção "Banner Rotativo (Home)" no menu lateral do seu painel para cadastrar os banners.

---

## 3. Adicionar Campo para Sermões Escritos

Para você poder cadastrar o texto completo dos sermões.

1.  **Encontre o arquivo do schema `sermoesPregacoes`:** Navegue até a pasta `schemas` (ou `schemaTypes`) e abra o arquivo que define o tipo `sermoesPregacoes` (ou o nome que você usou para sermões).
2.  **Adicione o campo `conteudoEscrito`:** Dentro do array `fields: [...]`, adicione o seguinte objeto:

    ```javascript
    {
      name: 'conteudoEscrito',
      title: 'Conteúdo do Sermão (Texto)',
      description: 'O texto completo do sermão ou mensagem.',
      type: 'array', // Indica que é um campo de texto rico (Portable Text)
      of: [
        { 
          type: 'block', // Tipo básico de bloco de texto
          styles: [ // Estilos de texto permitidos
            {title: 'Normal', value: 'normal'},
            {title: 'Título 1', value: 'h1'},
            {title: 'Título 2', value: 'h2'},
            {title: 'Título 3', value: 'h3'},
            {title: 'Citação', value: 'blockquote'}
          ],
          lists: [ // Tipos de lista permitidos
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numeração', value: 'number'}
          ],
          marks: { // Estilos inline permitidos
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
              {title: 'Sublinhado', value: 'underline'},
              {title: 'Riscado', value: 'strike-through'}
            ],
            annotations: [ // Permite adicionar links
              { 
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: Rule => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] })
                  }
                ]
              }
            ]
          }
        },
        // Você pode permitir adicionar imagens no meio do texto se desejar
        // { 
        //   type: 'image',
        //   options: { hotspot: true }
        // }
      ]
    }
    ```
3.  **Salve o arquivo.**
4.  **Reinicie o Sanity Studio.**
5.  Ao editar ou criar um Sermão/Pregação, você verá um novo campo rico para digitar ou colar o conteúdo do sermão.

---

## 4. Criar Novo Tipo de Conteúdo: "Notícia"

Para você cadastrar notícias separadamente dos artigos.

1.  **Crie um novo arquivo:** Na pasta `schemas` (ou `schemaTypes`), crie um novo arquivo chamado `noticia.js` (ou `noticia.ts`).
2.  **Cole o seguinte código** (é muito similar ao `artigo`, ajuste os campos se necessário):

    ```javascript
    // schemas/noticia.js (ou .ts)
    export default {
      name: 'noticia',
      title: 'Notícia',
      type: 'document',
      fields: [
        {
          name: 'titulo',
          title: 'Título da Notícia',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'slug',
          title: 'Slug (URL amigável)',
          type: 'slug',
          options: {
            source: 'titulo',
            maxLength: 96,
          },
          description: 'Será gerado automaticamente a partir do título, mas pode ser editado.',
          validation: Rule => Rule.required()
        },
        {
          name: 'dataPublicacao',
          title: 'Data de Publicação',
          type: 'date',
          options: {
            dateFormat: 'DD/MM/YYYY',
          },
          initialValue: () => new Date().toISOString().substring(0, 10),
          validation: Rule => Rule.required()
        },
        {
          name: 'resumo',
          title: 'Resumo Curto',
          type: 'text',
          rows: 3,
          description: 'Um breve resumo que aparecerá na listagem de notícias.',
          validation: Rule => Rule.required().max(200)
        },
        {
          name: 'imagemPrincipal',
          title: 'Imagem Principal',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'conteudo',
          title: 'Conteúdo Completo da Notícia',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image', options: { hotspot: true } }
            // Adicione outros tipos de bloco se necessário
          ],
        },
        // Adicione outros campos se precisar, como categorias, autor, etc.
      ],
      preview: {
        select: {
          title: 'titulo',
          subtitle: 'dataPublicacao',
          media: 'imagemPrincipal',
        },
      },
    };
    ```
3.  **Importe o novo tipo:** Abra o arquivo principal de schemas (`schemas/index.js` ou similar), importe o tipo `noticia` e adicione-o à lista de `types`.
    *   Adicione a linha de importação: `import noticia from './noticia'`
    *   Adicione `noticia` dentro do array `types: [...]`.
4.  **Salve os arquivos.**
5.  **Reinicie o Sanity Studio.**
6.  Você verá a opção "Notícia" no menu lateral para cadastrar as notícias.

---

## 5. Remover Tipo de Conteúdo: "Páginas"

Se você confirmou que não está usando o tipo "Páginas" para nada.

1.  **Encontre o arquivo principal de schemas:** Abra o arquivo `schemas/index.js` (ou `schemas/schema.js`, etc.).
2.  **Remova a importação:** Encontre a linha que importa o schema `paginas` (algo como `import paginas from './paginas'`) e **delete** essa linha.
3.  **Remova da lista de tipos:** Dentro do array `types: [...]`, encontre e **delete** a palavra `paginas`.
4.  **(Opcional) Delete o arquivo:** Você pode deletar o arquivo `schemas/paginas.js` (ou `paginas.ts`) da pasta `schemas`, já que ele não será mais usado.
5.  **Salve o arquivo principal de schemas.**
6.  **Reinicie o Sanity Studio.**
7.  A opção "Páginas" não deverá mais aparecer no menu lateral do painel.

---

Pronto! Após seguir estes passos, seu Sanity Studio estará pronto para alimentar as novas seções e funcionalidades do site. Lembre-se de cadastrar alguns itens de exemplo (banners, sermões com conteúdo escrito, notícias) para testar!

Se tiver qualquer dúvida durante o processo, pode me perguntar!
