import { config, fields, collection, singleton } from '@keystatic/core';
import { block, wrapper, mark } from '@keystatic/core/content-components';
import { superscriptIcon } from '@keystar/ui/icon/icons/superscriptIcon';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Artículos del Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        type: fields.text({
          label: 'Tipo (opcional)',
        }),
        excerpt: fields.text({
          label: 'Extracto / Resumen',
          multiline: true,
        }),
        pubDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Pilo García',
        }),
        tag: fields.multiselect({
          label: 'Etiquetas (Tags)',
          options: [
            { label: 'Poesía', value: 'Poesía' },
            { label: 'Ensayo', value: 'Ensayo' },
            { label: 'Relato', value: 'Relato' },
            { label: 'Micro documental', value: 'Micro documental' },
            { label: 'Diario de viaje', value: 'Diario de viaje' },
            { label: 'Escritores', value: 'Escritores' },
            { label: 'Sociedad', value: 'Sociedad' },
            { label: 'Modernidad', value: 'Modernidad' },
            { label: 'Experiencias', value: 'Experiencias' },
            { label: 'Interés general', value: 'Interés general' },
          ],
          defaultValue: ['Ensayo'],
        }),
        minutesRead: fields.integer({
          label: 'Minutos de lectura (opcional)',
        }),
        cover: fields.image({
          label: 'Imagen de portada',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        coverAuthor: fields.text({
          label: 'Autor de la portada (opcional)',
        }),
        draft: fields.checkbox({
          label: 'Borrador (Draft)',
          defaultValue: false,
        }),
        popular: fields.checkbox({
          label: 'Artículo Popular',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Contenido',
          extension: 'mdx',
          components: {
            Poema: block({
              label: 'Poema / Estrofa',
              schema: {
                texto: fields.text({
                  label: 'Versos del poema',
                  multiline: true,
                }),
                autor: fields.text({
                  label: 'Autor del poema (opcional)',
                }),
              },
            }),
            YouTubeEmbed: block({
              label: 'Video de YouTube',
              schema: {
                id: fields.text({ label: 'ID del video de YouTube' }),
              },
            }),
            div: wrapper({
              label: 'Bloque (div)',
              schema: {
                class: fields.text({ label: 'Clase CSS (opcional)' }),
              },
            }),
            sup: mark({
              label: 'Superíndice',
              icon: superscriptIcon,
              tag: 'sup',
              schema: {},
            }),
          },
        }),
      },
    }),
  },

  singletons: {
    sobreMi: singleton({
      label: 'Página Sobre mí',
      path: 'src/content/paginas/sobre-mi',
      format: { contentField: 'contenido' },
      schema: {
        titulo: fields.text({ label: 'Título de la página', defaultValue: 'Algo sobre mí' }),
        foto: fields.image({
          label: 'Foto (opcional)',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        contenido: fields.mdx({
          label: 'Texto de biografía',
          extension: 'mdx',
        }),
        textoPlataformas: fields.text({
          label: 'Frase sobre plataformas musicales',
          defaultValue: 'Los invito a visitar las plataformas donde encontrarán mi música!',
        }),
      },
    }),
  },
});
