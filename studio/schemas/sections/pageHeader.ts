import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.pageHeader',
  title: 'En-tête de page',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'En-tête', subtitle: 'En-tête de page'}
    },
  },
})
