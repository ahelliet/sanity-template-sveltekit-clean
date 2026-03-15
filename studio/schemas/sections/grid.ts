import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.grid',
  title: 'Grille',
  type: 'object',
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({
      name: 'source',
      title: 'Source des données',
      type: 'string',
      options: {
        list: [
          {title: 'Articles (posts)', value: 'posts'},
          {title: 'Projets', value: 'projects'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'limit',
      title: 'Nombre d\'éléments',
      type: 'number',
      description: 'Laisser vide pour tout afficher',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'Lien "Voir tout"',
      type: 'string',
      description: 'Ex: Voir tous les projets →',
    }),
    defineField({
      name: 'viewAllHref',
      title: 'URL "Voir tout"',
      type: 'string',
      hidden: ({parent}) => !parent?.viewAllLabel,
    }),
    defineField({
      name: 'alternateBackground',
      title: 'Fond alterné',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', source: 'source'},
    prepare({title, source}) {
      return {
        title: title || 'Grille',
        subtitle: `Grille — ${source || 'non configuré'}`,
      }
    },
  },
})
