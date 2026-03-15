import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.contact',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'alternateBackground',
      title: 'Fond alterné',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Contact', subtitle: 'Contact'}
    },
  },
})
