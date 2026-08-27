export async function onRequestPost({ request }) {
  try {
    const data = await request.json();
    const email = data.email;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email requerido" }), { status: 400 });
    }

    // Hacemos la petición a Buttondown por detrás, sin que el usuario vea popups
    const bdResponse = await fetch("https://buttondown.email/api/emails/embed-subscribe/elbloginusual", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ email }).toString(),
    });

    // Si Buttondown responde que todo salió bien (o que el usuario ya estaba suscripto)
    if (bdResponse.ok || bdResponse.status === 201 || bdResponse.status === 200) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Error en la suscripción" }), { status: bdResponse.status });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}