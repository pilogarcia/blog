export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Si el pedido es a la API de comentarios...
    if (url.pathname === '/api/comments') {
      
      // LEER comentarios (GET)
      if (request.method === 'GET') {
        const postId = url.searchParams.get('postId');
        if (!postId) return new Response('Falta postId', { status: 400 });
        const { results } = await env.DB.prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC").bind(postId).all();
        return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
      }

      // ENVIAR comentario o respuesta (POST)
      if (request.method === 'POST') {
        try {
          const { post_id, author, content, parent_id } = await request.json();
          if (!post_id || !author || !content) return new Response('Faltan datos', { status: 400 });
          
          // Guardamos el comentario con su parent_id (si lo tiene)
          await env.DB.prepare(
            "INSERT INTO comments (post_id, author, content, parent_id) VALUES (?, ?, ?, ?)"
          ).bind(post_id, author, content, parent_id || null).run();
          
          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
          return new Response(e.message, { status: 500 });
        }
      }
    }

    // SI EL PEDIDO ES A LA API DE SUSCRIPCIÓN
    if (url.pathname === '/api/subscribe') {
      if (request.method === 'POST') {
        try {
          const { email } = await request.json();
          if (!email) return new Response(JSON.stringify({ error: 'Falta el email' }), { status: 400 });

          // Fijamos si el mail ya existe para no duplicarlo
          const { results } = await env.DB.prepare("SELECT * FROM subscribers WHERE email = ?").bind(email).all();
          if (results.length > 0) {
            return new Response(JSON.stringify({ error: 'Este email ya está suscripto.' }), { status: 409 });
          }

          // Guardamos el mail en la base de datos
          await env.DB.prepare("INSERT INTO subscribers (email) VALUES (?)").bind(email).run();
          return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
        } catch (e) {
          return new Response(e.message, { status: 500 });
        }
      }
    }
    // EXPORTAR SUSCRIPTORES A CSV
    if (url.pathname === '/api/exportar-suscriptores') {
      try {
        const { results } = await env.DB.prepare("SELECT email, created_at FROM subscribers ORDER BY created_at DESC").all();
        
        // Armamos el texto en formato CSV
        let csv = "Email,Fecha de suscripcion\n";
        if (results && results.length > 0) {
          results.forEach(row => {
            csv += `${row.email},${row.created_at}\n`;
          });
        } else {
          csv += "No hay suscriptores todavia,\n";
        }

        // Le decimos al navegador que descargue un archivo
        return new Response(csv, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename=suscriptores.csv'
          }
        });
      } catch (e) {
        // Si hay un error, lo mostramos en pantalla en vez de crashear
        return new Response('Error al exportar: ' + e.message, { status: 500 });
      }
    }

        // ENVIAR NEWSLETTER A TODOS LOS SUSCRIPTORES
    if (url.pathname === '/api/send-newsletter') {
      // Una clave secreta para que solo vos puedas disparar los mails
      // CAMBIÁ "ojo-inusual-2024" por la contraseña que vos quieras
      const expectedSecret = 'ojo-inusual-2024'; 
      const providedSecret = url.searchParams.get('secret');
      
      if (providedSecret !== expectedSecret) {
        return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
      }

      try {
        // Traemos todos los mails de tu base de datos
        const { results } = await env.DB.prepare("SELECT email FROM subscribers").all();
        
        if (results.length === 0) {
          return new Response(JSON.stringify({ message: 'No hay suscriptores para enviar mails.' }), { headers: { 'Content-Type': 'application/json' } });
        }

        // Mandamos un mail a cada suscriptor usando la API de Resend
        const emailPromises = results.map(sub => 
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + env.RESEND_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'El Ojo Inusual <newsletter@elojoinusual.com.ar>', 
              to: sub.email,
              subject: 'Nuevo artículo en El Ojo Inusual',
              html: '<h1>¡Hola!</h1><p>Hay un nuevo artículo en el blog. Entrá a leerlo en <a href="https://elojoinusual.com.ar">elojoinusual.com.ar</a>.</p>'
            })
          })
        );

        await Promise.all(emailPromises);

        return new Response(JSON.stringify({ success: true, sent: results.length }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
      }
    }
    // Si es cualquier otro pedido (tu blog normal), le sirve la web estática
    return env.ASSETS.fetch(request);
  }
};