import { config, fields, collection } from '@keystatic/core';
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
        tag: fields.array(
          fields.text({ label: 'Etiqueta' }),
          {
            label: 'Etiquetas (Tags)',
            itemLabel: (props) => props.value || 'Nueva etiqueta',
          }
        ),
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
});
