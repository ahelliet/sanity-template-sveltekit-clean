import type {StructureResolver} from 'sanity/structure'
import {CogIcon, HomeIcon, DocumentTextIcon, FolderIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // ─── Paramètres généraux ───
      S.listItem()
        .title('Paramètres généraux')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres généraux'),
        ),

      S.divider(),

      // ─── Pages ───
      S.listItem()
        .title('Accueil')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Page d\'accueil'),
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() === 'page',
      ),

      S.divider(),

      // ─── Collections ───
      S.documentTypeListItem('post').title('Articles').icon(DocumentTextIcon),
      S.documentTypeListItem('project').title('Projets').icon(FolderIcon),
    ])
