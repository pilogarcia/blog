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
    site: context.site ?? 'https://elojoinusual.com',
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.tag],
    })),
    customData: `<language>es</language>`,
  });
}
