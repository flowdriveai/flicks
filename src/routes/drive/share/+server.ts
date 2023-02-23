import { PUBLIC_API_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const POST = (async ({ cookies, request }) => {
    let auth_token = cookies.get('auth_token')

    const {drive_id, shared} = await request.json();

    const response = await fetch(`${PUBLIC_API_URL}/drive/share`, {
        method: 'POST',
        body: JSON.stringify({
            'drive_id': drive_id,
            'shared': shared
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth_token}`
        },
    });
    return new Response(await response.text())
}) satisfies RequestHandler;