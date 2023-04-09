import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
  const auth_token = cookies.get('auth_token');
  const device_id = url.searchParams.get('id')


  const res = await fetch(`${PUBLIC_API_URL}/device`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth_token}`
      },
      body: JSON.stringify({
          'device_id': device_id
      })
  });
  throw redirect(302, '/user')
}) satisfies RequestHandler;