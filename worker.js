export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Si el pedido es a la API de comentarios...
    if (url.pathname === '/api/comments') {
      
      // Si es para LEER comentarios (GET)
      if (request.method === 'GET') {
        const postId = url.searchParams.get('postId');
        if (!postId) return new Response('Falta postId', { status: 400 });
        const { results } = await env.DB.prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC").bind(postId).all();
        return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
      }

      // Si es para ENVIAR un comentario nuevo (POST)
      if (request.method === 'POST') {
        try {
          const { post_id, author, content } = await request.json();
          if (!post_id || !author || !content) return new Response('Faltan datos', { status: 400 });
          await env.DB.prepare("INSERT INTO comments (post_id, author, content) VALUES (?, ?, ?)").bind(post_id, author, content).run();
          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
          return new Response(e.message, { status: 500 });
        }
      }
    }

    // Si es cualquier otro pedido (tu blog normal), le sirve la web estática
    return env.ASSETS.fetch(request);
  }
};