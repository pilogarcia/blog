import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const index = sorted.map((post) => ({
    id: post.id,
    title: post.data.title,
    excerpt: post.data.excerpt,
    tag: post.data.tag,
    author: post.data.author,
    pubDate: post.data.pubDate,
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
