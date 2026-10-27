import {defineArrayMember, defineField, defineType} from 'sanity'

export const CATEGORIAS = [
  'Release',
  'Turismo',
  'Novidades',
  'Dicas de viagem',
  'Cobertura',
  'Comunicado',
]

export const post = defineType({
  name: 'post',
  title: 'Notícia',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Endereço da matéria (slug)',
      description: 'Clique em "Generate" para criar a partir do título.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      description: 'Matérias com data futura só aparecem no site a partir desse dia.',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: CATEGORIAS.map((c) => ({title: c, value: c})),
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de capa',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (descrição da imagem)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo',
      description: 'Texto curto exibido nos cards da home e da lista de notícias.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo da matéria',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Título', value: 'h2'},
            {title: 'Subtítulo', value: 'h3'},
            {title: 'Citação', value: 'blockquote'},
          ],
          lists: [
            {title: 'Marcadores', value: 'bullet'},
            {title: 'Numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrito', value: 'strong'},
              {title: 'Itálico', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Endereço (URL)',
                    validation: (rule) =>
                      rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Texto alternativo'}),
            defineField({name: 'caption', type: 'string', title: 'Legenda'}),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Mais recentes',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'mainImage'},
  },
})
