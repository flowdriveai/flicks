import { PUBLIC_API_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies, request }) => {
  const auth_token = cookies.get('auth_token');
  const {fcam, ecam, qlog} = await request.json();


  const refreshRes = await fetch(`${PUBLIC_API_URL}/user/drive`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`
      },
      body: JSON.stringify({
          'keys': [fcam, ecam, qlog]
      })
  });

  return new Response(await refreshRes.text())
}) satisfies RequestHandler;
