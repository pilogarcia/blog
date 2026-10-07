import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://elojoinusual.com.ar',
    items: sorted.map((post) => {
      // 1. Aseguramos que tag siempre sea un array limpio de strings
      const tags = Array.isArray(post.data.tag) 
        ? post.data.tag.filter(Boolean) 
        : (post.data.tag ? [post.data.tag] : []);

      return {
        // 2. Forzamos que title y description nunca estén vacíos para complacer a Zod
        title: post.data.title || 'Sin título',
        description: post.data.excerpt || post.data.title || 'Descripción no disponible',
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        // 3. Pasamos el array directo, no envuelto en otro array
        categories: tags,
      };
    }),
    customData: `<language>es</language>`,
  });
}