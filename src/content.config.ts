import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Pilo García'),
    // EL TRUCO DE MAGIA: Acepta string o array, y siempre lo convierte a array
    tag: z.union([
      z.string(),
      z.array(z.string())
    ]).transform(val => Array.isArray(val) ? val : [val]).default(['Ensayo']),
    minutesRead: z.number().optional(),
    cover: z.string().optional(),
    coverAuthor: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };