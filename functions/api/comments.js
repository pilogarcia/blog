// functions/api/comments.js

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  if (!postId) {
    return new Response(JSON.stringify({ error: 'Falta postId' }), { status: 400 });
  }

  const { results } = await env.DB.prepare(
    "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC"
  ).bind(postId).all();

  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const { post_id, author, content } = await request.json();

    if (!post_id || !author || !content) {
      return new Response(JSON.stringify({ error: 'Faltan datos' }), { status: 400 });
    }

    await env.DB.prepare(
      "INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)"
    ).bind(post_id, author, content).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}