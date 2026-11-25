import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Pilo García'),
    tag: z.union([
      z.string(),
      z.array(z.string())
    ]).transform(val => Array.isArray(val) ? val : [val]).default(['Ensayo']),
    minutesRead: z.number().optional(),
    cover: z.string().optional(),
    coverAuthor: z.string().optional(),
    draft: z.boolean().default(false),
    popular: z.boolean().optional(),
    type: z.string().optional(),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/paginas' }),
  schema: z.object({
    titulo: z.string().default('Algo sobre mí'),
    subtitulo: z.string().optional(),
    foto: z.string().nullable().optional(),
    textoPlataformas: z.string().default('Los invito a visitar las plataformas donde encontrarán mi música!'),
  }),
});

export const collections = { blog, paginas };
