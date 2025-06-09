// schema.js - Pastor atualizado
export default {
  name: 'pastor',
  title: 'Pastor',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      description: 'Nome completo do pastor',
      validation: Rule => Rule.required().error('O nome do pastor é obrigatório')
    },
    {
      name: 'cargo',
      title: 'Cargo',
      type: 'string',
      description: 'Cargo ou função do pastor (ex: Pastor Titular, Pastor Auxiliar, etc.)'
    },
    {
      name: 'atual',
      title: 'Pastor Atual',
      type: 'boolean',
      description: 'Marque se este pastor está atualmente na igreja',
      initialValue: true
    },
    {
      name: 'dataEntrada',
      title: 'Data de Entrada',
      type: 'date',
      description: 'Data em que o pastor iniciou seu ministério na igreja',
      options: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      name: 'dataSaida',
      title: 'Data de Saída',
      type: 'date',
      description: 'Data em que o pastor encerrou seu ministério na igreja (deixe em branco se for o pastor atual)',
      options: {
        dateFormat: 'DD/MM/YYYY'
      },
      hidden: ({ document }) => document?.atual
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      description: 'Foto do pastor (preferencialmente em formato retrato)',
      options: {
        hotspot: true // Permite ajustar o ponto focal da imagem
      }
    },
    {
      name: 'biografia',
      title: 'Biografia',
      type: 'text',
      description: 'Breve biografia ou descrição do pastor',
      rows: 5
    },
    {
      name: 'biografiaDetalhada',
      title: 'Biografia Detalhada',
      type: 'array',
      description: 'Biografia completa do pastor com formatação',
      of: [{ type: 'block' }]
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      description: 'E-mail de contato do pastor',
      validation: Rule => Rule.email().error('Formato de e-mail inválido')
    },
    {
      name: 'telefone',
      title: 'Telefone',
      type: 'string',
      description: 'Telefone de contato do pastor'
    },
    {
      name: 'redesSociais',
      title: 'Redes Sociais',
      type: 'array',
      description: 'Links para as redes sociais do pastor',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'plataforma',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Outra', value: 'outra' }
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Link para o perfil na rede social'
            }
          ],
          preview: {
            select: {
              title: 'plataforma',
              subtitle: 'url'
            }
          }
        }
      ]
    },
    {
      name: 'ordem',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Número para ordenar os pastores na página (menor número = maior prioridade)',
      initialValue: 99
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Identificador único para URLs (gerado automaticamente a partir do nome)',
      options: {
        source: 'nome',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'cargo',
      media: 'foto'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Pastor sem cargo definido',
        media
      };
    }
  },
  orderings: [
    {
      title: 'Ordem de Exibição',
      name: 'ordemAsc',
      by: [{ field: 'ordem', direction: 'asc' }]
    },
    {
      title: 'Nome, A-Z',
      name: 'nomeAsc',
      by: [{ field: 'nome', direction: 'asc' }]
    },
    {
      title: 'Data de Entrada (mais recente)',
      name: 'dataEntradaDesc',
      by: [{ field: 'dataEntrada', direction: 'desc' }]
    }
  ]
}
